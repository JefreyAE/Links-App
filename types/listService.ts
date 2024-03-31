export interface ListServiceInterface{
    getLists(user_id:string): Promise<any>
    createList(name: string, user_id: string, description: string): Promise<any>
    deleteList(list_id:string): Promise<any>
}