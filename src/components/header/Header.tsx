import "./Header.css";
import { ThemeToggle } from "../theme-toggle/ThemeToggle";
import { HeaderInput } from "./HeaderInput.interface";

export function Header({
  roundCount,
  minAc,
  maxAc,
  showResults,
  handleRoundCountChange,
  handleMinAcChange,
  handleMaxAcChange,
  createAttack,
  reset,
  toggleCharts,
  exportConfig,
  importConfig
}: HeaderInput) {
  return (
    <div className="header-row">
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
            className="small-input no-spin"
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
  )
}