<template>
  <nav class="bg-white shadow-sm p-4 md:px-8 text-gray-800 sticky top-0 z-50">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m2 0a8 8 0 11-16 0 8 8 0 0116 0z"
          />
        </svg>
        <a
          href="/"
          class="text-2xl font-bold text-indigo-600 px-1 hover:bg-gray-50 transition duration-300"
        >
          AttendFlow
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <div class="md:hidden">
        <button
          @click="toggleMenu"
          class="text-gray-600 hover:text-indigo-600 focus:outline-none p-2 rounded-md transition duration-300"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              v-if="isMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center space-x-6">
        <a v-if="route.path === '/'" href="#features"
          class="text-gray-600 hover:text-indigo-600 font-medium transition duration-300 px-3 py-2 rounded-lg hover:bg-gray-50"
          >Features</a
        >
        <a  v-if="route.path === '/'"
          href="#testimonials"
          class="text-gray-600 hover:text-indigo-600 font-medium transition duration-300 px-3 py-2 rounded-lg hover:bg-gray-50"
          >Testimonials</a
        >
        <a v-if="route.path === '/'"
          href="#contact"
          class="text-gray-600 hover:text-indigo-600 font-medium transition duration-300 px-3 py-2 rounded-lg hover:bg-gray-50"
          >Contact</a
        >
        <button v-if="authStore.token" @click="logout" class="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
          Logout
        </button>
        <a
          v-else
          href="/register"
          class="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Get Started
        </a>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden mt-4 space-y-2 px-2 pb-3">
      <a
        href="#features"
        @click="scrollAndCloseMenu"
        class="block text-gray-600 hover:text-indigo-600 font-medium transition duration-300 py-2 px-3 rounded-md hover:bg-gray-50"
        >Features</a
      >
      <a
        href="#testimonials"
        @click="scrollAndCloseMenu"
        class="block text-gray-600 hover:text-indigo-600 font-medium transition duration-300 py-2 px-3 rounded-md hover:bg-gray-50"
        >Testimonials</a
      >
      <a
        href="#contact"
        @click="scrollAndCloseMenu"
        class="block text-gray-600 hover:text-indigo-600 font-medium transition duration-300 py-2 px-3 rounded-md hover:bg-gray-50"
        >Contact</a
      >
        <!-- Show logout only if logged in -->
      <button
        v-if="authStore.token"
        @click="logout"
        class="bg-indigo-600 font-medium px-4 py-2 rounded-md hover:bg-gray-300 hover:text-indigo-600 transition"
      >
        Logout
      </button>

    <a v-else
          href="/register"
        
        >  <button  class="w-full bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 mt-2">
        
          Get Started
       
      </button> 
    </a>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import { useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter();
const authStore = useAuthStore();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const scrollAndCloseMenu = () => {
  isMenuOpen.value = false;
};

onMounted(() => {
  authStore.persist?.();
});

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
.nav-link {
  @apply text-gray-600 hover:text-indigo-600 font-medium transition duration-300 px-3 py-2 rounded-lg hover:bg-gray-50;
}
.mobile-link {
  @apply block text-gray-600 hover:text-indigo-600 font-medium transition duration-300 py-2 px-3 rounded-md hover:bg-gray-50;
}
.get-started-btn {
  @apply bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50;
}
.logout-btn {
  @apply bg-red-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50;
}
</style>
