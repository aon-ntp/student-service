import { FastifyInstance } from "fastify";
import { createCourseLookup } from './controller'

export async function courseLookupRoutes(server: FastifyInstance) {
  server.post("/create",createCourseLookup)
}