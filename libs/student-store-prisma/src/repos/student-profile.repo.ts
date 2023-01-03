import { Prisma } from '@prisma/client';
import {
  IStudentProfileRepo,
  ProfileAGM,
} from '@student-service/student-profile-core';

import prisma from '../dbclient';

export default class StudentPrfileRepo implements IStudentProfileRepo {
  getById(id: string): Promise<ProfileAGM> {
    throw new Error('Method not implemented.');
  }

  async add(profileAGM: ProfileAGM): Promise<ProfileAGM> {
   
    // convert DomainModel to PrismaInputModel
    const Item:Prisma.StudentProfileCreateInput = {code:1,fullName:"name lastname"}

    const profile = await prisma.studentProfile.create({
      data:Item
    });

    // convert PrismaModel to DomainModel
    return profileAGM;
  }
}

