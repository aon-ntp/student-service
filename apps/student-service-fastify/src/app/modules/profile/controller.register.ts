import { FastifyReply, FastifyRequest } from 'fastify';

import { StudentProfileRepoEmpl } from '@student-service/student-store-prisma';
import {
  makeRegisterHandler,
  RegisterRequestDTO,
  registerSchema,
  RegisterFailures,
  RegisterResponseDTO,
} from '@student-service/student-profile-api';
import { StudentProfileRepo } from '@student-service/student-profile-core';
import { GenericAppError } from '@inh-lib/common';

export async function registerHandler(req: FastifyRequest, res: FastifyReply) {
  //initialize handler parameters
  const repo: StudentProfileRepo = new StudentProfileRepoEmpl();
  const handler = makeRegisterHandler(repo);

  let dto: RegisterRequestDTO;
  try {
    dto = registerSchema.parse(req.body);
    const result = await handler.execute(dto);
    registerResponseDTOToHttp(result, res);
  } catch (error) {
    res.status(400);
  }
}
function registerResponseDTOToHttp(
  result: RegisterResponseDTO,
  res: FastifyReply
) {
  if (result.isLeft()) {
    const err = result.value;
    switch (err.constructor) {
      case RegisterFailures.ProfileAlreadyExist:
        return res.status(409);
      case RegisterFailures.CanRegisterFail:
        return res.status(500);
      case RegisterFailures.AgeUnderQualified:
        return res.status(500);
      case RegisterFailures.IsDuplicateFail:
        return res.status(500);
      case RegisterFailures.ParserFail:
        return res.status(500);
      case GenericAppError.UnexpectedError:
        return res.status(500);
      default:
        // Error Not Implement
        return res.status(501);
    }
  }
  return res.status(200);
}
