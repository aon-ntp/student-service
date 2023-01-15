import Fastify, { FastifyListenOptions } from "fastify";
import multer from 'fastify-multer'

import registerAppRoutes  from "./modules/routes";

const server = Fastify()
server.register(multer.contentParser)
server.get('/healthcheck',async function() {
return {status: "OK" }    
})

registerAppRoutes(server)



export async function start(opt : FastifyListenOptions = {port:3000,host:"0.0.0.0"}) {
try {    
    await server.listen(opt) 
    console.log(`Student Service is start at http://localhost:${opt.port}`)
} catch (error) {
    console.error(error)
    process.exit(1)
}

}