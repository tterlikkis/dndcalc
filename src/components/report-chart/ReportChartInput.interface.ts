import { AttackConfig } from "../../models/AttackConfig.interface";

export interface ReportChartInput {
  showCharts: boolean;
  attacks: AttackConfig[]
  roundCount: number;
  minAc: number;
  maxAc: number;
}