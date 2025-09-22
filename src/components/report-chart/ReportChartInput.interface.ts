import { AttackConfig } from "../../models/AttackConfig.interface";

export interface ReportChartInput {
  attacks: AttackConfig[]
  roundCount: number;
  minAc: number;
  maxAc: number;
}