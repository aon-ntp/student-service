import { execute, CanRegisterParams, makeCanRegister } from '../executor';

const mockCalAgeFN = jest.fn();
beforeEach(() => {
  mockCalAgeFN.mockReset();
});

it('Test makeCanRegister', () => {
  const actual = makeCanRegister(mockCalAgeFN);

  expect(typeof actual === 'function').toBeTruthy();
});

describe('Test execute', () => {
  const fakeBirthaDate = new Date(2000, 1, 1);
  const faketoDay = new Date();
  it('success', async () => {
    mockCalAgeFN.mockReturnValue(19);

    const params: CanRegisterParams = {
      calAgeFN: mockCalAgeFN,
      birthDate: fakeBirthaDate,
      toDay: faketoDay,
    };

    const exp = true;
    const actual = execute(params);

    expect(actual.getValue()).toEqual(exp);
  });
  it('fail', async () => {
    mockCalAgeFN.mockReturnValue(17);

    const params: CanRegisterParams = {
      calAgeFN: mockCalAgeFN,
      birthDate: fakeBirthaDate,
      toDay: faketoDay,
    };
    const exp = false;

    const actual = execute(params);

    expect(actual.getValue()).toEqual(exp);
  });
});
