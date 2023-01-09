import { FastifyInstance } from "fastify";

import { registerHandler } from "./controller";

async function profileRoutes(server:FastifyInstance){
   
    server.post("/",registerHandler)
}
     


export default profileRoutes