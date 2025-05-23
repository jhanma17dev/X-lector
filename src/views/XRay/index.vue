<template>
  <span class="text-2xl font-semibold pl-4">Diagnostico</span>

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

<script>
import ImageUpload from './XRayImageUpload.vue'
import ImagePreview from './XRayImagePreview.vue'
import Diagnosis from './XRayDiagnosis.vue'
import { useOpenAIStore } from '@/stores/openai'

export default {
  name: 'XRayView',
  
  setup() {
    // Initialize store in setup function
    const openAIStore = useOpenAIStore()
    
    // Return the store to make it available in the component instance
    return { openAIStore }
  },
  
  components: {
    ImageUpload,
    ImagePreview,
    Diagnosis
  },
  
  data() {
    return {
      file: null,
      filePreview: ''
    }
  },
  
  computed: {
    // Check if we're in the Diagnosis view
    isInDiagnosisView() {
      return this.$route.name === 'Diagnosis'
    },
    
    // Determine file type for display purposes
    fileType() {
      if (!this.file) return 'not set'
      
      if (this.file.type.includes('image')) {
        return 'image'
      } else if (this.file.type.includes('pdf')) {
        return 'pdf'
      } else {
        return 'other'
      }
    }
  },
  
  methods: {
    onFileSelected(data) {
      this.file = data.file
      this.filePreview = data.preview
      
      this.$router.push({
        name: 'Diagnosis',
        params: {
          id: data.threadId,
        }
      })
    },
    
    clearFile() {
      if (this.filePreview) {
        URL.revokeObjectURL(this.filePreview)
      }
      
      this.file = null
      this.filePreview = ''
      
      // Navigate away from Diagnosis view if we're in it
      if (this.isInDiagnosisView) {
        this.$router.push({ name: 'XRay' }) // Assuming 'XRay' is the parent route name
      }
    }
  },

  async created() {
    if (this.isInDiagnosisView){
      // get the threadId from the route params
      let threadId = this.$route.params.id;

      if (threadId) {
        if (Array.isArray(threadId)) {
          threadId = threadId[0];
        }

        const diagnosis = await this.openAIStore.loadDiagnosis(threadId);
        this.filePreview = diagnosis.radiography
        this.file = {
          name: 'X-Ray Image',
          type: 'image/jpeg', // Assuming the file type
        };

        await this.openAIStore.getMessages();
      }
    }
  },
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
