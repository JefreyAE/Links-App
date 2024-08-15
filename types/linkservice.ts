export interface LinkServiceInterface{
    getLinks(id:string): Promise<any>
    createLink(url: string, description: string, list_id: any): Promise<any>
    deleteLink(link_id:string): Promise<any>
}