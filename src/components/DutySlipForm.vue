<template>
  <!-- luxary sedan suv-----local n outstaion -->
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
    <h2 class="text-3xl font-extrabold text-maroon text-center mb-6">
      DUTY SLIP
    </h2>

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
          <!-- Duty Slip ID -->
          <div>
            <label
              for="dutySlipId"
              class="block text-sm font-medium text-maroon"
            >
              Duty Slip ID
            </label>
            <input
              type="text"
              id="dutySlipId"
              v-model="form.dutySlipId"
              placeholder="Enter Duty Slip ID"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            />
          </div>

          <!-- Company ID -->
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
              placeholder="Enter Company ID"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            />
          </div>

          <!-- Company Name -->
          <div>
            <label
              for="companyName"
              class="block text-sm font-medium text-maroon"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              v-model="form.companyName"
              placeholder="Enter Company Name"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
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
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
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
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            >
              <option value="" disabled>Select Car Type</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury</option>
              <option value="Van">Van</option>
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

          <!-- Duty Type -->
          <div>
            <label for="dutyType" class="block text-sm font-medium text-maroon">
              Duty Type
            </label>
            <input
              type="text"
              id="dutyType"
              v-model="form.dutyType"
              placeholder="Enter Duty Type"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            />
          </div>

          <!-- Trip Route -->
          <div>
            <label
              for="tripRoute"
              class="block text-sm font-medium text-maroon"
            >
              Trip Route
            </label>
            <select
              id="tripRoute"
              v-model="form.tripRoute"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            >
              <option value="" disabled>Select Trip Route</option>
              <option value="Mumbai to Pune">Mumbai to Pune</option>
              <option value="Mumbai to Delhi">Mumbai to Delhi</option>
              <option value="Mumbai to Bangalore">Mumbai to Bangalore</option>
              <option value="Mumbai to Hyderabad">Mumbai to Hyderabad</option>
            </select>
          </div>

          <!-- Driver Name -->
          <div>
            <label
              for="driverName"
              class="block text-sm font-medium text-maroon"
            >
              Driver Name
            </label>
            <input
              type="text"
              id="driverName"
              v-model="form.driverName"
              placeholder="Enter Driver Name"
              class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
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
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "DutySlipForm",
  data() {
    return {
      email: "excel.travel@rediffmail.com",
      form: {
        dutySlipId: "",
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
      },
      isLoading: false,
    };
  },
  methods: {
    async handleSubmit() {
      // Handle form submission
      this.isLoading = true;

      try {
        const response = await axios.post(
          "http://localhost:5000/api/dutyslips",
          this.form
        );
        console.log("Data saved successfully:", response.data);

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Duty slip created successfully.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });

        // Reset form after successful submission
        this.clearForm();
      } catch (error) {
        console.error("Error submitting form:", error);
        Swal.fire({
          icon: "error",
          title: "Error submitting form",
          text: "Failed to submit. Please try again.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      } finally {
        this.isLoading = false;
      }
    },
    clearForm() {
      this.form = {
        dutySlipId: "",
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
</style>
