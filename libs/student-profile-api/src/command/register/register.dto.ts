import { Either, GenericAppError, Result } from '@inh-lib/common';
import { z } from 'zod';
import { RegisterFailures } from './register.failures';

export const registerSchema = z.object({
  fullName: z.string(),
  address: z.string(),
  homePhone: z.string().nullable().optional(),
  mobilePhone: z.string(),
  birthDate:z.date()
});

export const registerSchemaSuccess = z.object({
id: z.string(),
code:z.number()
});

export type RegisterRequestDTO = z.infer<typeof registerSchema>;

export type RegisterSuccessDTO = z.infer<typeof registerSchemaSuccess>;


export type RegisterResponseDTO = Either<GenericAppError.UnexpectedError |RegisterFailures.CanRegisterFail | RegisterFailures.IsDuplicateFail | RegisterFailures.ParserFail | RegisterFailures.AgeUnderQualified| Result<unknown>, RegisterSuccessDTO>
