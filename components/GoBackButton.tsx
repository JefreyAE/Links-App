'use client'
import { useRouter } from 'next/navigation' // Usage: App router

export default function GoBackBUtton() {
  const router = useRouter()

  return (
    <button type="button" className='hover:bg-gray-700 rounded-full w-1/6' onClick={() => router.back()}>
      {'<- Go Back'}
    </button>
  )
}