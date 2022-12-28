import { studentStoreMikroorm } from './student-store-mikroorm';

describe('studentStoreMikroorm', () => {
  it('should work', () => {
    expect(studentStoreMikroorm()).toEqual('student-store-mikroorm');
  });
});
