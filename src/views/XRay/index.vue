<template>
  <span class="text-2xl font-semibold pl-4">X-Ray Diagnosis</span>

  <!-- Show file upload component when not in Diagnosis view and no file is selected -->
  <ImageUpload v-if="!isInDiagnosisView" @file-selected="onFileSelected" />

  <!-- Show file preview when in Diagnosis view or when file is selected -->
  <div v-else class="w-full full-height mt-6 flex">
    <div class="w-4/10 min-w-4/10 mr-8 rounded-2xl sticky top-0">
      <ImagePreview 
        :filePreview="filePreview"
        :fileType="fileType"
        :fileName="file?.name || ''"
        @remove-file="clearFile"
      />
    </div>

    <div class="relative flex flex-col">
      <!-- Diagnosis Results -->
      <Diagnosis/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ImageUpload from './XRayImageUpload.vue'
import ImagePreview from './XRayImagePreview.vue'
import Diagnosis from './XRayDiagnosis.vue'

const router = useRouter()
const route = useRoute()
const file = ref<File | null>(null)
const filePreview = ref<string>('')

// Check if we're in the Diagnosis view
const isInDiagnosisView = computed(() => {
  return route.name === 'Diagnosis'
})

// Determine file type for display purposes
const fileType = computed(() => {
  if (!file.value) return 'not set'

  if (file.value.type.includes('image')) {
    return 'image'
  } else if (file.value.type.includes('pdf')) {
    return 'pdf'
  } else {
    return 'other'
  }
})

const onFileSelected = (data: { file: File, preview: string, type: string, threadId: string }) => {
  file.value = data.file
  filePreview.value = data.preview

  router.push({
    name: 'Diagnosis',
    params: {
      id: data.threadId,
    }
  })
}

const clearFile = () => {
  if (filePreview.value) {
    URL.revokeObjectURL(filePreview.value)
  }

  file.value = null
  filePreview.value = ''
  
  // Navigate away from Diagnosis view if we're in it
  if (isInDiagnosisView.value) {
    router.push({ name: 'XRay' }) // Assuming 'XRay' is the parent route name
  }
}
</script>

<style scoped>
.full-height {
  height: calc(100vh - 4rem - 160px);
}

.no-scrollbar {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* Internet Explorer and Edge */
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
  /* Safari and Chrome */
}

.chat {
  height: calc(100vh - 4rem - 200px);
}

.object-fit {
  object-fit: contain;
}

.mask-opacity {
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0));
  -webkit-mask-size: 100%;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: left top;

  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0));
  mask-size: 100%;
  mask-repeat: no-repeat;
  mask-position: left top;
}
</style>
