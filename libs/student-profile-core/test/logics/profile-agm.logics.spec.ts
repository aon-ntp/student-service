import { canRegister } from '../../src/logics/profileAgm.logics';

import * as mockAgeModule  from '../../src/logics/shares/calculateAgeInYears';

describe('Test canRegister function', () => {
  
    const spyFn = jest.spyOn( mockAgeModule,"calculateAgeInYears")
    beforeEach(()=>{
       jest.resetAllMocks()
    })
    
  it('can register', async () => {
    
    spyFn.mockReturnValue(19)
    
    const birthaDate = new Date(2000, 1, 1);
    
    const exp = true;
    const actual = canRegister(birthaDate);
    
    expect(actual.getValue()).toEqual(exp);
  });
  it('cannot register', async () => {

    spyFn.mockReturnValue(17)

    const birthaDate = new Date(2000, 1, 1);
    const exp = false;
    const actual = canRegister(birthaDate);
    
   
    expect(actual.getValue()).toEqual(exp);
  });
});
