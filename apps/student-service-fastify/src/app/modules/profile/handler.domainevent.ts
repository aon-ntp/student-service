import { AfterProfileCreated } from "@student-service/student-profile-api";

const broker:any = {}
const afterProfileCreated = new AfterProfileCreated(broker)

// register DomainEventhander to EventContainer
afterProfileCreated.setupSubscriptions()