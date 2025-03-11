<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">View Duty Slip Data</h2>
    <table class="table-auto w-full border-collapse">
      <thead>
        <tr class="bg-maroon text-white">
          <th class="border p-2">Sr. No</th>
          <th class="border p-2">Slip ID</th>
          <th class="border p-2">Company Name</th>
          <th class="border p-2">Customer Name</th>
          <th class="border p-2">City</th>
          <th class="border p-2">Pickup Time</th>
          <th class="border p-2">Edit</th>
          <th class="border p-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(slip, index) in paginatedData"
          :key="slip.dutySlipId"
          class="hover:bg-gray-100 transition-all"
        >
          <td class="border p-2 text-center font-bold">
            {{ index + 1 + (currentPage - 1) * itemsPerPage }}
          </td>
          <td class="border p-2 text-center font-bold">
            {{ slip.dutySlipId }}
          </td>
          <td class="border p-2 font-bold">{{ slip.companyName }}</td>
          <td class="border p-2 font-bold">{{ slip.customerName }}</td>
          <td class="border p-2 font-bold">{{ slip.city }}</td>
          <td class="border p-2 text-center font-bold">
            {{ slip.pickupTime }}
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
</style>

<script>
import api from "@/api";

export default {
  name: "DutySlipList",
  data() {
    return {
      dutySlips: [],
      currentPage: 1,
      itemsPerPage: 15, // 15 records per page
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.dutySlips.length / this.itemsPerPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.dutySlips.slice(start, start + this.itemsPerPage);
    },
  },
  created() {
    this.fetchDutySlips();
  },
  methods: {
    async fetchDutySlips() {
      try {
        const response = await api.get("/dutyslips");
        this.dutySlips = response.data;
      } catch (error) {
        console.error("Error fetching duty slips:", error);
      }
    },
    editSlip(id) {
      console.log("Edit slip:", id);
      // Implement edit logic here
    },
    deleteSlip(id) {
      console.log("Delete slip:", id);
      // Implement delete logic here
    },
  },
};
</script>
