<template>
  <header
    class="navbar w-full px-8 absolute top-4"
  >
    <div class="flex items-center w-1/4">
      <img :src="Logo" class="h-8 w-8 rounded-full mr-4" alt="Logo" />
      <h1 class="text-lg font-bold opacity-95">X-ray</h1>
    </div>

    <nav class="flex items-center w-2/4 justify-center text-neutral">
      <a class="mx-4" href="#home">
        Home
      </a>

      <a class="mx-4" href="#about">
        About Us
      </a>
    </nav>

    <nav class="flex items-center w-1/4 justify-end">
      <button class="btn btn-accent rounded-full primary-shadow font-bold">Login</button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Logo from '@/assets/logo.png'
</script>
