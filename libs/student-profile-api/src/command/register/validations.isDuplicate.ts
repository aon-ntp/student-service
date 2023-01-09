import { Either, GenericAppError, left, Result, right } from '@inh-lib/common';

import { StudentProfileRepo } from '@student-service/student-profile-core';

import { RegisterFailures } from './register.failures';

export type IsDuplicateType = typeof isDuplicate;
export type IsDuplicateResult = Either<GenericAppError.UnexpectedError | RegisterFailures.ProfileAlreadyExist | RegisterFailures.IsDuplicateFail, Result<void>>


export function makeIsDuplicate(repo: StudentProfileRepo): IsDuplicateType {
  return isDuplicate.bind({repo});
}

async function isDuplicate(fullName: string):Promise<IsDuplicateResult> {
//   const r = this.repo as StudentProfileRepo;
  const existsOrError = await this.repo.existsByFullName(fullName);
  
  if  (existsOrError.isFailure){
    return left(new RegisterFailures.IsDuplicateFail(existsOrError.error as string))
  }

  if (existsOrError.getValue()){
    return left(new RegisterFailures.ProfileAlreadyExist())
  }

  return right(Result.ok<void>())
}
