import { Result } from '@inh-lib/common';
import { RegisterFailures } from '../register.failures';
import { makeCanRegister } from '../validations.canRegister';

const mockCalAgeFN = jest.fn();
beforeEach(() => {
  mockCalAgeFN.mockReset();
});


describe('Test canRegister', () => {
  const fakeBirthaDate = new Date(2000, 1, 1);
  const faketoDay = new Date();

  it('can makeCanRegister', () => {
    const actual = makeCanRegister(mockCalAgeFN);
  
    expect(typeof actual === 'function').toBeTruthy();
  });
  it('execute fail', async () => {
    mockCalAgeFN.mockReturnValue(Result.fail("mock getAge Fail"))
    
    const canRegister = makeCanRegister(mockCalAgeFN);
   
    const actual = canRegister(fakeBirthaDate, faketoDay);

    expect(actual.value).toBeInstanceOf(RegisterFailures.CanRegisterFail)
  });

  it('should pass', async () => {

    mockCalAgeFN.mockReturnValue(Result.ok(19));
    const canRegister = makeCanRegister(mockCalAgeFN);
    const exp = true;

    const actual = canRegister(fakeBirthaDate, faketoDay);
    
    
    expect(actual.isRight()).toEqual(exp);
  });

  it('should not pass', async () => {
    mockCalAgeFN.mockReturnValue(Result.ok(17));
    const canRegister = makeCanRegister(mockCalAgeFN);
    const exp = false;

    const actual = canRegister(fakeBirthaDate, faketoDay);


    expect(actual.isRight()).toEqual(exp);
  });
});
