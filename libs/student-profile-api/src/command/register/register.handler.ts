import { Either, GenericAppError, left, Result, right } from "@inh-lib/common"
import { UseCase } from "@inh-lib/ddd"

import { IStudentProfileRepo,CanRegisterType, ProfileAGMParser } from "@student-service/student-profile-core";

import { RegisterRequestDTO } from "./register.dto";
import { RegisterFailures } from "./register.failures";

export type RegisterResponseDTO = Either<GenericAppError.UnexpectedError | RegisterFailures.ProfileAlreadyExist | Result<unknown>, Result<void>>

export class RegisterHandler implements UseCase<RegisterRequestDTO,Promise<RegisterResponseDTO>>{
  private repo: IStudentProfileRepo
  private mapper:ProfileAGMParser
  private canRegister:CanRegisterType

  constructor(repo: IStudentProfileRepo,mapper:ProfileAGMParser,canRegister:CanRegisterType) {
    this.repo = repo;
    this.mapper = mapper
    this.canRegister=canRegister
  }
  async execute(req: RegisterRequestDTO): Promise<RegisterResponseDTO>{

    //convert DTO to AGM
    const profileAGMOrError = this.mapper(req)

    if (profileAGMOrError.isFailure){
      return left(Result.fail<void>(profileAGMOrError.error)) as RegisterResponseDTO
    }

    const profileAGM = profileAGMOrError.getValue()
    

    // Validate 
    const okOrError = this.canRegister(profileAGM.birthDate)

    if (okOrError.isFailure){
      return left(Result.fail<void>(okOrError.error)) as RegisterResponseDTO
    }

    // add ADM to Store
    try{
      await this.repo.add(profileAGM)
    } catch(err) {
      return left(new GenericAppError.UnexpectedError(err))
    }

    return right(Result.ok<void>())
  }
}