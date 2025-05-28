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
          Radiografías
        </a>
      </RouterLink>

      <RouterLink v-slot="{ isExactActive }" to="/dashboard/history">
        <a
          class="btn btn-ghost text-md rounded-full hover:bg-neutral hover:text-base-content mr-2"
          :class="isExactActive ? 'bg-neutral text-base-content opacity-90' : 'bg-transparent text-neutral'"
        >
          <span class="material-symbols-outlined"> history </span>
          Historial
        </a>
      </RouterLink>

      <RouterLink v-slot="{ isExactActive }" to="/dashboard/help">
        <a
          class="btn btn-ghost text-md rounded-full hover:bg-neutral hover:text-base-content mr-2"
          :class="isExactActive ? 'bg-neutral text-base-content opacity-90' : 'bg-transparent text-neutral'"
        >
          <span class="material-symbols-outlined"> help </span>
          Ayuda
        </a>
      </RouterLink>
    </nav>

    <nav class="flex items-center w-1/4 justify-end">
      <div class="dropdown dropdown-end">
        <button class="btn btn-ghost rounded-full py-6">
          <div class="avatar mr-2">
            <div class="w-8 rounded-full">
              <img :src="userProfile?.avatar_url || 'https://asap-invests.com/wp-content/uploads/2021/02/avatar-placeholder.png'" />
            </div>
          </div>

          <span class="text-neutral text-md font-semibold mr-2">
            {{ userProfile?.name || userProfile?.email || 'Usuario' }}
          </span>

          <span class="material-symbols-outlined text-neutral"> keyboard_arrow_down </span>
        </button>
        
        <!-- Dropdown menu -->
        <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
          <li><button @click="handleLogout()">Cerrar Sesión</button></li>
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
import Logo from '/assets/Logo.png'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

// Obtener información del perfil de usuario desde el store de autenticación
const userProfile = computed(() => authStore.getUserProfile)

// Manejar el cierre de sesión del usuario
const handleLogout = async () => {
  try {
    const { error } = await authStore.signOut()

    if (error) {
      console.error('Error al cerrar sesión:', error)
    } else {
      // Redirigir al usuario a la página de login
      router.push('/login')
    }
  } catch (e) {
    console.error('Error inesperado durante el cierre de sesión:', e)
  }
}
</script>

<style scoped></style>
