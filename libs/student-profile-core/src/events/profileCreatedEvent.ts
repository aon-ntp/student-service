import { IDomainEvent, UniqueEntityID } from "@inh-lib/ddd";
import { ProfileAGM } from "../models";


export class StudentProfileCreatedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public studentProfileAGM: ProfileAGM;

  constructor (agm: ProfileAGM) {
    this.dateTimeOccurred = new Date();
    this.studentProfileAGM = agm;
  }
  
  getAggregateId (): UniqueEntityID {
    return this.studentProfileAGM.id;
  }
}