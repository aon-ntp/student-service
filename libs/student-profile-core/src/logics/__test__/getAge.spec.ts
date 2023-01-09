import { getAge } from '../getAge';

describe('test getAge', () => {
  
  // month Januray start at index 0
  it('Today has passed BirthDay in CurrentYear', () => {
    const birthaDate = new Date(2000, 0, 31);
    const toDay = new Date(2019, 1,1 ); // this is 1 feb 2019
    const exp = 19;

    const actual = getAge(birthaDate, toDay);
    expect(actual.isSuccess).toBeTruthy()
    expect(actual.getValue()).toEqual(exp);
  });
  it('Today has not passed BirthDay in CurrentYear', () => {
    const birthaDate = new Date(2000, 0, 31);
    const toDay = new Date(2019, 0, 1);
    const exp = 18;

    const actual = getAge(birthaDate, toDay);
    expect(actual.isSuccess).toBeTruthy()
    expect(actual.getValue()).toEqual(exp);
  });
});
