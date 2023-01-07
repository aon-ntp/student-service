import { calculateAgeInYears } from '../calculateAgeInYears';

describe('test calculateAgeInYears', () => {
  it('correct', () => {
    const birthaDate = new Date(2000, 1, 1);
    const toDay = new Date(2019, 1, 1);
    const exp = 19;

    const actual = calculateAgeInYears(birthaDate, toDay);
    expect(actual).toEqual(exp);
  });
});
