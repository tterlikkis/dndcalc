import { useReducer, useState } from "react";
import { Stat } from "../../models/Stat.type";
import { StatBlock } from "../../models/StatBlock.type";

const DEFAULT_STATS: StatBlock = { STR: 8, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8 };

function statBlockReducer(
  statBlock: StatBlock,
  action: {
    type: Stat,
    value: number
  }
) {
  const newBlock: StatBlock = { ...statBlock };
  newBlock[action.type] = action.value;
  return newBlock;
}

const costMap = new Map<number, number>([
  [8, 0],
  [9, 1],
  [10, 2],
  [11, 3],
  [12, 4],
  [13, 5],
  [14, 7],
  [15, 9]
])

export function StatTracker() {

  const [statBlock, dispatch] = useReducer(statBlockReducer, DEFAULT_STATS);
  // const [statBlock, setStatBlock] = useState(DEFAULT_STATS);
  const [usedPoints, setUsedPoints] = useState(0);

  function handleStatChange(e: React.ChangeEvent<HTMLInputElement>, stat: Stat) {
    // const oldValue = statBlock[stat];
    const newValue = Number.parseInt(e.currentTarget.value);

    // const newBlock = { ...statBlock };
    // newBlock[stat] = newValue;
    
    dispatch({ type: stat, value: newValue });
    
    // Handle points
    // const mod = newValue < oldValue ? -1 : 1;
    // const pointCost = (newValue >= 13 ? 2 : 1) * mod;
    // setUsedPoints(usedPoints + pointCost);
    // setUsedPoints(getUsedPoints(newBlock));
  }

  function getUsedPoints(statBlock: StatBlock) {
    let total = 0;
    for (const key in statBlock) {
      total += costMap.get(statBlock[key as Stat]) || 0;
    }
    return total;
  }

  return (
    <div>
      <div>Used Points: {usedPoints}/27</div>
      <label>
        STR:
        <input
          min="8"
          max="15"
          type="number"
          value={statBlock.STR}
          onChange={e => handleStatChange(e, "STR")}
          className="small-input"
        ></input>
      </label>
      <label>
        DEX:
        <input
          min="8"
          max="15"
          type="number"
          value={statBlock.STR}
          onChange={e => handleStatChange(e, "DEX")}
          className="small-input"
        ></input>
      </label>
      <label>
        CON:
        <input
          min="8"
          max="15"
          type="number"
          value={statBlock.STR}
          onChange={e => handleStatChange(e, "CON")}
          className="small-input"
        ></input>
      </label>
      <label>
        INT:
        <input
          min="8"
          max="15"
          type="number"
          value={statBlock.STR}
          onChange={e => handleStatChange(e, "INT")}
          className="small-input"
        ></input>
      </label>
      <label>
        WIS:
        <input
          min="8"
          max="15"
          type="number"
          value={statBlock.STR}
          onChange={e => handleStatChange(e, "WIS")}
          className="small-input"
        ></input>
      </label>
      <label>
        CHA:
        <input
          min="8"
          max="15"
          type="number"
          value={statBlock.STR}
          onChange={e => handleStatChange(e, "CHA")}
          className="small-input"
        ></input>
      </label>
    </div>
  );

}