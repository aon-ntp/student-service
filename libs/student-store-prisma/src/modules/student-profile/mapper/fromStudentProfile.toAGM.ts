import { Result } from '@inh-lib/common';
import { UniqueEntityID } from '@inh-lib/ddd';
import { StudentProfile } from '@prisma/client';
import { PhoneNoVO, ProfileAGM, ProfileAGMProps } from '@student-service/student-profile-core';

export function studentProfileToAGM(model:StudentProfile):Result<ProfileAGM> {


/*Don't Validate BusinessLogic by ValueObject and AggregateRootModel
 so that when you change business requirement then 
 system will be able to retrive Data from DB to display in UI.
 
 for example Business requirement is check length is 10 digit 
 but requirement is changed to checklength is 9 digit .
 
 if you validate logic at here.
 system will crash and can not display data in ui. 
 So user cannot edit new correct value in ui 
*/

  //Require field if DB's field is null then it should be undefiend
  const mobilePhone = new PhoneNoVO({phoneNo:model.mobilePhone || undefined })

  const homePhone = new PhoneNoVO({phoneNo:model.homePhone || undefined})
  
  try {
    const props:ProfileAGMProps = {
        code: model.code,
        fullName: model.fullName,
        mobileNo: mobilePhone,
        homePhone: homePhone,
        birthDate: model.birthDate as Date,
        address: model.address || ""
    }

    const result =  new ProfileAGM(props,new UniqueEntityID(model.id))
    return Result.ok(result)

  } catch (error) {
    return Result.fail(error)
  }
  
}
