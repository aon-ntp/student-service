import { PhoneNoVO } from '../phoneNo.vo';
import { ProfileAGM, ProfileAGMProps } from '../profile.agm';
describe('Test profileAGM', () => {
  describe('create', () => {
    it('success', () => {
      const props: ProfileAGMProps = {
        code: 0,
        fullName: 'me',
        address:'asdfagsdfgkm',
        mobileNo: PhoneNoVO.createVO({ phoneNo: '0123456789' }).getValue() as PhoneNoVO,
        birthDate: new Date(2000,1,1),
      };

      const actual = ProfileAGM.create(props);
      
      expect(actual.isSuccess).toBeTruthy();
      expect(actual.getValue()).toBeInstanceOf(ProfileAGM);
    });

    it('fail when fullName is Empty ', () => {
        const props:ProfileAGMProps = {
            code: 0,
            fullName: '',
            address:'abc',
            mobileNo: PhoneNoVO.createVO({ phoneNo: '0123456789' }).getValue() as PhoneNoVO,
            birthDate: new Date(2000,1,1),
          };
    
          const actual = ProfileAGM.create(props);
          
          expect(actual.isSuccess).toBeFalsy();
    });
    it('fail when address is Empty ', () => {
        const props:ProfileAGMProps = {
            code: 0,
            fullName: 'abc',
            address:'',
            mobileNo: PhoneNoVO.createVO({ phoneNo: '0123456789' }).getValue() as PhoneNoVO,
            birthDate: new Date(2000,1,1),
          };
    
          const actual = ProfileAGM.create(props);
          
          expect(actual.isSuccess).toBeFalsy();
    });
  });
});
