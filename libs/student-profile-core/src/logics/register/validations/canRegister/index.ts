import { calculateAgeInYears } from "../../../../utils/calculateAgeInYears";
import { makeCanRegister } from "./logic";


export const canRegister  = makeCanRegister(calculateAgeInYears)

export {CanRegisterType} from "./logic"



