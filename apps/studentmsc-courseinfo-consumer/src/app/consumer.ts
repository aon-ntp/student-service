import { Kafka } from "kafkajs";
// import { Client } from 'pg';

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function start() {
  const kafka = new Kafka({
    clientId: "myapp2",
    brokers: ['localhost:9092'],
    retry: {
      retries: 8,
      maxRetryTime: 15000,
      initialRetryTime: 10000
    }
  })

  // const db = new Client({
  //   host: 'localhost',
  //   port: 5432,
  //   user: 'postgres',
  //   password: 'postgres',
  //   database: 'student-service'
  // })
  
  // db.connect()

  const consumer = kafka.consumer({
    groupId: "course-consume",
  })

  console.log("Connecting Consumer....")
  await consumer.connect().then(()=> console.log("Connected Consumer"))

  consumer.subscribe({
    topic: "courseinfo",
    fromBeginning: true,
  })
  
  await consumer.run({
    eachBatchAutoResolve: false,
    eachBatch: async result =>{
      for (const i of result.batch.messages){
        if(!result.isRunning() || result.isStale()) break

        try{
          await sleep(2000).then(()=> {'readed'})
          console.log(`-Each batch ${i.value} -partitions ${result.batch.partition} -offset ${i.offset} -timestamp ${i.timestamp}`)
          result.resolveOffset(i.offset)
        }catch(e){
          console.error(e)
          await sleep(2000)
          consumer.pause([{ topic :result.batch.topic, partitions: [result.batch.partition] }])
          setTimeout(()=> consumer.resume([{ topic :result.batch.topic, partitions: [result.batch.partition] }]) ,5000)
        }
      }
      await result.heartbeat()
    }
    // eachMessage: async ({ topic, partition, message }) => {
    //   console.log({
    //     value: message.value.toString(),
    //   })
    //   const { value } = message;
    // },
  })
}