import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient'
import { useAuthStore } from '@/stores/auth' // Import the auth store

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface Conclusion {
  text: string
}

interface Suggestion {
  icon: string
  importance: 'red' | 'yellow'
  text: string
  title: string
}

interface OpenAIState {
  messages: Message[]
  isLoading: boolean
  error: string | null
  threadId: string
  assistantId: string
  conclusions: Conclusion[]
  suggestions: Suggestion[]
}

export const useOpenAIStore = defineStore('openai', {
  state: (): OpenAIState => ({
    messages: [],
    threadId: '',
    isLoading: false,
    error: null,
    conclusions: [],
    suggestions: [],
    assistantId: 'asst_YUxngLyVxw0by39AEJzKjsCf',
  }),

  actions: {
    async createChat(content: string) {
      try {
        this.isLoading = true
        this.error = null

        this.resetState()

        const response = await fetch('https://api.openai.com/v1/threads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'OpenAI-Beta': 'assistants=v2',
          },
        })

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        const threadId = data.id
        this.threadId = threadId

        await this.sendMessage(content)

        return threadId
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error al comunicarse con OpenAI'
        console.error('Error en la comunicación con OpenAI:', error)
      } finally {
        this.isLoading = false
      }
    },

    async sendMessage(content: string) {
      try {
        this.isLoading = true
        this.error = null

        const response = await fetch(
          `https://api.openai.com/v1/threads/${this.threadId}/messages`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
              'OpenAI-Beta': 'assistants=v2',
            },
            body: JSON.stringify({
              role: 'user',
              content,
            }),
          },
        )

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`)
        }

        await this.createRun()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error al comunicarse con OpenAI'
        console.error('Error en la comunicación con OpenAI:', error)
      } finally {
        this.isLoading = false
      }
    },

    async createRun() {
      try {
        this.isLoading = true
        this.error = null

        const response = await fetch(`https://api.openai.com/v1/threads/${this.threadId}/runs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'OpenAI-Beta': 'assistants=v2',
          },
          body: JSON.stringify({
            assistant_id: this.assistantId,
            instructions: '',
          }),
        })

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`)
        }

        // Wait for run to complete before getting messages
        await new Promise((resolve) => setTimeout(resolve, 17000))
        await this.getMessages()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error al comunicarse con OpenAI'
        console.error('Error en la comunicación con OpenAI:', error)
      } finally {
        this.isLoading = false
      }
    },

    async getMessages() {
      try {
        this.isLoading = true
        this.error = null

        const response = await fetch(
          `https://api.openai.com/v1/threads/${this.threadId}/messages`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
              'OpenAI-Beta': 'assistants=v2',
            },
          },
        )

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`)
        }

        const { data } = await response.json()

        this.formatMessagesResponse(data)
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error al comunicarse con OpenAI'
        console.error('Error en la comunicación con OpenAI:', error)
      } finally {
        this.isLoading = false
      }
    },

    formatMessagesResponse(messages: any) {
      //reverses the messages array
      let formatedMessages = messages.reverse()

      //retrieves conclusions and suggestions from the 2nd message
      const secondMessage = formatedMessages[1]

      if (secondMessage && secondMessage.role === 'assistant') {
        let content = secondMessage.content[0].text.value

        console.log('Second message:', content)

        // parses the content as JSON
        content = JSON.parse(content)

        this.conclusions = content.conclusions
        this.suggestions = content.recommendations
      }

      // removes the first 2 messages
      for (let i = 2; i < formatedMessages.length; i++) {
        const message = formatedMessages[i]

        if (message.role == 'assistant') {
          console.log('Assistant message:', JSON.parse(message.content[0].text.value))
          this.messages.push({
            role: message.role,
            content: JSON.parse(message.content[0].text.value).response,
          })
        } else {
          console.log('User message:', message)
          this.messages.push({
            role: message.role,
            content: message.content[0].text.value,
          })
        }
      }
    },

    async saveDiagnosis(radiography: string, hasArtritis: boolean) {
      try {
        this.isLoading = true
        this.error = null

        const { data, error } = await supabase.from('diagnosis').insert([
          {
            user_id: useAuthStore().getUserProfile?.id,
            thread_id: this.threadId,
            radiography: radiography,
            has_arthritis: hasArtritis,
          },
        ])

        if (error) {
          throw new Error(`Database error: ${error.message}`)
        }

        console.log('Diagnosis saved:', data)
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error al guardar el diagnóstico'
        console.error('Error al guardar el diagnóstico:', error)
      } finally {
        this.isLoading = false
      }
    },

    async loadDiagnosis(threadId: string) {
      try {
        this.isLoading = true
        this.error = null

        this.resetState()
        this.threadId = threadId

        const { data, error } = await supabase
          .from('diagnosis')
          .select('*')
          .eq('user_id', useAuthStore().getUserProfile?.id)
          .eq('thread_id', threadId)

        if (error) {
          throw new Error(`Database error: ${error.message}`)
        }

        return data[0]
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error al obtener el diagnóstico'
        console.error('Error al obtener el diagnóstico:', error)
      } finally {
        this.isLoading = false
      }
    },

    resetState() {
      this.messages = []
      this.threadId = ''
      this.isLoading = false
      this.error = null
      this.conclusions = []
      this.suggestions = []
    },
  },
})
