<template>
  <div class="p-6">
   
    <h2 class="text-xl font-bold mb-4">Attendance for User ID: {{ userId }}</h2>
    <table class="w-full table-auto border">
      <thead class="bg-gray-200">
        <tr>
          <th class="p-2 border">Clock In</th>
          <th class="p-2 border">Clock Out</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in attendance" :key="record._id">
          <td class="p-2 border">{{ record.clockIn }}</td>
          <td class="p-2 border">{{ record.clockOut || 'N/A' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Navbar from '../components/Navbar.vue'

const route = useRoute()
const userId = route.params.userId
const attendance = ref([])
const token = localStorage.getItem('token')

onMounted(async () => {
  const res = await axios.get(`http://localhost:5000/attendance/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  attendance.value = res.data
})
</script>
