import { left, Result, right } from '@inh-lib/common';
import { ProfileAGM, StudentProfileRepo } from '@student-service/student-profile-core';

import { RegisterHandler, RegisterResponseDTO } from '../register.handler';
import { RegisterRequestDTO } from '../register.dto';

const mockRepo: StudentProfileRepo = jest.createMockFromModule(
  '@student-service/student-profile-core'
);
const mockMapper = jest.fn();
const mockCanRegister = jest.fn();
const mockIsDuplicate = jest.fn();
const mockDTO: RegisterRequestDTO =
  jest.createMockFromModule('../register.dto');

const handler = new RegisterHandler(
  mockRepo,
  mockMapper,
  mockCanRegister,
  mockIsDuplicate
);

beforeEach(() => {
  jest.resetAllMocks();
});
 describe('Test RegisterCommand', () => {
  it('ParseSchemaToDTO Fail', async () => {
    //given
    mockMapper.mockReturnValue(Result.fail('mock mapper fail'));

    //when
    const actual: RegisterResponseDTO = await handler.execute(mockDTO);

    // then
    expect(actual.isLeft()).toBeTruthy();
  });

  it('CanRegister Fail ', async () => {
        //given
        const mockAGM:ProfileAGM = jest.createMockFromModule('@student-service/student-profile-core')
        mockMapper.mockReturnValue(Result.ok(mockAGM))
        mockCanRegister.mockReturnValue(left(Result.ok(false)));

        //when
        const actual: RegisterResponseDTO = await handler.execute(mockDTO);
    
        // then
        expect(actual.isLeft()).toBeTruthy();
  });

  it('IsDuplicate Fail ', async() => {
       //given
       const mockAGM:ProfileAGM = jest.createMockFromModule('@student-service/student-profile-core')
       mockMapper.mockReturnValue(Result.ok(mockAGM))
       mockCanRegister.mockReturnValue(right(Result.ok(true)));
       mockIsDuplicate.mockReturnValue(left(Result.ok(false)))

       //when
       const actual: RegisterResponseDTO = await handler.execute(mockDTO);
   
       // then
       expect(actual.isLeft()).toBeTruthy();
  });

  it('Register Fail', async () => {
      //given
      const mockAGM:ProfileAGM = jest.createMockFromModule('@student-service/student-profile-core')
      mockMapper.mockReturnValue(Result.ok(mockAGM))
      mockCanRegister.mockReturnValue(right(Result.ok(true)));
      mockIsDuplicate.mockReturnValue(right(Result.ok(true)))
      mockRepo.create =jest.fn().mockReturnValue(Result.fail("mock create fail"))

      //when
      const actual: RegisterResponseDTO = await handler.execute(mockDTO);
  
      // then
      expect(actual.isLeft()).toBeTruthy();
  });

  it('Register Success',async () => {
     //given
     const mockAGM:ProfileAGM = jest.createMockFromModule('@student-service/student-profile-core')
     mockMapper.mockReturnValue(Result.ok(mockAGM))
     mockCanRegister.mockReturnValue(right(Result.ok(true)));
     mockIsDuplicate.mockReturnValue(right(Result.ok(true)))
     mockRepo.create =jest.fn().mockReturnValue(Result.ok())

     //when
     const actual: RegisterResponseDTO = await handler.execute(mockDTO);
 
     // then
     expect(actual.isRight()).toBeTruthy();
  });
});
