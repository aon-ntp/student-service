import { Result } from '@inh-lib/common';
import { calculateAgeInYears } from './shares/calculateAgeInYears';


export function canRegister(birthDate: Date): Result<boolean> {
  
 //find Age from birthaDate
  const toDay = new Date()

  try {
    const age = calculateAgeInYears(birthDate, toDay);
    // if Age < 19 then cannot register
    const res = age >= 18 ? true : false;

    return new Result(true, '', res);
  } catch (error) {
    return new Result(false, error.message);
  } 

 
}
