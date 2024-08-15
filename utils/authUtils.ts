import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from './supabase/server';

export const redirectToLoginIfNotAuthenticated = async () => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const {
        data: { user },
    } = await supabase.auth.getUser()


    const redirectToLogin = async () => {
        'use server'
        if (!user) {
            return redirect('/')
        }
    }

    await redirectToLogin()
};

export const redirectToHomeIfAuthenticated = async () => {

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const {
        data: { user },
    } = await supabase.auth.getUser()


    const redirectToHome = async () => {
        'use server'
        if (user) {
            return redirect('/home')
        }
    }

    await redirectToHome()
};

