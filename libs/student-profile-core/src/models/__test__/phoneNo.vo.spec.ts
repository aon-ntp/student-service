import { PhoneNoVO, PhoneNoVOProps } from '../phoneNo.vo';

import { isPhoneNo } from '../../logics/isPhoneNo';
import { Result } from '@inh-lib/common';

describe('Test PhoneNoVO', () => {
  const spyFn = jest.spyOn({ isPhoneNo }, 'isPhoneNo');

  beforeEach(() => {
    jest.resetAllMocks;
  });

  it('can create', () => {
    spyFn.mockReturnValue(Result.ok(true));
    const props: PhoneNoVOProps = { phoneNo: '0123456789' };

    const voOrError = PhoneNoVO.createVO(props);
  
    expect(voOrError.isSuccess).toBeTruthy();
  });

  it('can not create', () => {
    spyFn.mockReturnValue(Result.ok(false));
    const props: PhoneNoVOProps = { phoneNo: '1234567890' };

    const voOrError = PhoneNoVO.createVO(props);
  
    expect(voOrError.isFailure).toBeTruthy();
  });
});
