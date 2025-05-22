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
  conclusions: string[]
  suggestions: string[]
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

        // parses the content as JSON
        content = JSON.parse(content)

        this.conclusions = content.conclusions
        this.suggestions = content.recommendations
      }

      // removes the first 2 messages
      for (let i = 2; i < formatedMessages.length; i++) {
        const message = formatedMessages[i]
        if (message.role === 'assistant') {
          this.messages.push({
            role: message.role,
            content: message.content[0].text.value,
          })
        } else {
          this.messages.push({
            role: message.role,
            content: message.content,
          })
        }
      }
    },
  },
})
