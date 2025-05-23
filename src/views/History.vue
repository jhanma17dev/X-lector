<template>
  <div class="history-container">
    <h1 class="history-title">Historial de Diagnósticos</h1>
    
    <div v-if="isLoading" class="loading-container bg-base-200">
      <div class="spinner"></div>
      <p>Cargando historial...</p>
    </div>
    
    <div v-else-if="error" class="error-container bg-base-200">
      <p>{{ error }}</p>
      <button @click="loadDiagnosisHistory" class="retry-button">Reintentar</button>
    </div>
    
    <div v-else-if="diagnosisList.length === 0" class="empty-state bg-base-200">
      <p>Aún no tienes diagnósticos guardados.</p>
      <router-link to="/" class="new-diagnosis-button">Crear nuevo diagnóstico</router-link>
    </div>
    
    <div v-else class="diagnosis-grid">
      <div 
        v-for="diagnosis in diagnosisList" 
        :key="diagnosis.id" 
        class="diagnosis-card bg-base-200"
        @click="goToDiagnosis(diagnosis.thread_id)"
      >
        <div class="card-header bg-base-200">
          <h3>{{ formatDate(diagnosis.created_at) }}</h3>
          <span 
            class="arthritis-indicator"
            :class="{ positive: diagnosis.has_arthritis, negative: !diagnosis.has_arthritis }"
          >
            {{ diagnosis.has_arthritis ? 'Artritis detectada' : 'Sin artritis' }}
          </span>
        </div>
        
        <div class="card-image">
          <img 
            :src="getRadiographyThumbnail(diagnosis.radiography)" 
            alt="Radiografía"
            class="radiography-thumbnail"
          />
        </div>
        
        <div class="card-footer bg-base-200">
          <button class="view-button">Ver diagnóstico</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient';
import { useAuthStore } from '@/stores/auth';

interface Diagnosis {
  id: number;
  user_id: string;
  thread_id: string;
  radiography: string;
  has_arthritis: boolean;
  created_at: string;
}

const router = useRouter();
const authStore = useAuthStore();
const diagnosisList = ref<Diagnosis[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

onMounted(() => {
  loadDiagnosisHistory();
});

async function loadDiagnosisHistory() {
  isLoading.value = true;
  error.value = null;
  
  try {
    const userId = authStore.getUserProfile?.id;
    
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }
    
    const { data, error: supabaseError } = await supabase
      .from('diagnosis')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (supabaseError) {
      throw new Error(supabaseError.message);
    }
    
    diagnosisList.value = data as Diagnosis[];
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error al cargar el historial de diagnósticos';
    console.error('Error al cargar el historial:', e);
  } finally {
    isLoading.value = false;
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function getRadiographyThumbnail(radiographyUrl: string): string {
  // If the URL is a base64 string, return it directly
  if (radiographyUrl.startsWith('data:image')) {
    return radiographyUrl;
  }
  
  // If it's a Supabase storage URL, return it
  return radiographyUrl;
}

function goToDiagnosis(threadId: string) {
  router.push(`/dashboard/diagnosis/${threadId}`);
}
</script>

<style scoped>
.history-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.history-title {
  font-size: 2rem;
  color: #d2d2d2;
  margin-bottom: 2rem;
  text-align: center;
}

.diagnosis-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.diagnosis-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  background-color: white;
}

.diagnosis-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
}

.arthritis-indicator {
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 50px;
  font-weight: 500;
}

.arthritis-indicator.positive {
  background-color: #ffebee;
  color: #c62828;
}

.arthritis-indicator.negative {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.card-image {
  height: 200px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.radiography-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-footer {
  padding: 1rem;
  text-align: center;
}

.view-button {
  background-color: #3f51b5;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view-button:hover {
  background-color: #303f9f;
}

.loading-container, .error-container, .empty-state {
  text-align: center;
  padding: 4rem 2rem;
  margin: 2rem auto;
  max-width: 600px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(63, 81, 181, 0.2);
  border-radius: 50%;
  border-top-color: #3f51b5;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.retry-button, .new-diagnosis-button {
  display: inline-block;
  background-color: #3f51b5;
  color: white;
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: 500;
  margin-top: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.retry-button:hover, .new-diagnosis-button:hover {
  background-color: #303f9f;
}
</style>