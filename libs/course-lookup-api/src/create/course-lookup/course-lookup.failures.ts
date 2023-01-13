/* eslint-disable @typescript-eslint/no-namespace */
import { Result, UseCaseError } from "@inh-lib/common";

export namespace CreateFailures{
  export class CreateFail extends Result<UseCaseError>{
    constructor(){
      super(false,{message:'CREATE_COURSE_LOOKUP_FAIL'} as UseCaseError)
    }
  }
}