import { UserServiceInterface } from "@/types/userService";

export class UserServiceSupabase implements UserServiceInterface{
    constructor(private supabase:any){}

    async getUser():Promise<any>{
        const { data } = await this.supabase.auth.getUser()
        return data
    }
}