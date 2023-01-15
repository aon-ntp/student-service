import { FastifyInstance } from "fastify";

import { editHandler } from "./controller.edit";
import { registerHandler } from "./controller.register";

// should initialize sigleton DomainEventHandler as here

async function profileRoutes(server:FastifyInstance){
   
    server.post("/",registerHandler)
    server.put("/",editHandler)
}
     


export default profileRoutes