import { Either, GenericAppError, left, Result, right } from "@inh-lib/common"
import { UseCase } from "@inh-lib/ddd"

import { StudentProfileRepo, ProfileAGMParser } from "@student-service/student-profile-core";

import { RegisterRequestDTO } from "./register.dto";
import { RegisterFailures } from "./register.failures";

import {CanRegisterType} from "./validations.canRegister";
import {  IsDuplicateType} from "./validations.isDuplicate";

export type RegisterResponseDTO = Either<GenericAppError.UnexpectedError |RegisterFailures.CanRegisterFail | RegisterFailures.IsDuplicateFail | RegisterFailures.ParserFail | Result<unknown>, Result<unknown>>

export class RegisterHandler implements UseCase<RegisterRequestDTO,Promise<RegisterResponseDTO>>{
  private repo: StudentProfileRepo
  private mapper:ProfileAGMParser<RegisterRequestDTO>
  private canRegister:CanRegisterType
  private isDuplicate:IsDuplicateType

  constructor(repo:StudentProfileRepo,mapper:ProfileAGMParser<RegisterRequestDTO>,canRegister:CanRegisterType,isDuplicate:IsDuplicateType) {
    this.repo = repo;
    this.mapper = mapper
    this.canRegister=canRegister
    this.isDuplicate=isDuplicate
    
  }

  async execute(req: RegisterRequestDTO): Promise<RegisterResponseDTO>{

    //convert DTO to AGM
    const profileAGMOrError = this.mapper(req)

    if (profileAGMOrError.isFailure){
      return left(new RegisterFailures.ParserFail(profileAGMOrError.error as string))
    }

    const profileAGM = profileAGMOrError.getValue()
    

    // Validate 
    const toDay = new Date()
    const canRegisterOrError = this.canRegister(profileAGM.birthDate,toDay)
    if (canRegisterOrError.isLeft()){
      return canRegisterOrError
    }
 
    const duplicateOrError = await this.isDuplicate(profileAGM.fullName)
    if  (duplicateOrError.isLeft()){
      return duplicateOrError
    }

  
    // add ADM to Store
    const createdOrError = await this.repo.create(profileAGM);

    if(createdOrError.isFailure){
      return left(new GenericAppError.UnexpectedError(createdOrError.error))
    }


    return right(Result.ok<void>())
  }
}

