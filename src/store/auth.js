// store/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    setUser(data) {
      this.user = data.user
      this.token = data.token
      localStorage.setItem('auth', JSON.stringify(data))
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('auth')
    },
    persist() {
      const saved = localStorage.getItem('auth')
      if (saved) {
        const data = JSON.parse(saved)
        this.user = data.user
        this.token = data.token
      }
    }
  }
})
