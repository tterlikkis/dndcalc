import "./App.css";
import { useEffect, useState } from "react";
import { Round } from "./components/round/Round";
import { keepTheme } from "./utilities/themes";
import { ThemeToggle } from "./components/theme-toggle/ThemeToggle";

export default function App() {

  const [roundCount, setRoundCount] = useState<number>(1000);
  const [minAc, setMinAc] = useState(10);
  const [maxAc, setMaxAc] = useState(20);

  useEffect(() => { keepTheme(); });

  function handleMaxAcChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMaxAc(Number.parseInt(e.currentTarget.value));
  }

  function handleMinAcChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMinAc(Number.parseInt(e.currentTarget.value));
  }
  
  function handleRoundCountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRoundCount(Number.parseInt(e.currentTarget.value));
  }

  return (
    <>
      <div className="app-settings-row">
        <div className="app-row">
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
        </div>
        <ThemeToggle></ThemeToggle>
      </div>
      <div className="app-row">
        <div className="app-round">
          <Round roundCount={roundCount} minAc={minAc} maxAc={maxAc}></Round>
        </div>
        <div className="app-round">
          <Round roundCount={roundCount} minAc={minAc} maxAc={maxAc}></Round>
        </div>
      </div>
    </>
  );
}