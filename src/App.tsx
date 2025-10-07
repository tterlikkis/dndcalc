import "./App.css";
import "./styles.css"
import { useEffect, useState } from "react";
import { keepTheme } from "./utilities/themes";
import { AttackConfig } from "./models/AttackConfig.interface";
import { Attack } from "./components/attack/Attack";
import { ReportChart } from "./components/report-chart/ReportChart";
import { Header } from "./components/header/Header";
import { StatBlock } from "./models/StatBlock.interface";

const DEFAULT_STATS: StatBlock = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };

export default function App() {

  useEffect(() => { keepTheme(); });

  const [attacks, setAttacks] = useState<AttackConfig[]>([new AttackConfig()]);
  const [statBlock, setStatBlock] = useState<StatBlock>(DEFAULT_STATS);
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
    <div className="app-col">
      <Header
        roundCount={roundCount}
        minAc={minAc}
        maxAc={maxAc}
        showResults={showResults}
        statBlock={statBlock}
        handleStatBlockChange={setStatBlock}
        handleRoundCountChange={handleRoundCountChange}
        handleMinAcChange={handleMinAcChange}
        handleMaxAcChange={handleMaxAcChange}
        createAttack={createAttack}
        reset={reset}
        toggleCharts={toggleCharts}
        exportConfig={exportConfig}
        importConfig={importConfig}
      ></Header>
      <div className="inner-app-col">
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