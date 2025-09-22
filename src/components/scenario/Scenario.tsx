import { useState } from "react";
import { AttackConfig } from "../../models/AttackConfig.interface";
import { Attack } from "../attack/Attack";
import { ReportChart } from "../report-chart/ReportChart";
import "./Scenario.css"

export function Scenario() {
  const [roundCount, setRoundCount] = useState<number>(1000);
  const [minAc, setMinAc] = useState(10);
  const [maxAc, setMaxAc] = useState(20);
  const [showCharts, setShowCharts] = useState(false);

  const [attacks, setAttacks] = useState<AttackConfig[]>([new AttackConfig()]);

  function createAttack() {
    setAttacks([...attacks, new AttackConfig()]);
  }

  function deleteAttack(id: string) {
    setAttacks(attacks.filter(a => a.id !== id));
  }

  function handleMaxAcChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMaxAc(Number.parseInt(e.currentTarget.value));
  }

  function handleMinAcChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMinAc(Number.parseInt(e.currentTarget.value));
  }
  
  function handleRoundCountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRoundCount(Number.parseInt(e.currentTarget.value));
  }

  function reset() {
    setAttacks([new AttackConfig()])
  }

  function toggleCharts() {
    setShowCharts(!showCharts);
  }

  function updateAttack(attack: AttackConfig) {
    setAttacks(attacks.map(a => a.id === attack.id ? attack : a));
  }

  return (
    <>
      <div className="row">
        <label>
          Round Count: 
          <input 
            min="0"
            max="9999" 
            type="number" 
            value={roundCount}
            placeholder="Round Count"
            onChange={handleRoundCountChange}
            className="small-input"
          ></input>
        </label>
        <label>
          Min AC:
          <input
            min="0"
            type="number"
            value={minAc}
            placeholder="Min AC"
            onChange={handleMinAcChange}
            className="smaller-input"
          ></input>
        </label>
        <label>
          Max AC:
          <input
            min="0"
            type="number"
            value={maxAc}
            placeholder="Max AC"
            onChange={handleMaxAcChange}
            className="smaller-input"
          ></input>
        </label>
        <button onClick={createAttack}>Add Attack</button>
        <button onClick={reset}>Reset</button>
        <button onClick={toggleCharts}>{showCharts ? 'Hide Charts' : 'Show Charts'}</button>
      </div>
      <div>
        {attacks.map(attack =>
          <Attack attackConfig={attack} onUpdate={updateAttack} onDelete={deleteAttack}></Attack>
        )}
      </div>  
      {
        showCharts
        ? <ReportChart attacks={attacks} roundCount={roundCount} minAc={minAc} maxAc={maxAc} />
        : null
      }
    </>
  );
}