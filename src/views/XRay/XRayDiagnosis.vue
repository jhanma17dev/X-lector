<template>
  <div class="mask-opacity diagnosis-results overflow-scroll no-scrollbar flex flex-col">
    <!-- Conclusions Section -->
    <DiagnosisCard title="Conclusions">
      <ul class="list-disc list-outside pl-4">
        <template v-for="(conclusion, index) in conclusions" :key="index"> 
          <li class="text-md">
            <span v-html="conclusion.text"></span>
          </li>
          <br />
        </template>
      </ul>
    </DiagnosisCard>

    <!-- Suggestions Section -->
    <DiagnosisCard title="Suggestions">
      <template v-for="(suggestion, index) in suggestions" :key="index">
        <div class="flex mb-6"> 
          <div
            class="flex min-w-[64px] min-h-[64px] w-[64px] h-[64px] rounded-lg bg-primary/30 items-center justify-center relative"
          >
            <div v-html="icons[suggestion.icon]"></div>

            <svg v-if="suggestion.importance == 'red'" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
              fill="#f59b08" class="absolute -top-2 -right-2 m-auto">
              <path
                d="m48-144 432-720 432 720H48Zm431.79-120q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5ZM444-384h72v-192h-72v192Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
              fill="#f42423" class="absolute -top-2 -right-2 m-auto">
              <path
                d="M479.79-300q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5ZM444-432h72v-240h-72v240ZM341-144 144-342v-277l197-197h278l197 197v278L618-144H341Z" />
            </svg>
          </div>

          <div class="flex flex-col ml-4">
            <span class="text-sm font-semibold">{{suggestion.title}}</span>
            <span class="text-xs text-neutral mt-1">
              <span v-html="suggestion.text"></span>
            </span>
          </div>
        </div>
      </template>
    </DiagnosisCard>

    <!-- Chat Messages Section -->
    <DiagnosisCard v-if="messages && messages && messages.length > 0" title="Chat with AI Assistant">
      <div v-for="(message, index) in messages" :key="index" class="mb-4">
        <div :class="[
          'p-3 rounded-lg max-w-[80%]', 
          message.role === 'user' ? 'ml-auto bg-primary/20' : 'bg-base-200'
        ]">
          <span class="text-sm">
            <span v-html="message.content"></span>
          </span>
        </div>
      </div>
    </DiagnosisCard>
  </div>

  <!-- Chat input at the bottom -->
  <form @submit.prevent="sendUserMessage" class="absolute bottom-0 w-full">
    <div class="relative">
      <input 
        v-model="userInput"
        class="w-full bg-base-300 rounded-2xl border border-neutral h-[40px] px-4 pr-12"
        type="text" 
        placeholder="Ask something..."
        :disabled="isLoading"
      />
      <button 
        type="submit"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-base-200"
        :disabled="isLoading || !userInput.trim()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="#7dc8c2">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
        </svg>
      </button>
    </div>
    <p v-if="isLoading" class="text-xs text-center mt-1">Processing your request...</p>
    <p v-if="error" class="text-xs text-error text-center mt-1">{{ error }}</p>
  </form>
</template>

<script lang="ts">
import DiagnosisCard from '@/components/XRay/DiagnosisCard.vue'
import { useOpenAIStore } from '@/stores/openai'

