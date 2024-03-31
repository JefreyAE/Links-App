
import { ListServiceInterface } from "@/types/listService";

export class ListServiceSupabase implements ListServiceInterface {
    constructor(private supabase: any) { }

    async getLists(user_id: string): Promise<any> {
        try {
            const { data, error } = await this.supabase.from('lists')
                .select()
                .eq('user_id', user_id);
                if (error) {
                    console.error('Error al obtener listas', error.message);
                    throw new Error('Error al obtener listas');
                }
            return data;
        } catch (error:any) {
            console.error('Error en getLists:', error.message);
            throw new Error('Error al obtener listas');
        }
    }

    async createList(name: string, user_id: string, description: string): Promise<any> {
        try {
            const { data: list, error } = await this.supabase.from('lists')
                .insert({ name, user_id, description })
                .select()
                .single();
            
            
            if (error && error.code === '23505') {
                throw new Error('Error: Nombre de lista duplicado!');
            }
            if (error) {
                console.error('Error en createList:', error.message);
                throw new Error('Error al crear la lista');
            }

            return list;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
   
    async deleteList(list_id: string): Promise<any> {
        try {
            const { error } = await this.supabase.from('lists')
                .delete()
                .eq('id', list_id)
           
            if (error) {
                console.error('Error al borrar la lista:', error.message);
                throw new Error('Error al borrar la lista');
            }

        } catch (error:any) {
            console.error('Error al borrar la lista:', error.message);
            throw new Error('Error al borrar la lista');
        }
    }
}
