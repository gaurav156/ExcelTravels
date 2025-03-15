<template>
  <div
    style="background-color: #f5f5dc"
    class="p-8 rounded-lg shadow-xl border-2 border-maroon max-w-4xl mx-auto transform transition duration-300 hover:shadow-2xl relative hover:border-glow"
  >
    <!-- Driver Icon -->
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
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
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

    <h2 class="text-3xl font-extrabold text-maroon text-center mb-6">
      New Driver Data
    </h2>

    <!-- Form -->
    <form
      @submit.prevent="handleSubmit"
      class="bg-white p-6 rounded-lg shadow-md border border-gray-300"
    >
      <!-- Personal Details Section -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-maroon mb-4">Personal Details</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-maroon">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              placeholder="Enter full name"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            />
          </div>

          <!-- Age -->
          <div>
            <label for="age" class="block text-sm font-medium text-maroon">
              Age
            </label>
            <input
              type="number"
              id="age"
              v-model="form.age"
              placeholder="Enter age"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
              min="18"
            />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-maroon">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              placeholder="Enter email address"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            />
          </div>

          <!-- Contact Number -->
          <div>
            <label for="contact" class="block text-sm font-medium text-maroon">
              Contact Number
            </label>
            <input
              type="tel"
              id="contact"
              v-model="form.contact"
              placeholder="Enter 10-digit contact number"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
            />
          </div>
        </div>
      </div>

      <!-- Address Section -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-maroon mb-4">Address</h3>
        <div class="grid grid-cols-1 gap-6">
          <!-- Address -->
          <div>
            <label for="address" class="block text-sm font-medium text-maroon">
              Full Address
            </label>
            <textarea
              id="address"
              v-model="form.address"
              placeholder="Enter full address"
              rows="3"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Emergency Contact Section -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-maroon mb-4">
          Emergency Contact
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Emergency Contact Name -->
          <div>
            <label
              for="emergencyName"
              class="block text-sm font-medium text-maroon"
            >
              Emergency Contact Name
            </label>
            <input
              type="text"
              id="emergencyName"
              v-model="form.emergencyName"
              placeholder="Enter emergency contact name"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            />
          </div>

          <!-- Emergency Contact Number -->
          <div>
            <label
              for="emergencyContact"
              class="block text-sm font-medium text-maroon"
            >
              Emergency Contact Number
            </label>
            <input
              type="tel"
              id="emergencyContact"
              v-model="form.emergencyContact"
              placeholder="Enter 10-digit emergency contact number"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
            />
          </div>
        </div>
      </div>

      <!-- Bank Details Section -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-maroon mb-4">Bank Details</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Bank Name -->
          <div>
            <label for="bankName" class="block text-sm font-medium text-maroon">
              Bank Name
            </label>
            <input
              type="text"
              id="bankName"
              v-model="form.bankName"
              placeholder="Enter bank name"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            />
          </div>

          <!-- IFSC Code -->
          <div>
            <label for="ifscCode" class="block text-sm font-medium text-maroon">
              IFSC Code
            </label>
            <input
              type="text"
              id="ifscCode"
              v-model="form.ifscCode"
              placeholder="Enter IFSC code"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            />
          </div>

          <!-- Branch -->
          <div>
            <label
              for="branchName"
              class="block text-sm font-medium text-maroon"
            >
              Branch Name
            </label>
            <input
              type="text"
              id="branchName"
              v-model="form.branch"
              placeholder="Enter branch name"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            />
          </div>

          <!-- Account Number -->
          <div>
            <label
              for="accountNumber"
              class="block text-sm font-medium text-maroon"
            >
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              v-model="form.accountNumber"
              placeholder="Enter account number"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            />
          </div>
        </div>
      </div>

      <!-- Government IDs Section -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-maroon mb-4">Government IDs</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Aadhar Number -->
          <div>
            <label
              for="aadharNumber"
              class="block text-sm font-medium text-maroon"
            >
              Aadhar Number
            </label>
            <input
              type="text"
              id="aadharNumber"
              v-model="form.aadharNumber"
              placeholder="Enter 12-digit Aadhar number"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
              pattern="[0-9]{12}"
              title="Please enter a 12-digit Aadhar number"
            />
          </div>

          <!-- PAN Number -->
          <div>
            <label
              for="panNumber"
              class="block text-sm font-medium text-maroon"
            >
              PAN Number
            </label>
            <input
              type="text"
              id="panNumber"
              @input="capitalizePan"
              v-model="form.panNumber"
              placeholder="Enter PAN number (e.g., ABCDE1234F)"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
              title="Please enter a valid PAN number (e.g., ABCDE1234F)"
            />
          </div>

          <!-- License Number -->
          <div>
            <label
              for="licenseNumber"
              class="block text-sm font-medium text-maroon"
            >
              License Number
            </label>
            <input
              type="text"
              id="licenseNumber"
              v-model="form.licenseNumber"
              placeholder="Enter license number"
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

