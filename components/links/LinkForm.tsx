'use client'
import IsLoading from "@/app/login/isLoading"
import { LinkServiceSupabase } from "@/services/linkServiceSupabase"
import { LinkServiceInterface } from "@/types/linkservice"
import { Database } from "@/types/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react"
interface ListFormProps{
  list_id: number | string
  reloadList: ()=>void
}


const isValidURL = async (url:any) => {

  // Regular expression pattern to match a URL (excluding localhost)
  const urlPattern = /^(https?:\/\/)?((?!localhost)[\w.-]+)\.([a-z]{2,})(:\d{1,5})?(\/.*)?$/i;
  let urlRegex = new RegExp(urlPattern);

  // Test the URL against both URL pattern and disallowed domain pattern
  return urlRegex.test(url);
}

export default function LinkForm({list_id, reloadList}:ListFormProps){

    const linkService: LinkServiceInterface = new LinkServiceSupabase(createClientComponentClient<Database>())
    const [url, setUrl] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [message, setMessage] = useState<string>()
    const [isLoading, setIsLoading] = useState(false)
    const [isValid, setIsValid] = useState(false)

    const handleSubmit = async (e:any)=>{
      e.preventDefault()
      setIsLoading(true)

      setIsValid(await isValidURL(url))

      isValid && list_id && url && description && linkService && linkService.createLink(url, description, list_id)
        .then(()=>{
          setIsLoading(false)
          setMessage('Created successfully')
          reloadList()
        })
        .catch(error => {
          setIsLoading(false)
          error.message && setMessage(error.message)
        })
      if(!isValid){
        setMessage('Invalid link')
        setIsLoading(false)
      }
    }

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2"> 
          <form className="animate-in flex-1 flex flex-row w-full justify-center gap-2 text-foreground"
            onSubmit={handleSubmit}
          >
            <label className="flex items-center" htmlFor="name">Url</label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-0"
              name="url"
              type="text"
              value={url}
              onChange={(e)=>{setUrl(e.target.value)}}
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