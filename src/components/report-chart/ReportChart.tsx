import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ReportChartInput } from "./ReportChartInput.interface";
import { ReportChartEntry } from "../../models/ReportChartEntry.interface";
import { RollConfig } from "../../models/RollConfig.class";
import "./ReportChart.css"
import { AttackConfig } from "../../models/AttackConfig.interface";
import { round } from "../../utilities/round";

export function ReportChart({ attacks, roundCount, minAc, maxAc }: ReportChartInput) {

  const chartWidth = 650;

  const colors: string[] = [
    "red",
    "blue",
    "yellow",
    "green",
    "purple",
    "orange",
    "black",
    "brown",
    "pink"
  ];

  const chartData = initialData();

  function initialData() {
    let entries: ReportChartEntry[] = [];
    for (let i = minAc; i <= maxAc; i++) {
      let entry: ReportChartEntry = { ac: i };
      const averageDamages: number[] = [];
      attacks.forEach(a => {
        const [averageDamage, hitPercentage] = rollAttack(i, a);
        entry[`averageDamage${a.id}`] = averageDamage;
        entry[`hitPercentage${a.id}`] = hitPercentage;
        averageDamages.push(averageDamage);
      });
      entries.push(entry);
    }
    return entries;
  }

  function rollAttack(ac: number, attack: AttackConfig): [number, number] {
    const totals = Array.from(Array(roundCount).keys()).map(() =>
      RollConfig.roll(attack.attackRoll) < ac 
        ? -1 
        : attack.damageRolls.reduce((acc, curr) => acc + RollConfig.roll(curr), 0) 
    );
    const hits = totals.filter(t => t !== -1);
    const totalDamage = hits.reduce((acc, curr) => acc + curr, 0);
    return [
      round(totalDamage / totals.length),
      round(hits.length / totals.length * 100)
    ];
  }

  return (
    <div className="chart-column">
      <div className="chart-title">Damager Per Round</div>
      <LineChart width={chartWidth} height={200} data={chartData}>
        <CartesianGrid />
        {attacks.map((attack, index) =>
          <>
            <Line 
              dataKey={`averageDamage${attack.id}`} 
              type="monotone" 
              stroke={colors[index % colors.length]} 
              strokeWidth={2} 
              name={`Attack ${index+1} Avg Dmg per Round`}
            ></Line>     
          </>

        )}
        {
          attacks.length > 1 
          ? (
            <Line
              dataKey="averageDamage"
              type="monotone"
              stroke="black"
              strokeWidth={2}
              name="Total Avg Dmg per Round"
            ></Line>
          )
          : null

        }
        <XAxis dataKey="ac" height={60} label={{ value: 'AC', position: 'center' }} />
        <YAxis />
        <Tooltip />
      </LineChart>
      <div className="chart-title">Hit Percentage</div>
      <LineChart width={chartWidth} height={200} data={chartData}>
        <CartesianGrid />
        {attacks.map((attack, index) =>
          <Line 
            dataKey={`hitPercentage${attack.id}`} 
            type="monotone" 
            stroke={colors[index + 3 % colors.length]} 
            strokeWidth={2} 
            name={`Attack ${index+1} Hit Percentage`}
          ></Line>
        )}
        <XAxis dataKey="ac" height={60} label={{ value: 'AC', position: 'center' }} />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>

  );
}