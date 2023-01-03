import { FastifyInstance } from "fastify";

import { registerProfileHandler } from "./controller";

async function profileRoutes(server:FastifyInstance){
   
    server.post("/",registerProfileHandler)
}
     


export default profileRoutes