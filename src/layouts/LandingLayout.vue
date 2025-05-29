<template>
  <header class="navbar w-full px-4 sm:px-8 absolute top-4">
    <div class="flex items-center w-1/4">
      <img :src="Logo" class="h-6 sm:h-8 w-auto mr-2 sm:mr-4" alt="Logo" />
    </div>

    <!-- Nav para pantallas medianas y grandes -->
    <nav class="hidden md:flex items-center w-2/4 justify-center text-neutral">
      <a class="mx-2 lg:mx-4 cursor-pointer hover:text-primary" @click="scrollToSection('home')">
        Inicio
      </a>

      <a class="mx-2 lg:mx-4 cursor-pointer hover:text-primary" @click="scrollToSection('about')">
        Sobre Nosotros
      </a>

      <a class="mx-2 lg:mx-4 cursor-pointer hover:text-primary" @click="scrollToSection('eda')">
        EDA
      </a>
    </nav>

    <!-- Menú hamburguesa para móviles -->
    <div class="md:hidden flex-1 flex justify-end">
      <label for="my-drawer" class="btn btn-ghost drawer-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </label>
    </div>

    <nav class="hidden md:flex items-center w-1/4 justify-end">
      <RouterLink to="/login">
        <button class="btn btn-secondary rounded-full primary-shadow font-bold text-sm sm:text-base">Iniciar Sesión</button>
      </RouterLink>
    </nav>
  </header>

  <!-- Drawer para móviles -->
  <div class="drawer md:hidden">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side z-20">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-60 h-full bg-base-200 text-base-content">
        <li><a @click="navigateAndClose('home')">Inicio</a></li>
        <li><a @click="navigateAndClose('about')">Sobre Nosotros</a></li>
        <li><a @click="navigateAndClose('eda')">EDA</a></li>
        <li class="mt-4">
          <RouterLink to="/login" class="btn btn-secondary w-full">
            Iniciar Sesión
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Logo from '/assets/Logo.png'

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}

const navigateAndClose = (sectionId: string) => {
  // Cierra el drawer
  const drawerToggle = document.getElementById('my-drawer') as HTMLInputElement
  if (drawerToggle) {
    drawerToggle.checked = false
  }
  
  // Navega después de un pequeño delay para permitir que el drawer se cierre primero
  setTimeout(() => {
    scrollToSection(sectionId)
  }, 300)
}
</script>
