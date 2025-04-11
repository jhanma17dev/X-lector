<template>
  <!-- Dashboard Navbar -->
  <header
    class="navbar bg-base-300 shadow-sm w-9/10 rounded-full px-8 mx-auto outline outline-neutral"
  >
    <div class="flex items-center w-1/4">
      <img :src="Logo" class="h-8 w-8 rounded-full mr-4" alt="Logo" />
      <h1 class="text-lg font-bold opacity-95">X-ray</h1>
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
      <button class="btn btn-ghost rounded-full py-6">
        <div class="avatar mr-2">
          <div class="w-8 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>

        <span class="text-neutral text-md font-semibold mr-2">Amal Camila</span>

        <span class="material-symbols-outlined text-neutral"> keyboard_arrow_down </span>
      </button>
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
import { RouterLink, RouterView } from 'vue-router'
import Logo from '@/assets/logo.png'
</script>

<style scoped></style>
