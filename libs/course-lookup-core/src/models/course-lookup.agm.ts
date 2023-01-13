import { Guard, Result } from "@inh-lib/common"
import { AggregateRoot, UniqueEntityID } from "@inh-lib/ddd"

export interface CourseLookupAGMProps{
  id?: number,
  name: string,
  email: string,
  role: string
}

export type CourseLookupAGMParser<T> = (rawData: T) => Result<CourseLookupAGM>


export class CourseLookupAGM extends AggregateRoot<CourseLookupAGMProps>{
  public get name(): string {
    return this.props.name;
  }
  public get email(): string {
    return this.props.email;
  }
  public get role(): string {
    return this.props.role;
  }
  private constructor(props: CourseLookupAGMProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(
    props: CourseLookupAGMProps,
    id?: UniqueEntityID
  ): Result<CourseLookupAGM>{
    const guardProps = [
      { argument: props.name, argumentName: 'name' },
      { argument: props.email, argumentName: 'email' },
    ];
    const guardResult = Guard.againstNullOrUndefinedBulk(guardProps);
    if (!guardResult.succeeded) {
      return Result.fail<CourseLookupAGM>(guardResult.message);
    }
    try {
      const agm = new CourseLookupAGM(props, id);
      return Result.ok<CourseLookupAGM>(agm);
    } catch (error) {
      return Result.fail<CourseLookupAGM>(error.message);
    }
  }
}