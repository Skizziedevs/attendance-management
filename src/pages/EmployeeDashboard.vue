<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="max-w-md mx-auto mt-8">
      <!-- Welcome Card -->
      <div class="bg-white rounded-lg shadow p-6 mb-4">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Welcome, {{ user.name }}</h1>
        <p class="text-gray-600">{{ currentDate }}</p>
      </div>

      <!-- 👇 Request Leave Button -->
      <RouterLink
        to="/request-leave"
        class="block text-center mb-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow transition duration-300"
      >
        Request Leave
      </RouterLink>

      <!-- Attendance Card -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Today's Attendance</h2>

        <div class="space-y-4">
          <button 
            @click="handleClockIn"
            :disabled="isClockedIn || loading"
            class="w-full py-3 px-4 bg-green-500 text-white rounded-lg font-medium disabled:bg-gray-200 disabled:text-gray-500"
          >
            {{ isClockedIn ? 'Already Clocked In' : 'Clock In' }}
          </button>

          <button 
            @click="handleClockOut"
            :disabled="!isClockedIn || isClockedOut || loading"
            class="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-medium disabled:bg-gray-200 disabled:text-gray-500"
          >
            {{ isClockedOut ? 'Already Clocked Out' : 'Clock Out' }}
          </button>
        </div>

        <!-- Status Message -->
        <div v-if="clockInTime" class="mt-4 p-3 rounded-lg" :class="statusClass">
   
          <p v-if="clockInTime" class="text-sm mt-1">Clocked in at: {{ formatTime(clockInTime) }}</p>
          <p v-if="clockOutTime" class="text-sm mt-1">Clocked out at: {{ formatTime(clockOutTime) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../store/auth'
import { computed } from 'vue'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
const loading = ref(false)
const isClockedIn = ref(false)
const isClockedOut = ref(false)
const clockInTime = ref(null)
const clockOutTime = ref(null)
const onLeave = ref(false)

const currentDate = new Date().toLocaleDateString('en-US', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})

// Format time for display
const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Status message and styling
const statusMessage = ref('Ready to clock in')
const statusClass = ref('bg-gray-100 text-gray-800')

const updateStatus = () => {
  if (onLeave.value) {
    statusMessage.value = 'You are on approved leave today'
    statusClass.value = 'bg-yellow-100 text-yellow-800'
  } else if (isClockedOut.value) {
    statusMessage.value = 'You have completed your work day'
    statusClass.value = 'bg-blue-100 text-blue-800'
  } else if (isClockedIn.value) {
    statusMessage.value = 'You are currently clocked in'
    statusClass.value = 'bg-green-100 text-green-800'
  } else {
    statusMessage.value = 'Ready to clock in'
    statusClass.value = 'bg-gray-100 text-gray-800'
  }
}

// Check today's attendance status
const checkAttendance = async () => {
  try {
    const today = new Date().toISOString().slice(0, 10)
    const response = await axios.get('http://localhost:5000/api/attendance/today', {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    
    if (response.data) {
      isClockedIn.value = !!response.data.clockIn
      isClockedOut.value = !!response.data.clockOut
      clockInTime.value = response.data.clockIn
      clockOutTime.value = response.data.clockOut
      onLeave.value = response.data.status === 'absent'
      updateStatus()
    }
  } catch (error) {
    console.error('Error checking attendance:', error)
  }
}

// Clock In handler
const handleClockIn = async () => {
  loading.value = true
  try {
    await axios.post('http://localhost:5000/api/attendance/clock-in', {}, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    await checkAttendance()
  } catch (error) {
    alert(error.response?.data?.error || 'Failed to clock in')
  } finally {
    loading.value = false
  }
}

// Clock Out handler
const handleClockOut = async () => {
  loading.value = true
  try {
    await axios.post('http://localhost:5000/api/attendance/clock-out', {}, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    await checkAttendance()
  } catch (error) {
    alert(error.response?.data?.error || 'Failed to clock out')
  } finally {
    loading.value = false
  }
}

// Initialize
onMounted(() => {
  checkAttendance()
})
</script>