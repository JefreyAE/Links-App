'use client'
import ListForm from './lists/ListForm'
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import type { Database } from "@/types/supabase" 

interface HeaderProps{
  user:User
  reloadList: ()=>void
}

export default function Header({user, reloadList}:HeaderProps) {
  const supabase = createClientComponentClient<Database>()
  
  return (
    <>
      {user && 
        <div className="flex flex-col gap-10 items-center">
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
            Welcome create your lists here: {' '}
          </p>
          <ListForm user={user} reloadList={reloadList} />
          <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-4" /> 
        </div>
      }
    </>
  )
}
