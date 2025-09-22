import { RollConfig } from "./RollConfig.class";
import { RollType } from "./RollType.enum";

export class AttackConfig {
  id: string;
  attackRoll: RollConfig;
  damageRolls: RollConfig[];

  constructor(attackRoll?: RollConfig, damageRolls?: RollConfig[]) {
    this.id = crypto.randomUUID();
    this.attackRoll = attackRoll || new RollConfig(RollType.attack);
    this.damageRolls = damageRolls || [new RollConfig(RollType.damage)];
  }
}