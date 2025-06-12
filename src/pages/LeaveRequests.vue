<template>
  <div class="p-6">

    <h2 class="text-2xl font-bold mb-6">Leave Requests</h2>

    <table class="w-full border border-gray-300 rounded">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-3 border">Name</th>
          <th class="p-3 border">Email</th>
          <th class="p-3 border">Start Date</th>
          <th class="p-3 border">End Date</th>
          <th class="p-3 border">Reason</th>
          <th class="p-3 border">Status</th>
          <th class="p-3 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="leave in leaves" :key="leave.id" class="text-center">
          <td class="p-2 border">{{ leave.User?.name }}</td>
          <td class="p-2 border">{{ leave.User?.email }}</td>
          <td class="p-2 border">{{ formatDate(leave.startDate) }}</td>
          <td class="p-2 border">{{ formatDate(leave.endDate) }}</td>
          <td class="p-2 border">{{ leave.reason }}</td>
          <td class="p-2 border capitalize">{{ leave.status }}</td>
          <td class="p-2 border flex justify-center gap-2">
            <button
              class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
              @click="updateStatus(leave.id, 'approved')"
              :disabled="leave.status === 'approved'"
            >
              Approve
            </button>
            <button
              class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              @click="updateStatus(leave.id, 'rejected')"
              :disabled="leave.status === 'rejected'"
            >
              Reject
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const leaves = ref([])

// Fetch all leave requests
const fetchLeaves = async () => {

       const auth = JSON.parse(localStorage.getItem('auth'))
  const token = auth?.token
if (!token) return
  try {
    const res = await axios.get('http://localhost:5000/api/leaves/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    leaves.value = res.data
    console.log(res.data)
  } catch (error) {
    console.error('Failed to fetch leaves:', error)
  }
}


const updateStatus = async (id, status) => {
      
       const auth = JSON.parse(localStorage.getItem('auth'))
  const token = auth?.token
if (!token) return
  try {
    await axios.put(`http://localhost:5000/api/leaves/${id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    fetchLeaves()
  } catch (error) {
    console.error('Failed to update status:', error)
  }
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString()
}

onMounted(fetchLeaves)
</script>
