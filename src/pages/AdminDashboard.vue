<template>
  <div class="min-h-screen bg-gray-50 p-6">
    

    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <RouterLink to="/admin/attendance" class="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl shadow-md transition">
          <h2 class="text-xl font-semibold">📋 View All Attendance</h2>
          <p class="text-sm mt-2">See complete daily attendance logs</p>
        </RouterLink>

        <RouterLink to="/admin/employees" class="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl shadow-md transition">
          <h2 class="text-xl font-semibold">👤 View Individual Attendance</h2>
          <p class="text-sm mt-2">Track attendance per employee</p>
        </RouterLink>

        <RouterLink to="/admin/leaves" class="bg-yellow-500 hover:bg-yellow-600 text-white p-6 rounded-xl shadow-md transition">
          <h2 class="text-xl font-semibold">📅 Leave Requests</h2>
          <p class="text-sm mt-2">Approve or deny leave requests</p>
        </RouterLink>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white shadow rounded-lg p-4">
          <h3 class="text-lg font-semibold text-gray-700">Total Employees</h3>
          <p class="text-2xl font-bold text-blue-600 mt-2">{{ stats.totalEmployees }}</p>
        </div>
        <div class="bg-white shadow rounded-lg p-4">
          <h3 class="text-lg font-semibold text-gray-700">Present Today</h3>
          <p class="text-2xl font-bold text-green-600 mt-2">{{ stats.clockedInToday }}</p>
        </div>
        <div class="bg-white shadow rounded-lg p-4">
          <h3 class="text-lg font-semibold text-gray-700">Absent Today</h3>
          <p class="text-2xl font-bold text-red-500 mt-2">{{ stats.absentToday }}</p>
        </div>
        <div class="bg-white shadow rounded-lg p-4">
          <h3 class="text-lg font-semibold text-gray-700">Pending Leaves</h3>
          <p class="text-2xl font-bold text-yellow-600 mt-2">{{ stats.pendingLeaves }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
const stats = ref({
  totalEmployees: 0,
  clockedInToday: 0,
  absentToday: 0,
  pendingLeaves: 0,
})

const fetchStats = async () => {
  const auth = JSON.parse(localStorage.getItem('auth'))
  const token = auth?.token
  if (!token) return

  try {
    const res = await axios.get('http://localhost:5000/api/admin/dashboard-stats', {
      headers: { Authorization: `Bearer ${token}` }
    })
    stats.value = res.data
  } catch (error) {
    console.error('Failed to fetch stats:', error)
  }
}

onMounted(() => {
  fetchStats()
})
</script>
