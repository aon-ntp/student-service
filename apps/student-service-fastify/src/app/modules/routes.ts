import profileRoutes from "./profile/route"
import customerRoutes from "./customer/route";
import { FastifyInstance } from "fastify";
import { courseLookupRoutes } from "./course-lookup/route";


export default function register(server:FastifyInstance):FastifyInstance{
//Add Routes
server.register(profileRoutes,{prefix:"/api/profile"})
// server.register(userRoutes,{prefix:"/api/user"})
// server.register(productRoutes,{prefix:"/api/product"})
server.register(customerRoutes,{prefix:"/api/customer"})
server.register(courseLookupRoutes,{prefix: "/api/course-lookup"})
return server
}

