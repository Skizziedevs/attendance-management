<template>
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <!-- Global navbar (optional: hide on /login route if needed) -->
    <Navbar v-if="!hideNavbar" />

    <!-- Page content -->
    <div class="">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

// Hide navbar on specific routes (e.g., /login)
const route = useRoute()
const hideNavbar = route.path === '/login'
</script>

<style>
/* optional global styles */
</style>
