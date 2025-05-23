<template>
  <div
    class="w-full full-height outline-dashed outline-primary mt-6 rounded-2xl bg-primary/10 flex flex-col items-center justify-center text-sm font-semibold"
  >
    <span>Agregar radiografía de rodilla</span>
    <span class="mt-1">Formatos permitidos: DICOM, PDF, PNG, JPEG</span>
    <button class="btn btn-primary rounded-full mt-4 text-sm" @click="handleFileUpload" :disabled="isUploading">
      <span class="material-symbols-outlined"> add </span>
      {{ isUploading ? 'Subiendo...' : 'Agregar archivo' }}
      <input
        id="file-upload"
        type="file"
        class="hidden"
        accept=".dcm,.pdf,.png,.jpg,.jpeg"
        @change="onFileChange"
      />
    </button>
    <div v-if="uploadError" class="text-error mt-2">
      {{ uploadError }}
    </div>
    <div v-if="apiResponse" class="mt-4 p-3 bg-success/20 rounded-lg">
      <h3 class="font-bold">Respuesta del sistema:</h3>
      <pre class="text-xs overflow-auto max-h-40">{{ apiResponse }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { useAuthStore } from '@/stores/auth'
import { useOpenAIStore } from '@/stores/openai'

export default {
  name: 'XRayImageUpload',
  
  emits: ['file-selected'],
  
  setup() {
    // Inicializar store en la función setup
    const authStore = useAuthStore()
    const openAIStore = useOpenAIStore()
    
    // Retornar el store para hacerlo disponible en la instancia del componente
    return { authStore, openAIStore }
  },
  
  data() {
    return {
      isUploading: false,
      uploadError: '',
      apiResponse: null
    }
  },
  
  methods: {
    handleFileUpload() {
      const fileInput = document.getElementById('file-upload') as HTMLInputElement
      fileInput.click()
    },
    
    async onFileChange(event: Event) {
      const fileInput = event.target as HTMLInputElement
      const selectedFile = fileInput.files?.[0]
      
      if (!selectedFile) return
      
      this.isUploading = true
      this.uploadError = ''
      this.apiResponse = null
      
      try {
        // Crear vista previa local para retroalimentación inmediata
        const filePreview = URL.createObjectURL(selectedFile)
        
        // Obtener el ID del usuario actual
        const userId = this.authStore.getUserProfile?.id
        
        if (!userId) {
          throw new Error('Usuario no autenticado')
        }
        
        // Generar una ruta de archivo única en la carpeta del usuario
        const timestamp = new Date().getTime()
        const filePath = `${userId}/${timestamp}-${selectedFile.name}`
        
        // Subir archivo al almacenamiento de Supabase
        const { data, error } = await supabase.storage
          .from('radiographys') 
          .upload(filePath, selectedFile, {
            cacheControl: '3600',
            upsert: false
          })
          
        if (error) throw error
        
        // Obtener la URL pública del archivo subido
        const { data: urlData } = supabase.storage
          .from('radiographys') 
          .getPublicUrl(filePath)
          
        const publicUrl = urlData.publicUrl
        
        // Enviar el archivo a la API para su análisis
        const response = await this.sendToAPI(selectedFile)

        let has_arthritis = response.prediction == 'positive' ? false : true
        
        await this.initializeChat(has_arthritis ? 'positive' : 'negative', filePreview, selectedFile, publicUrl)
      } catch (error) {
        console.error('Error al subir archivo:', error)
        this.uploadError = error instanceof Error ? error.message : 'Error al subir el archivo'
      } finally {
        this.isUploading = false
      }
    },
    
    async sendToAPI(file: File) {
      try {
        // Crear un objeto FormData para enviar el archivo
        const formData = new FormData()
        formData.append('image', file)
        
        // Realizar la solicitud a la API
        const response = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          body: formData,
        })
        
        if (!response.ok) {
          throw new Error(`La API respondió con estado: ${response.status}`)
        }
        
        // Analizar y almacenar la respuesta de la API
        const data = await response.json()
        
        return data
      } catch (apiError) {
        console.error('La solicitud a la API falló:', apiError)
        if (apiError instanceof Error) {
          this.uploadError = `Error de API: ${apiError.message}`
        } else {
          this.uploadError = 'Error de API: Ocurrió un error desconocido'
        }
        throw apiError
      }
    },

    async initializeChat(diagnosis: string, filePreview: string, selectedFile: File, radiography: string) {
      try {
        const threadId = await this.openAIStore.createChat(
          'Tiene osteoartritis: ' + diagnosis
        )

        const hasArtritis = diagnosis == 'positive' ? true : false

        await this.openAIStore.saveDiagnosis(
          radiography,
          hasArtritis,
        )

        this.$emit('file-selected', {
          file: selectedFile,
          preview: filePreview,
          type: selectedFile.type,
          threadId: threadId,
        })
      } catch (error) {
        console.error('Error al inicializar el chat:', error)
      }
    },
  }
}
</script>

<style scoped>
.full-height {
  height: calc(100vh - 4rem - 160px);
}
</style>