
import { parseReqToDTO,parseAGMToSuccessDTO } from "../register.mapper";
import {RegisterRequestDTO  } from "../register.dto";
import { PhoneNoVO, ProfileAGM, ProfileAGMProps } from "@student-service/student-profile-core";


describe('Test parseReqToDTO', () => {
  const defautDTO: RegisterRequestDTO = {
    fullName: 'name',
    address: 'abc1234',
    mobilePhone: '0123456789',
    birthDate: new Date(2000,1,1)
  }

  it('success', () => {
    const dto: RegisterRequestDTO = {
      ...defautDTO,
      mobilePhone: '0123456789'
    };

    const res = parseReqToDTO(dto);
    expect(res.isSuccess).toBeTruthy();
  });
  it("code should be 0",()=>{
 
      const res = parseReqToDTO(defautDTO);
      expect(res.getValue()?.code).toEqual(0)
  
  })
  it("homePhone should be undefined when req.homePhone is undefiend",()=>{
 
      const res = parseReqToDTO(defautDTO);
      expect(res.getValue()?.homePhone).toBeUndefined();
  
  })
  it("homePhone should be null when req.homePhone is null",()=>{
 const dto:RegisterRequestDTO={...defautDTO,homePhone:null}

      const res = parseReqToDTO(dto);
      expect(res.getValue()?.homePhone).toBeNull();
  
  })
 

});

describe('Test parseAGMToSuccessDTO', () => {
  const defaultProps: ProfileAGMProps = {
    code: 1,
    fullName: "name",
    address: "abc",
    mobileNo: PhoneNoVO.createVO({phoneNo:'0123456789'}).getValue() as PhoneNoVO,
    birthDate: new Date(2000,1,1)
  }

  it('success', () => {
    const agm: ProfileAGM = ProfileAGM.create(defaultProps).getValue() as ProfileAGM

    const res = parseAGMToSuccessDTO(agm);
    expect(res.isSuccess).toBeTruthy();
  });
  it('id must be value', () => {
    const agm: ProfileAGM = ProfileAGM.create(defaultProps).getValue() as ProfileAGM

    const res = parseAGMToSuccessDTO(agm);
    expect(res.getValue()?.id).not.toBeUndefined()
  });
  it('code must be value', () => {
    const agm: ProfileAGM = ProfileAGM.create(defaultProps).getValue() as ProfileAGM

    const res = parseAGMToSuccessDTO(agm);
    expect(res.getValue()?.code).not.toBeUndefined()
  });
 

 

});
