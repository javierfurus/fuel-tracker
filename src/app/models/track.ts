import { EnumType } from "typescript";
import { Gas } from "../../lib/gas";
import { Road } from "../../lib/road";

export interface Track {
    id: number;
    date: string;
    tripState: number;
    roadType: Road;
    gasType: Gas;
    amountFilled: number;
  }