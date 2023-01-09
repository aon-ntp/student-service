import { Result } from '@inh-lib/common';
import { UniqueEntityID } from '@inh-lib/ddd';
import { Prisma, StudentProfile } from '@prisma/client';
import {
  StudentProfileRepo,
  ProfileAGM,
  ProfileAGMProps,
  PhoneNoVO,
  ProfileAGMParser,
} from '@student-service/student-profile-core';

import prisma from '../dbclient';

export class StudentProfileRepoEmpl implements StudentProfileRepo {
  async getById(id: string): Promise<Result<ProfileAGM>> {
    throw new Error('Method not implemented.');
  }
  
  async create(profileAGM: ProfileAGM): Promise<Result<ProfileAGM>> {
    // convert DomainModel to PrismaInputModel
    const Item: Prisma.StudentProfileCreateInput = {
      fullName: profileAGM.fullName,
      mobilePhone: profileAGM.mobilePhone.props.phoneNo,
      homePhone: profileAGM.homePhone.props.phoneNo,
      birthDate: profileAGM.birthDate,
    };

    let profile:StudentProfile
    try {
       profile = await prisma.studentProfile.create({
        data: Item,
      });
    } catch (error) {
      return Result.fail(error)
    }
    
    const agmResult = parseSchemaToModel(profile)
      // convert PrismaModel to DomainModel
      return agmResult  
  }

  async update(profileAGM: ProfileAGM): Promise<Result<ProfileAGM>> {
    throw new Error('Method not implemented.');
  }
  async existsByFullName(fullName: string): Promise<Result<boolean>> {
    throw new Error('Method not implemented.');
  }
  async existsByKey(id: UniqueEntityID): Promise<Result<boolean>> {
    throw new Error('Method not implemented.');
  }
}

const parseSchemaToModel: ProfileAGMParser<StudentProfile> = (
  rawData: StudentProfile
): Result<ProfileAGM> => {
  const mobileOrError = PhoneNoVO.createVO({ phoneNo: rawData.mobilePhone });
  const homeOrError = rawData.homePhone
    ? PhoneNoVO.createVO({ phoneNo: rawData.homePhone })
    : Result.ok(undefined);

  const combineResult = Result.combine([homeOrError, mobileOrError]);
  if (combineResult.isFailure) {
    return Result.fail(combineResult.error);
  }

  // Convert PrismaSchema to Model
  const props: ProfileAGMProps = {
    code: rawData.code,
    fullName: rawData.fullName,
    address: rawData.address,
    homePhone: homeOrError.getValue(),
    mobileNo: mobileOrError.getValue(),
    birthDate: rawData.birthDate,
  };
  const agmOrError = ProfileAGM.create(props, new UniqueEntityID(rawData.id));

  if (agmOrError.isFailure) {
    return Result.fail(agmOrError.error);
  }
  return Result.ok(agmOrError.getValue());
};
