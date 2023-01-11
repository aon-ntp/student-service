import { FastifyInstance } from "fastify";

// import { registerUser } from "./controller";

// async function userRoutes(server:FastifyInstance){
   
//     server.post("/",registerUser)
// }
import { getUser,createUser,deleteUser, login } from "./controller";

async function userRoutes(server:FastifyInstance){
    server.get("/",getUser)
    server.post("/login",login)
    server.post("/create",createUser)
    server.delete("/delete",deleteUser)
}
     


export default userRoutes