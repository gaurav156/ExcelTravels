<template>
  <div class="p-6 pt-0">
    <!-- Centered Heading with Maroon Color -->
    <h2 class="text-2xl mb-6 text-center text-maroon font-extrabold">
      Driver Data
    </h2>

    <!-- Filter Section - Right-Aligned -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6 justify-end">
      <!-- Filter by Driver Name with Clear (✖) Icon -->
      <div class="flex items-center relative">
        <label for="nameFilter" class="mr-2 font-medium text-maroon">
          Filter by Name:
        </label>
        <input
          id="nameFilter"
          v-model="nameFilter"
          type="text"
          placeholder="Search by Driver Name"
          autocomplete="off"
          class="custom-select focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon placeholder:text-xs lg:placeholder:text-sm"
        />
        <!-- Cross (✖) Icon to Clear Input -->
        <svg
          v-if="nameFilter"
          @click="nameFilter = ''"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-500 absolute right-3 cursor-pointer hover:text-red-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 9.293l4.95-4.95a1 1 0 011.415 1.414L11.414 10l4.95 4.95a1 1 0 01-1.415 1.415L10 11.414l-4.95 4.95a1 1 0 01-1.415-1.415l4.95-4.95-4.95-4.95A1 1 0 015.05 4.343L10 9.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <!-- Card Layout for Small and Medium Screens -->
    <div class="sm:block md:block lg:hidden">
      <div
        v-for="driver in paginatedData.slice(0, 5)"
        :key="driver.driverId"
        class="mb-4 p-4 border-2 rounded-lg shadow-sm hover:shadow-md transition-shadow card-style"
      >
        <!-- Driver Details -->
        <div class="space-y-2">
          <p><strong>ID:</strong> {{ driver.driverId }}</p>
          <p><strong>Name:</strong> {{ driver.name }}</p>
          <p><strong>Age:</strong> {{ driver.age }}</p>
          <p><strong>Contact:</strong> {{ driver.contact }}</p>
          <p><strong>Email:</strong> {{ driver.email }}</p>
          <p><strong>License Number:</strong> {{ driver.licenseNumber }}</p>
        </div>

        <!-- Action Icons -->
        <div class="flex justify-end gap-4 mt-4">
          <!-- Info Icon -->
          <svg
            @click="viewDriver(driver.driverId)"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-blue-500 hover:text-blue-700 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <!-- Edit Icon -->
          <svg
            @click="editDriver(driver.driverId)"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-green-500 hover:text-green-700 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 4h2m1 16H10m-5 0a2 2 0 002 2h10a2 2 0 002-2m-1-16a2 2 0 00-2-2H7a2 2 0 00-2 2m13.5 5.5L16 8l-5 5v3h3l5.5-5.5z"
            />
          </svg>

          <!-- Delete Icon -->
          <svg
            @click="allowDelete ? deleteDriver(driver.driverId) : null"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            :class="{
              'text-red-500 hover:text-red-700 cursor-pointer': allowDelete,
              'text-gray-400 cursor-not-allowed': !allowDelete,
            }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            :disabled="!allowDelete"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zm9-11V5a1 1 0 00-1-1H10a1 1 0 00-1 1v3m-4 0h14"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Table Layout for Larger Screens -->
    <div class="hidden lg:block overflow-x-auto">
      <!-- Table -->
      <table class="table-auto w-full border-collapse">
        <thead>
          <tr class="bg-maroon text-white">
            <th class="border p-2">Driver ID</th>
            <th class="border p-2">Name</th>
            <th class="border p-2 hidden sm:table-cell">Age</th>
            <th class="border p-2 hidden md:table-cell">Contact</th>
            <th class="border p-2 hidden lg:table-cell">Email</th>
            <th class="border p-2 hidden lg:table-cell">License Number</th>
            <th class="border p-2">View</th>
            <th class="border p-2">Edit</th>
            <th class="border p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="driver in paginatedData"
            :key="driver.driverId"
            class="hover:bg-gray-100 transition-all"
          >
            <td class="border p-2 text-center font-bold">
              {{ driver.driverId }}
            </td>
            <td class="border p-2 font-bold">{{ driver.name }}</td>
            <td class="border p-2 font-bold hidden sm:table-cell">
              {{ driver.age }}
            </td>
            <td class="border p-2 font-bold hidden md:table-cell">
              {{ driver.contact }}
            </td>
            <td class="border p-2 font-bold hidden lg:table-cell">
              {{ driver.email }}
            </td>
            <td class="border p-2 font-bold hidden lg:table-cell">
              {{ driver.licenseNumber }}
            </td>
            <td class="border p-2 text-center">
              <!-- Details Icon -->
              <svg
                @click="viewDriver(driver.driverId)"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-blue-500 hover:text-blue-700 cursor-pointer mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </td>
            <td class="border p-2 text-center">
              <!-- Edit Icon -->
              <svg
                @click="editDriver(driver.driverId)"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-green-500 hover:text-green-700 cursor-pointer mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 4h2m1 16H10m-5 0a2 2 0 002 2h10a2 2 0 002-2m-1-16a2 2 0 00-2-2H7a2 2 0 00-2 2m13.5 5.5L16 8l-5 5v3h3l5.5-5.5z"
                />
              </svg>
            </td>
            <td class="border p-2 text-center">
              <!-- Delete Icon -->
              <svg
                @click="allowDelete ? deleteDriver(driver.driverId) : null"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mx-auto"
                :class="{
                  'text-red-500 hover:text-red-700 cursor-pointer': allowDelete,
                  'text-gray-400 cursor-not-allowed': !allowDelete,
                }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                :disabled="!allowDelete"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zm9-11V5a1 1 0 00-1-1H10a1 1 0 00-1 1v3m-4 0h14"
                />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-4">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        class="pagination-btn"
        :class="{ 'bg-maroon text-white': currentPage === page }"
      >
        {{ page }}
      </button>
    </div>

    <!-- View/Edit Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div
        class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        <!-- Modal Header with Close Button -->
        <div
          class="flex justify-between items-center p-6 border-b border-gray-200 bg-maroon"
        >
          <h3 class="text-xl font-bold text-white">
            {{ isEditMode ? "Edit Driver" : "View Driver" }}
          </h3>
          <!-- Close Button [x] -->
          <button
            @click="closeModal"
            class="text-white hover:text-gray-200 focus:outline-none"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="overflow-y-auto p-6">
          <!-- Driver Details -->
          <div v-if="!isEditMode" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm font-medium text-gray-700">Driver ID</p>
                <p class="text-gray-500">
                  {{ selectedDriver.driverId }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Created At</p>
                <p class="text-gray-500">
                  {{ formatDate(selectedDriver.createdAt) }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Driver Name</p>
                <p class="text-gray-500">{{ selectedDriver.name }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Age</p>
                <p class="text-gray-500">{{ selectedDriver.age }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Email</p>
                <p class="text-gray-500">{{ selectedDriver.email }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Contact</p>
                <p class="text-gray-500">
                  {{ selectedDriver.contact }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Address</p>
                <p class="text-gray-500">
                  {{ selectedDriver.address }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Emergency Name</p>
                <p class="text-gray-500">
                  {{ selectedDriver.emergencyName }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">
                  Emergency Contact
                </p>
                <p class="text-gray-500">
                  {{ selectedDriver.emergencyContact }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Bank Name</p>
                <p class="text-gray-500">
                  {{ selectedDriver.bankName }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Branch Name</p>
                <p class="text-gray-500">{{ selectedDriver.branch }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">IFSC Code</p>
                <p class="text-gray-500">
                  {{ selectedDriver.ifscCode }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Account Number</p>
                <p class="text-gray-500">
                  {{ selectedDriver.accountNumber }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Aadhar Number</p>
                <p class="text-gray-500">
                  {{ selectedDriver.aadharNumber }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">PAN Number</p>
                <p class="text-gray-500">
                  {{ selectedDriver.panNumber }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">License Number</p>
                <p class="text-gray-500">
                  {{ selectedDriver.licenseNumber }}
                </p>
              </div>
            </div>
          </div>

          <!-- Edit Form -->
          <form v-else @submit.prevent="saveDriver" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Driver ID</label
                >
                <input
                  v-model="selectedDriver.driverId"
                  type="text"
                  readonly
                  disabled
                  class="mt-1 block w-full px-4 py-2 border border-[#800000] rounded-md shadow-sm bg-gray-100"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Created At</label
                >
                <input
                  v-model="selectedDriver.createdAt"
                  type="text"
                  readonly
                  disabled
                  class="mt-1 block w-full px-4 py-2 border border-[#800000] rounded-md shadow-sm bg-gray-100"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Driver Name <span class="text-red-500">*</span></label
                >
                <input
                  v-model="selectedDriver.name"
                  type="text"
                  required
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Age <span class="text-red-500">*</span></label
                >
                <input
                  v-model="selectedDriver.age"
                  type="number"
                  required
                  min="18"
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Email <span class="text-red-500">*</span></label
                >
                <input
                  v-model="selectedDriver.email"
                  type="email"
                  required
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Contact <span class="text-red-500">*</span></label
                >
                <input
                  v-model="selectedDriver.contact"
                  type="tel"
                  required
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Address <span class="text-red-500">*</span></label
                >
                <input
                  v-model="selectedDriver.address"
                  type="text"
                  required
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Emergency Name <span class="text-red-500">*</span></label
                >
                <input
                  v-model="selectedDriver.emergencyName"
                  type="text"
                  required
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Emergency Contact <span class="text-red-500">*</span></label
                >
                <input
                  v-model="selectedDriver.emergencyContact"
                  type="tel"
                  required
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Bank Name <span class="text-red-500">*</span></label
                >
                <input
                  v-model="selectedDriver.bankName"
                  type="text"
                  required
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Account Number <span class="text-red-500">*</span></label
                >
                <input
                  v-model="selectedDriver.accountNumber"
                  type="text"
                  required
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >IFSC Code <span class="text-red-500">*</span></label
                >
                <input
                  v-model="selectedDriver.ifscCode"
                  type="text"
                  required
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Branch Name <span class="text-red-500">*</span></label
                >
                <input
                  v-model="selectedDriver.branch"
                  type="text"
                  required
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Aadhar Number <span class="text-red-500">*</span></label
                >
                <input
                  v-model="selectedDriver.aadharNumber"
                  type="text"
                  required
                  pattern="[0-9]{12}"
                  title="Aadhar number must be 12 digits"
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >PAN Number <span class="text-red-500">*</span></label
                >
                <input
                  v-model="selectedDriver.panNumber"
                  type="text"
                  required
                  pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                  title="PAN number must be in format: ABCDE1234F"
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >License Number <span class="text-red-500">*</span></label
                >
                <input
                  v-model="selectedDriver.licenseNumber"
                  type="text"
                  required
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                />
              </div>
            </div>

            <!-- Save and Cancel Buttons -->
            <div class="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-maroon text-white rounded-md hover:bg-maroon-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api";
import Swal from "sweetalert2";

export default {
  name: "DriverList",
  props: {
    isModalOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      drivers: [], // All drivers fetched from the API
      currentPage: 1,
      nameFilter: "", // Filter by driver name
      isEditMode: false, // Toggles between view and edit modes
      selectedDriver: {}, // Stores the selected driver data
      windowWidth: window.innerWidth, // Track window width for responsiveness
      allowDelete: false,
    };
  },
  computed: {
    // Dynamically adjust itemsPerPage based on screen size
    itemsPerPage() {
      if (this.windowWidth < 1024) {
        return 2; // 5 items for small and medium screens
      } else {
        return 15; // 15 items for large screens
      }
    },
    // Filtered data based on name filter
    filteredData() {
      let data = this.drivers;

      // Filter by driver name
      if (this.nameFilter) {
        const searchTerm = this.nameFilter.toLowerCase();
        data = data.filter((driver) =>
          driver.name.toLowerCase().includes(searchTerm)
        );
      }

      return data;
    },
    // Paginated data based on current page
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredData.slice(start, start + this.itemsPerPage);
    },
    // Total pages for pagination
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
  },
  mounted() {
    const role =
      this.$store.state.user?.role ||
      JSON.parse(sessionStorage.getItem("user")).role;
    this.allowDelete = role && role === "admin";
  },
  created() {
    this.fetchDrivers();
    window.addEventListener("resize", this.handleResize); // Add resize listener
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize); // Clean up listener
  },
  methods: {
    // Fetch drivers from the API
    async fetchDrivers() {
      try {
        const response = await api.get("/drivers");
        this.drivers = response.data;
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    },
    // Handle window resize to update windowWidth
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    // View driver details
    async viewDriver(driverId) {
      try {
        const response = await api.get(`/drivers/${driverId}`);
        this.selectedDriver = response.data;
        this.isEditMode = false;
        this.$emit("update:isModalOpen", true); // Emit modal state to parent
      } catch (error) {
        console.error("Error fetching driver details:", error);
      }
    },
    // Edit driver
    async editDriver(driverId) {
      try {
        const response = await api.get(`/drivers/${driverId}`);
        this.selectedDriver = response.data;
        this.isEditMode = true;
        this.$emit("update:isModalOpen", true); // Emit modal state to parent
      } catch (error) {
        console.error("Error fetching driver details:", error);
      }
    },
    // Save edited driver
    async saveDriver() {
      // Get the original driver data
      const originalDriver = this.drivers.find(
        (d) => d.driverId === this.selectedDriver.driverId
      );

      // Check if any changes were made
      const hasChanges =
        this.selectedDriver.name !== originalDriver.name ||
        this.selectedDriver.age !== originalDriver.age ||
        this.selectedDriver.email !== originalDriver.email ||
        this.selectedDriver.contact !== originalDriver.contact ||
        this.selectedDriver.address !== originalDriver.address ||
        this.selectedDriver.emergencyName !== originalDriver.emergencyName ||
        this.selectedDriver.emergencyContact !==
          originalDriver.emergencyContact ||
        this.selectedDriver.bankName !== originalDriver.bankName ||
        this.selectedDriver.accountNumber !== originalDriver.accountNumber ||
        this.selectedDriver.ifscCode !== originalDriver.ifscCode ||
        this.selectedDriver.branch !== originalDriver.branch ||
        this.selectedDriver.aadharNumber !== originalDriver.aadharNumber ||
        this.selectedDriver.panNumber !== originalDriver.panNumber ||
        this.selectedDriver.licenseNumber !== originalDriver.licenseNumber;

      if (!hasChanges) {
        Swal.fire({
          title: "No Changes",
          text: "No changes were made to the driver details.",
          icon: "info",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        return;
      }

      try {
        await api.put(
          `/drivers/${this.selectedDriver.driverId}`,
          this.selectedDriver
        );
        this.closeModal();
        this.fetchDrivers(); // Refresh the list
        Swal.fire({
          title: "Success!",
          text: "Driver details updated successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error updating driver:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to update driver details.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    },
    // Close modal
    closeModal() {
      this.selectedDriver = {};
      this.$emit("update:isModalOpen", false); // Emit modal state to parent
    },
    // Delete driver
    async deleteDriver(driverId) {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        customClass: {
          popup: "swal2-popup", // Apply custom class
        },
      });

      // If user confirms deletion
      if (result.isConfirmed) {
        try {
          // Call API to delete the driver
          await api.delete(`/drivers/${driverId}`);

          // Remove the driver from the local list
          this.drivers = this.drivers.filter(
            (driver) => driver.driverId !== driverId
          );

          // Check if the current page is empty after deletion
          if (this.paginatedData.length === 0 && this.currentPage > 1) {
            this.currentPage -= 1; // Move to the previous page
          }

          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: "The driver has been deleted.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
            customClass: {
              popup: "swal2-popup", // Apply custom class
            },
          });
        } catch (error) {
          console.error("Error deleting driver:", error);

          // Show error message
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the driver. Please try again.",
            icon: "error",
            confirmButtonColor: "#d33",
            confirmButtonText: "OK",
            customClass: {
              popup: "swal2-popup", // Apply custom class
            },
          });
        }
      }
    },
    // Format date and time
    formatDate(dateString) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(date);
    },
  },
};
</script>

<style scoped>
/* Maroon background for header */
.bg-maroon {
  background-color: maroon;
}

/* Glowing maroon edges */
td,
th {
  border: 2px solid maroon;
  box-shadow: 0 0 5px maroon;
}

/* White text for header */
thead th {
  color: white;
}

/* Center align icons */
td svg {
  display: block;
  margin: auto;
}

/* Pagination buttons */
.pagination-btn {
  border: 2px solid maroon;
  padding: 6px 12px;
  margin: 3px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: bold;
  background-color: white;
  color: black;
}

.pagination-btn:hover {
  background-color: maroon;
  color: white;
}
.text-maroon {
  color: #800000;
}

/* Maroon border with subtle glow */
.border-maroon {
  border-color: #800000;
  box-shadow: 0 0 5px rgba(128, 0, 0, 0.5);
}

/* Responsive Table Styles */
@media (max-width: 640px) {
  th.hidden,
  td.hidden {
    display: none;
  }
}

.custom-select {
  outline: none;
  border-color: #800000 !important;
  box-shadow: 0 0 5px rgba(128, 0, 0, 0.5);
}

/* Card Styling */
.card-style {
  background-color: #f5f5dc; /* Background color */
  border-color: maroon; /* Border color */
  box-shadow: 0 0 8px maroon; /* Glowing effect */
}

/* Hover effect for cards */
.card-style:hover {
  box-shadow: 0 0 12px maroon; /* Stronger glow on hover */
}

/* Apply border and focus styles to all fields */
input:not([readonly]):not([disabled]),
select:not([readonly]):not([disabled]),
textarea:not([readonly]):not([disabled]) {
  border: 1px solid #800000 !important;
  border-radius: 4px !important;
  padding: 8px;
  color: black !important;
}

input:focus:not([readonly]):not([disabled]),
select:focus:not([readonly]):not([disabled]),
textarea:focus:not([readonly]):not([disabled]) {
  outline: none;
  border-color: #800000 !important;
  box-shadow: 0 0 5px rgba(128, 0, 0, 0.5);
}
</style>
