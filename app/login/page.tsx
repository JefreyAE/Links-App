'use client'
import { Suspense, useEffect, useTransition } from 'react'
import IsLoading from './isLoading'
import { signIn, signUp } from './serverActions'


export default function Login({ searchParams, }: { searchParams?: { message: string } }) {

  let [isPending, startTransition] = useTransition();

  const onLogin = async (formData: FormData) => {
    startTransition(() => {
      signIn(formData);
    });
  }

  const onSignUp = async (formData: FormData) => {
    startTransition(() => {
      signUp(formData);
    });
  }
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={onLogin}
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        {!isPending ? <>
          <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
            Sign In
          </button>
          <button
            formAction={onSignUp}
            className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          >
            Sign Up
          </button>
        </> : <IsLoading />}

        {searchParams?.message}
      </form>
    </div>
  )
}
