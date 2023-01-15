import { Result } from '@inh-lib/common';
import {
  ProfileAGMParser,
  ProfileAGM,
  ProfileAGMProps,
  PhoneNoVO,
} from '@student-service/student-profile-core';

import { RegisterRequestDTO, RegisterSuccessDTO } from './register.dto';

export const parseReqToDTO: ProfileAGMParser<RegisterRequestDTO> = (
  rawData: RegisterRequestDTO
): Result<ProfileAGM> => {
  //Require Field
  const mobileOrError = PhoneNoVO.createVO({ phoneNo: rawData.mobilePhone });

  //Optional Field
  const homeOrError = rawData.homePhone
    ? PhoneNoVO.createVO({ phoneNo: rawData.homePhone })
    : Result.ok(rawData.homePhone === null?null:undefined); // it should be null or undefiend
  /*if homePhone is null then ORM will update set homephone = null 
    and homePhone is undefiend Orm don't update homePhone in DB
    */

  
  const combineResult = Result.combine([mobileOrError, homeOrError]);

  if (combineResult.isFailure) {
    return Result.fail(combineResult.error);
  }

  try {
    const props: ProfileAGMProps = {
      code:0,
      fullName: rawData.fullName,
      address: rawData.address,
      mobileNo: mobileOrError.getValue() as PhoneNoVO,
      homePhone: homeOrError.getValue(),
      birthDate: rawData.birthDate,
    };

    const agmOrError = ProfileAGM.create(props);

    if (agmOrError.isFailure) {
      return Result.fail(agmOrError.error);
    }

    return Result.ok(agmOrError.getValue());
  } catch (error) {
    return Result.fail(error);
  }
};

export function parseAGMToSuccessDTO(agm:ProfileAGM):Result<RegisterSuccessDTO>{

  try {
    const res:RegisterSuccessDTO={
      code: agm.code,
      id: agm.id.toValue() as string
    }
    return Result.ok(res)
  } catch (error) {
    return Result.fail(error)
  }
}