import { UniqueEntityID } from '@inh-lib/ddd';
import { StudentProfile } from '@prisma/client';
import { studentProfileToAGM } from '../fromStudentProfile.toAGM';

describe('Test studentProfileToAGM', () => {
  const defaultModel: StudentProfile = {
    id: '',
    code: 0,
    fullName: '',
    address: null,
    homePhone: null,
    mobilePhone: null,
    birthDate: null,
    createAt: new Date(2000, 1, 1),
    updateAt: null,
  };
  it('success', () => {
    const uid = new UniqueEntityID('12345').toString();
    const model: StudentProfile = {
      ...defaultModel,
      mobilePhone: '0123456789',
      id: uid,
      address: '',
    };

    const res = studentProfileToAGM(model);
    expect(res.isSuccess).toBeTruthy();
  });
  it("homePhone should be undefined when model.homePhone is null",()=>{
    const model: StudentProfile = {
        ...defaultModel,
        homePhone:null
      };
      const res = studentProfileToAGM(model);
      expect(res.getValue()?.homePhone?.props.phoneNo).toBeUndefined();
  
  })
  it("mobileNo should be undefined when model.mobilePhone is null",()=>{
    const model: StudentProfile = {
        ...defaultModel,
        mobilePhone: null
      };
      const res = studentProfileToAGM(model);
      expect(res.getValue()?.mobilePhone?.props.phoneNo).toBeUndefined();
  })


});
