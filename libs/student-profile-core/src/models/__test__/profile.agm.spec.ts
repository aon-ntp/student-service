import { PhoneNoVO } from '../phoneNo.vo';
import { ProfileAGM, ProfileAGMProps } from '../profile.agm';
describe('Test profileAGM', () => {
  describe('create', () => {
    it('success', () => {
      const props: ProfileAGMProps = {
        code: 0,
        fullName: 'me',
        address:'asdfagsdfgkm',
        mobileNo: PhoneNoVO.createVO({ phoneNo: '0123456789' }).getValue(),
        birthDate: undefined,
      };

      const actual = ProfileAGM.create(props);
      
      expect(actual.isSuccess).toBeTruthy();
      expect(actual.getValue()).toBeInstanceOf(ProfileAGM);
    });

    it('fail', () => {
        const props = {
            code: 0,
            fullName: '',
            address:undefined,
            mobileNo: PhoneNoVO.createVO({ phoneNo: '0123456789' }).getValue(),
            birthDate: undefined,
          };
    
          const actual = ProfileAGM.create(props);
          
          expect(actual.isSuccess).toBeFalsy();
    });
  });
});
