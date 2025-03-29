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
      class="flex flex-col sm:flex-row justify-center sm:justify-between items-center text-center sm:text-left mt-4 mb-6"
    >
      <img
        src="@/assets/logo.png"
        alt="Company Logo"
        class="h-12 mb-2 sm:mb-0"
      />
      <div class="text-m font-semibold text-maroon cursor-pointer">
        {{ email }}
      </div>
    </div>

    <!-- Title -->
    <h2 class="text-3xl font-extrabold text-maroon text-center mb-6">
      Export and View Data
    </h2>

    <!-- Export Section -->
    <div
      class="bg-white p-6 rounded-lg shadow-md border border-gray-300 mb-8 mx-auto flex flex-col items-center text-center"
    >
      <h3 class="text-xl font-semibold text-[#800000] mb-4">
        Export Duty Slips
      </h3>
      <div class="flex flex-col md:flex-row items-center justify-center gap-4">
        <!-- Start Date -->
        <!-- Start Date -->
        <div class="relative w-40">
          <input
            type="date"
            v-model="exportStartDate"
            class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 pr-10 cursor-pointer placeholder-shown:text-gray-400"
            data-placeholder="mm/dd/yyyy"
          />
          <!-- Custom Calendar Icon -->
          <svg
            class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#800000] pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 2v2M16 2v2M4 6h16M5 10h14M12 14v4m0 0h-2m2 0h2"
            />
            <rect
              x="3"
              y="4"
              width="18"
              height="18"
              rx="2"
              ry="2"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
            />
          </svg>
        </div>

        <span class="text-[#800000]">to</span>

        <!-- End Date -->
        <div class="relative w-40">
          <input
            type="date"
            v-model="exportEndDate"
            class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 pr-10 cursor-pointer placeholder-shown:text-gray-400"
            data-placeholder="mm/dd/yyyy"
          />
          <!-- Custom Calendar Icon -->
          <svg
            class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#800000] pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 2v2M16 2v2M4 6h16M5 10h14M12 14v4m0 0h-2m2 0h2"
            />
            <rect
              x="3"
              y="4"
              width="18"
              height="18"
              rx="2"
              ry="2"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
            />
          </svg>
        </div>

        <!-- Export Button -->
        <button
          @click="exportToExcel"
          class="bg-[#800000] text-white px-4 py-2 rounded-md text-lg font-semibold shadow-md transition duration-300 hover:bg-[#600000] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#800000] focus:ring-offset-2 w-full md:w-auto flex items-center justify-center gap-2"
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
        <router-link
          to="/records/viewslip"
          class="bg-maroon text-white px-4 py-3 rounded-md text-lg font-semibold hover:bg-maroon-dark transition duration-300 text-center"
        >
          View Duty-Slips
        </router-link>

        <!-- View Driver Data -->
        <router-link
          to="/records/viewdriver"
          class="bg-maroon text-white px-4 py-3 rounded-md text-lg font-semibold hover:bg-maroon-dark transition duration-300 text-center"
        >
          View Driver Data
        </router-link>

        <!-- View Company Data -->
        <router-link
          to="/records/viewcompany"
          class="bg-maroon text-white px-4 py-3 rounded-md text-lg font-semibold hover:bg-maroon-dark transition duration-300 text-center"
        >
          View Company Data
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

