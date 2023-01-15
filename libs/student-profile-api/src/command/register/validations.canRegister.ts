import { Either, left, Result, right } from '@inh-lib/common';
import { GetAgeType } from '@student-service/student-profile-core';

import { RegisterFailures } from './register.failures';

export type CanRegisterType = typeof canRegister;
export type CanRegisterResult = Either<
  RegisterFailures.CanRegisterFail | RegisterFailures.AgeUnderQualified,
  Result<boolean>
>;

export function makeCanRegister(calAgeFN: GetAgeType): CanRegisterType {
  const res = canRegister.bind({ calAge: calAgeFN });

  // const res:CanRegisterType= executor
  return res;
}

// internal module for testing
interface CanRegisterParams {
  calAgeFN: GetAgeType;
  birthDate: Date;
  toDay: Date;
}

function executor(params: CanRegisterParams): CanRegisterResult {
  const { birthDate, toDay, calAgeFN } = params;
  //find Age from birthaDate
    const ageOrError = calAgeFN(birthDate, toDay);
    if (ageOrError.isFailure){
      return  left(new RegisterFailures.CanRegisterFail(ageOrError.error?.toString()))
    }
    // if Age < 19 then cannot register
    const age = ageOrError.getValue() as number
    if (age < 18) {
      return left(new RegisterFailures.AgeUnderQualified(`Age(age:${age}) must be greather than 17)`));
    }

 return right(Result.ok(true)) 
}

function canRegister(birthDate: Date, toDay: Date) {
  const params: CanRegisterParams = {
    calAgeFN: this.calAge,
    birthDate: birthDate,
    toDay: toDay,
  };
  return executor(params);
}
