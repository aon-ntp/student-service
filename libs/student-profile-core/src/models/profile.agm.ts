import { Guard, Result } from '@inh-lib/common';
import { AggregateRoot, UniqueEntityID } from '@inh-lib/ddd';
import { StudentProfileCreatedEvent } from '../events';

import { PhoneNoVO } from './phoneNo.vo';

export interface ProfileAGMProps {
  code: number;
  fullName: string;
  address: string;
  homePhone?: PhoneNoVO | null;
  mobileNo: PhoneNoVO;
  birthDate: Date;
}

//Profile Type for Implementing mapper to DomainModel at Api,Store Layer
export type ProfileAGMParser<T> = (rawData: T) => Result<ProfileAGM>;

export class ProfileAGM extends AggregateRoot<ProfileAGMProps> {
  public get code(): number {
    return this.props.code;
  }

  public get fullName(): string {
    return this.props.fullName;
  }
  public get address(): string {
    return this.props.address;
  }

  public get birthDate(): Date {
    return this.props.birthDate;
  }

  public get homePhone(): PhoneNoVO | null | undefined {
    return this.props.homePhone;
  }

  public get mobilePhone(): PhoneNoVO {
    return this.props.mobileNo;
  }

  constructor(props: ProfileAGMProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: ProfileAGMProps,
    id?: UniqueEntityID
  ): Result<ProfileAGM> {
    //Validate Not Null or Undefiend
    const guardProps = [
      { argument: props.fullName, argumentName: 'fullName' },
      { argument: props.address, argumentName: 'address' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardProps);
    if (!guardResult.succeeded) {
      return Result.fail<ProfileAGM>(guardResult.message);
    }

    // Validate String empty
    const fullNameHasValue = Guard.inRange(
      props.fullName.length,
      1,
      255,
      'fullName'
    );
    const addressHasValue = Guard.inRange(
      props.address.length,
      1,
      255,
      'address'
    );
    const hasValueResult = Guard.combine([fullNameHasValue, addressHasValue]);

    if (!hasValueResult.succeeded) {
      return Result.fail<ProfileAGM>(hasValueResult.message);
    }

    try {
      const agm = new ProfileAGM(props, id);
      
      agm.addDomainEvent(new StudentProfileCreatedEvent(agm))
      return Result.ok<ProfileAGM>(agm);
    } catch (error) {
      return Result.fail<ProfileAGM>(error.message);
    }
  }
}
