import { RollConfig } from "../../models/RollConfig.class";

export interface RollBoxInput {
  rollConfig: RollConfig;
  onUpdate: Function;
  onDelete?: Function;
}