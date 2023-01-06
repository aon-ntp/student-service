import { Guard, Result } from '@inh-lib/common';
import { AggregateRoot, UniqueEntityID } from '@inh-lib/ddd';

import { PhoneNoVO } from './phoneNo.vo';

export interface ProfileAGMProps {
  code: number;
  fullName: string;
  address: string;
  homePhone?: PhoneNoVO;
  mobileNo: PhoneNoVO;
  birthDate: Date;
}

//Profile Type for Implementing mapper to DomainModel at Api,Store Layer
export type ProfileAGMParser = <T>(rawData: T) => Result<ProfileAGM>;

export class ProfileAGM extends AggregateRoot<ProfileAGMProps> {
  public get code(): number {
    return this.props.code;
  }

  public get fullName(): string {
    return this.props.fullName;
  }

  public get birthDate(): Date {
    return this.props.birthDate;
  }

  public get homePhone(): PhoneNoVO {
    return this.props.homePhone;
  }

  public get mobilePhone(): PhoneNoVO {
    return this.props.mobileNo;
  }

  private constructor(props: ProfileAGMProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: ProfileAGMProps,
    id?: UniqueEntityID
  ): Result<ProfileAGM> {

    //Validate Require fields
    const guardProps = [
      { argument: props.fullName, argumentName: 'fullName' },
      { argument: props.address, argumentName: 'address' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardProps);
    if (!guardResult.succeeded) {
      return Result.fail<ProfileAGM>(guardResult.message);
    }

    try {
      const agm = new ProfileAGM(props, id);
      return Result.ok<ProfileAGM>(agm);
    } catch (error) {
      return Result.fail<ProfileAGM>(error.message);
    }
  }
}
