import { courseLookupApi } from './course-lookup-api';

describe('courseLookupApi', () => {
  it('should work', () => {
    expect(courseLookupApi()).toEqual('course-lookup-api');
  });
});
