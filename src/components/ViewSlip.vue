<template>
  <div class="p-6 pt-0">
    <!-- Centered Heading with Maroon Color -->
    <h2 class="text-2xl mb-6 text-center text-maroon font-extrabold">
      View Duty Slip Data
    </h2>

    <!-- Filter Section - Right-Aligned -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6 justify-end">
      <!-- Filter by Date -->
      <div class="flex items-center">
        <label for="dateFilter" class="mr-2 font-medium text-maroon">
          Filter by Date:
        </label>
        <select
          id="dateFilter"
          v-model="dateFilter"
          class="p-2 border border-maroon rounded-md focus:ring-maroon focus:border-maroon custom-select"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
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
          class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
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
          <th class="border p-2">Company Name</th>
          <th class="border p-2">Customer Name</th>
          <th class="border p-2">City</th>
          <th class="border p-2">Date</th>
          <th class="border p-2">Trip Route</th>
          <th class="border p-2">View</th>
          <th class="border p-2">Edit</th>
          <th class="border p-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="slip in filteredData"
          :key="slip.dutySlipId"
          class="hover:bg-gray-100 transition-all"
        >
          <td class="border p-2 text-center font-bold">
            {{ slip.dutySlipId }}
          </td>
          <td class="border p-2 font-bold">{{ slip.companyName }}</td>
          <td class="border p-2 font-bold">{{ slip.customerName }}</td>
          <td class="border p-2 font-bold">{{ slip.city }}</td>
          <td class="border p-2 font-bold">{{ slip.dateFrom }}</td>
          <td class="border p-2 font-bold">{{ slip.tripRoute }}</td>
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
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "DutySlipList",
  data() {
    return {
      dutySlips: [], // All duty slips fetched from the API
      currentPage: 1,
      itemsPerPage: 15, // 15 records per page
      dateFilter: "newest", // Default filter: newest first
      nameFilter: "", // Filter by customer/company name
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
        data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first
      } else {
        data.sort((a, b) => new Date(a.date) - new Date(b.date)); // Oldest first
      }

      // Paginate the filtered data
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return data.slice(start, start + this.itemsPerPage);
    },
    // Total pages for pagination
    totalPages() {
      return Math.ceil(this.dutySlips.length / this.itemsPerPage);
    },
  },
  created() {
    this.fetchDutySlips();
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
    viewSlip(id) {
      console.log("View slip:", id);
      // Implement view logic here
    },
    // Edit slip
    editSlip(id) {
      console.log("Edit slip:", id);
      // Implement edit logic here
    },
    // Delete slip
    deleteSlip(id) {
      console.log("Delete slip:", id);
      // Implement delete logic here
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
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23800000'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.25rem;
  padding-right: 2.5rem;
}

select option:hover {
  background-color: #800000;
  color: white;
}
</style>
