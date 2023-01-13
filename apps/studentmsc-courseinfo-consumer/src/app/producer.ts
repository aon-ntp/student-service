import { Kafka, Partitioners } from "kafkajs";

export async function start() {
  const kafka = new Kafka({
    clientId: "myapp",
    brokers: ['localhost:9092'],
  })
  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
    allowAutoTopicCreation: false,
    //transaction setting
    transactionalId: 'myapp-transactional-producer-course',
    maxInFlightRequests: 1,
    idempotent: true
  })
  console.log("Connecting Producer....")
  await producer.connect().then(() => {
    console.log("Connected Producer!")
  })
  let msgs = [{
    value: {
      name: 'aon',
      email: 'test'
    }
  }]
  const sendMsg = await producer.send({
    topic: "courseinfo",
    messages: [
      {
        value: JSON.stringify(msgs),
        partition: 0
      },
    ]
  })
  console.log(sendMsg)

}