import { Result } from '@inh-lib/common';
import { ProfileAGM } from '../../models/profile.agm';
import { StudentProfileRepo } from '../../student-profile.repo';

export async function executor(
  repo: StudentProfileRepo,
  model: ProfileAGM
): Promise<Result<ProfileAGM>> {
  //check duplicate before create
  const existsOrError = await repo.existsByFullName(model.fullName);
  if (existsOrError.isSuccess) {
    return Result.fail('It can not create because data is exists');
  }

  const createdOrError = await repo.create(model);

  return createdOrError;
}

export type RegisterLogicType = typeof registerLogic;

export function makeRegisterLogic(repo: StudentProfileRepo): RegisterLogicType {
  return registerLogic.bind({ repo: repo });
}

 function registerLogic(model: ProfileAGM): Promise<Result<ProfileAGM>> {
  const repo: StudentProfileRepo = this.repo;
  const agm: ProfileAGM = model;

  return executor(repo, agm);
}
