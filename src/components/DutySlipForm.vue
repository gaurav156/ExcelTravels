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
    <h2 class="text-3xl font-extrabold text-maroon text-center mb-4">
      DUTY SLIP
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
        class="w-32 text-center focus:ring-[#800000] focus:outline-none px-2 py-1 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
        disabled
      />
    </div>

    <!-- Form -->
    <form
      @submit.prevent="handleSubmit"
      class="bg-white p-6 rounded-lg shadow-md border border-gray-300"
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
              :options="companies.map((company) => company.companyName)"
              @update:modelValue="fetchCompanyId"
              label="companyName"
              placeholder="Select Company"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
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
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
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

          <!-- City -->
          <div>
            <label for="city" class="block text-sm font-medium text-maroon">
              City
            </label>
            <select
              id="city"
              v-model="form.city"
              class="custom-select focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
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
            <select
              id="carBooked"
              v-model="form.carBooked"
              class="custom-select focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            >
              <option value="" disabled>Select Car Type</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Luxury">Luxury</option>
            </select>
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
              placeholder="Enter Car Number"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            />
          </div>

          <!-- Pickup Time -->
          <div>
            <label
              for="pickupTime"
              class="block text-sm font-medium text-maroon"
            >
              Pickup Time
            </label>
            <input
              type="time"
              id="pickupTime"
              v-model="form.pickupTime"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            />
          </div>

          <!-- Duty Type -->
          <div>
            <label for="dutyType" class="block text-sm font-medium text-maroon">
              Duty Type
            </label>
            <select
              id="dutyType"
              v-model="form.dutyType"
              class="custom-select custom-select focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            >
              <option value="" disabled>Select Duty Type</option>
              <option value="local">Local</option>
              <option value="Outstation">Outstation</option>
            </select>
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
              :options="drivers.map((driver) => driver.name)"
              @update:modelValue="fetchDriverDetails"
              label="name"
              placeholder="Select Driver"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
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
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              disabled
            />
          </div>

          <!-- Phone Number -->
          <div>
            <label
              for="phoneNumber"
              class="block text-sm font-medium text-maroon"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              v-model="form.phoneNumber"
              placeholder="Enter Phone Number"
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
          <div>
            <label for="dateFrom" class="block text-sm font-medium text-maroon">
              Trip Date From
            </label>
            <input
              type="date"
              id="dateFrom"
              v-model="form.dateFrom"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            />
          </div>

          <!-- Date To -->
          <div>
            <label for="dateTo" class="block text-sm font-medium text-maroon">
              Trip Date To
            </label>
            <input
              type="date"
              id="dateTo"
              v-model="form.dateTo"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            />
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
</template>

<script>
import api from "@/api";
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
    };
  },
  created() {
    this.fetchCompanies();
    this.fetchDrivers();
    this.fetchDutySlips();
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
      if (!this.form.phoneNumber)
        errors.phoneNumber = "Phone Number is required.";
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
    async fetchDutySlips() {
      try {
        const response = await api.get("/dutyslips");
        this.dutySlips = response.data;
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
      }

      this.generateDutySlipId();
    },
    generateDutySlipId() {
      console.log("Current dutySlips length:", this.dutySlips.length);
      const nextId = `DS${String(this.dutySlips.length + 1).padStart(3, "0")}`;
      console.log("Generated nextId:", nextId);
      this.form.dutySlipId = nextId;
    },
    async fetchCompanies() {
      try {
        const response = await api.get("/companies");
        this.companies = response.data;
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    },
    async fetchDrivers() {
      try {
        const response = await api.get("/drivers");
        this.drivers = response.data;
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    },
    fetchCompanyId() {
      const selectedCompany = this.companies.find(
        (company) => company.companyName === this.form.companyName
      );
      if (selectedCompany) {
        this.form.companyId = selectedCompany.companyId;
      } else {
        this.form.companyId = ""; // Reset if no company is found
      }
    },
    fetchDriverDetails() {
      const selectedDriver = this.drivers.find(
        (driver) => driver.name === this.form.driverName
      );
      if (selectedDriver) {
        this.form.driverId = selectedDriver.driverId;
        this.form.phoneNumber = selectedDriver.contact;
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
  /* Maroon Solid Border */
  box-shadow: 0 0 10px rgba(128, 0, 0, 0.8);
  /* Glowing Effect */
}

.custom-select {
  appearance: none; /* Remove default arrow */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23800000'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center; /* Position the arrow */
  background-size: 1.25rem; /* Size of the arrow */
  padding-right: 2.5rem; /* Add padding to avoid text overlap */
}

/* Custom styles for vue-select */
/* Custom styles for vue-select */
::v-deep .vs__dropdown-toggle {
  border: 1px solid #ccc !important;
  border-radius: 4px !important;
}

::v-deep .vs__open-indicator {
  cursor: pointer !important;
}

::v-deep .vs__selected {
  color: #800000 !important;
}

::v-deep .vs__search {
  color: #800000 !important;
}

::v-deep .vs__dropdown-menu {
  background-color: #fff !important;
  border: 1px solid #ccc !important;
}

::v-deep .vs__dropdown-option {
  color: #800000 !important;
}

::v-deep .vs__dropdown-option--highlight {
  background-color: #800000 !important;
  color: #fff !important;
}
</style>
