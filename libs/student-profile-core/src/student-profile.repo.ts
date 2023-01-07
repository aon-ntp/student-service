import { Result } from "@inh-lib/common"
import { UniqueEntityID } from "@inh-lib/ddd"
import { ProfileAGM } from "./models/profile.agm"

export interface StudentProfileRepo{
    getById(id:string):Promise<Result<ProfileAGM>>
    create(profileAGM:ProfileAGM):Promise<Result<ProfileAGM>>
    update(profileAGM:ProfileAGM):Promise<Result<ProfileAGM>>
    existsByFullName(fullName:string):Promise<Result<boolean>>
    existsByKey(id:UniqueEntityID):Promise<Result<boolean>>

}

