'use client'
import LinkForm from '@/components/links/LinkForm';
import LinksTable from '@/components/links/LinksTable';
import { LinkServiceSupabase } from '@/services/linkServiceSupabase';
import { LinkServiceInterface } from '@/types/linkservice';
import { Database } from '@/types/supabase';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

export default function Index({ params }: any) {

    const linksService: LinkServiceInterface = new LinkServiceSupabase(createClientComponentClient<Database>())
    const [links, setLinks] = useState<[]>([])
    const [reloadListState, setReloadListState] = useState<boolean>(false);

    useEffect(() => {
        params.id && linksService.getLinks(params.id)
            .then((data) => {        
                setLinks(data)
            })
    }, [, reloadListState])

    const reloadList = ()=>{
        setReloadListState(!reloadListState)
    }

    return (
        <div className="flex-1 w-full flex flex-col gap-10 items-center mt-4">
            <div className="animate-in flex-1 flex flex-col gap-10 opacity-0 w-full px-3">
                <div className="flex flex-col gap-10 items-center">
                    <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
                        Add your links here: {' '}
                    </p>
                    {params.id && <LinkForm list_id={params.id} reloadList={reloadList} />}
                    <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-4" />
                </div>
                <main className="flex-1 flex flex-col gap-6 ">
                    <LinksTable links={links} reloadList={reloadList}/>
                </main>
            </div>
        </div>
    )
}