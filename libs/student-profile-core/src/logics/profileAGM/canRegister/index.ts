import { calculateAgeInYears } from "../../shares/calculateAgeInYears";
import { makeCanRegister } from "./executor";


export const canRegister  = makeCanRegister(calculateAgeInYears)




