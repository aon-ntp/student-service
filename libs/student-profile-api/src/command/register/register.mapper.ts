import { Result } from "@inh-lib/common";
import { ProfileAGMParser,ProfileAGM } from "@student-service/student-profile-core";
import { RegisterRequestDTO } from "./register.dto";

export const parse:ProfileAGMParser = (rawData:RegisterRequestDTO):Result<ProfileAGM> => {
    rawData
    return 
}