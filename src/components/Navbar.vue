<template>
  <nav class="bg-primary text-white shadow-md">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m2 0a8 8 0 11-16 0 8 8 0 0116 0z" />
        </svg>
        <h1 class="text-xl text-indigo-600 font-semibold tracking-wide">Attendance App</h1>
      </div>

      <button
        @click="logout"
        class="bg-indigo-600 font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.bg-primary {
  @apply bg-blue-600;
}
.text-primary {
  @apply text-blue-600;
}
</style>
