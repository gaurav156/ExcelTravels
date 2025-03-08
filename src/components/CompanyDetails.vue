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
    <div class="flex justify-between items-center mb-6">
      <div class="text-m font-semibold text-maroon cursor-pointer">
        {{ email }}
      </div>
      <img src="@/assets/logo.png" alt="Company Logo" class="w-24 h-12" />
    </div>
    <h2 class="text-3xl font-extrabold text-maroon text-center mb-6">
      Add Company Data
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
    };
  },
  created() {
    this.fetchCompanies();
  },
  methods: {
    fetchCompanies() {
      this.companies = [
        {
          companyId: "C001",
          companyName: "Company A",
          email: "a@example.com",
          address: "123 Main St",
          contact: "1234567890",
        },
        {
          companyId: "C002",
          companyName: "Company B",
          email: "b@example.com",
          address: "456 Elm St",
          contact: "9876543210",
        },
      ];
      this.generateCompanyId();
    },
    generateCompanyId() {
      const nextId = `C${String(this.companies.length + 1).padStart(3, "0")}`;
      this.form.companyId = nextId;
    },
    handleSubmit() {
      if (!this.validateForm()) {
        Swal.fire({
          icon: "error",
          title: "Input Error",
          text: "Please fill all fields correctly.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }

      this.companies.push({ ...this.form });
      console.log("Company Data Submitted:", this.form);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Company data submitted successfully.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });

      this.clearForm();
      this.generateCompanyId();
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
  border-color: #800000; /* Maroon Solid Border */
  box-shadow: 0 0 10px rgba(128, 0, 0, 0.8); /* Glowing Effect */
}
</style>
