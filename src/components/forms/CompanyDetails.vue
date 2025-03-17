<template>
  <div
    style="background-color: #f5f5dc"
    class="p-8 rounded-lg shadow-xl border-2 border-maroon max-w-4xl mx-auto transform transition duration-300 hover:shadow-2xl relative"
  >
    <!-- Company Icon -->
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
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
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
      New Company
    </h2>

    <!-- Form -->
    <form
      @submit.prevent="handleSubmit"
      class="bg-white p-6 rounded-lg shadow-md border border-gray-300"
    >
      <!-- Company ID (Auto-populated) -->
      <div class="mb-6">
        <label for="companyId" class="block text-sm font-medium text-maroon">
          Company ID
        </label>
        <input
          type="text"
          id="companyId"
          v-model="form.companyId"
          class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
          readonly
        />
      </div>

      <!-- Company Name -->
      <div class="mb-6">
        <label for="companyName" class="block text-sm font-medium text-maroon">
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          v-model="form.companyName"
          placeholder="Enter company name"
          class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
          required
        />
      </div>

      <!-- Email ID -->
      <div class="mb-6">
        <label for="email" class="block text-sm font-medium text-maroon">
          Email ID
        </label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          placeholder="Enter company email"
          class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
          required
        />
      </div>

      <!-- Address -->
      <div class="mb-6">
        <label for="address" class="block text-sm font-medium text-maroon">
          Address
        </label>
        <textarea
          id="address"
          v-model="form.address"
          placeholder="Enter company address"
          rows="3"
          class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
          required
        ></textarea>
      </div>

      <!-- Contact -->
      <div class="mb-6">
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
import api from "@/utils/api";
import Swal from "sweetalert2";

export default {
  name: "CompanyDataForm",

  data() {
    return {
      email: "excel.travel@rediffmail.com",
      form: {
        companyId: "",
        companyName: "",
        email: "",
        address: "",
        contact: "",
      },
      companies: [],
      isLoading: false,
    };
  },
  created() {
    this.fetchCompanies();
  },
  methods: {
    async fetchCompanies() {
      try {
        const response = await api.get("/companies");
        this.companies = response.data;
      } catch (error) {
        console.error("Error fetching companies:", error);
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
      }

      this.generateCompanyId();
    },
    async generateCompanyId() {
      const response = await api.get("/companies/generate-company-id");
      this.form.companyId = response.data.companyId;
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

      // Check if company name, email, or contact already exists
      const isCompanyNameExists = this.companies.some(
        (company) => company.companyName === this.form.companyName
      );
      const isEmailExists = this.companies.some(
        (company) => company.email === this.form.email
      );
      const isContactExists = this.companies.some(
        (company) => company.contact === this.form.contact
      );

      if (isCompanyNameExists) {
        Swal.fire({
          title: "Error!",
          text: "Company name already exists.",
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

      if (isEmailExists) {
        Swal.fire({
          title: "Error!",
          text: "Email ID already exists.",
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

      if (isContactExists) {
        Swal.fire({
          title: "Error!",
          text: "Contact number already exists.",
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
        const response = await api.post("/companies", this.form);
        console.log("Data saved successfully:", response.data);

        this.companies.push({ ...this.form });
        console.log("Company Data Submitted:", this.form);

        Swal.fire({
          title: "Success!",
          text: "Company data submitted successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal2-popup", // Apply custom class
          },
        });

        this.clearForm();
        this.generateCompanyId();
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
    validateForm() {
      return (
        this.form.companyName.trim() !== "" &&
        this.form.email.trim() !== "" &&
        this.form.address.trim() !== "" &&
        this.form.contact.trim() !== ""
      );
    },
    clearForm() {
      this.form = {
        companyId: this.form.companyId,
        companyName: "",
        email: "",
        address: "",
        contact: "",
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
