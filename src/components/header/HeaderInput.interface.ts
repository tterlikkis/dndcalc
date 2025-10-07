import { ChangeEventHandler, MouseEventHandler } from "react";
import { StatBlock } from "../../models/StatBlock.type";

export interface HeaderInput {
  roundCount: number;
  minAc: number;
  maxAc: number;
  showResults: boolean;
  handleRoundCountChange: ChangeEventHandler<HTMLInputElement>;
  handleMinAcChange: ChangeEventHandler<HTMLInputElement>;
  handleMaxAcChange: ChangeEventHandler<HTMLInputElement>;
  createAttack: MouseEventHandler<HTMLButtonElement>;
  reset: MouseEventHandler<HTMLButtonElement>;
  toggleCharts: MouseEventHandler<HTMLButtonElement>;
  exportConfig: MouseEventHandler<HTMLButtonElement>;
  importConfig: MouseEventHandler<HTMLButtonElement>;
}