import { ProfileAGM } from "./models/profile.agm"

export interface IStudentProfileRepo{
    getById(id:string):Promise<ProfileAGM>
    add(profileAGM:ProfileAGM):Promise<ProfileAGM>
}