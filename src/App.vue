<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { watch, ref, onMounted } from 'vue'

const route = useRoute()
const noPadding = ref(false)

// Función para verificar y actualizar si estamos en la ruta raíz
const updatePadding = () => {
  noPadding.value = !route.path.includes('/dashboard')
  
  if (noPadding.value) {
    document.body.style.paddingTop = '0';
  } else {
    document.body.style.paddingTop = '2rem';
  }
}

// Actualizar cuando cambie la ruta
watch(() => route.path, updatePadding)

// Verificar al montar el componente
onMounted(() => {
  updatePadding()
})
</script>

<style scoped>
/* Estilos específicos del componente App */
</style>
