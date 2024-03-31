'use client'
import IsLoading from "@/app/login/isLoading"
import { ListServiceSupabase } from "@/services/listServiceSupabase"
import { ListServiceInterface } from "@/types/listService"
import { Database } from "@/types/supabase"
import { UserServiceInterface } from "@/types/userService"
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react"

interface ListFormProps{
  user: User
  reloadList: ()=>void
}

export default function ListForm({user, reloadList}:ListFormProps){

    const listService: ListServiceInterface = new ListServiceSupabase(createClientComponentClient<Database>())
    const [name, setName] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [message, setMessage] = useState<string>()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e:any)=>{
      e.preventDefault()
      setIsLoading(true)
      name && user && description && listService && listService.createList(name, user.id, description)
        .then(()=>{
          setIsLoading(false)
          setMessage('Created successfully')
          reloadList()
        })
        .catch(error => {
          setIsLoading(false)
          error.message && setMessage(error.message)
        })
    }
    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2"> 
          <form className="animate-in flex-1 flex flex-row w-full justify-center gap-2 text-foreground"
            onSubmit={handleSubmit}
          >
            <label className="flex items-center" htmlFor="name">Name</label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-0"
              name="name"
              type="text"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              required
            />
            <label className="flex items-center" htmlFor="description">Description</label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-0"
              type="text"
              name="description"
              value={description}
              onChange={(e)=>{setDescription(e.target.value)}}
            />
            <button type="submit" className="bg-green-700 rounded-md px-4 py-0 text-foreground mb-0">Create</button>
          </form>
          {isLoading ? <IsLoading/> : 
              (message && <p className="mt-4 p-4 rounded-md bg-foreground/10 text-foreground text-center">{message}</p>)
          }
        </div>
      )
}