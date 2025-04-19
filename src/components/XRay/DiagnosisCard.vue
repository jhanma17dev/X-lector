<template>
  <div class="w-full bg-base-300 rounded-2xl flex flex-col border border-neutral mb-6">
    <span class="text-xl font-bold p-4">{{ title }}</span>

    <hr class="border-neutral" />

    <div class="text-sm p-4">
      <!-- Main content will be injected here -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>