<template>
    <!-- Image Preview -->
    <div v-if="fileType === 'image'" class="w-full h-full">
      <img 
        :src="filePreview" 
        class="w-full h-full object-fit rounded-2xl" 
        alt="X-Ray Image" 
      />
    </div>
    
    <!-- PDF Preview -->
    <div v-else-if="fileType === 'pdf'" class="w-full h-full">
      <iframe 
        :src="filePreview" 
        class="w-full h-full rounded-2xl" 
        title="PDF Document"
      ></iframe>
    </div>
    
    <!-- Other file types -->
    <div v-else class="w-full h-full bg-base-300 rounded-2xl flex flex-col items-center justify-center p-4">
      <span class="material-symbols-outlined text-5xl mb-4">description</span>
      <p class="text-lg font-semibold">File: {{ fileName }}</p>
      <p class="mt-2 text-neutral">{{ fileType || 'Unknown file type' }}</p>
      <button @click="onRemoveFile" class="btn btn-error btn-sm mt-6">
        <span class="material-symbols-outlined">delete</span>
        Remove file
      </button>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  filePreview: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    default: 'File'
  }
})

const emit = defineEmits(['remove-file'])

const onRemoveFile = () => {
  emit('remove-file')
}
</script>

<style scoped>
/* Any additional styles specific to the preview component */
</style>