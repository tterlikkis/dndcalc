import { ActionType } from "./ActionType.enum";

export interface Action<T> {
  type: ActionType;
  data?: T;
}