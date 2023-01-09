import { Result } from '@inh-lib/common';
import { StudentProfileRepo } from '@student-service/student-profile-core';
import { RegisterFailures } from '../register.failures';
import { makeIsDuplicate } from '../validations.isDuplicate';

const mockRepo: StudentProfileRepo = jest.createMockFromModule(
  '@student-service/student-profile-core'
);

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Test isDuplicate', () => {

const fakeFullName = ""
  it('can makeIsDuplicate', () => {
    const actual = makeIsDuplicate(mockRepo);

    expect(typeof actual === 'function').toBeTruthy();
  });

  it('execute fail', async () => {
  
    mockRepo.existsByFullName = jest.fn().mockReturnValue(Result.fail("mock existsByFullname fail"))

    const isDuplicate = makeIsDuplicate(mockRepo);

    const actual = await isDuplicate(fakeFullName);

    expect(actual.value).toBeInstanceOf(RegisterFailures.IsDuplicateFail);
  });

  it('should pass', async () => {
    mockRepo.existsByFullName = jest.fn().mockReturnValue(Result.ok(false))

    const isDuplicate = makeIsDuplicate(mockRepo);

    const actual = await isDuplicate(fakeFullName);

    expect(actual.isRight()).toBeTruthy();

  });

  it('should not pass', async () => {
    mockRepo.existsByFullName = jest.fn().mockReturnValue(Result.ok(true))

    const isDuplicate = makeIsDuplicate(mockRepo);

    const actual = await isDuplicate(fakeFullName);

    expect(actual.value).toBeInstanceOf(RegisterFailures.ProfileAlreadyExist);

  });
});
