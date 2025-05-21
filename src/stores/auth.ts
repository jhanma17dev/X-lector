import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const loading = ref(true)
  const isAuthenticated = computed(() => !!user.value)
  const router = useRouter()

  // Initialize auth state
  async function initialize() {
    loading.value = true
    try {
      // Get current session
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        // Set the user if we have a session
        user.value = session.user
      }

      // Setup auth state change listener
      supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          user.value = session.user
        } else if (event === 'SIGNED_OUT') {
          user.value = null
          router.push('/login')
        }
      })
    } catch (error) {
      console.error('Auth initialization error:', error)
    } finally {
      loading.value = false
    }
  }

  // Sign up with email and password
  async function signUp(email: string, password: string, name: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  // Sign in with email and password
  async function signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Route to dashboard or home page after successful login
      router.push('/dashboard/x-ray')

      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  // Sign in with OAuth provider (Google)
  async function signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  // Sign out
  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      // User will be set to null by the auth state change listener
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  // Reset password
  async function resetPassword(email: string) {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  // Get user profile
  const getUserProfile = computed(() => {
    if (!user.value) return null
    return {
      id: user.value.id,
      email: user.value.email,
      name: user.value.user_metadata?.name || '',
      avatar_url: user.value.user_metadata?.avatar_url || null,
    }
  })

  return {
    user,
    loading,
    isAuthenticated,
    getUserProfile,
    initialize,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
  }
})
