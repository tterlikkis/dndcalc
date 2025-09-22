import { AttackConfig } from "../../models/AttackConfig.interface";

export interface AttackInput {
  attackConfig: AttackConfig;
  onUpdate: Function;
  onDelete: Function;
}