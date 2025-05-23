<template>
  <div class="overflow-auto">
    <div id="home" class="w-screen h-screen flex flex-col items-center justify-center">
      <!-- Background Image -->
      <div class="w-full h-full absolute landing-hero"></div>

      <!-- Dashboard Navbar -->
      <LandingLayout></LandingLayout>

      <div class="flex flex-col w-6/10 text-center">
        <h1 class="text-8xl capitalize font-regular">Diagnóstico IA de osteoartritis de rodilla.</h1>
        <h4 class="text-xl mt-4 font-light text-neutral w-6/10 mx-auto">
          Una herramienta innovadora de inteligencia artificial que facilita el diagnóstico temprano y preciso de la osteoartritis de rodilla.
        </h4>
        <div class="flex justify-center mt-8 z-2">
          <RouterLink to="/login">
            <button class="btn btn-secondary btn-lg rounded-full primary-shadow font-bold">Comenzar</button>
          </RouterLink>
          <button class="btn btn-secondary btn-lg rounded-full ml-4 btn-outline">Más información</button>
        </div>
      </div>
    </div>

    <div id="about" class="flex flex-col pt-16 items-center">
      <div class="w-7/10 text-center">
        <h1 class="text-4xl font-bold mt-8">Sobre Nosotros</h1>
        <p class="text-lg mt-4 w-6/10 mx-auto text-neutral">
          Somos un equipo multidisciplinario de profesionales dedicados a mejorar la detección temprana de osteoartritis de rodilla. 
          Nuestro sistema utiliza modelos de inteligencia artifical para analizar imágenes médicas, 
          proporcionando a los especialistas una herramienta complementaria que agiliza el diagnóstico y mejora la precisión.
        </p>
      </div>

      <!-- Team Section -->
      <div class="w-8/10 flex mt-16 mb-16">
        <div class="w-1/3 flex flex-col items-center justify-center px-8" v-for="member in teamMembers" :key="member.id">
          <img
            :src="member.image"
            class="w-full rounded-xl primary-shadow object-cover aspect-square"
            :alt="member.name"
          />

          <div class="flex mt-4 justify-between items-center w-full">
            <span class="text-3xl font-bold">{{ member.name }}</span>
            <div class="text-lg">
              <a :href="member.github" target="_blank" class="btn btn-circle btn-ghost">
                <svg width="32px" height="32px" viewBox="-2.4 -2.4 28.80 28.80" fill="none">
                  <g>
                    <path
                      d="M9.29183 21V18.4407L9.3255 16.6219C9.36595 16.0561 9.58639 15.5228 9.94907 15.11C9.95438 15.1039 9.95972 15.0979 9.9651 15.0919C9.9791 15.0763 9.96988 15.0511 9.94907 15.0485V15.0485C7.52554 14.746 5.0005 13.7227 5.0005 9.26749C4.9847 8.17021 5.3427 7.10648 6.00437 6.27215C6.02752 6.24297 6.05103 6.21406 6.07492 6.18545V6.18545C6.10601 6.1482 6.11618 6.09772 6.10194 6.05134C6.10107 6.04853 6.10021 6.04571 6.09935 6.04289C6.0832 5.9899 6.06804 5.93666 6.05388 5.88321C5.81065 4.96474 5.86295 3.98363 6.20527 3.09818C6.20779 3.09164 6.21034 3.08511 6.2129 3.07858C6.22568 3.04599 6.25251 3.02108 6.28698 3.01493V3.01493C6.50189 2.97661 7.37036 2.92534 9.03298 4.07346C9.08473 4.10919 9.13724 4.14609 9.19053 4.18418V4.18418C9.22901 4.21168 9.27794 4.22011 9.32344 4.20716C9.32487 4.20675 9.32631 4.20634 9.32774 4.20593C9.41699 4.18056 9.50648 4.15649 9.59617 4.1337C11.1766 3.73226 12.8234 3.73226 14.4038 4.1337C14.4889 4.1553 14.5737 4.17807 14.6584 4.20199C14.6602 4.20252 14.6621 4.20304 14.6639 4.20356C14.7174 4.21872 14.7749 4.20882 14.8202 4.17653V4.17653C14.8698 4.14114 14.9187 4.10679 14.967 4.07346C16.6257 2.92776 17.4894 2.9764 17.7053 3.01469V3.01469C17.7404 3.02092 17.7678 3.04628 17.781 3.07946C17.7827 3.08373 17.7843 3.08799 17.786 3.09226C18.1341 3.97811 18.1894 4.96214 17.946 5.88321C17.9315 5.93811 17.9159 5.9928 17.8993 6.04723V6.04723C17.8843 6.09618 17.8951 6.14942 17.9278 6.18875C17.9289 6.18998 17.9299 6.19121 17.9309 6.19245C17.9528 6.21877 17.9744 6.24534 17.9956 6.27215C18.6573 7.10648 19.0153 8.17021 18.9995 9.26749C18.9995 13.747 16.4565 14.7435 14.0214 15.015V15.015C14.0073 15.0165 14.001 15.0334 14.0105 15.0439C14.0141 15.0479 14.0178 15.0519 14.0214 15.0559C14.2671 15.3296 14.4577 15.6544 14.5811 16.0103C14.7101 16.3824 14.7626 16.7797 14.7351 17.1754V21"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M4 17C4.36915 17.0523 4.72159 17.1883 5.03065 17.3975C5.3397 17.6068 5.59726 17.8838 5.7838 18.2078C5.94231 18.4962 6.15601 18.7504 6.41264 18.9557C6.66927 19.161 6.96379 19.3135 7.27929 19.4043C7.59478 19.4952 7.92504 19.5226 8.25112 19.485C8.5772 19.4475 8.89268 19.3457 9.17946 19.1855"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>
              </a>

              <a :href="member.linkedin" target="_blank" class="btn btn-circle btn-ghost p-2">
                <svg width="32px" height="32px" viewBox="0 0 24 24">
                  <g>
                    <path
                      d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z"
                      fill="#ffffff"
                    ></path>
                    <path
                      d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z"
                      fill="#ffffff"
                    ></path>
                    <path
                      d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z"
                      fill="#ffffff"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z"
                      fill="#ffffff"
                    ></path>
                  </g>
                </svg>
              </a>
            </div>
          </div>

          <span class="mt-2 text-neutral text-xl w-full">
            {{ member.role }}
          </span>
        </div>
      </div>
    </div>

    <div id="eda">
      <!-- EDA Section -->
      <EDA class="w-full h-full flex flex-col items-center justify-center" />
    </div>

    <!-- Footer Section -->
    <footer class="w-full flex flex-col justify-center items-center py-6 bg-base-200">
      <div class="text-center">
        <p class="text-base text-neutral font-medium mb-2">Proyecto Final por:</p>
        <div class="flex justify-center space-x-4 mb-3">
          <span v-for="member in teamMembers" :key="member.id" class="text-sm text-neutral">
            {{ member.name }}
          </span>
        </div>
        <p class="text-xs text-neutral mt-2">© 2025 - Todos los derechos reservados</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import LandingLayout from '@/layouts/LandingLayout.vue'
