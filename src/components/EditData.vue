<template>
  <div
    style="background-color: #f5f5dc"
    class="p-8 rounded-lg shadow-xl border-2 border-maroon max-w-4xl mx-auto transform transition duration-300 hover:shadow-2xl relative hover:border-glow"
  >
    <!-- Top Border Icon -->
    <div
      class="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full border-2 border-maroon shadow-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10 text-maroon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    </div>

    <!-- Logo and Email Section -->
    <div class="flex justify-between items-center mb-6">
      <div class="text-m font-semibold text-maroon cursor-pointer">
        {{ email }}
      </div>
      <img src="@/assets/logo.png" alt="Company Logo" class="w-24 h-12" />
    </div>

    <!-- Title -->
    <h2 class="text-3xl font-extrabold text-maroon text-center mb-6">
      Edit Data
    </h2>

    <!-- Export Section -->
    <div
      class="bg-white p-6 rounded-lg shadow-md border border-gray-300 mb-8 mx-auto flex flex-col items-center text-center"
    >
      <h3 class="text-xl font-semibold text-maroon mb-4">Export Duty Slips</h3>
      <div class="flex flex-col md:flex-row items-center justify-center gap-4">
        <input
          type="date"
          v-model="exportStartDate"
          class="focus:ring-[#800000] focus:outline-none mt-1 block w-full md:w-40 px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
          placeholder="Start Date"
        />
        <span class="text-maroon">to</span>
        <input
          type="date"
          v-model="exportEndDate"
          class="focus:ring-[#800000] focus:outline-none mt-1 block w-full md:w-40 px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
          placeholder="End Date"
        />
        <button
          @click="exportToExcel"
          class="bg-maroon text-white px-4 py-2 rounded-md text-lg font-semibold shadow-md transition duration-300 hover:bg-maroon-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2 w-full md:w-auto flex items-center justify-center gap-2"
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export to Excel
        </button>
      </div>
    </div>
    <!-- Cards Section -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-2 lg:grid-rows-2 lg:gap-6"
    >
      <!-- Duty Slip Card -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <h3 class="text-xl font-semibold text-maroon mb-4 text-center">
          Duty Slip Actions
        </h3>
        <div class="flex flex-col gap-4">
          <button
            @click="viewDutySlip"
            class="bg-maroon-light text-white px-4 py-3 rounded-md text-lg font-semibold"
          >
            View Duty Slip
          </button>
          <button
            @click="editDutySlip"
            class="bg-maroon text-white px-4 py-3 rounded-md text-lg font-semibold"
          >
            Edit Duty Slip
          </button>
        </div>
      </div>

      <!-- Driver Details Card -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <h3 class="text-xl text-center font-semibold text-maroon mb-4">
          Driver Details Actions
        </h3>
        <div class="flex flex-col gap-4">
          <button
            @click="viewDriverDetails"
            class="bg-maroon-light text-white px-4 py-3 rounded-md text-lg font-semibold"
          >
            View Driver Details
          </button>
          <button
            @click="editDriverDetails"
            class="bg-maroon text-white px-4 py-3 rounded-md text-lg font-semibold"
          >
            Edit Driver Details
          </button>
        </div>
      </div>

      <!-- Company Details Card (Centered in the second row) -->
      <div
        class="bg-white p-6 rounded-lg shadow-md border border-gray-300 lg:col-span-2 lg:justify-self-center w-full max-w-md"
      >
        <h3 class="text-xl text-center font-semibold text-maroon mb-4">
          Company Details Actions
        </h3>
        <div class="flex flex-col gap-4">
          <button
            @click="viewCompanyDetails"
            class="bg-maroon-light text-white px-4 py-3 rounded-md text-lg font-semibold"
          >
            View Company Details
          </button>
          <button
            @click="editCompanyDetails"
            class="bg-maroon text-white px-4 py-3 rounded-md text-lg font-semibold"
          >
            Edit Company Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import XLSX from "xlsx";

export default {
  name: "EditData",
  data() {
    return {
      email: "excel.travel@rediffmail.com",
      exportStartDate: null,
      exportEndDate: null,
      duty: [],
    };
  },
  methods: {
    async fetchDutySlips() {
      try {
        const response = await axios.get("http://localhost:5000/dutyslips", {
          params: {
            startDate: this.exportStartDate,
            endDate: this.exportEndDate,
          },
        });
        this.duty = response.data;
      } catch (error) {
        console.error("Error fetching duty slips:", error);
      }
    },

    async exportToExcel() {
      await this.fetchDutySlips();

      if (this.duty.length === 0) {
        alert("No data available for the selected date range.");
        return;
      }

      // Convert data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(this.duty);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Duty Slips");

      // Generate and download the Excel file
      XLSX.writeFile(workbook, "Duty_Slips.xlsx");
    },

    viewDutySlip() {
      // Navigate to view duty slip page
      alert("View Duty Slip functionality will be implemented here.");
    },

    editDutySlip() {
      // Navigate to edit duty slip page
      alert("Edit Duty Slip functionality will be implemented here.");
    },

    viewDriverDetails() {
      // Navigate to view driver details page
      alert("View Driver Details functionality will be implemented here.");
    },

    editDriverDetails() {
      // Navigate to edit driver details page
      alert("Edit Driver Details functionality will be implemented here.");
    },

    viewCompanyDetails() {
      // Navigate to view company details page
      alert("View Company Details functionality will be implemented here.");
    },

    editCompanyDetails() {
      // Navigate to edit company details page
      alert("Edit Company Details functionality will be implemented here.");
    },
  },
};
</script>

<style scoped>
/* Custom Colors */
.text-maroon {
  color: #800000;
}

.bg-maroon {
  background-color: #800000;
}

.bg-maroon-light {
  background-color: #a52a2a; /* Lighter Maroon */
}

.hover\:bg-maroon:hover {
  background-color: #800000; /* Maroon */
}

.hover\:bg-maroon-dark:hover {
  background-color: #600000; /* Darker Maroon */
}

.focus\:border-maroon:focus {
  border-color: #800000;
}

.border-maroon {
  border-color: #800000; /* Maroon Solid Border */
  box-shadow: 0 0 10px rgba(128, 0, 0, 0.8); /* Glowing Effect */
}
</style>
