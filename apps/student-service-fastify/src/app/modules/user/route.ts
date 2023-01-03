import { FastifyInstance } from "fastify";

import { registerUser } from "./controller";

async function userRoutes(server:FastifyInstance){
   
    server.post("/",registerUser)
}
     


export default userRoutes