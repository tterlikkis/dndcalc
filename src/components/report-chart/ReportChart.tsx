import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ReportChartInput } from "./ReportChartInput.interface";
import { ReportChartEntry } from "../../models/ReportChartEntry.interface";
import { RollConfig } from "../../models/RollConfig.class";
import "./ReportChart.css"
import { AttackConfig } from "../../models/AttackConfig.interface";
import { round } from "../../utilities/round";
import { sum } from "../../utilities/sum";
import { useMemo, useState } from "react";

const chartWidth = 600;
const colors: string[] = [
  "red",
  "blue",
  "green",
  "purple",
  "orange",
  "brown",
  "pink"
];

export function ReportChart({ showCharts, attacks, roundCount, minAc, maxAc }: ReportChartInput) {

  const [showTotalDamage, setShowTotalDamage] = useState(false);
  const chartData = useMemo(initialData, [attacks, roundCount, minAc, maxAc]);

  function handleShowTotalDamageChange() {
    setShowTotalDamage(!showTotalDamage);
  }

  function initialData(): ReportChartEntry[] {
    const entries: ReportChartEntry[] = [];
    for (let i = minAc; i <= maxAc; i++) {
      const entry: ReportChartEntry = { ac: i };
      const averageDamages: number[] = [];
      attacks.forEach(a => {
        const [averageDamage, hitPercentage] = rollAttack(i, a);
        entry[`averageDamage${a.id}`] = averageDamage;
        entry[`hitPercentage${a.id}`] = hitPercentage;
        averageDamages.push(averageDamage);
      });
      if (attacks.length > 1) {
        entry['averageDamage'] = round(sum(averageDamages));
      }
      entries.push(entry);
    }
    return entries;
  }

  function rollAttack(ac: number, attack: AttackConfig): [number, number] {
    const totals = Array.from(Array(roundCount).keys()).map(() => {
      const roll = RollConfig.roll(attack.attackRoll);
      // Crit success
      if (roll.base === attack.attackRoll.dice) {
        return attack.damageRolls.reduce((acc, curr) => 
          acc + RollConfig.roll(curr).total + RollConfig.roll(curr).total, 
          0
        );
      }
      // Crit fail or miss
      else if (roll.base === 1 || roll.total < ac) {
        return -1;
      }
      // Hit
      else {
        return attack.damageRolls.reduce((acc, curr) => acc + RollConfig.roll(curr).total, 0);
      }
    });
    const hits = totals.filter(t => t !== -1);
    const totalDamage = hits.reduce((acc, curr) => acc + curr, 0);
    return [
      round(totalDamage / totals.length),
      round(hits.length / totals.length * 100)
    ];
  }

  if (!showCharts) return null;

  return (
    <div className="chart-column">
      <div className="chart-title">
        <div className="title-text">Damager Per Round</div>
        {
          attacks.length > 1
          ? (
            <label>
              Display Round Total
              <input type="checkbox" checked={showTotalDamage} onClick={handleShowTotalDamageChange} />
            </label>
          )
          : null
        }
      </div>
      <LineChart width={chartWidth} height={200} data={chartData}>
        <CartesianGrid />
        {attacks.map((attack, index) =>
          <Line 
            key={attack.id}
            dataKey={`averageDamage${attack.id}`} 
            type="monotone" 
            stroke={colors[index % colors.length]} 
            strokeWidth={2} 
            name={`Attack ${index+1} Avg Dmg per Round`}
          ></Line>     
        )}
        {
          attacks.length > 1 && showTotalDamage
          ? (
            <Line
              dataKey="averageDamage"
              type="monotone"
              stroke="grey"
              strokeWidth={2}
              name="Total Avg Dmg per Round"
            ></Line>
          )
          : null
        }
        <XAxis dataKey="ac" />
        <YAxis />
        <Tooltip />
      </LineChart>
      <div className="chart-title">
        <div className="title-text">Hit Percentage</div>
      </div>
      <LineChart width={chartWidth} height={200} data={chartData}>
        <CartesianGrid />
        {attacks.map((attack, index) =>
          <Line 
            key={attack.id}
            dataKey={`hitPercentage${attack.id}`} 
            type="monotone" 
            stroke={colors[index + 2 % colors.length]} 
            strokeWidth={2} 
            name={`Attack ${index+1} Hit Percentage`}
          ></Line>
        )}
        <XAxis dataKey="ac" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>

  );
}