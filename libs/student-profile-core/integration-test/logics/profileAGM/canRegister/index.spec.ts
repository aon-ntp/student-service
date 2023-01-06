import { canRegister } from '../../../../src/logics/profileAGM/canRegister';

describe('Test canRegister', () => {
  it('can register when age >=18', () => {
    const birthaDate = new Date(2000, 1, 1);
    const toDay = new Date(2019, 1, 1);

    const actual = canRegister(birthaDate, toDay);

    expect(actual.getValue()).toBeTruthy();
  });

  it('can not register when age < 18', () => {
    const birthaDate = new Date(2000, 1, 1);
    const toDay = new Date(2017, 12, 31);

    const actual = canRegister(birthaDate, toDay);

    expect(actual.getValue()).toBeFalsy();

  });
});
