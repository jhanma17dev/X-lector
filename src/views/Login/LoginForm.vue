<template>
  <!-- Right side - Auth form -->
  <div class="w-full md:w-1/2 bg-black flex items-center justify-center p-8">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-white mb-10">
          {{ isSignUp ? 'Sign up' : 'Log in' }}
        </h1>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6 transition-all duration-300 ease-in-out">
        <!-- Name field - only show for sign up -->
        <div v-if="isSignUp" class="form-control">
          <label class="label">
            <span class="label-text text-white">Full Name</span>
          </label>
          <input
            v-model="formData.name"
            type="text"
            placeholder="Enter your full name"
            class="input input-bordered w-full bg-black text-white border-gray-700 focus:border-blue-500"
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text text-white">Email address</span>
          </label>
          <input
            v-model="formData.email"
            type="email"
            placeholder="Enter your email"
            class="input input-bordered w-full bg-black text-white border-gray-700 focus:border-blue-500"
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text text-white">Password</span>
          </label>
          <div class="relative">
            <input
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              class="input input-bordered w-full bg-black text-white border-gray-700 focus:border-blue-500 pr-10"
              required
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
            >
              <svg
                v-if="showPassword"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.172 8.172m1.706 1.706L8.172 8.172M9.878 9.878l4.242 4.242m0 0L8.172 8.172m5.95 5.95l-1.414 1.414m-5.95-5.95L8.172 8.172"
                />
              </svg>
              <svg
                v-else
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Confirm Password field - only show for sign up -->
        <div v-if="isSignUp" class="form-control">
          <label class="label">
            <span class="label-text text-white">Confirm Password</span>
          </label>
          <div class="relative">
            <input
              v-model="formData.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm your password"
              class="input input-bordered w-full bg-black text-white border-gray-700 focus:border-blue-500 pr-10"
              required
            />
            <button
              type="button"
              @click="toggleConfirmPasswordVisibility"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
            >
              <svg
                v-if="showConfirmPassword"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.172 8.172m1.706 1.706L8.172 8.172M9.878 9.878l4.242 4.242m0 0L8.172 8.172m5.95 5.95l-1.414 1.414m-5.95-5.95L8.172 8.172"
                />
              </svg>
              <svg
                v-else
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Error message -->
        <div v-if="errorMessage" class="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Success message -->
        <div v-if="successMessage" class="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ successMessage }}</span>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 disabled:loading"
          >
            {{ loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In') }}
          </button>
        </div>
      </form>

      <div class="text-center">
        <p class="text-sm text-gray-400">
          {{ isSignUp ? 'Already have an account?' : "Don't have an account?" }}
          <button
            @click="toggleMode"
            class="link link-primary text-blue-600 hover:text-blue-500 ml-1"
          >
            {{ isSignUp ? 'Sign in' : 'Sign up' }}
          </button>
        </p>
      </div>

      <div class="divider text-gray-400">Or</div>

      <div>
        <button
          type="button"
          @click="handleGoogleLogin"
          :disabled="loading"
          class="btn btn-outline w-full border-gray-700 text-white hover:bg-gray-900 hover:border-gray-600 disabled:loading"
        >
          <svg class="h-5 w-5 mr-3" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          {{ isSignUp ? 'Sign up with Google' : 'Log in with Google' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/auth.ts'

export default {
  name: 'AuthComponent',
  
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  
  data() {
    return {
      // State management
      isSignUp: false,
      loading: false,
      errorMessage: '',
      successMessage: '',
      
      // Form data
      formData: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      
      // Password visibility toggles
      showPassword: false,
      showConfirmPassword: false
    }
  },
  
  watch: {
    // Clear messages when switching between forms
    isSignUp() {
      this.clearMessages()
    }
  },
  
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword
    },
    
    // Toggle between login and sign up modes
    toggleMode() {
      this.isSignUp = !this.isSignUp
      this.clearMessages()
      this.clearForm()
    },
    
    // Clear form data
    clearForm() {
      this.formData.name = ''
      this.formData.email = ''
      this.formData.password = ''
      this.formData.confirmPassword = ''
    },
    
    // Clear messages
    clearMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    },
    
    // Validate form
    validateForm() {
      this.clearMessages()
      
      if (this.isSignUp) {
        if (!this.formData.name.trim()) {
          this.errorMessage = 'Full name is required'
          return false
        }
        
        if (this.formData.password !== this.formData.confirmPassword) {
          this.errorMessage = 'Passwords do not match'
          return false
        }
        
        if (this.formData.password.length < 6) {
          this.errorMessage = 'Password must be at least 6 characters long'
          return false
        }
      }
      
      return true
    },
    
    // Handle form submission
    async handleSubmit() {
      if (!this.validateForm()) return

      this.loading = true
      this.clearMessages()

      try {
        if (this.isSignUp) {
          // Sign up using auth store
          const { error } = await this.authStore.signUp(
            this.formData.email,
            this.formData.password,
            this.formData.name
          )

          if (error) {
            this.errorMessage = (error && typeof error === 'object' && 'message' in error) ? (error as any).message : String(error)
          } else {
            this.successMessage = 'Account created successfully! Please check your email to verify your account.'
            this.clearForm()

            setTimeout(() => {
              this.isSignUp = false
            }, 2000)
          }
        } else {
          // Sign in using auth store
          const { error } = await this.authStore.signIn(
            this.formData.email,
            this.formData.password
          )

          if (error) {
            this.errorMessage = (error && typeof error === 'object' && 'message' in error) ? (error as any).message : String(error)
          } else {
            this.successMessage = 'Logged in successfully!'
          }
        }
      } catch (error) {
        this.errorMessage = 'An unexpected error occurred. Please try again.'
        console.error('Auth error:', error)
      } finally {
        this.loading = false
      }
    },
    
    // Handle Google authentication
    async handleGoogleLogin() {
      this.loading = true
      this.clearMessages()

      try {
        const { error } = await this.authStore.signInWithGoogle()

        if (error) {
          this.errorMessage = (error && typeof error === 'object' && 'message' in error) ? (error as any).message : String(error)
        }
      } catch (error) {
        this.errorMessage = 'Google authentication failed. Please try again.'
        console.error('Google auth error:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>