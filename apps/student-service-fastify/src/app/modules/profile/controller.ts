import { FastifyReply, FastifyRequest } from "fastify";

export async function registerProfileHandler(req:FastifyRequest,res:FastifyReply) {
    return {status:"OK"}
}