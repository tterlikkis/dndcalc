import { useState } from "react";
import { AttackConfig } from "../../models/AttackConfig.interface";
import { Attack } from "../attack/Attack";
import { ReportChart } from "../report-chart/ReportChart";
import "./Round.css"
import { RoundInput } from "./RoundInput.interface";

export function Round({ roundCount, minAc, maxAc }: RoundInput) {

  const [showResults, setshowResults] = useState(false);

  const [attacks, setAttacks] = useState<AttackConfig[]>([new AttackConfig()]);

  function createAttack() {
    setAttacks([...attacks, new AttackConfig()]);
  }

  function deleteAttack(id: string) {
    setAttacks(attacks.filter(a => a.id !== id));
  }

  function reset() {
    setAttacks([new AttackConfig()])
  }

  function toggleCharts() {
    setshowResults(!showResults);
  }

  function updateAttack(attack: AttackConfig) {
    setAttacks(attacks.map(a => a.id === attack.id ? attack : a));
  }

  return (
    <div className="round-col">
      <div className="round-row">
        <button onClick={createAttack}>Add Attack</button>
        <button onClick={reset}>Reset</button>
        <button onClick={toggleCharts}>{showResults ? 'Hide Results' : 'Show Results'}</button>
      </div>
      <div className="round-col">
        {attacks.map(attack =>
          <Attack key={attack.id} attackConfig={attack} onUpdate={updateAttack} onDelete={deleteAttack}></Attack>
        )}
      </div>  
      <ReportChart showResults={showResults} attacks={attacks} roundCount={roundCount} minAc={minAc} maxAc={maxAc} />
    </div>
  );
}