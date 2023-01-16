import { Result } from '@inh-lib/common';
import { Prisma } from '@prisma/client';
import { ProfileAGM } from '@student-service/student-profile-core';

export function agmToStudentProfileCreateInput(agm: ProfileAGM):Result<Prisma.StudentProfileCreateInput> {
  let  Item: Prisma.StudentProfileCreateInput 
  try {
    Item= {
      fullName: agm.fullName,
      address:agm.address,
      mobilePhone: agm.mobilePhone.props.phoneNo as string,
      homePhone: agm.homePhone === null ? null : agm.homePhone?.props.phoneNo,
      birthDate: agm.birthDate,
    }; 
  } catch (error) {
    return Result.fail(error)
  }
  return Result.ok(Item);
}
