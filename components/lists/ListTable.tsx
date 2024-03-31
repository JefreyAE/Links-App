'use client'
import { ListServiceSupabase } from '@/services/listServiceSupabase'
import { ListServiceInterface } from '@/types/listService'
import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

interface ListTableProps{
    lists: []
    reloadList: ()=>void
}

export default function ListTable({ lists, reloadList }: ListTableProps) {
    const listService: ListServiceInterface = new ListServiceSupabase(createClientComponentClient<Database>())
    const deleteList = (id:any) =>{
        
        id && listService.deleteList(id)
            .then(()=>{
                //setIsLoading(false)
                //setMessage('Created successfully')
                reloadList()
                console.log(id);
        
            })
    }
    return (
        <>
            <div className="flex flex-col flex-wrap w-full place-items-center">
                <h2 className="font-bold text-4xl mb-4 ">My lists</h2>
                <div className="flex flex-col w-2/4 justify-self-center">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                    <tbody>
                                        {lists.map((list: any) => {
                                            return (
                                                <>
                                                    <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                                                            <Link href={`/links/${list.id}`}>
                                                                {list.name}
                                                            </Link>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                                                            <button onClick={e => deleteList(list.id)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}