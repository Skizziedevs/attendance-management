<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">Attendance for {{ userName }}</h2>

    <ul v-if="records.length">
      <li
        v-for="record in records"
        :key="record.id"
        class="border-b py-2"
      >
        <strong>Date:</strong> {{ new Date(record.clockIn).toLocaleDateString() }} |
        <strong>Clock In:</strong> {{ new Date(record.clockIn).toLocaleTimeString() }} |
        <strong>Clock Out:</strong> {{ record.clockOut ? new Date(record.clockOut).toLocaleTimeString() : 'N/A' }}
      </li>
    </ul>

    <p v-else>No attendance records found for this user.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const userId = route.params.userId

const records = ref([])
const userName = ref('')

const fetchAttendance = async () => {
  const auth = JSON.parse(localStorage.getItem('auth'))
  const token = auth?.token

  try {
    const res = await axios.get(`http://localhost:5000/api/admin/attendance/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    records.value = res.data.attendanceRecords
    userName.value = res.data.attendanceRecords[0]?.User?.name || 'Unknown User'
  } catch (err) {
    console.error(err)
  }
}

onMounted(fetchAttendance)
</script>
