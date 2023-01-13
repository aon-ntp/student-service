import * as server from "./app/server";
import * as producer from "./app/producer"
import * as consumer from "./app/consumer"

async function start(){
  // await server.start()
  // await producer.start()
  // await consumer.sleep(2000)
  console.log("consumer start")
  await consumer.start()
}

start()