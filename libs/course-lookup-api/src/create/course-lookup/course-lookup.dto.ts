import { z } from "zod"
import { buildJsonSchemas } from "fastify-zod"

const courseLookupInput = {
  name : z.string(),
  email: z.string(),
  role: z.enum(["USER","ADMIN"])
}

const createCourseLookupInputSchema = z.object({...courseLookupInput})

export type CreateCourseLookupInputDTO = z.infer<typeof createCourseLookupInputSchema>

export const { schemas: productSchemas, $ref} = buildJsonSchemas({
  createCourseLookupInputSchema
})