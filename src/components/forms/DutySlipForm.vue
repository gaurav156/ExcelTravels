<template>
  <div
    style="background-color: #f5f5dc"
    class="p-8 rounded-lg shadow-xl border-2 border-maroon max-w-4xl mx-auto transform transition duration-300 hover:shadow-2xl relative hover:border-glow"
  >
    <!-- Duty Slip Icon -->
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
    <h2 class="text-3xl font-extrabold text-maroon text-center mb-4">
      New Duty Slip
    </h2>

    <!-- ID Box Centered and Smaller -->
    <div class="flex flex-col items-center mb-4">
      <label for="dutySlipId" class="text-sm font-medium text-maroon mb-1">
        Duty Slip ID
      </label>
      <input
        type="text"
        id="dutySlipId"
        v-model="form.dutySlipId"
        class="w-32 text-center px-2 py-1 border border-[#800000] rounded-md shadow-sm bg-gray-50 text-black"
        disabled
      />
    </div>

    <!-- Form -->
    <form
      @submit.prevent="handleSubmit"
      class="bg-white p-6 rounded-lg shadow-md border border-gray-300"
      autocomplete="off"
    >
      <!-- Company and Customer Details Section -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-maroon mb-4">
          Company & Customer Details
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Company Name (Searchable Select) -->
          <div>
            <label
              for="companyName"
              class="block text-sm font-medium text-maroon"
            >
              Company Name
            </label>
            <VueSelect
              id="companyName"
              v-model="form.companyName"
              :options="filteredCompanies"
              @search="updateSearchQuery"
              @update:modelValue="handleCompanySelection"
              label="companyName"
              placeholder="Select Company"
              class="rounded-md shadow-sm bg-gray-50 mt-1 block w-full custom-vue-select"
              required
            ></VueSelect>
          </div>

          <!-- Company ID (Auto-filled and Disabled) -->
          <div>
            <label
              for="companyId"
              class="block text-sm font-medium text-maroon"
            >
              Company ID
            </label>
            <input
              type="text"
              id="companyId"
              v-model="form.companyId"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-[#800000] rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              disabled
            />
          </div>

          <!-- Customer Name -->
          <div>
            <label
              for="customerName"
              class="block text-sm font-medium text-maroon"
            >
              Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              v-model="form.customerName"
              placeholder="Enter Customer Name"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            />
          </div>

          <!-- Customer Phone Number -->
          <div>
            <label
              for="customerPhoneNumber"
              class="block text-sm font-medium text-maroon"
            >
              Customer Phone Number
            </label>
            <input
              type="tel"
              id="customerPhoneNumber"
              v-model="form.customerPhoneNumber"
              placeholder="Enter Customer Phone Number"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
            />
          </div>

          <!-- City -->
          <div>
            <label for="city" class="block text-sm font-medium text-maroon mb-1"
              >City</label
            >
            <VueSelect
              id="city"
              v-model="form.city"
              :options="[
                'Mumbai',
                'Delhi',
                'Bangalore',
                'Hyderabad',
                'Chennai',
                'Kolkata',
                'Pune',
                'Ahmedabad',
                'Jaipur',
                'Surat',
              ]"
              placeholder="Select City"
              class="custom-vue-select"
            />
          </div>

          <!-- Address -->
          <div>
            <label for="address" class="block text-sm font-medium text-maroon">
              Address
            </label>
            <textarea
              id="address"
              v-model="form.address"
              placeholder="Enter Address"
              rows="3"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Trip Details Section -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-maroon mb-4">Trip Details</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Car Booked -->
          <div>
            <label
              for="carBooked"
              class="block text-sm font-medium text-maroon"
            >
              Type of Car Booked
            </label>
            <VueSelect
              id="carBooked"
              v-model="form.carBooked"
              :options="['Sedan', 'SUV', 'Luxury']"
              placeholder="Select Car Type"
              class="custom-vue-select mt-1"
            />
          </div>

          <!-- Car Number -->
          <div>
            <label
              for="carNumber"
              class="block text-sm font-medium text-maroon"
            >
              Car Number
            </label>
            <input
              type="text"
              id="carNumber"
              v-model="form.carNumber"
              @input="capitalizeCarNumber"
              placeholder="Enter Car Number"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            />
          </div>

          <!-- Pickup Time -->
          <div class="relative">
            <label
              for="pickupTime"
              class="block text-sm font-medium text-[#800000]"
            >
              Pickup Time
            </label>
            <div class="relative">
              <input
                type="time"
                id="pickupTime"
                v-model="form.pickupTime"
                class="time-input focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 pr-10 cursor-pointer"
                required
              />
              <!-- Custom Clock Icon (Always Visible & Clickable) -->
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
                  d="M12 6v6l4 2"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="8"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                />
              </svg>
            </div>
          </div>
          <!-- Duty Type -->
          <div>
            <label for="dutyType" class="block text-sm font-medium text-maroon">
              Duty Type
            </label>
            <VueSelect
              id="dutyType"
              v-model="form.dutyType"
              :options="['Local', 'Outstation']"
              placeholder="Select Duty Type"
              class="custom-vue-select mt-1"
            />
          </div>

          <!-- Driver Name (Searchable Select) -->
          <div>
            <label
              for="driverName"
              class="block text-sm font-medium text-maroon"
            >
              Driver Name
            </label>
            <VueSelect
              id="driverName"
              v-model="form.driverName"
              :options="filteredDrivers"
              @search="updateDriverSearchQuery"
              @update:modelValue="handleDriverSelection"
              label="name"
              placeholder="Select Driver"
              class="rounded-md shadow-sm bg-gray-50 mt-1 block w-full custom-vue-select"
              required
            ></VueSelect>
          </div>

          <!-- Driver ID -->
          <div>
            <label for="driverId" class="block text-sm font-medium text-maroon">
              Driver ID
            </label>
            <input
              type="text"
              id="driverId"
              v-model="form.driverId"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-[#800000] rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              disabled
            />
          </div>

          <!-- Phone Number -->
          <div>
            <label
              for="phoneNumber"
              class="block text-sm font-medium text-maroon"
            >
              Driver Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              v-model="form.phoneNumber"
              placeholder="Enter Driver Phone Number"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
            />
          </div>

          <!-- Trip Route (Text Input) -->
          <div>
            <label
              for="tripRoute"
              class="block text-sm font-medium text-maroon"
            >
              Trip Route
            </label>
            <input
              type="text"
              id="tripRoute"
              v-model="form.tripRoute"
              placeholder="Enter Trip Route"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            />
          </div>

          <!-- Date From -->
          <div class="relative">
            <label
              for="dateFrom"
              class="block text-sm font-medium text-[#800000]"
            >
              Trip Date From
            </label>
            <div class="relative">
              <input
                type="date"
                id="dateFrom"
                v-model="form.dateFrom"
                class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 pr-10 cursor-pointer"
                required
              />
              <!-- Custom Calendar Icon (Always Visible & Clickable) -->
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
          </div>

          <!-- Date To -->
          <div class="relative">
            <label
              for="dateTo"
              class="block text-sm font-medium text-[#800000]"
            >
              Trip Date To
            </label>
            <div class="relative">
              <input
                type="date"
                id="dateTo"
                v-model="form.dateTo"
                class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 pr-10 cursor-pointer"
                required
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
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="mt-6">
        <button
          type="submit"
          class="w-full bg-maroon text-white px-4 py-3 rounded-md text-lg font-semibold shadow-md transition duration-300 hover:bg-maroon-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </form>
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
import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "DutySlipForm",
  components: {
    VueSelect,
  },
  data() {
    return {
      email: "excel.travel@rediffmail.com",
      form: {
        dutySlipId: "", // Rename to DutySlipID if required
        companyId: "", // Rename to CompanyID if required
        companyName: "", // Rename to PartyName if required
        customerName: "", // Rename to CustomerName if required
        customerPhoneNumber: "",
        city: "",
        address: "",
        carBooked: "",
        phoneNumber: "", // Rename to phone if required
        dutyType: "",
        driverName: "",
        carNumber: "", // Rename to busNo if required
        dateFrom: "",
        dateTo: "",
        tripRoute: "",
        pickupTime: "", // Rename to time if required
      },
      companies: [], // List of companies fetched from the database
      drivers: [], // List of drivers fetched from the database
      dutySlips: [],
      isLoading: false,
      searchQuery: "",
      driverSearchQuery: "",
    };
  },
  created() {
    this.fetchCompanies();
    this.fetchDrivers();
    this.fetchDutySlips();
  },
  computed: {
    filteredCompanies() {
      // First, filter the full list of companies based on user input
      const filtered = this.companies.filter((company) =>
        company.companyName
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );

      // Then, limit the number of displayed options to 5
      return filtered.slice(0, 5);
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
  },
  methods: {
    validateForm() {
      const errors = {};
      if (!this.form.dutySlipId)
        errors.dutySlipId = "Duty Slip ID is required.";
      if (!this.form.companyName)
        errors.companyName = "Company Name is required.";
      if (!this.form.customerName)
        errors.customerName = "Customer Name is required.";
      if (!this.form.customerPhoneNumber)
        errors.customerName = "Customer Phone Number is required.";
      if (!this.form.phoneNumber)
        errors.phoneNumber = "Driver Phone Number is required.";
      if (!this.form.carNumber) errors.carNumber = "Car Number is required.";
      if (!this.form.pickupTime) errors.pickupTime = "Pickup Time is required.";
      // New validation: Ensure dateTo is not smaller than dateFrom
      if (this.form.dateFrom && this.form.dateTo) {
        const dateFrom = new Date(this.form.dateFrom);
        const dateTo = new Date(this.form.dateTo);

        if (dateTo < dateFrom) {
          errors.dateTo = "End date cannot be earlier than the start date.";
        }
      }
      return Object.keys(errors).length === 0 ? true : errors;
    },
    capitalizeCarNumber(event) {
      this.form.carNumber = event.target.value.toUpperCase();
    },
    async fetchDutySlips() {
      this.isLoading = true;
      try {
        const response = await api.get("/dutyslips");
        this.dutySlips = response.data.dutySlips;
      } catch (error) {
        console.error("Error fetching dutySlips:", error);
        Swal.fire({
          title: "Error!",
          text: "Error fetching dutySlips.",
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

      this.generateDutySlipId();
    },
    async generateDutySlipId() {
      this.isLoading = true;
      try {
        const response = await api.get("/dutyslips/generate-dutyslip-id");
        this.form.dutySlipId = response.data.dutySlipId;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchCompanies() {
      // this.isLoading = true;
      try {
        const response = await api.get("/companies");
        this.companies = response.data.companies;
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        // this.isLoading = false;
      }
    },
    // Handle company selection
    handleCompanySelection(selectedCompany) {
      this.fetchCompanies(); // sync companies
      if (selectedCompany) {
        // Update form.companyName with the selected company's name
        this.form.companyName = selectedCompany.companyName;

        // Update form.companyId with the selected company's ID
        this.form.companyId = selectedCompany.companyId;
      } else {
        // Reset if no company is selected
        this.form.companyName = "";
        this.form.companyId = "";
      }
    },
    async fetchDrivers() {
      // this.isLoading = true;
      try {
        const response = await api.get("/drivers");
        this.drivers = response.data.drivers;
      } catch (error) {
        console.error("Error fetching drivers:", error);
      } finally {
        // this.isLoading = false;
      }
    },
    updateSearchQuery(query) {
      this.searchQuery = query; // Dynamically update search input
    },
    // Update driver search query dynamically
    updateDriverSearchQuery(query) {
      this.driverSearchQuery = query;
    },

    // Handle driver selection
    handleDriverSelection(selectedDriver) {
      this.fetchDrivers(); // sync drivers
      if (selectedDriver) {
        // Update form.driverName with the selected driver's name
        this.form.driverName = selectedDriver.name;

        // Update form.driverId and form.phoneNumber with the selected driver's details
        this.form.driverId = selectedDriver.driverId;
        this.form.phoneNumber = selectedDriver.contact;
      } else {
        // Reset if no driver is selected
        this.form.driverName = "";
        this.form.driverId = "";
        this.form.phoneNumber = "";
      }
    },
    async handleSubmit() {
      // Handle form submission
      this.isLoading = true;

      // Validate the form
      const validation = this.validateForm();
      if (validation !== true) {
        console.error("Validation Errors:", validation);

        // Display validation errors to the user
        let errorMessage = "Please fix the following errors:\n";
        for (const [field, message] of Object.entries(validation)) {
          errorMessage += `- ${field}: ${message}\n`;
        }

        Swal.fire({
          title: "Validation Error",
          text: errorMessage,
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });

        this.isLoading = false;
        return;
      }

      this.fetchDutySlips(); // sync duty slips

      try {
        const response = await api.post("/dutyslips", this.form);
        console.log("Data saved successfully:", response.data);

        // Add the new duty slip to the dutySlips array
        this.dutySlips.push(response.data);

        Swal.fire({
          title: "Success!",
          text: "Duty slip created successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });

        // Reset form after successful submission
        this.clearForm();
        this.generateDutySlipId(); // Regenerate the Duty Slip ID after clearing the form
      } catch (error) {
        console.error("Error submitting form:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to submit. Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Try Again",
        });
      } finally {
        this.isLoading = false;
      }
    },
    clearForm() {
      this.form = {
        companyId: "",
        companyName: "",
        customerName: "",
        customerPhoneNumber: "",
        city: "",
        address: "",
        carBooked: "",
        phoneNumber: "",
        dutyType: "",
        driverName: "",
        carNumber: "",
        dateFrom: "",
        dateTo: "",
        tripRoute: "",
        pickupTime: "",
      };
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
  border-color: #800000;
  box-shadow: 0 0 10px rgba(128, 0, 0, 0.8);
}

/* Selection Color */
::selection {
  background-color: #800000;
  color: white;
}

input::selection,
textarea::selection {
  background-color: #800000;
  color: white;
}

/* VueSelect Custom Styles */
:deep(.vs__dropdown-toggle) {
  border: 1px solid #800000 !important;
  border-radius: 6px !important;
  background-color: #f9fafb !important;
  color: black !important;
  box-shadow: none !important;
  padding: 7px 12px;
}

/* Dropdown Indicator (Arrow) */
:deep(.vs__open-indicator) {
  cursor: pointer !important;
  color: #800000;
  font-size: 1.2rem;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23800000'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 1.25rem;
  padding-right: 2.5rem;
}

/* Clear Button */
:deep(.vs__clear) {
  fill: #800000 !important;
}

/* Dropdown Menu */
:deep(.vs__dropdown-menu) {
  background-color: #f9fafb !important;
  border: 1px solid #9ca3af !important;
}

/* Dropdown Options */
:deep(.vs__dropdown-option) {
  color: black !important;
}

/* Highlighted Option */
:deep(.vs__dropdown-option--highlight) {
  background-color: #800000 !important;
  color: #fff !important;
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
fr textarea:focus:not([readonly]):not([disabled]) {
  outline: none;
  border-color: #800000 !important;
  box-shadow: 0 0 5px rgba(128, 0, 0, 0.5);
}

input[type="time"]::-webkit-calendar-picker-indicator {
  opacity: 0; /* Makes it invisible but still clickable */
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
input[type="time"] {
  -webkit-appearance: none;
  appearance: none;
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

/* Add this at the end of your style section */
:deep(.vs__search::placeholder),
:deep(.vs__dropdown-toggle)::placeholder,
input::placeholder,
textarea::placeholder {
  color: #9fa6b2 !important;
  opacity: 1 !important;
}

/* For disabled inputs */
input:disabled:not(#dutySlipId) {
  background-color: #f3f4f6 !important;
  color: #6b7280 !important;
}

/* Add this at the end of your style section */

input::placeholder,
textarea::placeholder,
input[type="date"]::placeholder,
input[type="time"]::placeholder,
input[type="datetime-local"]::placeholder {
  color: #9fa6b2 !important;
  opacity: 1 !important;
}

/* For VueSelect dropdown placeholder */
/* For date and time inputs in Chrome/Safari */
input[type="date"]:not(:focus):invalid::-webkit-datetime-edit,
input[type="time"]:not(:focus):invalid::-webkit-datetime-edit {
  color: #9fa6b2 !important;
}

/* For date and time inputs in Firefox */
input[type="date"]:invalid,
input[type="time"]:invalid {
  color: #9fa6b2 !important;
}
</style>
