<template>
  <!-- Dashboard Navbar -->
  <header
    class="navbar bg-base-300 shadow-sm w-9/10 rounded-full px-8 mx-auto outline outline-neutral"
  >
    <div class="flex items-center w-1/4">
      <img :src="Logo" class="h-7 w-auto mr-4" alt="Logo" />
    </div>

    <nav class="flex items-center w-2/4 justify-center">
      <RouterLink v-slot="{ isExactActive }" to="/dashboard/x-ray">
        <a
          class="btn btn-ghost text-md rounded-full hover:bg-neutral hover:text-base-content mr-2 hover:opacity-90"
          :class="isExactActive ? 'bg-neutral text-base-content opacity-90' : 'bg-transparent text-neutral'"
        >
          <span class="material-symbols-outlined"> radiology </span>
          X-rays
        </a>
      </RouterLink>

      <RouterLink v-slot="{ isExactActive }" to="/dashboard/history">
        <a
          class="btn btn-ghost text-md rounded-full hover:bg-neutral hover:text-base-content mr-2"
          :class="isExactActive ? 'bg-neutral text-base-content opacity-90' : 'bg-transparent text-neutral'"
        >
          <span class="material-symbols-outlined"> history </span>
          History
        </a>
      </RouterLink>

      <RouterLink v-slot="{ isExactActive }" to="/dashboard/help">
        <a
          class="btn btn-ghost text-md rounded-full hover:bg-neutral hover:text-base-content mr-2"
          :class="isExactActive ? 'bg-neutral text-base-content opacity-90' : 'bg-transparent text-neutral'"
        >
          <span class="material-symbols-outlined"> help </span>
          Help
        </a>
      </RouterLink>
    </nav>

    <nav class="flex items-center w-1/4 justify-end">
      <div class="dropdown dropdown-end">
        <button class="btn btn-ghost rounded-full py-6">
          <div class="avatar mr-2">
            <div class="w-8 rounded-full">
              <img :src="userProfile?.avatar_url || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'" />
            </div>
          </div>

          <span class="text-neutral text-md font-semibold mr-2">
            {{ userProfile?.name || userProfile?.email || 'User' }}
          </span>

          <span class="material-symbols-outlined text-neutral"> keyboard_arrow_down </span>
        </button>
        
        <!-- Dropdown menu -->
        <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
          <li><a @click="viewProfile">Profile</a></li>
          <li><a @click="handleLogout">Logout</a></li>
        </ul>
      </div>
    </nav>
  </header>

  <!-- Main Content Area -->
  <main class="flex flex-col items-center w-86/100 mx-auto mt-6">
    <div class="w-full">
      <RouterView />
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import Logo from '@/assets/logo.png'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

// Get user profile information from the auth store
const userProfile = computed(() => authStore.getUserProfile)

// Handle user logout
const handleLogout = async () => {
  await authStore.signOut()
}

// View profile page
const viewProfile = () => {
  router.push('/dashboard/profile')
}
</script>

<style scoped></style>