export default {
  name: 'XRayDiagnosis',
  
  setup() {
    // Initialize store in setup function
    const openAIStore = useOpenAIStore()
    
    // Return the store to make it available in the component instance
    return { openAIStore }
  },
  
  components: {
    DiagnosisCard,
  },
  
  data() {
    return {
      userInput: '',
      icons: {
        fitness_center: '<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#7dc8c2"><path d="m545.33-84-46.66-46.67 142-142-368-368-142 142L84-545.33l56-58-56-56L168.67-744 122-791.33 168.67-838l48 46 84-84 56 56 58-56 46.66 46.67-142 142 368 368 142-142L876-414.67l-56 58 56 56-85.33 85.34L837.33-168l-46.66 46.67L743.33-168l-84 84-56-56-58 56Z"/></svg>',
        medication: '<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#7dc8c2"><path d="m313.33-60-66.66-50v-176.67h-53.34q-27 0-46.83-19.83t-19.83-46.83v-313.34H120q-14.17 0-23.75-9.61-9.58-9.62-9.58-23.84 0-14.21 9.58-23.71t23.75-9.5h126.67v-80H220q-14.17 0-23.75-9.62t-9.58-23.83q0-14.22 9.58-23.72 9.58-9.5 23.75-9.5h120q14.17 0 23.75 9.62 9.58 9.61 9.58 23.83 0 14.22-9.58 23.72-9.58 9.5-23.75 9.5h-26.67v80H440q14.17 0 23.75 9.61 9.58 9.62 9.58 23.84 0 14.21-9.58 23.71t-23.75 9.5h-6.67v313.34q0 27-19.83 46.83t-46.83 19.83h-53.34V-60Zm-120-293.33h173.34v-73.34H290q-9.33 0-16.33-7-7-7-7-16.33 0-9.33 7-16.33 7-7 16.33-7h76.67v-73.34H290q-9.33 0-16.33-7-7-7-7-16.33 0-9.33 7-16.33 7-7 16.33-7h76.67v-73.34H193.33v313.34ZM600-80q-27 0-46.83-19.83-19.84-19.84-19.84-46.84v-264q0-31 8.67-48.33t21-31.33q16.33-18 23.33-28.17 7-10.17 7-21.5v-26.67h-6.66q-14.17 0-23.75-9.61-9.59-9.62-9.59-23.84 0-14.21 9.84-23.71 9.83-9.5 23.5-9.5h200q14.16 0 23.75 9.61 9.58 9.62 9.58 23.84 0 14.21-9.58 23.71-9.59 9.5-23.75 9.5H780V-540q0 10.67 8.33 22.67 8.34 12 25 30 12.34 14 19.5 30.33 7.17 16.33 7.17 46.33v264q0 27-19.83 46.84Q800.33-80 773.33-80H600Zm0-306.67h173.33v-24q0-17-9.66-30-9.67-13-21.34-27.33-13.66-17-21.33-33-7.67-16-7.67-39v-26.67H660V-540q0 22-7.17 38-7.16 16-20.83 33-11.67 14.33-21.83 27.83-10.17 13.5-10.17 30.5v24Zm0 120h173.33V-340H600v73.33Zm0 120h173.33V-220H600v73.33Zm0-120h173.33H600Z"/></svg>',
        restaurant: '<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#7dc8c2"><path d="M283.33-80v-367.33q-51.66-12-87.5-53.67Q160-542.67 160-600v-280h66.67v280h56.66v-280H350v280h56.67v-280h66.66v280q0 57.33-35.83 99T350-447.33V-80h-66.67Zm410 0v-320H576.67v-296.67q0-80.33 51.5-131.83Q679.67-880 760-880v800h-66.67Z"/></svg>',
        self_improvement: '<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#7dc8c2"><path d="M264.67-160q-27.34 0-45.67-18.33-18.33-18.34-18.33-45.67 0-19 10-36.17 10-17.16 28-24.5l166.66-66v-122q-62 75-131.16 113.5Q205-320.67 120-320.67v-66.66q68 0 123.83-30.34 55.84-30.33 100.84-85.66L401.33-568q10.67-12.67 25-20.33 14.34-7.67 31-7.67h45.34q16.66 0 31.33 7.67 14.67 7.66 25.33 20.33L616-503.33q47 54 101.5 85t122.5 31v66.66q-84.33 0-153.83-38.5-69.5-38.5-131.5-113.5v122l166.66 66q18 7.34 28 24.5 10 17.17 10 36.17 0 27.33-18.33 45.67Q722.67-160 695.33-160h-298v-14q0-26 16.34-42.33Q430-232.67 456-232.67h128.67q8.33 0 14.16-5.83 5.84-5.83 5.84-14.17 0-8.33-5.84-14.16-5.83-5.84-14.16-5.84H456q-43.33 0-70.33 27.67t-27 71v14h-94ZM480-649.33q-31 0-53.17-22.17-22.16-22.17-22.16-53.17t22.16-53.16Q449-800 480-800t53.17 22.17q22.16 22.16 22.16 53.16 0 31-22.16 53.17Q511-649.33 480-649.33Z"/></svg>',
        local_hospital: '<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#7dc8c2"><path d="M430-279.33h100V-430h150.67v-100H530v-150.67H430V-530H279.33v100H430v150.67ZM186.67-120q-27 0-46.84-19.83Q120-159.67 120-186.67v-586.66q0-27 19.83-46.84Q159.67-840 186.67-840h586.66q27 0 46.84 19.83Q840-800.33 840-773.33v586.66q0 27-19.83 46.84Q800.33-120 773.33-120H186.67Zm0-66.67h586.66v-586.66H186.67v586.66Zm0-586.66v586.66-586.66Z"/></svg>',
      } as Record<string, string>
    }
  },
  
  computed: {
    conclusions() {
      return this.openAIStore.conclusions
    },
    suggestions() {
      return this.openAIStore.suggestions
    },
    messages() {
      return this.openAIStore.messages
    },
    isLoading() {
      return this.openAIStore.isLoading
    },
    error() {
      return this.openAIStore.error
    }
  },
  
  methods: {
    async sendUserMessage() {
      if (!this.userInput.trim()) return;
      
      // If there's no active thread yet, create a new chat
      if (!this.openAIStore.threadId) {
        await this.openAIStore.createChat(this.userInput);
      } else {
        // Otherwise, send message to existing thread
        await this.openAIStore.sendMessage(this.userInput);
      }
      
      // Clear input after sending
      this.userInput = '';
    }
  },
}
</script>

<style scoped>
.diagnosis-results {
  height: calc(100vh - 4rem - 200px);
}

.no-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer and Edge */
}

.no-scrollbar::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
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