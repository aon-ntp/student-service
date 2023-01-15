import {  GenericAppError, left, right } from "@inh-lib/common"
import { UseCase } from "@inh-lib/ddd"

import { StudentProfileRepo, ProfileAGMParser, ProfileAGM, getAge } from "@student-service/student-profile-core";


import { RegisterRequestDTO, RegisterResponseDTO, RegisterSuccessDTO } from "./register.dto";
import { RegisterFailures } from "./register.failures";
import { parseAGMToSuccessDTO, parseReqToDTO } from "./register.mapper";

import {CanRegisterType, makeCanRegister} from "./validations.canRegister";
import {  IsDuplicateType, makeIsDuplicate} from "./validations.isDuplicate";


export class RegisterHandler implements UseCase<RegisterRequestDTO,Promise<RegisterResponseDTO>>{
  private repo: StudentProfileRepo
  private mapper:ProfileAGMParser<RegisterRequestDTO>
  private parseToSuccessDTO: typeof parseAGMToSuccessDTO
  private canRegister:CanRegisterType
  private isDuplicate:IsDuplicateType

  constructor(repo:StudentProfileRepo,mapper:ProfileAGMParser<RegisterRequestDTO>,mapperSuccess: typeof parseAGMToSuccessDTO,canRegister:CanRegisterType,isDuplicate:IsDuplicateType) {
    this.repo = repo;
    this.mapper = mapper
    this.parseToSuccessDTO = mapperSuccess
    this.canRegister=canRegister
    this.isDuplicate=isDuplicate
    
  }

  async execute(req: RegisterRequestDTO): Promise<RegisterResponseDTO>{

    //convert DTO to AGM
    const profileAGMOrError = this.mapper(req)

    if (profileAGMOrError.isFailure){
      return left(new RegisterFailures.ParserFail(profileAGMOrError.error as string))
    }

    const profileAGM = profileAGMOrError.getValue() as ProfileAGM
    

    // Validate 
    const toDay = new Date()
    const canRegisterOrError = this.canRegister(profileAGM.birthDate,toDay)
    if (canRegisterOrError.isLeft()){
      return left(canRegisterOrError.value)
    }
 
    const duplicateOrError = await this.isDuplicate(profileAGM.fullName)
    if  (duplicateOrError.isLeft()){
      return left(duplicateOrError.value)
    }

  
    // add ADM to Store
    const createdOrError = await this.repo.create(profileAGM);

    if(createdOrError.isFailure){
      return left(new GenericAppError.UnexpectedError(createdOrError.error))
    }

    const successDTO = this.parseToSuccessDTO(createdOrError.getValue() as ProfileAGM)

    if (successDTO.isFailure){
      return left(new RegisterFailures.ParserFail(successDTO.error as string))
    }

    return right(successDTO.getValue() as RegisterSuccessDTO)
  }

}


export function makeRegisterHandler(repo:StudentProfileRepo):RegisterHandler{
  const parserToModel:ProfileAGMParser<RegisterRequestDTO> =  parseReqToDTO
  const  parseToSuccessDTO = parseAGMToSuccessDTO
  const canRegister = makeCanRegister(getAge)
  const isDuplicate = makeIsDuplicate(repo)

  const handler = new RegisterHandler(repo,parserToModel,parseToSuccessDTO,canRegister,isDuplicate)
  return handler
}

