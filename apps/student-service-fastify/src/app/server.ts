import Fastify, { FastifyListenOptions } from "fastify";

import profileRoutes from "./modules/profile/route"
// import userRoutes from "./modules/user/route";
// import productRoutes from "./modules/product/route";
import customerRoutes from "./modules/customer/route";
import multer from 'fastify-multer'

const server = Fastify()

server.register(multer.contentParser)
server.get('/healthcheck',async function() {
return {status: "OK" }    
})

//Add Routes
server.register(profileRoutes,{prefix:"/api/profile"})
// server.register(userRoutes,{prefix:"/api/user"})
// server.register(productRoutes,{prefix:"/api/product"})
server.register(customerRoutes,{prefix:"/api/customer"})


export async function start(opt : FastifyListenOptions = {port:3000,host:"0.0.0.0"}) {
try {    
    await server.listen(opt) 
    console.log(`Student Service is start at http://localhost:${opt.port}`)
} catch (error) {
    console.error(error)
    process.exit(1)
}

}