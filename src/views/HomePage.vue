<template>
  <div class="min-h-screen bg-beige flex flex-col overflow-hidden">
    <!-- Header -->
    <header class="bg-beige text-white p-4 pb-8 relative">
      <div
        class="container mx-auto flex justify-center relative bg-[rgb(249,245,255)]"
      >
        <img
          src="@/assets/logo.png"
          alt="Travel Tours Logo"
          class="h-24 sm:h-32 md:h-40 lg:h-48 transition-all duration-300"
        />
      </div>

      <!-- Car Animation -->
      <div v-if="$route.path !== '/login'" class="car">
        <img src="@/assets/car.png" alt="Car" class="car-animation" />
      </div>
    </header>

    <!-- Subheader -->
    <div v-if="$route.path !== '/login'" class="bg-maroon py-6 mt-4">
      <div class="container mx-auto px-4">
        <!-- Menu for Small Screens -->
        <div class="md:hidden flex justify-center gap-4">
          <!-- Create New Dutyslip -->
          <router-link
            to="/dutyslip"
            class="btn-option"
            :class="{ active: $route.path === '/dutyslip' }"
            title="New Dutyslip"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span class="text-sm">Dutyslip</span>
          </router-link>

          <!-- Add New Driver -->
          <router-link
            to="/driver"
            class="btn-option"
            :class="{ active: $route.path === '/driver' }"
            title="Driver"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span class="text-sm">Driver</span>
          </router-link>

          <!-- Add New Company -->
          <router-link
            to="/company"
            class="btn-option"
            :class="{ active: $route.path === '/company' }"
            title="Company"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span class="text-sm">Company</span>
          </router-link>

          <!-- View/Edit Records -->
          <router-link
            to="/records"
            class="btn-option"
            :class="{ active: $route.path === '/records' }"
            title="Records"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span class="text-sm">Records</span>
          </router-link>
        </div>

        <!-- Menu for Larger Screens -->
        <div
          class="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center"
        >
          <!-- Create New Dutyslip -->
          <router-link
            to="/dutyslip"
            class="btn-option"
            :class="{ active: $route.path === '/dutyslip' }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span class="text-lg font-semibold">Create New Dutyslip</span>
          </router-link>

          <!-- Add New Driver -->
          <router-link
            to="/driver"
            class="btn-option"
            :class="{ active: $route.path === '/driver' }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span class="text-lg font-semibold">Add New Driver</span>
          </router-link>

          <!-- Add New Company -->
          <router-link
            to="/company"
            class="btn-option"
            :class="{ active: $route.path === '/company' }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span class="text-lg font-semibold">Add New Company</span>
          </router-link>

          <!-- View/Edit Records -->
          <router-link
            to="/records"
            class="btn-option"
            :class="{ active: $route.path === '/records' }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span class="text-lg font-semibold">View/Edit Records</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Main Section -->
    <main
      class="bg-gradient-to-r from-indigo-50 to-purple-50 flex-grow bg-gray-50 py-8 m-0 sm:m-14"
    >
      <div class="container mx-auto p-4">
        <!-- Dynamic Content -->
        <router-view
          :is-modal-open="isModalOpen"
          @update:isModalOpen="updateModalState"
        ></router-view>

        <!-- Scroll to Top Button for Larger Screens -->
        <div class="hidden lg:flex justify-end">
          <button
            v-if="showScrollToTop && !isModalOpen"
            @click="scrollToTop"
            class="mr-14 p-3 bg-maroon text-white rounded-full shadow-lg hover:bg-maroon-700 transition-all duration-300 border border-solid"
            title="Scroll to Top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>

    <!-- Scroll to Top Button for Small Screens -->
    <div class="lg:hidden">
      <button
        v-if="showScrollToTop && !isModalOpen"
        @click="scrollToTop"
        class="fixed bottom-24 right-6 p-3 bg-maroon text-white rounded-full shadow-lg hover:bg-maroon-700 transition-all duration-300 border border-solid"
        title="Scroll to Top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>

    <!-- Footer -->
    <footer class="bg-maroon text-white py-4">
      <div class="container mx-auto text-center">
        <p class="text-lg font-semibold">
          &copy; 2025 Excel Tours & Travels. All rights reserved.
        </p>
        <p class="text-sm">
          Email:
          <a
            href="mailto:excel.travel@rediffmail.com"
            class="underline hover:text-gray-300 transition"
          >
            excel.travel@rediffmail.com
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
// import { useRoute } from "vue-router";

export default {
  name: "HomePage",
  data() {
    return {
      showScrollToTop: false, // Controls visibility of the scroll-to-top button
      isModalOpen: false, // Controls modal visibility
    };
  },
  watch: {
    // Watch for route changes
    $route(to, from) {
      if (to.fullPath !== from.fullPath) {
        this.hideScrollButtonInstantly();
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    // Instantly hide the button on page change
    hideScrollButtonInstantly() {
      this.showScrollToTop = false;
      this.$nextTick(() => {
        setTimeout(this.handleScroll, 200); // Check scroll state after a short delay
      });
    },
    // Scroll to top smoothly
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    // Handle scroll event to toggle button visibility
    handleScroll() {
      this.showScrollToTop = window.scrollY > window.innerHeight / 2;
    },
    // Update modal state from child component
    updateModalState(isOpen) {
      this.isModalOpen = isOpen;
    },
  },
};
</script>

<style scoped>
/* Custom Colors */
.bg-beige {
  background-color: #f5f5dc;
}

.bg-maroon {
  background-color: #800000;
}
.text-maroon {
  color: #800000;
}
.font-serif {
  font-family: Georgia, serif;
}

/* Button Styling */
.btn-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to right, #dc2626, #800000);
  color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease-in-out, transform 0.3s ease-in-out;
  outline: 2px solid transparent; /* Prevents unwanted artifacts */
  text-decoration: none; /* Remove underline from router-link */
}

.btn-option:hover {
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
  transform: scale(1.05);
}

.btn-option.active {
  border: 2px solid white;
  outline: none;
  transform: scale(1.1);
}

/* Smooth Transitions */
.btn-option,
.btn-option:hover,
.btn-option.active {
  transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease,
    border-color 0.3s ease, box-shadow 0.3s ease;
}

/* Car Container */
.car {
  position: absolute;
  bottom: 0;
  left: 0; /* Start offscreen */
  width: 120px; /* Adjust car size */
  height: 62px;
  /* overflow: hidden; */
}

/* Car Animation */
.car-animation {
  animation: drive 15s linear infinite;
}

/* Keyframes for smooth back-and-forth movement */
@keyframes drive {
  0% {
    transform: translateX(-120px); /* Start offscreen on the left */
  }
  50% {
    transform: translateX(calc(100vw - 20px)); /* Move to the right edge */
  }
  51% {
    transform: translateX(calc(100vw - 20px)) scaleX(-1); /* Flip horizontally */
  }
  100% {
    transform: translateX(-120px) scaleX(-1); /* Move back to the left */
  }
}

/* Adjust animation speed for smaller screens */
@media (max-width: 768px) {
  .car {
    width: 100px; /* Adjust car size */
    height: 48px;
  }
  .car-animation {
    animation-duration: 8s; /* Faster speed for mobile */
  }
}
</style>
