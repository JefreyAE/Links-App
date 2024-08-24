
import { LinkServiceSupabase } from '@/services/linkServiceSupabase'
import { LinkServiceInterface } from '@/types/linkservice'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from "@/types/supabase"

interface LinksTableProps{
    links: []
    reloadList: ()=>void
}

export default function LinksTable({ links, reloadList }: LinksTableProps) {
    const linkService: LinkServiceInterface = new LinkServiceSupabase(createClientComponentClient<Database>())
    const deleteLink = (id:any) =>{  
        id && linkService.deleteLink(id)
            .then(()=>{
                reloadList()
            })
    }
    return (
        <>
            <div className="flex flex-col flex-wrap w-4/5 mt-10 place-items-center self-center">
                <h2 className="font-bold text-4xl mb-4 ">List of links</h2>
                <div className="flex flex-col w-full justify-self-center">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                    <tbody>
                                        {links.map((link: any) => {
                                            return (
                                                <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium ">
                                                        <Link href={`${link.url}`} passHref={true} target={'_blanck'}>
                                                            <td className="whitespace-nowrap px-6 py-4 font-medium text-center">{link.url}</td>
                                                        </Link>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                                                        {link.description}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium text-center ">
                                                        <button className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded' onClick={e => deleteLink(link.id)}>Delete</button>
                                                    </td>
                                                </tr>
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