
import { isPhoneNo } from '../../../src/logics/shares/isPhoneNo';

describe('test isPhoneNo', () => {
  it('correct format',  () => {
    const exp = true;
    const phoneNo = '0891234567';
    const actual =  isPhoneNo(phoneNo);

    expect(actual).toEqual(exp);
  });

  it('incorrect format',  () => {
    const exp = false;
    const phoneNo = 'A891234567';
    const actual =  isPhoneNo(phoneNo);

    expect(actual).toEqual(exp);
  });
});
