import { Result } from '@inh-lib/common';
import { CalAgeType } from '../../../../utils/calculateAgeInYears'

// internal module for testing
export interface CanRegisterParams{
    calAgeFN : CalAgeType,
    birthDate: Date,
    toDay:Date    
}

export function executor(params:CanRegisterParams): Result<boolean> {
    const {birthDate,toDay,calAgeFN} = params
   //find Age from birthaDate
   
    try {
      const age = calAgeFN(birthDate, toDay);
      // if Age < 19 then cannot register
      const res = age >= 18 ? true : false;
  
      return new Result(true, '', res);
    } catch (error) {
      return new Result(false, error.message);
    } 
  }

  export type CanRegisterType =  typeof canRegister

  export function makeCanRegister(calAgeFN:CalAgeType):CanRegisterType{

    const res = canRegister.bind({calAge:calAgeFN})

    // const res:CanRegisterType= executor
    return res
}

function canRegister(birthDate:Date,toDay:Date){
    const params:CanRegisterParams = {calAgeFN:this.calAge,birthDate:birthDate,toDay:toDay}
    return executor(params)
}