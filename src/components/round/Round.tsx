import { useState } from "react";
import { AttackConfig } from "../../models/AttackConfig.interface";
import { Attack } from "../attack/Attack";
import { ReportChart } from "../report-chart/ReportChart";
import "./Round.css"
import { ThemeToggle } from "../theme-toggle/ThemeToggle";

export function Round() {

  const [attacks, setAttacks] = useState<AttackConfig[]>([new AttackConfig()]);
  const [roundCount, setRoundCount] = useState<number>(1000);
  const [showResults, setshowResults] = useState(true);
  const [minAc, setMinAc] = useState(10);
  const [maxAc, setMaxAc] = useState(20);

  function createAttack() {
    setAttacks([...attacks, new AttackConfig()]);
  }

  function deleteAttack(id: string) {
    setAttacks(attacks.filter(a => a.id !== id));
  }

  function exportConfig() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(attacks, null, 2));
    const anchorElement = document.getElementById('downloadAnchorElement');
    if (!anchorElement) return;
    anchorElement.setAttribute('href', dataStr);
    anchorElement.setAttribute('download', 'attacks.json');
    anchorElement.click();
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

  function importConfig() {
    const anchorElement = document.getElementById('uploadAnchorElement');
    anchorElement?.click();
  }

  async function onFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const text = await file.text();
    try {
      setAttacks(JSON.parse(text));
    }
    catch (e) {
      alert('Invalid file');
    }    
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
        <div className="input-row">
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
              className="small-input"
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
              className="small-input"
            ></input>
          </label>
        </div>
        <div className="button-row">
          <button onClick={createAttack}>Add Attack</button>
          <button onClick={reset}>Reset</button>
          <button onClick={toggleCharts}>{showResults ? 'Hide Results' : 'Show Results'}</button>
          <button onClick={exportConfig} className="button-gap">Export</button>
          <button onClick={importConfig}>Import</button>
        </div>
        <ThemeToggle></ThemeToggle>
      </div>
      <div className="inner-round-col">
        {attacks.map(attack =>
          <Attack key={attack.id} attackConfig={attack} onUpdate={updateAttack} onDelete={deleteAttack}></Attack>
        )}
      </div>  
      <ReportChart showResults={showResults} attacks={attacks} roundCount={roundCount} minAc={minAc} maxAc={maxAc} />
      <a id="downloadAnchorElement" hidden></a>
      <input type="file" id="uploadAnchorElement" hidden accept="application/JSON" onChange={onFileUpload}></input>
    </div>
  );
}