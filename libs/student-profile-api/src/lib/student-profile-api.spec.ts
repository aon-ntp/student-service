import { studentProfileApi } from './student-profile-api';

describe('studentProfileApi', () => {
  it('should work', () => {
    expect(studentProfileApi()).toEqual('student-profile-api');
  });
});
