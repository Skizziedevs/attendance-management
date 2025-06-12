<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="bg-indigo-600 px-6 py-4">
          <h1 class="text-2xl font-bold text-white">Attendance System</h1>
        </div>
        
        <form @submit.prevent="login" class="p-6 space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="email"
              id="email"
              type="email"
              placeholder="your@email.com"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              :class="{ 'border-red-500': error }"
            />
          </div>
          
          <div>
            <div class="flex justify-between items-center mb-1">
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <router-link to="/forgot-password" class="text-xs text-indigo-600 hover:text-indigo-800">Forgot password?</router-link>
            </div>
            <input
              v-model="password"
              id="password"
              type="password"
              placeholder="••••••••"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              :class="{ 'border-red-500': error }"
            />
          </div>
          
          <div v-if="error" class="p-3 bg-red-50 text-red-700 text-sm rounded-lg">
            {{ error }}
          </div>
          
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
            :class="{ 'opacity-75 cursor-not-allowed': loading }"
          >
            <span v-if="!loading">Sign In</span>
            <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
        </form>
        
        <div class="px-6 py-4 bg-gray-50 text-center border-t border-gray-200">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">Sign up</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const login = async () => {
  error.value = ''
  loading.value = true
  
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: email.value,
      password: password.value
    })
    
authStore.setUser({
  token: response.data.token,
  user: {
    id: response.data.user.id,
    name: response.data.user.name,
    email: response.data.user.email,
    role: response.data.user.role
  }
})

    
console.log('User saved:', authStore.user) // ✅ Check what's stored
    
    // Redirect based on role
    if (response.data.user.role === 'admin') {
      router.push('/admin-dashboard')
    } else {
      router.push('/dashboard')
    }
    
  } catch (err) {
    if (err.response) {
      error.value = err.response.data.error || 'Login failed. Please try again.'
    } else {
      error.value = 'Network error. Please check your connection.'
    }
  } finally {
    loading.value = false
  }
}
</script>