export default {
  name: "EditData",
  data() {
    return {
      email: "excel.travel@rediffmail.com",
      exportStartDate: null,
      exportEndDate: null,
      duty: [], // Array to store fetched duty slips
      isExporting: false, // Loading state for export
    };
  },
  computed: {
    totalKM(startKM, endKM) {
      // Ensure values are numbers and calculate difference
      return Number(endKM) - Number(startKM) || 0;
    },
    totalTime(startTime, endTime) {
      if (!startTime || !endTime) return "N/A";

      // Convert times to Date objects
      const start = new Date(`1970-01-01T${startTime}`);
      const end = new Date(`1970-01-01T${endTime}`);

      // Calculate difference in minutes
      let diffMinutes = Math.floor((end - start) / (1000 * 60));

      if (diffMinutes < 0) return "Invalid Time"; // Handle invalid cases

      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;

      return `${hours}h ${minutes}m`;
    },
  },
  methods: {
    calculateTotalKM(slip) {
      if (!slip.endKM || !slip.startKM) return 0;
      return Number(slip.endKM) - Number(slip.startKM);
    },

    calculateTotalTime(slip) {
      if (!slip.startTime || !slip.endTime) return "N/A";

      // Convert times to Date objects
      const start = new Date(`1970-01-01T${slip.startTime}`);
      const end = new Date(`1970-01-01T${slip.endTime}`);

      // Calculate difference in minutes
      let diffMinutes = Math.floor((end - start) / (1000 * 60));

      if (diffMinutes < 0) return "Invalid Time";

      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;

      return `${hours}h ${minutes}m`;
    },
    clearDateFields() {
      this.exportStartDate = null;
      this.exportEndDate = null;
    },

    // Validate if the start date is smaller than the end date
    validateDateRange() {
      if (this.exportStartDate && this.exportEndDate) {
        const startDate = new Date(this.exportStartDate);
        const endDate = new Date(this.exportEndDate);
        return startDate <= endDate;
      }
      return false;
    },

    async fetchDutySlips() {
      try {
        this.duty = []; // Clear previous data

        const response = await api.get("/dutyslips", {
          params: {
            dateFrom: this.exportStartDate,
            dateTo: this.exportEndDate,
          },
        });

        // Always return the data (which might be empty)
        this.duty = response.data || [];
        return this.duty;
      } catch (error) {
        console.error("Fetch error:", error);
        // If it's a 404, treat it as empty data
        if (error.response && error.response.status === 404) {
          this.duty = [];
          return this.duty;
        }
        throw error; // Re-throw other errors
      }
    },
    async exportToExcel() {
      // Validate if dates are selected
      if (!this.exportStartDate || !this.exportEndDate) {
        Swal.fire({
          title: "Error!",
          text: "Please select both start and end dates before exporting.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        return;
      }

      // Validate date range
      if (!this.validateDateRange()) {
        Swal.fire({
          title: "Error!",
          text: "Start date must be smaller than or equal to the end date.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        return;
      }

      this.isExporting = true;

      try {
        const dutySlips = await this.fetchDutySlips();

        // Check for empty data
        if (dutySlips.length === 0) {
          Swal.fire({
            title: "No Data!",
            text: "No data available for the selected date range.",
            icon: "info",
            iconColor: "maroon",
            confirmButtonColor: "maroon",
            confirmButtonText: "OK",
          });
          return;
        }

        // Define field mappings (database field → display name)
        const fieldMappings = {
          dutySlipId: "Duty Slip ID",
          createdAt: "Created At",
          modifiedAt: "Modified At",
          companyId: "Company ID",
          companyName: "Company Name",
          customerName: "Customer Name",
          city: "City",
          address: "Address",
          carBooked: "Car Booked",
          phoneNumber: "Phone Number",
          dutyType: "Duty Type",
          driverId: "Driver ID",
          driverName: "Driver Name",
          carNumber: "Car Number",
          dateFrom: "Start Date",
          dateTo: "End Date",
          pickupTime: "Pickup Time",
          tripRoute: "Trip Route",
          startKM: "Start KM",
          endKM: "End KM",
          startTime: "Start Time",
          endTime: "End Time",
          // These will be calculated below
          totalKM: "Total KM",
          totalTime: "Total Time",
          parkingFees: "Parking Fees",
          tollFees: "Tolll Fees",
        };

        // Format data and transform headers
        const formattedData = dutySlips.map((slip) => {
          const formattedSlip = {};

          // Add all other fields
          Object.keys(fieldMappings).forEach((field) => {
            if (field === "totalKM" || field === "totalTime") return; // Skip as we already added them

            if (
              field === "dateFrom" ||
              field === "dateTo" ||
              field === "createdAt" ||
              field === "modifiedAt"
            ) {
              // Format dates as DD-MM-YYYY
              formattedSlip[fieldMappings[field]] = slip[field]
                ? new Date(slip[field])
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .replace(/\//g, "-")
                : "";
            } else {
              formattedSlip[fieldMappings[field]] = slip[field] || "";
            }
          });
          formattedSlip[fieldMappings.totalKM] = this.calculateTotalKM(slip);
          formattedSlip[fieldMappings.totalTime] =
            this.calculateTotalTime(slip);
          return formattedSlip;
        });
        // Create worksheet with formatted headers
        const worksheet = XLSX.utils.json_to_sheet(formattedData);

        // Auto-size columns for better readability
        worksheet["!cols"] = Object.keys(fieldMappings).map(() => ({
          wch: 15, // Character width (adjust as needed)
        }));

        // Format date columns in Excel
        const dateColumns = ["dateFrom", "dateTo"];
        dateColumns.forEach((col) => {
          if (worksheet[`!ref`]) {
            const range = XLSX.utils.decode_range(worksheet[`!ref`]);
            for (let i = range.s.r + 1; i <= range.e.r; ++i) {
              const cellAddress = XLSX.utils.encode_cell({
                r: i,
                c: Object.keys(formattedData[0]).indexOf(col),
              });
              if (worksheet[cellAddress]) {
                worksheet[cellAddress].z = "dd-mm-yyyy"; // Excel format code
              }
            }
          }
        });

        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Duty Slips");

        // Generate filename with date range
        const startDate = new Date(this.exportStartDate)
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "");

        const endDate = new Date(this.exportEndDate)
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "");

        // Add this before the export code
        const { value: fileName } = await Swal.fire({
          title: "Enter file name",
          input: "text",
          inputValue: `DutySlip_${startDate}-${endDate}`,
          confirmButtonText: "OK",
          confirmButtonColor: "maroon",
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return "You need to enter a file name!";
            }
          },
        });

        if (!fileName) return; // User cancelled

        // Export the file
        XLSX.writeFile(workbook, `${fileName}.xlsx`);

        setTimeout(() => {
          Swal.fire({
            title: "Success!",
            text: "Data exported successfully. Check your downloads for the Excel sheet.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
          this.clearDateFields();
        }, 1000);
      } catch (error) {
        console.error("Export error:", error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred while exporting data.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      } finally {
        this.isExporting = false;
      }
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

.hover\:bg-maroon-dark:hover {
  background-color: #600000;
}

.focus\:border-maroon:focus {
  border-color: #800000;
}

.border-maroon {
  border-color: #800000; /* Maroon Solid Border */
  box-shadow: 0 0 10px rgba(128, 0, 0, 0.8); /* Glowing Effect */
}

/* Hide default calendar icon but keep functionality */
input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0; /* Makes it invisible but still clickable */
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

/* Additional fix for Safari (hides dropdown arrow on small screens) */
input[type="date"] {
  -webkit-appearance: none;
  appearance: none;
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

/* Focus styles */
input:focus:not([readonly]):not([disabled]),
select:focus:not([readonly]):not([disabled]),
textarea:focus:not([readonly]):not([disabled]) {
  outline: none;
  border-color: #800000 !important;
  box-shadow: 0 0 5px rgba(128, 0, 0, 0.5);
}
</style>
