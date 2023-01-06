import { z } from 'zod';

const registerSchema = z.object({
  id: z.string(),
  code: z.number(),
  fullName: z.string(),
  homePhone: z.string(),
  mobilePhone: z.string(),
});

export type RegisterRequestDTO = z.infer<typeof registerSchema>;
