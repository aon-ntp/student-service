import { StudentProfileRepoEmpl } from '../repo';

import { prismaMock } from "../../../../singleton";
// jest.mock("../mapper")
// import * as mapper from '../mapper';
//     const mockMap = mapper as jest.Mocked<typeof mapper>
// mockMap.agmToStudentProfileCreateInput.mockReturnValue(Result.fail("mock fail"));

jest.mock('../mapper');
import { agmToStudentProfileCreateInput, studentProfileToAGM } from '../mapper';

import {
  PhoneNoVO,
  ProfileAGM,
  ProfileAGMProps,
} from '@student-service/student-profile-core';
import { Result } from '@inh-lib/common';
import { StudentProfile } from '@prisma/client';

describe('Test StudentProfileRepoEmpl.create', () => {
  const repo: StudentProfileRepoEmpl = new StudentProfileRepoEmpl();
  const defaultProps: ProfileAGMProps = {
    code: 0,
    fullName: 'name',
    address: 'abn1',
    mobileNo: PhoneNoVO.createVO({
      phoneNo: '0123456789',
    }).getValue() as PhoneNoVO,
    birthDate: new Date(2000, 1, 1),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('fail when Parse AGM to Prisma Model', async () => {
    const mockMap = jest.mocked(agmToStudentProfileCreateInput);
    mockMap.mockReturnValue(Result.fail('mock fail'));

    const agm: ProfileAGM = ProfileAGM.create(
      defaultProps
    ).getValue() as ProfileAGM;

    const res = await repo.create(agm);

    expect(mockMap).toHaveBeenCalled();
    expect(res.isFailure).toBeTruthy()
  });

  it('fail when prismaClient execute error', async() => {
    const mockMap = jest.mocked(agmToStudentProfileCreateInput);
    mockMap.mockReturnValue(Result.ok());
    const mockError = new Error("mock fail")

    const agm: ProfileAGM = ProfileAGM.create(
      defaultProps
    ).getValue() as ProfileAGM;

  
    prismaMock.studentProfile.create.mockRejectedValue(mockError)
    
    const res  = await repo.create(agm)

    expect(prismaMock.studentProfile.create).toHaveBeenCalled()
    expect(res.isFailure).toBeTruthy()
    expect(res.error).toEqual(mockError)


  });

  it('fail when Parse Prisma Model to AGM', async() => {
    const mockMap = jest.mocked(agmToStudentProfileCreateInput);
    mockMap.mockReturnValue(Result.ok());

    const mockMapToAGM = jest.mocked(studentProfileToAGM);
    mockMapToAGM.mockReturnValue(Result.ok());

    const agm: ProfileAGM = ProfileAGM.create(
      defaultProps
    ).getValue() as ProfileAGM;

    const m:StudentProfile = {
        id: '1234',
        code: 0,
        fullName: '',
        address: null,
        homePhone: null,
        mobilePhone: null,
        birthDate: null,
        createAt: new Date(),
        updateAt: null
    }


    prismaMock.studentProfile.create.mockResolvedValue(m)
    const res  = await repo.create(agm)

    expect(mockMapToAGM).toHaveBeenCalled()
    expect(res.isSuccess).toBeTruthy()
      
})

});
