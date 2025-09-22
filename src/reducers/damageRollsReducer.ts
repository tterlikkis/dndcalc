import { ActionType } from "../models/ActionType.enum";
import { RollConfig } from "../models/RollConfig.class";

export function damageRollsReducer(
  damageRolls: RollConfig[], 
  action: {
    type: ActionType,
    damageRoll: RollConfig
  }
) {
  switch (action.type) {
    case ActionType.create:
      return [ ...damageRolls, action.damageRoll ];
    case ActionType.reset:
      return [];
    case ActionType.update:
      return damageRolls.map(d => d.id === action.damageRoll.id ? action.damageRoll : d);
    case ActionType.delete:
      return damageRolls.filter(d => d.id !== action.damageRoll.id);
    default:
      throw Error('Unkown action: ' + action.type);
  }
}