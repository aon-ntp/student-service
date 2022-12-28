import { studentStorePrisma } from './student-store-prisma';

describe('studentStorePrisma', () => {
  it('should work', () => {
    expect(studentStorePrisma()).toEqual('student-store-prisma');
  });
});
