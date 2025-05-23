<template>
  <div class="hidden md:flex md:w-1/2 bg-primary relative flex-col p-10 text-white">
    <div class="flex items-center gap-2 mb-16">
      <img :src="Logo" class="h-8 w-auto mr-4" alt="Logo" />
    </div>

    <div class="z-10 max-w-md">
      <h2 class="text-3xl font-bold mb-4">Diagnóstico avanzado de osteoartritis</h2>
      <p class="text-lg opacity-90">Utilizamos inteligencia artificial para ayudar a detectar y clasificar la osteoartritis de rodilla de forma rápida y precisa.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/assets/logo.png'
</script>

<style scoped>
</style>