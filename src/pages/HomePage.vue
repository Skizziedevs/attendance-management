
<template>
  <div class="min-h-screen bg-gray-50 font-inter antialiased">
   

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-indigo-50 to-white py-16 md:py-24">
      <div class="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <!-- Left Content Area -->
        <div class="md:w-1/2 text-center md:text-left">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Effortless <span class="text-indigo-600">Attendance</span> Management
          </h1>
          <p class="text-lg md:text-xl text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
            Simplify your HR tasks with our intuitive attendance system, designed for accuracy, efficiency, and peace of mind.
          </p>
          <div class="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button class="bg-indigo-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
              Book a Demo
            </button>
            <button class="bg-white text-indigo-600 border border-indigo-600 px-8 py-3 rounded-full shadow-lg hover:bg-indigo-50 transition duration-300 transform hover:scale-105 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
              Learn More
            </button>
          </div>
        </div>

        <!-- Right Image Area -->
        <div class="md:w-1/2 flex justify-center md:justify-end">
          <img
            src="https://placehold.co/600x400/E0E7FF/4338CA?text=Modern+Workplace"
            alt="People working with attendance system on a phone"
            class="rounded-xl shadow-2xl max-w-full h-auto"
            onerror="this.onerror=null; this.src='https://placehold.co/600x400/E0E7FF/4338CA?text=Image+Placeholder';"
          />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Key Features to Empower Your Business
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Our attendance management system is packed with powerful features to simplify your HR operations.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(feature, index) in features" :key="index" class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 transform hover:-translate-y-2">
            <div class="mb-4 flex justify-center" v-html="feature.icon"></div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="bg-indigo-50 py-16 md:py-24">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          What Our Clients Say
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Hear from businesses that have transformed their attendance management with our system.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(testimonial, index) in testimonials" :key="index" class="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center">
            <p class="text-gray-700 italic mb-6">"{{ testimonial.quote }}"</p>
            <p class="font-semibold text-gray-900">{{ testimonial.name }}</p>
            <p class="text-sm text-gray-500">{{ testimonial.title }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section  class="bg-indigo-600 text-white py-16 md:py-20">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Ready to Streamline Your Attendance?
        </h2>
        <p class="text-xl max-w-2xl mx-auto mb-10">
          Join countless businesses benefiting from efficient and accurate attendance tracking.
        </p>
     <router-link
  to="/register"
  class="bg-white text-indigo-600 px-10 py-4 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 font-semibold text-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
>
  Get Started Today
</router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-8">
      <div class="container mx-auto px-4 text-center text-sm">
        <p>&copy; {{ currentYear }} AttendFlow. All rights reserved.</p>
        <div class="mt-2 space-x-4">
          <a href="#" class="hover:text-white transition duration-300">Privacy Policy</a>
          <a href="#" class="hover:text-white transition duration-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from "vue-router";

// State
const isMenuOpen = ref(false)

const features = ref([
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>`,
    title: 'Real-time Attendance Tracking',
    description: 'Monitor employee attendance with live updates, ensuring accurate records and transparency.',
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v2m-2-4v4m-2-4v4m-2-4v4m-2-4v4m-2-4v4m-2-4v4m-2-4v4M12 6.25V4.25M17.75 6.25V4.25M6.25 6.25V4.25M12 17.75V19.75M17.75 17.75V19.75M6.25 17.75V19.75M12 12h.01M12 12V4.25M12 12v.01M12 12H4.25M12 12h1.75M12 12v1.75M12 12H19.75M12 12V19.75M12 12h.01M12 12v.01M12 12H4.25M12 12h1.75M12 12v1.75M12 12H19.75" />
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h4a2 2 0 002-2V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v14a2 2 0 002 2z" />
           </svg>`,
    title: 'Automated Leave Management',
    description: 'Streamline leave requests, approvals, and tracking with automated workflows.',
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
           </svg>`,
    title: 'Detailed Reporting & Analytics',
    description: 'Gain insights with customizable reports on attendance trends, punctuality, and more.',
  },
])

const testimonials = ref([
  {
    quote: 'This system has revolutionized how we manage attendance. It\'s incredibly user-friendly and highly efficient.',
    name: 'Sarah Johnson',
    title: 'HR Manager, Tech Solutions',
  },
  {
    quote: 'Accuracy and ease of use are paramount for us, and this system delivers on both fronts. A game-changer!',
    name: 'Michael Chen',
    title: 'Operations Director, Global Corp',
  },
  {
    quote: 'We\'ve seen a significant reduction in manual errors and time spent on attendance. Highly recommend it!',
    name: 'Emily White',
    title: 'CEO, Creative Agency',
  },
])

// Methods
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Computed
const currentYear = computed(() => new Date().getFullYear())
</script>


<style>


@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}
html {
  scroll-behavior: smooth;
}

/* Reusable classes for nav links */
.nav-link {
  @apply text-gray-600 hover:text-indigo-600 font-medium transition duration-300 px-3 py-2 rounded-lg hover:bg-gray-50;
}
.mobile-link {
  @apply block text-gray-600 hover:text-indigo-600 font-medium transition duration-300 py-2 px-3 rounded-md hover:bg-gray-50;
}
</style>
