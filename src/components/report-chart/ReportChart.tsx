import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ReportChartInput } from "./ReportChartInput.interface";
import { ReportChartEntry } from "../../models/ReportChartEntry.interface";
import { RollConfig } from "../../models/RollConfig.class";
import "./ReportChart.css"
import { AttackConfig } from "../../models/AttackConfig.interface";
import { round } from "../../utilities/round";
import { sum } from "../../utilities/sum";
import { useMemo, useState } from "react";
import { RoundResult } from "../../models/RoundResult.interface";

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

export function ReportChart({ showResults, attacks, roundCount, minAc, maxAc }: ReportChartInput) {

  const [showTotalDamage, setShowTotalDamage] = useState(false);
  const acArray = useMemo(createAcArray, [minAc, maxAc]);
  const data = useMemo(runSimulation, [attacks, roundCount, minAc, maxAc]);
  const chartData = useMemo(convertToChartData, [data]);
  const tableData = useMemo(convertToTableData, [data]);

  function convertToChartData(): ReportChartEntry[] {
    return acArray.map(ac => {
      const entry: ReportChartEntry = { ac: ac };
      const results = data.filter(r => r.ac === ac);
      const averageDamages: number[] = [];
      attacks.forEach(a => {
        const result = results.find(r => r.attackId === a.id);
        if (!result) throw new Error(`Could not find round result for ${a.id} at AC ${ac}`);
        entry[`averageDamage${a.id}`] = result.averageDamage;
        entry[`hitPercentage${a.id}`] = result.hitPercentage;
        averageDamages.push(result.averageDamage);
      });
      if (attacks.length > 1) entry['averageDamage'] = round(sum(averageDamages));
      return entry;
    });
  }

  function convertToTableData() {
    return attacks.map(a => {
      const results = data.filter(r => r.attackId === a.id);
      return {
        attackId: a.id,
        averageHitDamage: round(sum(results.map(r => r.averageHitDamage)) / results.length),
        critSuccessPercentage: round(sum(results.map(r => r.critSuccessPercentage)) / results.length),
        critFailurePercentage: round(sum(results.map(r => r.critFailurePercentage)) / results.length)
      }
    });
  }

  function createAcArray() {
    return Number.isNaN(minAc) || Number.isNaN(maxAc) || minAc >= maxAc
      ? []
      : Array.from(Array(1 + maxAc - minAc).keys()).map(i => i + minAc);
  }
  
  function handleShowTotalDamageChange() {
    setShowTotalDamage(!showTotalDamage);
  }

  function rollAttack(ac: number, attack: AttackConfig): RoundResult {
    let critSuccessCount = 0;
    let critFailureCount = 0;
    const totals = Array.from(Array(roundCount).keys()).map(() => {
      const roll = RollConfig.roll(attack.attackRoll);
      // Crit success
      if (roll.base === attack.attackRoll.dice) {
        critSuccessCount++;
        return attack.damageRolls.reduce((acc, curr) => 
          acc + RollConfig.roll(curr).base + RollConfig.roll(curr).total, 
          0
        );
      }
      // Crit fail
      else if (roll.base === 1) {
        critFailureCount++;
        return -1;
      }
      // Miss
      else if (roll.total < ac) {
        return -1;
      }
      // Hit
      else {
        return attack.damageRolls.reduce((acc, curr) => acc + RollConfig.roll(curr).total, 0);
      }
    });
    const hits = totals.filter(t => t !== -1);
    const totalDamage = sum(hits);
    return {
      attackId: attack.id,
      ac: ac,
      averageDamage: round(totalDamage / totals.length),
      averageHitDamage: round(totalDamage / hits.length),
      hitPercentage: round(hits.length / totals.length * 100),
      critSuccessPercentage: round(critSuccessCount / totals.length * 100),
      critFailurePercentage: round(critFailureCount / totals.length * 100)
    };    
  }

  function runSimulation(): RoundResult[] {
    return acArray.flatMap(ac =>
      attacks.map(a => rollAttack(ac, a))
    );
  }

  if (!showResults) return null;

  return (
    <div className="chart-row">
      <div className="chart-column">
        <div className="chart-title">
          <div className="chart-title-text">Damager Per Round</div>
          {
            attacks.length > 1
            ? (
              <label>
                Display Round Total
                <input type="checkbox" checked={showTotalDamage} onChange={handleShowTotalDamageChange} />
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
          <div className="chart-title-text">Hit Percentage</div>
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
      <div className="chart-column">
        <table className="chart-table">
          <thead>
            <tr>
              <th>Attack #</th>
              <th>Avg Hit Dmg</th>
              <th>Crit Success %</th>
              <th>Crit Failure %</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((t, i) =>
              <tr key={i + 1}>
                <td>{i + 1}</td>
                <td>{t.averageHitDamage}</td>
                <td>{t.critSuccessPercentage}</td>
                <td>{t.critFailurePercentage}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>


  );
}