import "./RollBox.css";
import { RollBoxInput } from "./RollboxInput.interface";
import { RollType } from "../../models/RollType.enum";
import { DamageType } from "../../models/DamageType.enum";

export function RollBox({ rollConfig, onUpdate, onDelete }: RollBoxInput) {

  console.log(rollConfig.damage)

  const diceSizes = new Map<string, number>([
    ['d4', 4], 
    ['d6', 6], 
    ['d8', 8], 
    ['d10', 10], 
    ['d12', 12], 
    ['d20', 20], 
    ['d100', 100]
  ]);

  const damageTypes = Object.entries(DamageType).filter(([_, value]) => typeof value !== 'number')

  function handleAdvantageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.checked;
    const newRollConfig = {
      ...rollConfig,
      advantage: value,
      count: value ? 1 : rollConfig.count
    };
    onUpdate(newRollConfig);
  }

  function handleBonusChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    const newRollConfig = {
      ...rollConfig,
      bonus: Number.parseInt(value)
    };
    onUpdate(newRollConfig);
  }

  function handleCountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    const newRollConfig = {
      ...rollConfig,
      count: Number.parseInt(value)
    };
    onUpdate(newRollConfig);
  }

  function handleDamageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value;
    const newRollConfig = {
      ...rollConfig,
      damage: value
    };
    onUpdate(newRollConfig);
  }

  function handleDiceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value;
    const newRollConfig = {
      ...rollConfig,
      dice: Number.parseInt(value)
    };
    onUpdate(newRollConfig);
  }

  function remove() {
    if (!!onDelete) onDelete(rollConfig);
  }

  return (
    <div className="rollbox">
      <div className="first-row">
        <input 
          placeholder="Count" 
          type="number"
          min="0"
          value={rollConfig.count} 
          onChange={handleCountChange}
          className="count-input"
          readOnly={rollConfig.advantage}
        />
        <select value={rollConfig.dice} onChange={handleDiceChange}>
          {Array.from(diceSizes.keys()).map(key => (
            <option key={key} value={diceSizes.get(key)}>{key}</option>
          ))}
        </select>
        +
        <input 
          placeholder="Bonus" 
          className="bonus-input" 
          onChange={handleBonusChange}
        />
      </div>
      { 
        rollConfig.type === RollType.attack
        ? (
          <div className="second-row">
            <label>
              Advantage
              <input 
                type="checkbox" 
                checked={rollConfig.advantage}
                onChange={handleAdvantageChange}
              ></input>
            </label>
          </div>
        )
        : (
          <div className="second-row">
            <select value={rollConfig.damage} onChange={handleDamageChange}>
              {damageTypes.map(([key, value]) =>
                <option key={key} value={key}>{value}</option>
              )}
            </select>
            <button onClick={remove}>Remove</button>
          </div>
        )
      }
    </div>
  )
}