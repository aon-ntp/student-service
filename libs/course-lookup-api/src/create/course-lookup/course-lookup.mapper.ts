import { Result } from "@inh-lib/common";
import { CourseLookupAGM, CourseLookupAGMParser, CourseLookupAGMProps } from "@student-service/course-lookup-core";
import { CreateCourseLookupInputDTO } from "./course-lookup.dto";

export const parseReqToDTO: CourseLookupAGMParser<CreateCourseLookupInputDTO> = (
  rawData:CreateCourseLookupInputDTO
):Result<CourseLookupAGM> =>{
  try {
    const props: CourseLookupAGMProps = {
      originalCourseId: rawData.originalCourseId,
      title: rawData.title,
      wishLists: rawData.wishLists
    }
    const agmOrError = CourseLookupAGM.create(props)
    if (agmOrError.isFailure) {
      return Result.fail(agmOrError.error);
    }
    return Result.ok(agmOrError.getValue());
  }catch(error){
    return Result.fail(error)
  }
}