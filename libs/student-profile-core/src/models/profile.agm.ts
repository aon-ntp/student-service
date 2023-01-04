import {Result} from "@inh-lib/common";
import { AggregateRoot, UniqueEntityID } from "@inh-lib/ddd";

import {PhoneNoVO } from "./phoneNo.vo"

export interface IProfileAGMProps{
    code:number
    fullName:string
    homePhone?: PhoneNoVO
    mobileNo:PhoneNoVO
    birthDate:Date
}

//Profile Type for Implementing mapper to DomainModel at Api,Store Layer
export type ProfileAGMMapper = (rawData:unknown) => ProfileAGM

export class ProfileAGM extends AggregateRoot<IProfileAGMProps>{
    public get code() : number {
        return this.props.code
    }
    

    public get fullName() : string {
        return this.props.fullName
    }
    
    
    public get birthDate() : Date {
        return this.props.birthDate
    }
    

    public get homePhone() : PhoneNoVO {
        return this.props.homePhone
    }
    
    
    public get mobilePhone() : PhoneNoVO {
        return this.props.mobileNo
    }
    

   private constructor(props:IProfileAGMProps,id?:UniqueEntityID){
        super(props,id)
    }


    public static create(props:IProfileAGMProps,id?:UniqueEntityID):Result<ProfileAGM>{
        try {      
            const agm = new ProfileAGM(props, id)
            return Result.ok<ProfileAGM>(agm)
        } catch (error) {
            return Result.fail<ProfileAGM>(error.message)
        }
    }

}



