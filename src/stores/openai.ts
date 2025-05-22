import { defineStore } from 'pinia'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface OpenAIState {
  messages: Message[]
  isLoading: boolean
  error: string | null
  threadId: string
  assistantId: string
}

export const useOpenAIStore = defineStore('openai', {
  state: (): OpenAIState => ({
    messages: [],
    threadId: '',
    isLoading: false,
    error: null,
    assistantId: 'asst_YUxngLyVxw0by39AEJzKjsCf',
  }),

  actions: {
    async createChat(content: string) {
      try {
        this.isLoading = true
        this.error = null

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

        // get messages after creating a run with a delay
        setTimeout(async () => {
          await this.getMessages()
        }, 5000)
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

        const data = await response.json()
        this.messages = data
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error al comunicarse con OpenAI'
        console.error('Error en la comunicación con OpenAI:', error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
