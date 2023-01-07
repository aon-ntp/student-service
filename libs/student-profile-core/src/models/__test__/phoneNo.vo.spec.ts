import { PhoneNoVO, PhoneNoVOProps } from '../phoneNo.vo';

import { isPhoneNo } from '../../utils/isPhoneNo';

describe('Test PhoneNoVO', () => {
  const spyFn = jest.spyOn({ isPhoneNo }, 'isPhoneNo');

  beforeEach(() => {
    jest.resetAllMocks;
  });

  it('can create', () => {
    spyFn.mockReturnValue(true);
    const props: PhoneNoVOProps = { phoneNo: '0123456789' };

    const voOrError = PhoneNoVO.createVO(props);
  
    expect(voOrError.getValue()?.props).toEqual(props);
  });

  it('can not create', () => {
    spyFn.mockReturnValue(false);
    const props: PhoneNoVOProps = { phoneNo: '1234567890' };

    const voOrError = PhoneNoVO.createVO(props);
  
    expect(voOrError.isFailure).toBeTruthy();
  });
});
