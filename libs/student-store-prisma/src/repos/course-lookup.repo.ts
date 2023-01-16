import { Result } from '@inh-lib/common';
import { CourseLookupAGM, CourseLookupRepo } from '@student-service/course-lookup-core';
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

export class CourseLookupRepoEmpl implements CourseLookupRepo{
  getById(id: string): Promise<Result<CourseLookupAGM>> {
    throw new Error('Method not implemented.');
  }
  async create(profileAGM: CourseLookupAGM): Promise<Result<CourseLookupAGM>> {
    const create = await client.courseLookup.create({
      data: {
        originalCourseId: profileAGM.originalCourseId,
        title: profileAGM.title,
      }
    })
    return Result.ok<CourseLookupAGM>(profileAGM);
  }
  update(profileAGM: CourseLookupAGM): Promise<Result<CourseLookupAGM>> {
    throw new Error('Method not implemented.');
  }
  
}