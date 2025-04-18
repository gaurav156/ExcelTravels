<template>
  <div class="p-6 pt-0">
    <!-- Centered Heading with Maroon Color -->
    <h2 class="text-2xl mb-6 text-center text-maroon font-extrabold">
      Company Data
    </h2>

    <!-- Filter Section - Right-Aligned -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6 justify-end">
      <!-- Filter by Company Name with Clear (✖) Icon -->
      <div class="flex items-center relative">
        <label for="nameFilter" class="mr-2 font-medium text-maroon">
          Filter by Name:
        </label>
        <input
          id="nameFilter"
          v-model="nameFilter"
          type="text"
          placeholder="Search by Company Name"
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
        v-for="company in companies"
        :key="company.companyId"
        class="mb-4 p-4 border-2 rounded-lg shadow-sm hover:shadow-md transition-shadow card-style"
      >
        <!-- Company Details -->
        <div class="space-y-2">
          <p><strong>ID:</strong> {{ company.companyId }}</p>
          <p><strong>Name:</strong> {{ company.companyName }}</p>
          <p><strong>Email:</strong> {{ company.email }}</p>
          <p><strong>Contact:</strong> {{ company.contact }}</p>
          <p><strong>Address:</strong> {{ company.address }}</p>
        </div>

        <!-- Action Icons -->
        <div class="flex justify-end gap-4 mt-4">
          <!-- Info Icon -->
          <svg
            @click="viewCompany(company.companyId)"
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
            @click="editCompany(company.companyId)"
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
            @click="allowDelete ? deleteCompany(company.companyId) : null"
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
            <th class="border p-2">Company ID</th>
            <th class="border p-2">Company Name</th>
            <th class="border p-2 hidden sm:table-cell">Email</th>
            <th class="border p-2 hidden md:table-cell">Contact</th>
            <th class="border p-2 hidden lg:table-cell">Address</th>
            <th class="border p-2">Details</th>
            <th class="border p-2">Edit</th>
            <th class="border p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="company in companies"
            :key="company.companyId"
            class="hover:bg-gray-100 transition-all"
          >
            <td class="border p-2 text-center font-bold">
              {{ company.companyId }}
            </td>
            <td class="border p-2 font-bold">{{ company.companyName }}</td>
            <td class="border p-2 font-bold hidden sm:table-cell">
              {{ company.email }}
            </td>
            <td class="border p-2 font-bold hidden md:table-cell">
              {{ company.contact }}
            </td>
            <td class="border p-2 font-bold hidden lg:table-cell">
              {{ company.address }}
            </td>
            <td class="border p-2 text-center">
              <!-- Details Icon -->
              <svg
                @click="viewCompany(company.companyId)"
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
                @click="editCompany(company.companyId)"
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
                @click="allowDelete ? deleteCompany(company.companyId) : null"
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
    <div v-if="companies.length > 0" class="flex justify-center mt-4">
      <button
        @click="currentPage = 1"
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        &laquo;
      </button>
      <button
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        &lsaquo;
      </button>

      <!-- Show limited page numbers -->
      <template v-for="page in visiblePages" :key="page">
        <button
          @click="currentPage = page"
          class="pagination-btn"
          :class="{ 'bg-maroon text-white': currentPage === page }"
        >
          {{ page }}
        </button>
      </template>

      <button
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        class="pagination-btn"
      >
        &rsaquo;
      </button>
      <button
        @click="currentPage = totalPages"
        :disabled="currentPage === totalPages"
        class="pagination-btn"
      >
        &raquo;
      </button>
    </div>

    <!-- View/Edit Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[1000] overflow-y-auto"
    >
      <div
        class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        <!-- Modal Header with Close Button -->
        <div
          class="flex justify-between items-center p-6 border-b border-gray-200 bg-maroon"
        >
          <h3 class="text-xl font-bold text-white">
            {{ isEditMode ? "Edit Company" : "View Company" }}
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
          <!-- Company Details -->
          <div v-if="!isEditMode" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm font-medium text-gray-700">Company ID</p>
                <p class="text-gray-500">
                  {{ selectedCompany.companyId }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Created At</p>
                <p class="text-gray-500">
                  {{ formatDate(selectedCompany.createdAt) }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Company Name</p>
                <p class="text-gray-500">
                  {{ selectedCompany.companyName }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Email</p>
                <p class="text-gray-500">
                  {{ selectedCompany.email }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Contact</p>
                <p class="text-gray-500">
                  {{ selectedCompany.contact }}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-700">Address</p>
                <p class="text-gray-500">
                  {{ selectedCompany.address }}
                </p>
              </div>
            </div>
          </div>

          <!-- Edit Form -->
          <form v-else @submit.prevent="saveCompany" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-500 font-bold"
                  >Company ID</label
                >
                <input
                  v-model="selectedCompany.companyId"
                  type="text"
                  readonly
                  disabled
                  class="mt-1 block w-full px-4 py-2 border border-[#800000] rounded-md shadow-sm bg-gray-100"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-500 font-bold"
                  >Created At</label
                >
                <input
                  v-model="selectedCompany.createdAt"
                  type="text"
                  readonly
                  disabled
                  class="mt-1 block w-full px-4 py-2 border border-[#800000] rounded-md shadow-sm bg-gray-100"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-500 font-bold"
                  >Company Name <span class="text-red-500">*</span></label
                >
                <input
                  v-model="selectedCompany.companyName"
                  type="text"
                  required
                  class="mt-1 block w-full px-4 py-2 border border-maroon rounded-md shadow-sm"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-500 font-bold"
                  >Email <span class="text-red-500">*</span></label
                >
                <input
                  v-model="selectedCompany.email"
                  type="email"
                  required
                  class="mt-1 block w-full px-4 py-2 border border-maroon rounded-md shadow-sm"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-500 font-bold"
                  >Contact <span class="text-red-500">*</span></label
                >
                <input
                  v-model="selectedCompany.contact"
                  type="tel"
                  required
                  class="mt-1 block w-full px-4 py-2 border border-maroon rounded-md shadow-sm"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-500 font-bold"
                  >Address <span class="text-red-500">*</span></label
                >
                <input
                  v-model="selectedCompany.address"
                  type="text"
                  required
                  class="mt-1 block w-full px-4 py-2 border border-maroon rounded-md shadow-sm"
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

  <!-- Loading Overlay -->
  <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
      <!-- Heroicon: Arrow Path (spinner) -->
      <svg class="animate-spin h-12 w-12 text-maroon mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-maroon font-semibold">Processing, please wait...</p>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api";
import Swal from "sweetalert2";

export default {
  name: "CompanyList",
  props: {
    isModalOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      companies: [], // Only contains current page's data
      currentPage: 1,
      totalPages: 1,
      nameFilter: "", // Filter by company name
      isEditMode: false, // Toggles between view and edit modes
      selectedCompany: {}, // Stores the selected company data
      windowWidth: window.innerWidth, // Track window width for responsiveness
      allowDelete: false,
      isLoading: false,
      debounceTimer: null,
    };
  },
  computed: {
    // Dynamically adjust itemsPerPage based on screen size
    itemsPerPage() {
      return this.windowWidth < 1024 ? 5 : 10;
    },
    visiblePages() {
      const range = 2; // Number of pages to show before/after current
      const start = Math.max(2, this.currentPage - range);
      const end = Math.min(this.totalPages - 1, this.currentPage + range);
      
      const pages = [];
      
      // Always include first page
      pages.push(1);
      
      // Add range around current page
      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < this.totalPages - 1) pages.push('...');
      
      // Always include last page if different from first
      if (this.totalPages > 1) pages.push(this.totalPages);
      
      return pages;
    }
  },
  watch: {
    currentPage() {
      this.fetchCompanies();
    },
    itemsPerPage() {
      this.currentPage = 1; // Reset to first page when items per page changes
      this.fetchCompanies();
    },
    nameFilter(newVal) {
      console.log(newVal);
      this.debouncedFetch();
    },
  },
  mounted() {
    const role =
      this.$store.state.user?.role ||
      JSON.parse(sessionStorage.getItem("user")).role;
    this.allowDelete = role && role === "admin";
  },
  created() {
    this.fetchCompanies();
    window.addEventListener("resize", this.handleResize); // Add resize listener
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize); // Clean up listener
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  },
  methods: {
    // Fetch companies from the API
    async fetchCompanies() {
      this.isLoading = true;
      try {
      const params = {
          page: this.currentPage,
          limit: this.itemsPerPage,
          search: this.nameFilter,
        };
        
        const response = await api.get("/companies", { params });
        this.companies = response.data.companies;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.currentPage;
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Error fetching companies.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal2-popup", // Apply custom class
          },
        });
      } finally {
        this.isLoading = false;
      }
    },
    debouncedFetch() {
      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.currentPage = 1; // Reset to first page when filter changes
        this.fetchCompanies();
      }, 500); // 500ms delay
    },
    // Handle window resize to update windowWidth
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    // View company details
    async viewCompany(companyId) {
      this.isLoading = true;
      try {
        const response = await api.get(`/companies/${companyId}`);
        this.selectedCompany = response.data;
        this.isEditMode = false;
        this.$emit("update:isModalOpen", true); // Emit modal state to parent
      } catch (error) {
        console.error("Error fetching company details:", error);
        Swal.fire({
          title: "Error!",
          text: "Error fetching company details.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal2-popup", // Apply custom class
          },
        });
      } finally {
        this.isLoading = false;
      }
    },
    // Edit company
    async editCompany(companyId) {
      this.isLoading = true;
      try {
        const response = await api.get(`/companies/${companyId}`);
        this.selectedCompany = response.data;
        this.isEditMode = true;
        this.$emit("update:isModalOpen", true); // Emit modal state to parent
      } catch (error) {
        console.error("Error fetching company details:", error);
        Swal.fire({
          title: "Error!",
          text: "Error fetching company details.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal2-popup", // Apply custom class
          },
        });
      } finally {
        this.isLoading = false;
      }
    },
    // Save edited company
    async saveCompany() {
      // Get the original company data
      const originalCompany = this.companies.find(
        (c) => c.companyId === this.selectedCompany.companyId
      );

      // Check if any changes were made
      const hasChanges =
        this.selectedCompany.companyName !== originalCompany.companyName ||
        this.selectedCompany.email !== originalCompany.email ||
        this.selectedCompany.contact !== originalCompany.contact ||
        this.selectedCompany.address !== originalCompany.address;

      if (!hasChanges) {
        Swal.fire({
          title: "No Changes",
          text: "No changes were made to the company details.",
          icon: "info",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        return;
      }

      this.isLoading = true;
      try {
        await api.put(
          `/companies/${this.selectedCompany.companyId}`,
          this.selectedCompany
        );
        this.closeModal();
        this.fetchCompanies(); // Refresh the list
        Swal.fire({
          title: "Success!",
          text: "Company details updated successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error updating company:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to update company details.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      } finally {
        this.isLoading = false;
      }
    },
    // Close modal
    closeModal() {
      this.selectedCompany = {};
      this.$emit("update:isModalOpen", false); // Emit modal state to parent
    },
    // Delete company
    async deleteCompany(companyId) {
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
        this.isLoading = true;
        try {
          // Call API to delete the company
          await api.delete(`/companies/${companyId}`);

          // Remove the company from the local list
          this.companies = this.companies.filter(
            (company) => company.companyId !== companyId
          );

          // Check if the current page is empty after deletion
          if (this.companies.length === 0 && this.currentPage > 1) {
            this.currentPage -= 1; // Move to the previous page
          }

          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: "The company has been deleted.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
            customClass: {
              popup: "swal2-popup", // Apply custom class
            },
          });
        } catch (error) {
          console.error("Error deleting company:", error);

          // Show error message
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the company. Please try again.",
            icon: "error",
            confirmButtonColor: "#d33",
            confirmButtonText: "OK",
            customClass: {
              popup: "swal2-popup", // Apply custom class
            },
          });
        } finally {
          this.isLoading = false;
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

/* Responsive Table Styles */
@media (max-width: 768px) {
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
