import { PhoneNoVO, IPhoneNoVOProps } from '../../src/models/phoneNo.vo';

import { isPhoneNo } from '../../src/logics/shares/isPhoneNo';

describe('Test PhoneNoVO', () => {
  const spyFn = jest.spyOn({ isPhoneNo }, 'isPhoneNo');

  beforeEach(() => {
    jest.resetAllMocks;
  });

  it('can create', () => {
    spyFn.mockReturnValue(true);
    const props: IPhoneNoVOProps = { phoneNo: '0123456789' };

    const voOrError = PhoneNoVO.createVO(props);
  
    expect(voOrError.getValue()?.props).toEqual(props);
  });

  it('can not create', () => {
    spyFn.mockReturnValue(false);
    const props: IPhoneNoVOProps = { phoneNo: 'A123456789' };

    const voOrError = PhoneNoVO.createVO(props);
  
    expect(voOrError.isFailure).toBeTruthy();
  });
});
