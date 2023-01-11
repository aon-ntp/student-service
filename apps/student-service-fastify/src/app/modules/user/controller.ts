import { FastifyReply, FastifyRequest } from "fastify";
import { userModel } from "@student-service/crud-core"
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient()

interface IUserQuery{
    query: any 
  }

  interface IUserModel {
    username: string;
    password: string;
  }
  interface IHeaders {  
    'h-Custom': string;
  }


export async function login(req:FastifyRequest<{Body:IUserModel}>,reply:FastifyReply) {

    const {username,password} = req.body
    const user = await client.user.findFirst({
        where: {
            username:username,
          }
    })
    console.log(user)
    if(user.username === 'admin'){
        reply.status(200).send(user)
    }else {
        reply.send('Invalid username or password');
    }

}


export async function getUser(req:FastifyRequest,reply:FastifyReply) {
    reply.send({status:"OK"})
}

export async function createUser(req:FastifyRequest<{Body: IUserModel,Headers: IHeaders}>,reply:FastifyReply) {
    console.log(req)
    try {
        const user  =  await client.user.create({
            data: {
                username:req.body.username,
                password:req.body.password
            }
        });
        reply.status(200).send(user)
    }
    catch (e) {
        console.log(e)
        reply.status(400).send({
            error:"not found"
            })
    }
  
}



export async function deleteUser(req:FastifyRequest,reply:FastifyReply) {
    reply.send({status:"OK"})
}