import Fastify, { FastifyListenOptions } from "fastify";

import profileRoutes from "./modules/profile/route"

const server = Fastify()

server.get('/healthcheck',async function() {
return {status: "OK" }    
})

export async function start(opt : FastifyListenOptions = {port:3000,host:"0.0.0.0"}) {

    server.register(profileRoutes,{prefix:"/api/profile"})

try {    
    await server.listen(opt) 
    console.log(`Student Service is start at http://localhost:${opt.port}`)
} catch (error) {
    console.error(error)
    process.exit(1)
}

}