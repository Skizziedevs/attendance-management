<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
    <h2 class="text-xl font-semibold mb-4 text-gray-700">Request Leave</h2>
    <form @submit.prevent="submitLeaveRequest" class="space-y-4">
      <div>
        <label class="block mb-1 font-medium text-gray-600">Start Date</label>
        <input type="date" v-model="form.startDate" class="w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block mb-1 font-medium text-gray-600">End Date</label>
        <input type="date" v-model="form.endDate" class="w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block mb-1 font-medium text-gray-600">Reason</label>
        <textarea v-model="form.reason" class="w-full border rounded px-3 py-2" rows="3" required></textarea>
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit Request
      </button>
    </form>

    <hr class="my-6" />

    <h3 class="text-lg font-semibold mb-2 text-gray-700">My Leave Requests</h3>
    <div v-if="leaves.length === 0" class="text-gray-500">No leave requests found.</div>
    <ul v-else class="space-y-3">
      <li v-for="leave in leaves" :key="leave.id" class="border p-3 rounded bg-gray-50">
        <p class="text-sm text-gray-700">
          <strong>{{ leave.startDate }}</strong> to <strong>{{ leave.endDate }}</strong>
        </p>
        <p class="text-sm text-gray-600 italic">Reason: {{ leave.reason }}</p>
        <p class="text-sm font-medium" :class="statusColor(leave.status)">
          Status: {{ leave.status }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const form = ref({
  startDate: '',
  endDate: '',
  reason: ''
})
 const auth = JSON.parse(localStorage.getItem('auth'))
  const token = auth?.token
const leaves = ref([])

const fetchLeaves = async () => {
  try {
  
    const res = await axios.get('http://localhost:5000/api/leaves/myLeaves', {
      headers: { Authorization: `Bearer ${token}` }
    })
    leaves.value = res.data
  } catch (err) {
    console.error('Failed to fetch leave requests:', err)
  }
}

const submitLeaveRequest = async () => {
  try {
 
    await axios.post('http://localhost:5000/api/leaves/requestLeave', form.value, {
      headers: { Authorization: `Bearer ${token}` }
    })
    alert('Leave request submitted.')
    form.value = { startDate: '', endDate: '', reason: '' }
    fetchLeaves()
  } catch (err) {
    console.error('Error submitting leave request:', err)
    alert('Failed to submit leave request.')
  }
}

const statusColor = (status) => {
  switch (status) {
    case 'approved':
      return 'text-green-600'
    case 'rejected':
      return 'text-red-600'
    default:
      return 'text-yellow-600'
  }
}

onMounted(fetchLeaves)
</script>
