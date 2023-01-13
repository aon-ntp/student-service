import { Kafka } from "kafkajs";

export async function start() {
  try {
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ['localhost:9092']
    })
    const admin = kafka.admin()
    console.log("Connecting. . .")
    await admin.connect().then(()=>{console.log("Connected!")})
    await admin.createTopics({
      topics:[{
        topic: "courseinfo",
        numPartitions: 1,
        replicationFactor: 1,
      }]
    }).then(()=> console.log("Topic Created!"))
  }catch(err){
    console.error(err);
  }
}