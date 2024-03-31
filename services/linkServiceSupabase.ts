import { LinkServiceInterface } from "@/types/linkservice";

export class LinkServiceSupabase implements LinkServiceInterface {
    constructor(private supabase: any) { }

    async getLinks(id: string): Promise<any> {
        try {
            const { data, error } = await this.supabase.from('links')
                .select()
                .eq('list_id', id);
                if (error) {
                    console.error('Error al obtener links', error.message);
                    throw new Error('Error al obtener links');
                }
            return data;
        } catch (error:any) {
            console.error('Error al obtener links', error.message);
            throw new Error('Error al obtener links');
        }
    }

    async createLink(url: string, description: string, list_id: any): Promise<any> {
        try {
            const { data: link, error } = await this.supabase.from('links')
                .insert({ url, description, list_id })
                .select('*')
                .single();

            if (error) {
                console.error('Error al crear el link', error.message);
                throw new Error('Error al crear el link');
            }

            return link;
        } catch (error:any) {
            console.error('Error al crear el link', error.message);
            throw new Error('Error al crear el link');
        }
    }
}