export default {
  name: "DriverDetails",

  data() {
    return {
      email: "excel.travel@rediffmail.com",
      form: {
        driverId: "",
        name: "",
        age: "",
        email: "",
        contact: "",
        address: "",
        emergencyName: "",
        emergencyContact: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        branch: "",
        aadharNumber: "",
        panNumber: "",
        licenseNumber: "",
      },
      drivers: [],
      isLoading: false,
    };
  },
  created() {
    this.fetchDrivers();
  },
  methods: {
    async fetchDrivers() {
      try {
        const response = await api.get("/drivers");
        this.drivers = response.data;
      } catch (error) {
        console.error("Error fetching drivers:", error);
        Swal.fire({
          title: "Error!",
          text: "Error fetching drivers.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal2-popup", // Apply custom class
          },
        });
      }

      this.generateDriverId();
    },
    generateDriverId() {
      const nextId = `D${String(this.drivers.length + 1).padStart(3, "0")}`;
      this.form.driverId = nextId;
      console.log(this.form.driverId);
    },
    async handleSubmit() {
      this.isLoading = true;

      // Validate form inputs
      if (!this.validateForm()) {
        Swal.fire({
          title: "Input Error!",
          text: "Please fill all fields correctly.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal2-popup", // Apply custom class
          },
        });
        this.isLoading = false;
        return;
      }

      // Collect all duplicate errors
      const errors = [];

      // Check if Aadhar, PAN, email, contact, or account number already exists
      if (
        this.drivers.some(
          (driver) => driver.aadharNumber === this.form.aadharNumber
        )
      ) {
        errors.push("Aadhar number already exists.");
      }
      if (
        this.drivers.some((driver) => driver.panNumber === this.form.panNumber)
      ) {
        errors.push("PAN number already exists.");
      }
      if (this.drivers.some((driver) => driver.email === this.form.email)) {
        errors.push("Email ID already exists.");
      }
      if (this.drivers.some((driver) => driver.contact === this.form.contact)) {
        errors.push("Contact number already exists.");
      }
      if (
        this.drivers.some(
          (driver) => driver.accountNumber === this.form.accountNumber
        )
      ) {
        errors.push("Account number already exists.");
      }
      if (
        this.drivers.some(
          (driver) => driver.licenseNumber === this.form.licenseNumber
        )
      ) {
        errors.push("License number already exists.");
      }

      // If there are errors, show them in a single alert box
      if (errors.length > 0) {
        Swal.fire({
          title: "Duplicate Data Found!",
          html: errors.join("<br>"), // Join errors with line breaks
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal2-popup", // Apply custom class
          },
        });
        this.isLoading = false;
        return;
      }

      // If no duplicates, submit the form
      try {
        const response = await api.post("/drivers", this.form);
        console.log("Data saved successfully:", response.data);

        this.drivers.push({ ...this.form });
        console.log("Driver Data Submitted:", this.form);

        Swal.fire({
          title: "Success!",
          text: "Driver details submitted successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal2-popup", // Apply custom class
          },
        });

        this.clearForm();
        this.generateDriverId();
      } catch (error) {
        console.error("Error submitting form:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to submit. Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Try Again",
          customClass: {
            popup: "swal2-popup", // Apply custom class
          },
        });
      } finally {
        this.isLoading = false;
      }
    },
    capitalizePan(event) {
      // Convert the input value to uppercase
      this.form.panNumber = event.target.value.toUpperCase();
    },
    validateForm() {
      // Check if all required fields are filled
      return (
        this.form.name !== "" &&
        this.form.age !== "" &&
        this.form.email !== "" &&
        this.form.contact !== "" &&
        this.form.address !== "" &&
        this.form.emergencyName !== "" &&
        this.form.emergencyContact !== "" &&
        this.form.bankName !== "" &&
        this.form.accountNumber !== "" &&
        this.form.ifscCode !== "" &&
        this.form.branch !== "" &&
        this.form.aadharNumber !== "" &&
        this.form.panNumber !== "" &&
        this.form.licenseNumber !== ""
      );
    },
    clearForm() {
      // Reset form data
      this.form = {
        driverId: this.form.driverId, // Retain the driverId for the next submission
        name: "",
        age: "",
        email: "",
        contact: "",
        address: "",
        emergencyName: "",
        emergencyContact: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        branch: "",
        aadharNumber: "",
        panNumber: "",
        licenseNumber: "",
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

/* Custom styles for SweetAlert2 popup */
.swal2-popup {
  width: 90%; /* Default width for small screens */
  max-width: 400px; /* Maximum width for larger screens */
  font-size: 14px; /* Default font size for small screens */
}

/* Adjust width and font size for medium screens */
@media (min-width: 640px) {
  .swal2-popup {
    width: 70%;
    max-width: 500px;
    font-size: 16px;
  }
}

/* Adjust width and font size for large screens */
@media (min-width: 1024px) {
  .swal2-popup {
    width: 50%;
    max-width: 600px;
    font-size: 18px;
  }
}
</style>
