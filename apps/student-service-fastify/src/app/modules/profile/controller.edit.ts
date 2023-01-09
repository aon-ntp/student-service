import { FastifyReply, FastifyRequest } from "fastify";

export async function editHandler(req:FastifyRequest,res:FastifyReply):Promise<void>{
    return res.status(200)
}