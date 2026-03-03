import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export type InterviewerProfile = {
    id: string
    email: string
    nama: string
    ruang: string
}

type AuthState = 'loading' | 'authenticated' | 'unauthenticated'

export function useInterviewerAuth() {
    const navigate = useNavigate()
    const [state, setState] = useState<AuthState>('loading')
    const [profile, setProfile] = useState<InterviewerProfile | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            if (!session) {
                setState('unauthenticated')
                navigate('/interviewer/login')
                return
            }
            const { data } = await supabase
                .from('interviewers')
                .select('id, email, nama, ruang')
                .eq('email', session.user.email ?? '')
                .maybeSingle()

            if (!data) {
                await supabase.auth.signOut()
                setState('unauthenticated')
                navigate('/interviewer/login')
            } else {
                setProfile({ ...data, id: session.user.id })
                setState('authenticated')
            }
        })

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                setState('unauthenticated')
                navigate('/interviewer/login')
            }
        })

        return () => listener.subscription.unsubscribe()
    }, [navigate])

    const logout = async () => {
        await supabase.auth.signOut()
        navigate('/interviewer/login')
    }

    return {
        isLoading: state === 'loading',
        isAuthenticated: state === 'authenticated',
        profile,
        logout,
    }
}