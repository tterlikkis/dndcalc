import "./Header.css";
import { ThemeToggle } from "../theme-toggle/ThemeToggle";
import { HeaderInput } from "./HeaderInput.interface";

export function Header({
  roundCount,
  minAc,
  maxAc,
  showResults,
  statBlock,
  handleStatBlockChange,
  handleRoundCountChange,
  handleMinAcChange,
  handleMaxAcChange,
  createAttack,
  reset,
  toggleCharts,
  exportConfig,
  importConfig
}: HeaderInput) {

  function statChange(e: React.ChangeEvent<HTMLInputElement>, stat: string) {
    const newStatBlock = { ...statBlock };
    (newStatBlock as any)[stat] = Number.parseInt(e.currentTarget.value);
    handleStatBlockChange(statBlock);
  }

  return (
    <>
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
      <div className="stat-row">
        <label>
          STR:
          <input 
            className="small-input"
            min="0"
            max="30"
            type="number"
            value={statBlock.str}
            onChange={e => statChange(e, 'str')}
          ></input>
        </label>
        <label>
          DEX:
          <input 
            className="small-input"
            min="0"
            max="30"
            type="number"
            value={statBlock.dex}
            onChange={e => statChange(e, 'dex')}
          ></input>
        </label>
        <label>
          CON:
          <input 
            className="small-input"
            min="0"
            max="30"
            type="number"
            value={statBlock.con}
            onChange={e => statChange(e, 'con')}
          ></input>
        </label>
        <label>
          INT:
          <input 
            className="small-input"
            min="0"
            max="30"
            type="number"
            value={statBlock.int}
            onChange={e => statChange(e, 'int')}
          ></input>
        </label>
        <label>
          WIS:
          <input 
            className="small-input"
            min="0"
            max="30"
            type="number"
            value={statBlock.wis}
            onChange={e => statChange(e, 'wis')}
          ></input>
        </label>
        <label>
          CHA:
          <input 
            className="small-input"
            min="0"
            max="30"
            type="number"
            value={statBlock.cha}
            onChange={e => statChange(e, 'cha')}
          ></input>
        </label>
      </div>
    </>
  )
}