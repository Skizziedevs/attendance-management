<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">All Employees</h2>
    <ul class="space-y-3">
      <li v-for="user in users" :key="user.id" class="p-4 bg-white shadow rounded">
        <router-link
          :to="`/admin/employee/${user.id}/attendance`"
          class="text-blue-600 hover:underline"
        >
          {{ user.name }} ({{ user.email }})
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])

const fetchUsers = async () => {
  const auth = JSON.parse(localStorage.getItem('auth'))
  const token = auth?.token

  if (!token) return

  try {
    const res = await axios.get('http://localhost:5000/api/admin/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    users.value = res.data.users
  } catch (err) {
    console.error(err)
  }
}

onMounted(fetchUsers)
</script>
