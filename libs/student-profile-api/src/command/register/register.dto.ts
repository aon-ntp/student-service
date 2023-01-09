import { z } from 'zod';

export const registerSchema = z.object({
  id: z.string().nullable(),
  code: z.number().nullable(),
  fullName: z.string(),
  address: z.string(),
  homePhone: z.string().nullable(),
  mobilePhone: z.string(),
  birthDate:z.date()
});

export type RegisterRequestDTO = z.infer<typeof registerSchema>;
