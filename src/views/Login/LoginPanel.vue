<template>
  <div class="hidden md:flex md:w-1/2 bg-primary relative flex-col p-10 text-white">
    <div class="flex items-center gap-2 mb-16">
      <img :src="Logo" class="h-8 w-auto mr-4" alt="Logo" />
    </div>

    <div class="z-10 max-w-md">
      <h2 class="text-3xl font-bold mb-4">Designed for full logistic Support</h2>
      <p class="text-lg opacity-90">View all the analytics and grow your business from anywhere!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/assets/logo.png'
</script>