import { EnumType } from "typescript";
import { Gas } from "../../lib/gas";
import { Road } from "../../lib/road";
import Joi = require("@hapi/joi");

export interface Track {
  tripState: Joi.string(),
  roadType: Joi.string(),
  gasType: Joi.string(),
  amountFilled: Joi.number()
}