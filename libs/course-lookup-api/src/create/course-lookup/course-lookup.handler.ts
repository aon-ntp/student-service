import { Either, GenericAppError, left, Result, right } from "@inh-lib/common";
import { UseCase } from "@inh-lib/ddd";
import { CourseLookupAGMParser, CourseLookupRepo } from "@student-service/course-lookup-core";
import { CreateCourseLookupInputDTO } from "./course-lookup.dto";
import { CreateFailures } from "./course-lookup.failures";

export type CourseLookupResponseDTO = Either<GenericAppError.UnexpectedError |CreateFailures.CreateFail,Result<CreateCourseLookupInputDTO>>

export class CourseLookupHandler implements UseCase<CreateCourseLookupInputDTO,Promise<CourseLookupResponseDTO>>{
  private repo: CourseLookupRepo
  private mapper:CourseLookupAGMParser<CreateCourseLookupInputDTO>

  constructor(repo:CourseLookupRepo,mapper:CourseLookupAGMParser<CreateCourseLookupInputDTO>) {
    this.repo = repo;
    this.mapper = mapper
  }

  async execute(req: CreateCourseLookupInputDTO): Promise<CourseLookupResponseDTO>{
    
    const courseLookupAGMOrError = this.mapper(req)

    if(courseLookupAGMOrError.isFailure){
      return left(new CreateFailures.ParserFail(courseLookupAGMOrError.error as string))
    }
    
    const courseLookupAGM = courseLookupAGMOrError.getValue()

    const createOrError = await this.repo.create(courseLookupAGM)

    if(createOrError.isFailure){
      return left(new GenericAppError.UnexpectedError(createOrError.error))
    }
    console.log("ccc",createOrError.getValue())
    const test="200"
    return right(Result.ok<any>(createOrError.getValue()))
  }
}