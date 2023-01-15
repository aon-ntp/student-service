import {
  PhoneNoVO,
  ProfileAGM,
  ProfileAGMProps,
} from '@student-service/student-profile-core';
import { agmToStudentProfileCreateInput } from '../fromAGM.toStudentProfileCreateInput';

describe('Test agmToStudentProfileCreateInput ', () => {
  const defaultProps: ProfileAGMProps = {
    code: 0,
    fullName: 'name surename',
    address:'home1234',
    mobileNo: PhoneNoVO.createVO({
      phoneNo: '0123456789',
    }).getValue() as PhoneNoVO,
    birthDate: new Date(2000, 1, 1)
  };
  it('success', async () => {
    const agm = ProfileAGM.create(defaultProps);
    const res = agmToStudentProfileCreateInput(agm.getValue() as ProfileAGM);
    expect(res.isSuccess).toBeTruthy()
  });
  it("homePhone should be null when AGM.honePhone is null ",()=>{

    const props:ProfileAGMProps = {...defaultProps,homePhone:null,}
    const agm = ProfileAGM.create(props);
    const res = agmToStudentProfileCreateInput(agm.getValue() as ProfileAGM);
    const r  = res.getValue()
    expect(r?.homePhone).toBeNull() 
  })
  it("homePhone should be undefiend when AGM.honePhone is undefiend ",()=>{
    const agm = ProfileAGM.create(defaultProps);
    const res = agmToStudentProfileCreateInput(agm.getValue() as ProfileAGM);
    const r  = res.getValue()
    expect(r?.homePhone).toBeUndefined() 
  })
  it("mobilePhone should be undefiend when AGM.mobilePhone.props.phoneNo is undefiend ",()=>{
    const props:ProfileAGMProps={
        ...defaultProps,
        mobileNo: new PhoneNoVO({phoneNo:undefined})
    }

    const agm = ProfileAGM.create(props);
    const res = agmToStudentProfileCreateInput(agm.getValue() as ProfileAGM);
    const r  = res.getValue()
    expect(r?.mobilePhone).toBeUndefined()
  })

});
