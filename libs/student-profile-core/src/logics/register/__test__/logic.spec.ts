import { Result } from '@inh-lib/common';
import { PhoneNoVO } from '../../../models/phoneNo.vo';
import { ProfileAGM, ProfileAGMProps } from '../../../models/profile.agm';
import { StudentProfileRepo } from '../../../student-profile.repo';
import { makeRegisterLogic, executor } from '../logic';

const mockRepo: StudentProfileRepo = jest.createMockFromModule(
  '../../../student-profile.repo'
);

describe('Test RegisterLogic', () => {
    const props: ProfileAGMProps = {
        code: 0,
        fullName: '',
        birthDate: undefined,
        homePhone: PhoneNoVO.createVO({ phoneNo: '0123456789' }).getValue(),
        address: '',
        mobileNo: PhoneNoVO.createVO({ phoneNo: '0123456789' }).getValue(),
      };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('can  makeRegisterLogic', () => {
    const exp = 'function';
    const actual = makeRegisterLogic(mockRepo);

    expect(typeof actual).toEqual(exp);
  });

  it('execute success', async () => {
    
    const res = Result.fail<boolean>("is not exists")
    mockRepo.existsByFullName = jest.fn().mockReturnValue(res);
    
    mockRepo.create = jest.fn().mockReturnValue(Result.ok())
    
    const Logic = makeRegisterLogic(mockRepo);
    const agm = ProfileAGM.create(props).getValue();

    const exp = true;

    const actual = await Logic(agm);

    expect(actual.isSuccess).toEqual(exp);
  });

  it('execute fail', async () => {

    mockRepo.existsByFullName = jest.fn().mockReturnValue(Result.ok());
  
    const agm = ProfileAGM.create(props).getValue();

    const exp = false;

    const actual = await executor(mockRepo, agm);

    expect(actual.isSuccess).toEqual(exp);
  });
});
