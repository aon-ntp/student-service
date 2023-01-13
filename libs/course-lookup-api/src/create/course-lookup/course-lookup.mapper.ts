import { Result } from "@inh-lib/common";
import { CourseLookupAGM, CourseLookupAGMParser, CourseLookupAGMProps } from "@student-service/course-lookup-core";
import { CreateCourseLookupInputDTO } from "./course-lookup.dto";

export const parseReqToDTO: CourseLookupAGMParser<CreateCourseLookupInputDTO> = (
  rawData:CreateCourseLookupInputDTO
):Result<CourseLookupAGM> =>{
  try {
    const props: CourseLookupAGMProps = {
      name: rawData.name,
      email: rawData.email,
      role: rawData.role
    }
    const agmOrError = CourseLookupAGM.create(props){

    }
  }catch(error){
    return Result.fail(error)
  }
}