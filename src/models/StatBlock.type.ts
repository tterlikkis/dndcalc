import { Stat } from "./Stat.type";

export type StatBlock = {
  [key in Stat]: number;
};