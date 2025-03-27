<template>
  <div class="min-h-screen bg-beige flex flex-col overflow-hidden">
    <!-- Header -->
    <header class="bg-beige text-white p-4 pb-8 relative">
      <!-- User Dropdown - Top Right Corner -->
      <div class="absolute right-4 top-4 z-50" v-if="$route.path !== '/login'">
        <button
          @click="toggleDropdown"
          class="flex items-center space-x-2 focus:outline-none group"
        >
          <div
            class="profile-circle w-10 h-10 rounded-full bg-maroon flex items-center justify-center text-white group-hover:bg-maroon-700 transition-colors"
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
          </div>
          <span class="hidden md:inline text-gray-800 font-medium"
            >Hi, {{ userName }}</span
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-maroon transition-transform duration-200 dropdown-arrow"
            :class="{ 'transform rotate-180': showDropdown }"
            viewBox="0 0 24 24"
            fill="#800000"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="showDropdown"
          class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-maroon"
        >
          <div class="px-4 py-2 text-sm text-gray-700 border-b border-maroon">
            <p class="font-medium">Logged in as</p>
            <p class="truncate">{{ userName }}</p>
          </div>
          <button
            @click="handleLogout"
            class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-maroon hover:text-white border-t border-maroon transition-colors logout-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clip-rule="evenodd"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>

      <!-- Logo Container (Centered) -->
      <div
        class="relative container mx-auto flex justify-center bg-[rgb(249,245,255)] mt-14"
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

    <div v-if="$route.path !== '/login'" class="bg-maroon py-6 mt-4">
      <div class="container mx-auto px-4 relative">
        <!-- Menu for Small Screens -->
        <div class="md:hidden flex justify-center gap-4 pt-2">
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
          class="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center pt-2"
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
import Swal from "sweetalert2";

export default {
  name: "HomePage",
  data() {
    return {
      showScrollToTop: false,
      isModalOpen: false,
      // showDropdown: false,
    };
  },
  computed: {
    userName() {
      try {
        // Check store first
        if (this.$store.state.user?.username) {
          return this.$store.state.user.username;
        }

        // Then check sessionStorage
        const userData = sessionStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          return parsedUser?.username || "User";
        }

        return "User"; // Default fallback
      } catch (e) {
        console.error("Error getting username:", e);
        return "User"; // Safe fallback
      }
    },
    showDropdown() {
      return this.$store.state.isDropdownOpen;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    document.addEventListener("click", this.handleClickOutside);
  },
  onCreate() {
    this.closeDropdown();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    toggleDropdown() {
      this.$store.commit("SET_DROPDOWN_STATE", !this.showDropdown);
    },
    closeDropdown() {
      this.showDropdown = false;
    },
    // Handle click outside dropdown
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.closeDropdown();
      }
    },
    watch: {
      // Watch for route changes
      $route(to, from) {
        if (to.fullPath !== from.fullPath) {
          this.hideScrollButtonInstantly();
        }
      },
    },

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
    async handleLogout() {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You will be logged out from the system.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, logout!",
          cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
          this.$store.commit("CLEAR_USER");
          this.$store.commit("CLEAR_TOKEN");
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
          this.$router.replace("/login");
          this.showSuccess("Logged out successfully!");
        }
      } catch (error) {
        this.showError("Logout failed. Please try again.");
      }
    },
    showSuccess(message) {
      Swal.fire({
        title: "Success!",
        text: message,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    },
    showError(message) {
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    },
  },
};
</script>
<style scoped>
/* Custom Colors */

.border-maroon {
  border-color: #800000 !important;
}
.bg-beige {
  background-color: #f5f5dc;
}

.bg-maroon {
  background-color: #800000;
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

/* Dropdown Arrow Icon */
.dropdown-arrow {
  color: maroon; /* Keeps the dropdown arrow maroon */
  transition: transform 0.2s ease-in-out;
}

.dropdown-arrow.open {
  transform: rotate(180deg);
}

/* User Profile Circle */
.profile-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: maroon;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: background-color 0.3s ease;
}

/* Logout Button */
.logout-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  font-size: 14px;
  color: maroon;
  border-top: 1px solid maroon;
  background-color: white;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.logout-btn:hover {
  background-color: maroon;
  color: white;
}
</style>
