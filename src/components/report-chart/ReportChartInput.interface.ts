import { AttackConfig } from "../../models/AttackConfig.interface";

export interface ReportChartInput {
  showResults: boolean;
  attacks: AttackConfig[]
  roundCount: number;
  minAc: number;
  maxAc: number;
}