<template>
  <header
    class="navbar w-full px-8 absolute top-4"
  >
    <div class="flex items-center w-1/4">
      <img :src="Logo" class="h-8 w-auto mr-4" alt="Logo" />
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
      <RouterLink to="/login">
        <button class="btn btn-secondary rounded-full primary-shadow font-bold">Login</button>
      </RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Logo from '@/assets/logo.png'
</script>
