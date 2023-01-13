import { Either, GenericAppError, Result } from "@inh-lib/common";
import { UseCase } from "@inh-lib/ddd";
import { CourseLookupRepo } from "@student-service/course-lookup-core";
import { CreateCourseLookupInputDTO } from "./course-lookup.dto";
import { CreateFailures } from "./course-lookup.failures";

export type RegisterResponseDTO = Either<GenericAppError.UnexpectedError |CreateFailures.CreateFail| Result<any>,Result<any>>

// export class RegisterHandler implements UseCase<CreateCourseLookupInputDTO,Promise<CreateCourseLookupInputDTO>>{
//   private repo: CourseLookupRepo
// }