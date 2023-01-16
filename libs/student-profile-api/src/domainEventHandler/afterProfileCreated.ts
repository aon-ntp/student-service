import { DomainEvents, IHandle,IEventHandler } from "@inh-lib/ddd";

import {  StudentProfileCreatedEvent} from "@student-service/student-profile-core";




export class AfterProfileCreated implements IHandle , IEventHandler<StudentProfileCreatedEvent> {
  private broker: unknown;

  constructor (broker: unknown) {
    this.setupSubscriptions();
    this.broker = broker;
  }
    handle(event: StudentProfileCreatedEvent): void {
       this.onStudentProfileCreatedEvent(event)
    }

  setupSubscriptions(): void {
    DomainEvents.register(this.onStudentProfileCreatedEvent.bind(this), StudentProfileCreatedEvent.name);
  }

  private async onStudentProfileCreatedEvent (event: StudentProfileCreatedEvent): Promise<void> {
    const { studentProfileAGM} = event;

    console.log("onStudentProfileCreatedEvent")

    //  broker.publish(eventName,eventData(studentProfileAGM))

    // this.assignInitialUsername.execute({ user })
    //   .then((r) => { console.log(r) })
    //   .catch((err) => { console.log(err) })
    
  }
}