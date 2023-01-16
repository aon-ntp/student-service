import { z } from "zod"
import { buildJsonSchemas } from "fastify-zod"

// export const courseLookupInputSchema = z.object({
//   name : z.string(),
//   email: z.string(),
//   role: z.enum(["USER","ADMIN"])
// })

export const courseLookupInputSchema = z.object({
  originalCourseId : z.string(),
  title: z.string(),
  wishLists: z.array(z.string()).optional()
})

// const createCourseLookupInputSchema = z.object({...courseLookupInputSchema})

export type CreateCourseLookupInputDTO = z.infer<typeof courseLookupInputSchema>

export const { schemas: productSchemas, $ref} = buildJsonSchemas({
  courseLookupInputSchema
})