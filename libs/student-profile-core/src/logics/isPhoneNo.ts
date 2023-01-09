import { Result } from "@inh-lib/common";

export type IsPhoneNoType =  (value:string)=>Result<boolean>

export const isPhoneNo = (mobile: string) => {
//  RegExp must not throw exception. so we don't need try catch block
    const r = RegExp(/^((0)\d{9,9})$/);
    return Result.ok(r.test(mobile));


};