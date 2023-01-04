import { Result } from '@inh-lib/common';
import { ValueObject } from '@inh-lib/ddd';
import { isPhoneNo } from '../logics/shares/isPhoneNo';

export interface IPhoneNoVOProps {
  phoneNo: string;
}

export class PhoneNoVO extends ValueObject<IPhoneNoVOProps> {

  public static createVO(props: IPhoneNoVOProps): Result<PhoneNoVO> {
    if (isPhoneNo(props.phoneNo)) {
      const vo = new PhoneNoVO(props);
      return Result.ok<PhoneNoVO>(vo);
    }
    return Result.fail<PhoneNoVO>('invalid phone no. format');
  }

}