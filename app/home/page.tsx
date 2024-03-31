'use client'
import Header from '@/components/Header'
import ListTable from '@/components/lists/ListTable'
import { ListServiceSupabase } from '@/services/listServiceSupabase'
import { UserServiceSupabase } from '@/services/userServiceSupabase'
import { ListServiceInterface } from '@/types/listService'
import { Database } from '@/types/supabase'
import { UserServiceInterface } from '@/types/userService'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

export default  function Index() {

    const userService: UserServiceInterface = new UserServiceSupabase(createClientComponentClient<Database>())
    const listService: ListServiceInterface = new ListServiceSupabase(createClientComponentClient<Database>())

    const [user, setUser] = useState<any>()
    const [lists, setLists] = useState<any>([])
    const [reloadListState, setReloadListState] = useState<boolean>(false);

    useEffect(() => {
        userService.getUser()
            .then((data) => {
                data.user && setUser(data.user)
            })
    }, [])

    useEffect(() => {
        user && listService.getLists(user.id)
            .then((data => {
                setLists(data)
            }))
    }, [user, reloadListState])

    const reloadList = ()=>{
        setReloadListState(!reloadListState)
    }


    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div className="animate-in flex-1 flex flex-col gap-10 opacity-0 w-full px-3">
                <Header user={user} reloadList={reloadList}/>
                <main className="flex-1 flex flex-col gap-6 ">
                    <ListTable lists={lists} reloadList={reloadList}/>
                </main>
            </div>
        </div>
    )
}
