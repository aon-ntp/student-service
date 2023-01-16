import { Result } from '@inh-lib/common';
import { UniqueEntityID } from '@inh-lib/ddd';
import { Prisma, StudentProfile } from '@prisma/client';

//import dbhook for prisma trigger DomainEventHandler
import "./dbhooks";

import {
  StudentProfileRepo,
  ProfileAGM
} from '@student-service/student-profile-core';

import * as mapper from './mapper';
import prisma from '../../dbclient';

export class StudentProfileRepoEmpl implements StudentProfileRepo {
  async getById(id: string): Promise<Result<ProfileAGM>> {
    throw new Error('Method not implemented.');
  }

  async create(profileAGM: ProfileAGM): Promise<Result<ProfileAGM>> {
    // convert DomainModel to PrismaInputModel
    const ItemOrError = mapper.agmToStudentProfileCreateInput(profileAGM);
    if (ItemOrError.isFailure) {
      return Result.fail(ItemOrError.errorValue());
    }

    let profile: StudentProfile;
    try {
      const Item = ItemOrError.getValue() as Prisma.StudentProfileCreateInput
      profile = await prisma.studentProfile.create({
        data: Item,
      });
    } catch (error) {
      return Result.fail(error);
    }


    // convert PrismaModel to DomainModel
    const agmResult = mapper.studentProfileToAGM(profile)
    return agmResult;
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
