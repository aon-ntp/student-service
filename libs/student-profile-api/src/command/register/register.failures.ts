/* eslint-disable @typescript-eslint/no-namespace */
import { Result, UseCaseError } from "@inh-lib/common";

export namespace RegisterFailures{
  export class ProfileAlreadyExist extends Result<UseCaseError>{
    constructor(){
      super(false,{message:'StudentProfile_ALREADY_EXIST'} as UseCaseError)
    }
  }

  export class YouDoesNotOldEnough extends Result<UseCaseError>{
    constructor(){
      super(false,{message:`You doesn't old enough`} as UseCaseError)
    }
  }
}