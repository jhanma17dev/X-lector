<template>
  <div
    class="w-full full-height outline-dashed outline-primary mt-6 rounded-2xl bg-primary/10 flex flex-col items-center justify-center text-sm font-semibold"
  >
    <span>Add an X-Ray file</span>
    <span class="mt-1">Allowed Formats: DICOM, PDF, PNG, JPEG</span>
    <button class="btn btn-primary rounded-full mt-4 text-sm" @click="handleFileUpload">
      <span class="material-symbols-outlined"> add </span>
      Add File
      <input
        id="file-upload"
        type="file"
        class="hidden"
        accept=".dcm,.pdf,.png,.jpg,.jpeg"
        @change="onFileChange"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits(['file-selected'])

const handleFileUpload = () => {
  const fileInput = document.getElementById('file-upload') as HTMLInputElement
  fileInput.click()
}

const onFileChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement
  const selectedFile = fileInput.files?.[0]
  
  if (selectedFile) {
    const filePreview = URL.createObjectURL(selectedFile)
    console.log('Selected file:', selectedFile)
    
    // Emit event to parent component
    emit('file-selected', {
      file: selectedFile,
      preview: filePreview,
      type: selectedFile.type
    })
  }
}
</script>

<style scoped>
.full-height {
  height: calc(100vh - 4rem - 160px);
}
</style>