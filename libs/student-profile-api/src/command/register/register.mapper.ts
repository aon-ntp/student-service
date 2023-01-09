import { Result } from '@inh-lib/common';
import { UniqueEntityID } from '@inh-lib/ddd';
import {
  ProfileAGMParser,
  ProfileAGM,
  ProfileAGMProps,
  PhoneNoVO,
} from '@student-service/student-profile-core';
import { RegisterRequestDTO } from './register.dto';

export const parseReqToDTO: ProfileAGMParser<RegisterRequestDTO> = (
  rawData: RegisterRequestDTO
): Result<ProfileAGM> => {
  //Require Field
  const mobileOrError = PhoneNoVO.createVO({ phoneNo: rawData.mobilePhone });

  //Optional Field
  const homeOrError = rawData.homePhone
    ? PhoneNoVO.createVO({ phoneNo: rawData.homePhone })
    : Result.ok(undefined);

  const combineResult = Result.combine([mobileOrError, homeOrError]);

  if (combineResult.isFailure) {
    return Result.fail(combineResult.error);
  }

  try {
    const props: ProfileAGMProps = {
      code: rawData.code,
      fullName: rawData.fullName,
      address: rawData.address,
      mobileNo: mobileOrError.getValue(),
      homePhone: homeOrError.getValue(),
      birthDate: rawData.birthDate,
    };

    const uid = new UniqueEntityID(rawData.id);
    const agmOrError = ProfileAGM.create(props, uid);

    if (agmOrError.isFailure) {
      return Result.fail(agmOrError.error);
    }

    return Result.ok(agmOrError.getValue());
  } catch (error) {
    return Result.fail(error);
  }
};
