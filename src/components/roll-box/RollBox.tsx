import "./RollBox.css";
import { RollBoxInput } from "./RollboxInput.interface";
import { RollType } from "../../models/RollType.enum";
import { DamageType } from "../../models/DamageType.enum";
import { BsFillTrash3Fill } from "react-icons/bs";
import { RollModifier } from "../../models/RollModifier.enum";
import { RollConfig } from "../../models/RollConfig.class";

const diceSizes = new Map<string, number>([
  ['d4', 4], 
  ['d6', 6], 
  ['d8', 8], 
  ['d10', 10], 
  ['d12', 12], 
  ['d20', 20], 
  ['d100', 100]
]);

const damageTypes = Object.entries(DamageType).filter(([_, value]) => typeof value !== 'number');
const rollModifiers = Object.entries(RollModifier).filter(([_, value]) => typeof value !== 'number');

export function RollBox({ rollConfig, onUpdate, onDelete }: RollBoxInput) {

  function handleAdvantageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = Number.parseInt(e.currentTarget.value);
    const newRollConfig: RollConfig = {
      ...rollConfig,
      modifier: value,
      count: value === RollModifier.Normal ? rollConfig.count : 1
    };
    onUpdate(newRollConfig);
  }

  function handleBonusChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    const newRollConfig: RollConfig = {
      ...rollConfig,
      bonus: Number.parseInt(value)
    };
    onUpdate(newRollConfig);
  }

  function handleCountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    const newRollConfig: RollConfig = {
      ...rollConfig,
      count: Number.parseInt(value)
    };
    onUpdate(newRollConfig);
  }

  function handleDamageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value;
    const newRollConfig: RollConfig = {
      ...rollConfig,
      damage: Number.parseInt(value)
    };
    onUpdate(newRollConfig);
  }

  function handleDiceChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value;
    const newRollConfig: RollConfig = {
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
          readOnly={rollConfig.modifier !== RollModifier.Normal}
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
        rollConfig.type === RollType.Attack
        ? (
          <div className="second-row">
            <select value={rollConfig.modifier} onChange={handleAdvantageChange}>
              {rollModifiers.map(([key, value]) => 
                <option key={key} value={key}>{value}</option>
              )}
            </select>
          </div>
        )
        : (
          <div className="second-row">
            <select value={rollConfig.damage} onChange={handleDamageChange}>
              {damageTypes.map(([key, value]) =>
                <option key={key} value={key}>{value}</option>
              )}
            </select>
            <button 
              onClick={remove} 
              className="icon-button"
              aria-label="Remove Damage Roll"
              title="Remove Damage Roll"
            >
              <BsFillTrash3Fill />
            </button>
          </div>
        )
      }
    </div>
  )
}