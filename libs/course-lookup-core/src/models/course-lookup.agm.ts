import { Guard, Result } from "@inh-lib/common"
import { AggregateRoot, UniqueEntityID } from "@inh-lib/ddd"

export interface CourseLookupAGMProps{
  id?: string,
  originalCourseId: string,
  title: string,
  wishLists?: string[],
}

export type CourseLookupAGMParser<T> = (rawData: T) => Result<CourseLookupAGM>


export class CourseLookupAGM extends AggregateRoot<CourseLookupAGMProps>{
  public get originalCourseId(): string {
    return this.props.originalCourseId;
  }
  public get title(): string {
    return this.props.title;
  }
  public get wishLists(): string[] {
    return this.props.wishLists
  }
  private constructor(props: CourseLookupAGMProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(
    props: CourseLookupAGMProps,
    id?: UniqueEntityID
  ): Result<CourseLookupAGM>{
    const guardProps = [
      { argument: props.originalCourseId, argumentName: 'originalCourseId' },
      { argument: props.title, argumentName: 'title' },
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