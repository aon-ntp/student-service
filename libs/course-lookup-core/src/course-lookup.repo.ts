import { Result } from "@inh-lib/common"
import { UniqueEntityID } from "@inh-lib/ddd"
import { CourseLookupAGM } from "./models/"

export interface CourseLookupRepo{
    getById(id:string):Promise<Result<CourseLookupAGM>>
    create(profileAGM:CourseLookupAGM):Promise<Result<CourseLookupAGM>>
    update(profileAGM:CourseLookupAGM):Promise<Result<CourseLookupAGM>>
}

