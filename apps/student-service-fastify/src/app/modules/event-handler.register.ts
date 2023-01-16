import { AfterProfileCreated } from "@student-service/student-profile-api";



export default function register(broker:unknown):void{
    
    const profileCreated = new AfterProfileCreated(broker)
    profileCreated.setupSubscriptions()

}
