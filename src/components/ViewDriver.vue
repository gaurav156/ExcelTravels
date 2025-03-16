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
          class="custom-select focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
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
              @click="deleteDriver(driver.driverId)"
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
  </div>
</template>

<script>
import api from "@/api";
import Swal from "sweetalert2";

export default {
  name: "DriverList",
  data() {
    return {
      drivers: [], // All drivers fetched from the API
      currentPage: 1,
      itemsPerPage: 15, // 15 records per page
      nameFilter: "", // Filter by driver name
    };
  },
  computed: {
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
  created() {
    this.fetchDrivers();
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
    // View driver details
    viewDriver(id) {
      console.log("View driver:", id);
      // Implement view logic here
    },
    // Edit driver
    editDriver(id) {
      console.log("Edit driver:", id);
      // Implement edit logic here
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
</style>
