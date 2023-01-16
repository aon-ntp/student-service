import { CourseLookupHandler, courseLookupInputSchema, CourseLookupResponseDTO, CreateCourseLookupInputDTO, CreateFailures, parseReqToDTO } from "@student-service/course-lookup-api";
import { CourseLookupAGMParser, CourseLookupRepo } from "@student-service/course-lookup-core";
import { CourseLookupRepoEmpl } from "@student-service/student-store-prisma";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createCourseLookup(req: FastifyRequest, reply: FastifyReply) {
  const repo: CourseLookupRepo = new CourseLookupRepoEmpl()
  const parserToModel: CourseLookupAGMParser<CreateCourseLookupInputDTO> = parseReqToDTO

  const handler = new CourseLookupHandler(repo, parserToModel)

  let dto: CreateCourseLookupInputDTO
  try {
    
    dto = courseLookupInputSchema.parse(req.body)
    const result = await handler.execute(dto)
    createCourseLookupResponseDTOToHttp(result, reply)
  } catch (error) {
    reply.status(400)
  }

}

function createCourseLookupResponseDTOToHttp(result: CourseLookupResponseDTO, reply: FastifyReply) {
  
  if (result.isLeft()) {
    const err = result.value;
    switch (err.constructor) {
      case CreateFailures.CreateFail:
        return reply.status(500)
      default:
        return reply.status(501)
    }
  }
  return reply.send(result.value.getValue())
}