import EDA from '@/components/EDA.vue'
import { RouterLink } from 'vue-router'
import JhanImage from '@/assets/jhan.jpg'
import SebastianImage from '@/assets/sebastian.jpg'
import LunaImage from '@/assets/luna.jpg'

// Datos del equipo
const teamMembers = [
  {
    id: 1,
    name: 'Jhan Bolivar',
    role: 'Desarrollador Frontend | Diseño UI/UX',
    image: JhanImage,
    github: 'https://github.com/jhanbolivar',
    linkedin: 'https://linkedin.com/in/jhanbolivar'
  },
  {
    id: 2,
    name: 'Sebastian',
    role: 'Analista de Datos',
    image: SebastianImage,
    github: 'https://github.com/sebastianrodriguez',
    linkedin: 'https://linkedin.com/in/sebastianrodriguez'
  },
  {
    id: 3,
    name: 'Luna',
    role: 'Analista de Datos',
    image: LunaImage,
    github: 'https://github.com/lunamartinez',
    linkedin: 'https://linkedin.com/in/lunamartinez'
  }
]
</script>

<style>
body,
html {
  margin: 0;
  overflow: auto;
  scrollbar-width: none !important; /* Firefox */
  -ms-overflow-style: none !important; /* Internet Explorer and Edge */
}

body::-webkit-scrollbar,
html::-webkit-scrollbar {
  display: none !important; /* Safari and Chrome */
}

.primary-shadow {
  box-shadow: 0 0 16px rgba(67, 65, 255, 0.6);
}

.landing-hero {
  background-image: url('@/assets/Hero-1.png'), url('@/assets/Hero-3.png');
  background-size:
    auto 110%,
    auto 100%;
  background-repeat: no-repeat, no-repeat;
  background-position:
    -100px -80px,
    100% 0;
  opacity: 0.4;
  filter: blur(2px);
}
</style>
