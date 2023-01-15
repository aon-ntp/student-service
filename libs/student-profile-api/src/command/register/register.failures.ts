/* eslint-disable @typescript-eslint/no-namespace */
import { Result, UseCaseError } from "@inh-lib/common";

export namespace RegisterFailures{
  export class ProfileAlreadyExist extends Result<UseCaseError>{
    constructor(){
      super(false,{message:'StudentProfile_ALREADY_EXIST'} as UseCaseError)
    }
  }

  export class CanRegisterFail extends Result<UseCaseError>{
    constructor(error?: string){
      super(false,{message:`${error}`} as UseCaseError)
    }
  }
  export class AgeUnderQualified extends Result<UseCaseError>{
    constructor(error?: string){
      super(false,{message:`${error}`} as UseCaseError)
    }
  }
  export class IsDuplicateFail extends Result<UseCaseError>{
    constructor(error?: string){
      super(false,{message:`${error}`} as UseCaseError)
    }
  }

  export class ParserFail extends Result<UseCaseError>{
    constructor(error?:string){
      super(false,{message:`${error}`} as UseCaseError)
    }
  }
}
