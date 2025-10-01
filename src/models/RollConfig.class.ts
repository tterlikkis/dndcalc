import { DamageType } from "./DamageType.enum";
import { RollModifier } from "./RollModifier.enum";
import { RollResult } from "./RollResult.interface";
import { RollType } from "./RollType.enum";

export class RollConfig {

  id: string;
  type: RollType;
  count?: number;
  dice?: number;
  bonus?: number;
  damage?: DamageType;
  modifier: RollModifier;

  constructor(type?: RollType) {
    this.id = crypto.randomUUID();
    this.type = type || RollType.Attack;
    this.modifier = RollModifier.Normal;
    if (this.type == RollType.Attack) {
      this.count = 1;
      this.dice = 20;
    }
    else if (this.type == RollType.Damage) {
      this.count = 1;
      this.dice = 8;
      this.damage = DamageType.Slashing;
    }
  }

  static roll(r: RollConfig): RollResult {
    let total = 0;
    const count = r.count || 0;
    const dice = r.dice || 0;
    const bonus = r.bonus || 0;
    if (r.modifier === RollModifier.Advantage) {
      total += Math.max(
        Math.ceil(Math.random() * dice),
        Math.ceil(Math.random() * dice)
      );
    }
    else if (r.modifier === RollModifier.Disadvantage) {
      total += Math.min(
        Math.ceil(Math.random() * dice),
        Math.ceil(Math.random() * dice)
      );
    }
    else {
      for (let i = 0; i < count; i++) {
        total += Math.ceil(Math.random() * dice)
      }
    }
    return {
      base: total,
      bonus: bonus,
      total: total + bonus
    };
  }

}