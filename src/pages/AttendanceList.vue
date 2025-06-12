<template>
  <div class="p-6">
    
    <h2 class="text-2xl font-bold mb-4">All Attendance Records</h2>

    <div v-if="loading">Loading...</div>
    <div v-else-if="attendance.length === 0">No attendance records found.</div>

    <table v-else class="min-w-full bg-white shadow rounded">
      <thead class="bg-gray-100 text-left">
        <tr>
          <th class="p-3">Name</th>
          <th class="p-3">Email</th>
          <th class="p-3">Clock In</th>
          <th class="p-3">Clock Out</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in attendance" :key="record.id" class="border-t">
          <td class="p-3">{{ record.User.name }}</td>
          <td class="p-3">{{ record.User.email }}</td>
          <td class="p-3">{{ formatTime(record.clockIn) }}</td>
          <td class="p-3">{{ formatTime(record.clockOut) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Navbar from '../components/Navbar.vue'

const attendance = ref([])
const loading = ref(true)

const fetchAttendance = async () => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  const token = auth?.token;

  if (!token) {
    console.error('No token found in localStorage');
    attendance.value = [];
    loading.value = false;
    return;
  }

  try {
    const res = await axios.get('http://localhost:5000/api/admin/attendance', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    attendance.value = res.data.attendanceRecords;
  } catch (err) {
    console.error(err);
    attendance.value = [];
  } finally {
    loading.value = false;
  }
};


const formatTime = (dateStr) => new Date(dateStr).toLocaleString()

onMounted(() => {
  fetchAttendance()
})
</script>
