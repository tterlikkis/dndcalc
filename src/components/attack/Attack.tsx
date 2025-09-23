import { AttackConfig } from "../../models/AttackConfig.interface";
import { RollConfig } from "../../models/RollConfig.class";
import { RollType } from "../../models/RollType.enum";
import { RollBox } from "../roll-box/RollBox";
import { AttackInput } from "./AttackInput.interface";
import "./Attack.css"


export function Attack({ attackConfig, onUpdate, onDelete }: AttackInput) {

  function createDamageRoll()  {
    const newAttackConfig: AttackConfig = {
      ...attackConfig,
      damageRolls: [...attackConfig.damageRolls, new RollConfig(RollType.damage)]
    }
    onUpdate(newAttackConfig);
  }

  function deleteAttack() {
    onDelete(attackConfig.id);
  }
  
  function deleteDamageRoll(roll: RollConfig) {
    const newRolls = attackConfig.damageRolls.filter(r => r.id !== roll.id);
    const newAttackConfig: AttackConfig = {
      ...attackConfig,
      damageRolls: newRolls
    }
    onUpdate(newAttackConfig);
  }

  function updateAttackRoll(roll: RollConfig) {
    const newAttackConfig: AttackConfig = {
      ...attackConfig,
      attackRoll: roll
    }
    onUpdate(newAttackConfig);
  }

  function updateDamageRoll(roll: RollConfig) {
    const newRolls = attackConfig.damageRolls.map(r => r.id === roll.id ? roll : r);
    const newAttackConfig: AttackConfig = {
      ...attackConfig,
      damageRolls: newRolls
    }
    onUpdate(newAttackConfig);
  }

  return (
    <div className="attack-row">
      <RollBox
        key={attackConfig.attackRoll.id}
        rollConfig={attackConfig.attackRoll}
        onUpdate={updateAttackRoll}
      ></RollBox>
      {attackConfig.damageRolls.map(roll => 
        <RollBox 
          key={roll.id}
          rollConfig={roll} 
          onUpdate={updateDamageRoll}
          onDelete={deleteDamageRoll}
        ></RollBox>  
      )}
      <div className="attack-col">
        <button onClick={createDamageRoll}>Add Damage Roll</button>
        <button onClick={deleteAttack}>Remove Attack</button>
      </div>
    </div>
  )

}