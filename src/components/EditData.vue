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
    <div
      class="flex flex-col sm:flex-row justify-center sm:justify-between items-center text-center sm:text-left mb-6"
    >
      <img
        src="@/assets/logo.png"
        alt="Company Logo"
        class="w-24 h-12 mb-2 sm:mb-0"
      />
      <div class="text-m font-semibold text-maroon cursor-pointer">
        {{ email }}
      </div>
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

    <!-- Single Card with Buttons -->
    <div class="bg-white p-6 rounded-lg shadow-md border border-gray-300">
      <h3 class="text-xl font-semibold text-maroon mb-4 text-center">
        Data Actions
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Payslip Button -->
        <button
          @click="viewPayslipData"
          class="bg-maroon text-white px-4 py-3 rounded-md text-lg font-semibold hover:bg-maroon-dark transition duration-300"
        >
          View Pay-Slips
        </button>

        <!-- Driver Button -->
        <button
          @click="viewDriverData"
          class="bg-maroon text-white px-4 py-3 rounded-md text-lg font-semibold hover:bg-maroon-dark transition duration-300"
        >
          View Driver Data
        </button>

        <!-- Company Button -->
        <button
          @click="viewCompanyData"
          class="bg-maroon text-white px-4 py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition duration-300"
        >
          View Company Data
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import XLSX from "xlsx";
import Swal from "sweetalert2";

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
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch duty slips. Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    },

    async exportToExcel() {
      await this.fetchDutySlips();

      if (this.duty.length === 0) {
        Swal.fire({
          title: "No Data!",
          text: "No data available for the selected date range.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        return;
      }

      // Convert data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(this.duty);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Duty Slips");

      // Generate and download the Excel file
      XLSX.writeFile(workbook, "Duty_Slips.xlsx");

      // Show success message
      Swal.fire({
        title: "Success!",
        text: "Data exported successfully. Check your downloads for the Excel sheet.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    },

    // viewPayslipData() {
    //   // Navigate to view data page
    //   alert("View Data functionality will be implemented here.");
    // },

    // viewDriverpData() {
    //   // Navigate to edit data page
    //   alert("Edit Data functionality will be implemented here.");
    // },

    // viewCompanyData() {
    //   // Navigate to remove data page
    //   alert("Remove Data functionality will be implemented here.");
    // },
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
