<template>
  <div class="p-6 pt-0">
    <!-- Centered Heading with Maroon Color -->
    <h2 class="text-2xl mb-6 text-center text-maroon font-extrabold">
      Duty Slip Data
    </h2>

    <!-- Filter Section - Right-Aligned -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6 justify-end">
      <!-- Custom Dropdown for Date Filter -->
      <div class="flex items-center relative">
        <label class="mr-2 font-medium text-maroon">Filter by Date:</label>
        <div class="relative">
          <button
            @click="toggleDateDropdown"
            class="p-2 border border-maroon rounded-md focus:ring-maroon focus:border-maroon custom-select"
          >
            {{ dateFilter === "newest" ? "Newest First" : "Oldest First" }}
          </button>
          <div
            v-if="isDateDropdownOpen"
            class="absolute mt-1 w-full bg-white border border-maroon rounded-md shadow-lg z-10"
          >
            <div
              @click="selectDateFilter('newest')"
              class="p-2 hover:bg-[#800000] hover:text-white cursor-pointer"
            >
              Newest First
            </div>
            <div
              @click="selectDateFilter('oldest')"
              class="p-2 hover:bg-[#800000] hover:text-white cursor-pointer"
            >
              Oldest First
            </div>
          </div>
        </div>
      </div>

      <!-- Filter by Customer/Company Name with Clear (✖) Icon -->
      <div class="flex items-center relative">
        <label for="nameFilter" class="mr-2 font-medium text-maroon">
          Filter by Name:
        </label>
        <input
          id="nameFilter"
          v-model="nameFilter"
          type="text"
          placeholder="Search by Customer/Company"
          class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border bg-gray-50 focus:ring-maroon focus:border-maroon outline-none border-[#800000] !important shadow-[0_0_5px_rgba(128,0,0,0.5)]"
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

    <!-- Table -->
    <table class="table-auto w-full border-collapse">
      <thead>
        <tr class="bg-maroon text-white">
          <th class="border p-2">Slip ID</th>
          <th class="border p-2 hidden md:table-cell">Company Name</th>
          <th class="border p-2">Customer Name</th>
          <th class="border p-2 hidden md:table-cell">City</th>
          <th class="border p-2 hidden sm:table-cell">Date</th>
          <th class="border p-2 hidden sm:table-cell">Trip Route</th>
          <th class="border p-2">View</th>
          <th class="border p-2">Edit</th>
          <th class="border p-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="slip in paginatedData"
          :key="slip.dutySlipId"
          class="hover:bg-gray-100 transition-all"
        >
          <td class="border p-2 text-center font-bold">
            {{ slip.dutySlipId }}
          </td>
          <td class="border p-2 font-bold hidden md:table-cell">
            {{ slip.companyName }}
          </td>
          <td class="border p-2 font-bold">
            {{ slip.customerName }}
          </td>
          <td class="border p-2 font-bold hidden md:table-cell">
            {{ slip.city }}
          </td>
          <td class="border p-2 font-bold hidden sm:table-cell">
            {{ formatDate(slip.createdAt) }}
          </td>
          <td class="border p-2 font-bold hidden sm:table-cell">
            {{ slip.tripRoute }}
          </td>
          <td class="border p-2 text-center">
            <!-- Details Icon -->
            <svg
              @click="viewSlip(slip.dutySlipId)"
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
              @click="editSlip(slip.dutySlipId)"
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
              @click="deleteSlip(slip.dutySlipId)"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-red-500 hover:text-red-700 cursor-pointer mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
      <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <!-- Modal Header with Close Button -->
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 class="text-xl font-bold text-maroon">
            {{ isEditMode ? "Edit Duty Slip" : "View Duty Slip" }}
          </h3>
          <!-- Close Button [x] -->
          <button
            @click="closeModal"
            class="text-gray-500 hover:text-gray-700 focus:outline-none"
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
          <!-- Duty Slip Details -->
          <div v-if="!isEditMode" class="space-y-4">
            <p><strong>Duty Slip ID:</strong> {{ selectedSlip.dutySlipId }}</p>
            <p><strong>Created At:</strong> {{ formatDate(selectedSlip.createdAt) }}</p>
            <p><strong>Company ID:</strong> {{ selectedSlip.companyId }}</p>
            <p><strong>Company Name:</strong> {{ selectedSlip.companyName }}</p>
            <p><strong>Customer Name:</strong> {{ selectedSlip.customerName }}</p>
            <p><strong>City:</strong> {{ selectedSlip.city }}</p>
            <p><strong>Address:</strong> {{ selectedSlip.address }}</p>
            <p><strong>Car Booked:</strong> {{ selectedSlip.carBooked }}</p>
            <p><strong>Phone Number:</strong> {{ selectedSlip.phoneNumber }}</p>
            <p><strong>Duty Type:</strong> {{ selectedSlip.dutyType }}</p>
            <p><strong>Driver ID:</strong> {{ selectedSlip.driverId }}</p>
            <p><strong>Driver Name:</strong> {{ selectedSlip.driverName }}</p>
            <p><strong>Car Number:</strong> {{ selectedSlip.carNumber }}</p>
            <p><strong>Trip Route:</strong> {{ selectedSlip.tripRoute }}</p>
            <p><strong>Date From:</strong> {{ formatDate(selectedSlip.dateFrom) }}</p>
            <p><strong>Date To:</strong> {{ formatDate(selectedSlip.dateTo) }}</p>
            <p><strong>Start KM:</strong> {{ selectedSlip.startKM }}</p>
            <!-- Start KM Photo -->
            <p><strong>Start KM Photo:</strong></p>
            <div v-if="selectedSlip.startKMPhoto">
              <img
                :src="selectedSlip.startKMPhoto"
                alt="Start KM Photo"
                class="w-full"
                @error="handleImageError('startKMPhoto')"
              />
            </div>
            <p v-else class="text-gray-500">No image available</p>
            <p><strong>End KM:</strong> {{ selectedSlip.endKM }}</p>
            <!-- End KM Photo -->
            <p><strong>End KM Photo:</strong></p>
            <div v-if="selectedSlip.endKMPhoto">
              <img
                :src="selectedSlip.endKMPhoto"
                alt="End KM Photo"
                class="w-full"
                @error="handleImageError('endKMPhoto')"
              />
            </div>
            <p v-else class="text-gray-500">No image available</p>
            <!-- Customer Signature -->
            <p><strong>Customer Signature:</strong></p>
            <div v-if="selectedSlip.customerSignature">
              <img
                :src="selectedSlip.customerSignature"
                alt="Customer Signature"
                class="w-full"
                @error="handleImageError('customerSignature')"
              />
            </div>
            <p v-else class="text-gray-500">No image available</p>
          </div>

          <!-- Edit Form -->
          <form v-else @submit.prevent="saveSlip" class="space-y-4">
            <!-- Read-Only Fields -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Duty Slip ID</label>
              <input
                v-model="selectedSlip.dutySlipId"
                type="text"
                readonly
                class="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-100"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Created At</label>
              <input
                v-model="selectedSlip.createdAt"
                type="text"
                readonly
                class="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-100"
              />
            </div>

            <!-- Editable Fields -->
            <!-- Company ID (Auto-filled and Disabled) -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Company ID</label>
              <input
                v-model="selectedSlip.companyId"
                type="text"
                class="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-100 focus:ring-maroon focus:border-maroon"
                disabled
              />
            </div> 
            <!-- Company Name (Searchable Dropdown) -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Company Name</label>
              <VueSelect
                v-model="selectedSlip.companyName"
                :options="filteredCompanies"
                @search="updateCompanySearchQuery"
                @update:modelValue="handleCompanySelection"
                label="companyName"
                placeholder="Select Company"
                class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              ></VueSelect>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Customer Name</label>
              <input
                v-model="selectedSlip.customerName"
                type="text"
                class="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">City</label>
              <select
                v-model="selectedSlip.city"
                class="custom-select focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              >
                <option value="" disabled>Select City</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Pune">Pune</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Surat">Surat</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Address</label>
              <input
                v-model="selectedSlip.address"
                type="text"
                class="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Car Booked</label>
              <select
                v-model="selectedSlip.carBooked"
                class="custom-select focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              >
                <option value="" disabled>Select Car Type</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                v-model="selectedSlip.phoneNumber"
                type="tel"
                placeholder="Enter Phone Number"
                class="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Duty Type</label>
              <select
                v-model="selectedSlip.dutyType"
                class="custom-select focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              >
                <option value="" disabled>Select Duty Type</option>
                <option value="local">Local</option>
                <option value="Outstation">Outstation</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Driver ID</label>
              <input
                v-model="selectedSlip.driverId"
                type="text"
                class="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Driver Name</label>
              <VueSelect
                v-model="selectedSlip.driverName"
                :options="filteredDrivers"
                @search="updateDriverSearchQuery"
                @update:modelValue="handleDriverSelection"
                label="name"
                placeholder="Select Driver"
                class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              ></VueSelect>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Car Number</label>
              <input
                v-model="selectedSlip.carNumber"
                type="text"
                placeholder="Enter Car Number"
                class="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Trip Route</label>
              <input
                v-model="selectedSlip.tripRoute"
                type="text"
                placeholder="Enter Trip Route"
                class="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
              />
            </div>
            <!-- Date From -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Date From</label>
              <input
                v-model="formattedDateFrom"
                type="date"
                class="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              />
            </div>

            <!-- Date To -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Date To</label>
              <input
                v-model="formattedDateTo"
                type="date"
                class="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Start KM</label>
              <input
                v-model="selectedSlip.startKM"
                type="text"
                readonly
                class="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-100"
              />
            </div>
            <!-- Start KM Photo -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Start KM Photo:</label>
              <img
                v-if="selectedSlip.startKMPhoto"
                :src="selectedSlip.startKMPhoto"
                alt="Start KM Photo"
                class="w-full"
                @error="handleImageError('startKMPhoto')"
              />
              <p v-else class="text-gray-500">No image available</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">End KM</label>
              <input
                v-model="selectedSlip.endKM"
                type="text"
                readonly
                class="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-100"
              />
            </div>
            <!-- End KM Photo -->
            <div>
              <label class="block text-sm font-medium text-gray-700">End KM Photo:</label>
              <img
                v-if="selectedSlip.endKMPhoto"
                :src="selectedSlip.endKMPhoto"
                alt="End KM Photo"
                class="w-full"
                @error="handleImageError('endKMPhoto')"
              />
              <p v-else class="text-gray-500">No image available</p>
            </div>
            <!-- Customer Signature -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Customer Signature:</label>
              <img
                v-if="selectedSlip.customerSignature"
                :src="selectedSlip.customerSignature"
                alt="Customer Signature"
                class="w-full"
                @error="handleImageError('customerSignature')"
              />
              <p v-else class="text-gray-500">No image available</p>
            </div>

            <!-- Save and Cancel Buttons -->
            <div class="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100"
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
import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "DutySlipList",
  components: {
    VueSelect,
  },
  data() {
    return {
      dutySlips: [], // All duty slips fetched from the API
      currentPage: 1,
      itemsPerPage: 15, // 15 records per page
      dateFilter: "newest", // Default filter: newest first
      nameFilter: "", // Filter by customer/company name
      isDateDropdownOpen: false, // Control the visibility of the date dropdown
      isModalOpen: false, // Controls modal visibility
      isEditMode: false, // Toggles between view and edit modes
      selectedSlip: {}, // Stores the selected duty slip data
      drivers: [], // List of drivers fetched from the API
      driverSearchQuery: "", // Search query for drivers
      companies: [], // List of companies fetched from the API
      companySearchQuery: "", // Search query for companies
    };
  },
  computed: {
    // Filtered data based on date and name filters
    filteredData() {
      let data = this.dutySlips;

      // Filter by customer/company name
      if (this.nameFilter) {
        const searchTerm = this.nameFilter.toLowerCase();
        data = data.filter(
          (slip) =>
            slip.customerName.toLowerCase().includes(searchTerm) ||
            slip.companyName.toLowerCase().includes(searchTerm)
        );
      }

      // Filter by date
      if (this.dateFilter === "newest") {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Newest first
      } else {
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Oldest first
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
    // Filter drivers based on search query
    filteredDrivers() {
      return this.drivers
        .filter((driver) =>
          driver.name
            .toLowerCase()
            .includes(this.driverSearchQuery.toLowerCase())
        )
        .slice(0, 5); // Limit the number of displayed options
    },
    // Computed property for dateFrom
    formattedDateFrom: {
      get() {
        return this.formatDateForInput(this.selectedSlip.dateFrom);
      },
      set(value) {
        this.selectedSlip.dateFrom = value ? new Date(value).toISOString() : "";
      },
    },
    // Computed property for dateTo
    formattedDateTo: {
      get() {
        return this.formatDateForInput(this.selectedSlip.dateTo);
      },
      set(value) {
        this.selectedSlip.dateTo = value ? new Date(value).toISOString() : "";
      },
    },
    // Filter companies based on search query
    filteredCompanies() {
      return this.companies
        .filter((company) =>
          company.companyName
            .toLowerCase()
            .includes(this.companySearchQuery.toLowerCase())
        )
        .slice(0, 5); // Limit the number of displayed options
    },
  },
  created() {
    this.fetchDutySlips();
    this.fetchDrivers(); // Fetch drivers when the component is created
    this.fetchCompanies(); // Fetch companies when the component is created
  },
  methods: {
    // Fetch duty slips from the API
    async fetchDutySlips() {
      try {
        const response = await api.get("/dutyslips");
        this.dutySlips = response.data;
      } catch (error) {
        console.error("Error fetching duty slips:", error);
      }
    },
    // View slip details
    async viewSlip(dutySlipId) {
      try {
        const response = await api.get(`/dutyslips/${dutySlipId}`);
        this.selectedSlip = response.data;
        this.isEditMode = false;
        this.isModalOpen = true;
      } catch (error) {
        console.error("Error fetching duty slip details:", error);
      }
    },
    // Edit slip
    async editSlip(dutySlipId) {
      try {
        const response = await api.get(`/dutyslips/${dutySlipId}`);
        this.selectedSlip = response.data;
        this.isEditMode = true;
        this.isModalOpen = true;
      } catch (error) {
        console.error("Error fetching duty slip details:", error);
      }
    },
    // Save edited slip
    async saveSlip() {
      try {
        await api.put(`/dutyslips/${this.selectedSlip.dutySlipId}`, this.selectedSlip);
        this.closeModal();
        this.fetchDutySlips(); // Refresh the list
        Swal.fire({
          title: "Success!",
          text: "Duty slip details updated successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error updating duty slip:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to update duty slip details.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    },
    // Handle image loading errors
    handleImageError(field) {
      // Replace the image URL with a placeholder or display the URL as text
      this.selectedSlip[field] = "Image failed to load: " + this.selectedSlip[field];
    },
    // Close modal
    closeModal() {
      this.isModalOpen = false;
      this.selectedSlip = {};
    },
    // Delete slip
    async deleteSlip(dutySlipId) {
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
          // Call API to delete the company
          await api.delete(`/dutyslips/${dutySlipId}`);

          // Remove the company from the local list
          this.dutySlips = this.dutySlips.filter(
            (dutySlip) => dutySlip.dutySlipId !== dutySlipId
          );

          // Check if the current page is empty after deletion
          if (this.paginatedData.length === 0 && this.currentPage > 1) {
            this.currentPage -= 1; // Move to the previous page
          }

          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: "The duty slip has been deleted.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
            customClass: {
              popup: "swal2-popup", // Apply custom class
            },
          });
        } catch (error) {
          console.error("Error deleting duty slip:", error);

          // Show error message
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the duty slip. Please try again.",
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
    // Toggle the date dropdown
    toggleDateDropdown() {
      this.isDateDropdownOpen = !this.isDateDropdownOpen;
    },
    // Select a date filter option
    selectDateFilter(option) {
      this.dateFilter = option;
      this.isDateDropdownOpen = false;
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
    // Fetch drivers from the API
    async fetchDrivers() {
      try {
        const response = await api.get("/drivers");
        this.drivers = response.data;
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    },
    // Update driver search query dynamically
    updateDriverSearchQuery(query) {
      this.driverSearchQuery = query;
    },
    // Handle driver selection
    handleDriverSelection(selectedDriver) {
      if (selectedDriver) {
        this.selectedSlip.driverName = selectedDriver.name;
        this.selectedSlip.driverId = selectedDriver.driverId;
        this.selectedSlip.phoneNumber = selectedDriver.contact;
      } else {
        this.selectedSlip.driverName = "";
        this.selectedSlip.driverId = "";
        this.selectedSlip.phoneNumber = "";
      }
    },
    // Helper function to format date as YYYY-MM-DD
    formatDateForInput(date) {
      if (!date) return ""; // Handle empty dates
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    // Fetch companies from the API
    async fetchCompanies() {
      try {
        const response = await api.get("/companies");
        this.companies = response.data;
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    },
    // Update company search query dynamically
    updateCompanySearchQuery(query) {
      this.companySearchQuery = query;
    },
    // Handle company selection
    handleCompanySelection(selectedCompany) {
      if (selectedCompany) {
        // Update company name and ID
        this.selectedSlip.companyName = selectedCompany.companyName;
        this.selectedSlip.companyId = selectedCompany.companyId;
      } else {
        // Reset if no company is selected
        this.selectedSlip.companyName = "";
        this.selectedSlip.companyId = "";
      }
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

/* Custom select dropdown */
.custom-select {
  border: 1px solid #800000 !important;
  border-radius: 4px !important;
  padding: 8px;
  appearance: none; /* Removes default styles */
  -webkit-appearance: none; /* Safari */
  -moz-appearance: none; /* Firefox */
  background-color: white;
  color: #800000 !important;
  cursor: pointer;
  padding-right: 2.5rem;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23800000'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.25rem;
}
.custom-select:focus {
  outline: none;
  border-color: #800000 !important;
  box-shadow: 0 0 5px rgba(128, 0, 0, 0.5);
}

/* Responsive Table Styles */
@media (max-width: 768px) {
  th.hidden,
  td.hidden {
    display: none;
  }
}
</style>
