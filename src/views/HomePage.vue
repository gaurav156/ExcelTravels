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

    <div v-if="$route.path !== '/login'" class="bg-maroon py-6 mt-4">
      <!-- Logout Button - Responsive positioning -->
      <div class="absolute top-45 right-4 sm:right-6 md:right-8 z-50 mt-2">
        <!-- <button @click="logout"
          class="bg-white/90 hover:bg-white text-maroon rounded-full p-2 shadow-md flex items-center justify-center transition-colors duration-200 group"
          title="Logout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 group-hover:scale-110 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span class="hidden md:inline ml-2 font-medium">Logout</span>
        </button> -->
        <button @click="handleLogout" class="LogoutBtn">
          <div class="logout-sign"><svg viewBox="0 0 512 512">
              <path
                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z">
              </path>
            </svg></div>
          <div class="text font-medium">Logout</div>
        </button>
      </div>

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
    async handleLogout() {
      try {
        // Optionally call a logout API (if needed for server-side invalidation)
        // await api.post("/auth/logout"); 

        // Clear user data and token from Vuex
        this.$store.commit("CLEAR_USER");
        this.$store.commit("CLEAR_TOKEN");

        // Remove token from localStorage (if stored)
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        this.$router.replace("/login")

        // Show success message
        this.showSuccess("Logged out successfully!");
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
  .LogoutBtn {
    --maroon: #800000;
    --ch-maroon: #800000;
    --eer-maroon: #800000;
    --night-rider: #800000;
    --white: #ffffff;
    --af-white: #f3f3f3;
    --ch-white: #e1e1e1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: var(--af-white);
  }

  /* plus sign */
  .logout-sign {
    width: 100%;
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logout-sign svg {
    width: 17px;
  }

  .logout-sign svg path {
    fill: var(--night-rider);
  }
  /* text */
  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: var(--night-rider);
    /* font-size: 1.2em;
    font-weight: 600; */
    transition-duration: .3s;
  }
  /* hover effect on button width */
  .LogoutBtn:hover {
    width: 125px;
    border-radius: 5px;
    transition-duration: .3s;
  }

  .LogoutBtn:hover .logout-sign {
    width: 30%;
    transition-duration: .3s;
    padding-left: 20px;
  }
  /* hover effect button's text */
  .LogoutBtn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: .3s;
    padding-right: 10px;
  }
  /* button click effect*/
  .LogoutBtn:active {
    transform: translate(2px ,2px);
  }
</style>
