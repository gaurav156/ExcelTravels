<template>
  <div
    class="max-w-3xl mx-auto p-6 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg rounded-xl border border-gray-300"
  >
    <div class="flex justify-between items-center mb-6">
      <div class="text-sm text-indigo-600 cursor-pointer">{{ email }}</div>
      <div class="text-3xl font-semibold text-purple-700 cursor-pointer">
        {{ companyName }}
      </div>
    </div>

    <div
      class="max-w-3xl mx-auto p-6 mb-4 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg rounded-xl border border-gray-300"
    >
      <!-- Export Section -->
      <div class="flex flex-col items-center">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">
          Export Duty Slips
        </h3>
        <div class="flex items-center gap-4">
          <vue-datepicker v-model="exportStartDate" type="date" class="w-40" />
          <span class="text-gray-700">to</span>
          <vue-datepicker v-model="exportEndDate" type="date" class="w-40" />
        </div>
        <button
          @click="exportToExcel"
          class="bg-green-600 text-white px-4 py-2 mt-4 rounded-md hover:bg-green-700"
        >
          Export to Excel
        </button>
      </div>
    </div>

    <!-- Title Centered -->
    <h2 class="text-3xl font-extrabold text-indigo-900 text-center mb-6">
      DUTY SLIP
    </h2>

    <!-- Slip ID & Date -->
    <div class="flex items-center justify-between mb-6 w-full">
      <span class="text-xl font-bold text-gray-700"
        >Slip ID: {{ duty.SlipID }}</span
      >

      <div class="flex flex-col items-center">
        <!-- Instruction Text -->
        <span class="text-black text-xs mb-1">Select Current Time</span>

        <!-- Date Picker -->
        <vue-datepicker
          v-model="duty.DutySlipDate"
          @update:model-value="updateDate"
          class="w-28 text-sm"
          placeholder="Select current Date"
        />
        <div v-if="errors.DutySlipDate" class="text-red-500 text-sm mt-1">
          {{ errors.DutySlipDate }}
        </div>
      </div>
    </div>

    <!-- Party Name & Customer Name -->
    <div class="flex items-center justify-between gap-6 mb-4">
      <div class="flex items-center w-1/2">
        <label class="w-32 font-medium text-gray-700 text-center mr-2"
          >Party Name:</label
        >
        <input
          type="text"
          v-model="duty.partyName"
          class="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200"
          placeholder="Enter Party Name"
        />
        <div v-if="errors.partyName" class="text-red-500 text-sm mt-1">
          {{ errors.partyName }}
        </div>
      </div>

      <div class="flex items-center w-1/2">
        <label class="w-32 font-medium text-gray-700 text-center mr-2"
          >Customer Name:</label
        >
        <input
          type="text"
          v-model="duty.CustomerName"
          class="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200"
          placeholder="Enter Customer Name"
        />
        <div v-if="errors.CustomerName" class="text-red-500 text-sm mt-1">
          {{ errors.CustomerName }}
        </div>
      </div>
    </div>

    <!-- Address -->
    <div class="flex items-start mt-2 mb-2">
      <label class="w-24 font-medium text-gray-700 mt-2">Address:</label>
      <textarea
        v-model="duty.address"
        class="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200"
        rows="3"
        placeholder="Enter Address"
      ></textarea>
      <div v-if="errors.address" class="text-red-500 text-sm mt-1">
        {{ errors.address }}
      </div>
    </div>

    <!-- Phone -->
    <div class="mb-2">
      <label class="w-24 font-medium text-gray-700 text-left mr-3"
        >Phone No:</label
      >
      <input
        type="text"
        v-model="duty.phone"
        class="w-1/3 border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200"
        placeholder="Enter Phone Number"
      />
      <div v-if="errors.phone" class="text-red-500 text-sm mt-1">
        {{ errors.phone }}
      </div>
    </div>

    <!-- Bus No & Time -->
    <div class="flex items-center justify-between gap-8 mb-4 mr-4">
      <div class="flex items-center w-1/2">
        <label class="w-32 font-medium text-gray-700 text-left">Bus No:</label>
        <input
          type="text"
          v-model="duty.busNo"
          class="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200"
          placeholder="Enter Bus Number"
        />
        <div v-if="errors.busNo" class="text-red-500 text-sm mt-1">
          {{ errors.busNo }}
        </div>
      </div>

      <div class="flex items-center w-1/2">
        <label class="w-32 font-medium text-gray-700 text-center mr-2"
          >Time:</label
        >
        <input
          type="time"
          v-model="duty.time"
          class="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200"
          placeholder="Select Trip time"
        />
        <div v-if="errors.time" class="text-red-500 text-sm mt-1">
          {{ errors.time }}
        </div>
      </div>
    </div>

    <!-- Horizontal Line -->
    <hr class="border-t border-gray-300 my-6" />

    <div class="flex flex-col items-center w-full">
      <!-- First Row: Date Selection -->
      <div class="flex items-center justify-center gap-4 mb-4 w-full max-w-3xl">
        <!-- Date From -->
        <div class="flex items-center w-1/2">
          <label class="w-32 font-medium text-gray-700 text-center mr-2">
            Date From:
          </label>
          <vue-datepicker
            v-model="duty.dateFrom"
            type="date"
            :enable-time-picker="false"
            class="w-full max-w-[180px] text-lg"
            placeholder="Trip Start On"
          />
        </div>

        <!-- Date To -->
        <div class="flex items-center w-1/2">
          <label class="w-16 font-medium text-gray-700 text-center mr-2"
            >To:</label
          >
          <vue-datepicker
            v-model="duty.dateTo"
            type="date"
            :enable-time-picker="false"
            class="w-full max-w-[180px] text-lg"
            placeholder="Trip End Date"
          />
        </div>
      </div>

      <!-- Second Row: Kms Input -->
      <div class="flex items-center justify-center gap-4 mb-4 w-full max-w-3xl">
        <!-- Starting Kms -->
        <div class="flex items-center w-1/3">
          <label class="w-32 font-medium text-gray-700 text-center mr-2">
            Starting Kms.:
          </label>
          <input
            type="number"
            placeholder="Km"
            v-model="duty.startKms"
            class="w-24 border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200"
          />
        </div>

        <!-- Closing Kms -->
        <div class="flex items-center w-1/3">
          <label class="w-32 font-medium text-gray-700 text-center mr-2">
            Closing Kms.:
          </label>
          <input
            type="number"
            placeholder="Km"
            v-model="duty.closingKms"
            class="w-24 border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200"
          />
        </div>

        <!-- Total Kms -->
        <div class="flex items-center w-1/3">
          <label class="w-32 font-medium text-gray-700 text-center mr-2">
            Total Kms.:
          </label>
          <input
            type="text"
            placeholder="Km"
            v-model="duty.totalKms"
            class="w-24 border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200"
            readonly
          />
        </div>
      </div>

      <!-- Third Row: Time Selection -->
      <div class="flex items-center justify-center gap-4 mb-4 w-full max-w-3xl">
        <!-- Start Time -->
        <div class="flex items-center w-1/3">
          <label class="w-32 font-medium text-gray-700 text-center mr-2">
            Garage Start Time:
          </label>
          <input
            type="time"
            v-model="duty.startTime"
            class="w-28 border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200"
          />
        </div>

        <!-- End Time -->
        <div class="flex items-center w-1/3">
          <label class="w-32 font-medium text-gray-700 text-center mr-2">
            Garage Closing Time:
          </label>
          <input
            type="time"
            v-model="duty.endTime"
            class="w-28 border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200"
          />
        </div>

        <!-- Total Hours -->
        <div class="flex items-center w-1/3">
          <label class="w-32 font-medium text-gray-700 text-center mr-2">
            Total Hours:
          </label>
          <input
            type="text"
            v-model="duty.totalHours"
            class="w-24 border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200"
            readonly
            placeholder="Hrs"
          />
        </div>
      </div>
    </div>

    <div class="w-full max-w-3xl mx-auto">
      <!-- Driver Name & Advance -->
      <div class="flex items-center gap-6 w-full mt-4">
        <div class="flex items-center w-1/2">
          <label class="w-36 mr-1 font-medium text-gray-700"
            >Driver Name:</label
          >
          <input
            type="text"
            v-model="duty.driverName"
            class="w-full max-w-[250px] border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-indigo-200"
            placeholder="Enter driver's name"
          />
        </div>

        <div class="flex items-center w-1/2">
          <label class="mr-1 font-medium text-gray-700">Advance:</label>
          <input
            type="number"
            v-model="duty.advance"
            class="w-full max-w-[250px] border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-indigo-200"
            placeholder="Enter advance amount"
          />
        </div>
      </div>

      <!-- Balance Payment -->
      <div class="flex items-center w-full mt-8">
        <label class="font-medium text-gray-700">Please Pay Balance Rs.</label>
        <input
          type="number"
          v-model="duty.Balance"
          class="border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-indigo-200 text-center mx-3"
          placeholder="Enter balance amount"
        />
        <span class="font-medium text-gray-700">to Driver Before Start</span>
      </div>

      <!-- Extra Charges Section -->
      <div class="w-full mt-6 space-y-4">
        <!-- Extra Km Charges -->
        <div class="flex items-center">
          <label class="mr-2 font-medium text-gray-700">Upto</label>
          <input
            type="number"
            v-model="duty.UptoKms"
            class="w-20 border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200 text-center"
            placeholder="Km"
          />
          <span class="mx-2 font-medium text-gray-700"
            >Km. Extra km. @ Rs.</span
          >
          <input
            type="number"
            v-model="duty.ExtraKmsRs"
            class="w-20 border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200 text-center"
            placeholder="Rate"
          />
          <span class="ml-2 font-medium text-gray-700">Per Km.</span>
        </div>

        <!-- Extra Hours Charges -->
        <div class="flex items-center">
          <label class="mr-2 font-medium text-gray-700">Upto</label>
          <input
            type="number"
            v-model="duty.UptoHrs"
            class="w-20 border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200 text-center"
            placeholder="Hrs"
          />
          <span class="mx-2 font-medium text-gray-700"
            >Hrs. Extra Hrs. @ Rs.</span
          >
          <input
            type="number"
            v-model="duty.UptoHrsRs"
            class="w-20 border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200 text-center"
            placeholder="Rate"
          />
          <span class="ml-2 font-medium text-gray-700">Per Hr.</span>
        </div>

        <!-- Tax and D.A. Charges -->
        <div class="flex items-center">
          <label class="mr-2 font-medium text-gray-700">Tax Rs.:</label>
          <input
            type="number"
            v-model="duty.TaxRs"
            class="w-20 border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200 text-center"
            placeholder="Tax"
          />
          <span class="mx-4 font-medium text-gray-700">D.A. Rs.:</span>
          <input
            type="number"
            v-model="duty.TaxRsPerDay"
            class="w-24 border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200 text-center"
            placeholder="Per Day"
          />
        </div>
      </div>

      <!-- Trip Type Dropdown -->
      <div class="mt-10 relative">
        <label class="w-36 font-medium text-gray-700">Mumbai to:</label>
        <select
          v-model="duty.tripRoute"
          class="ml-2 border border-gray-400 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200 w-48"
        >
          <option value="" disabled>Select Trip Type</option>
          <option value="local">Local</option>
          <option value="outstation">Outstation</option>
          <option value="airport">Airport Transfer</option>
          <option value="roundTrip">Round Trip</option>
          <option value="oneWay">One Way</option>
        </select>
      </div>
    </div>

    <div
      class="mt-6 flex justify-between items-end w-full border-t border-gray-400"
    >
      <!-- Left Side: Text Information -->
      <div class="text-sm text-gray-700">
        <p>KILOMETERS AND TIMING WILL BE CHARGED FROM GARAGE TO GARAGE.</p>
        <p>TOLL TAX, ENTRY, PARKING TO BE PAID BY PARTY.</p>
      </div>

      <!-- Right Side: Signature Box -->
      <div class="text-right">
        <div class="border-t pt-2 font-medium">Client's Signature</div>
        <div
          class="border border-gray-400 h-20 w-48 mt-2 rounded-md bg-gray-100"
        >
          <canvas
            id="signatureCanvas"
            class="w-full h-full"
            style="border: 1px solid #ddd"
          ></canvas>
        </div>
        <button
          @click="clearSignature"
          class="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Clear Signature
        </button>
      </div>
    </div>

    <div class="mt-4">
      <button
        v-on:click="submitForm"
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Submit Duty Slip
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueDatepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

export default {
  name: "DutyReceipt",
  components: {
    VueDatepicker,
  },
  data() {
    return {
      email: "excel.travel@rediffmail.com",
      companyName: "Excel Travels",
      exportStartDate: null,
      exportEndDate: null,
      duty: {
        DutySlipID: "",
        DutySlipDate: null,
        partyName: "",
        CustomerName: "",
        address: "",
        phone: "",
        busNo: "",
        time: null,
        dateFrom: null,
        dateTo: null,
        startKms: "",
        closingKms: "",
        totalKms: "",
        startTime: "",
        closingTime: "",
        totalHours: "",
        driverName: "",
        Advance: "",
        Balance: "",
        UptoKms: "",
        ExtraKmsRs: "",
        UptoHrs: "",
        UptoHrsRs: "",
        TaxRs: "",
        TaxRsPerDay: "",
        tripRoute: "",
        ClientSignature: "",
      },
      errors: {
        DutySlipDate: "",
        partyName: "",
        CustomerName: "",
        address: "",
        phone: "",
        busNo: "",
        time: "",
      },
    };
  },
  mounted() {
    this.setupCanvas();
  },
  methods: {
    validateForm() {
      this.errors = {
        DutySlipDate: "",
        busNo: "",
        time: "",
        address: "",
        phone: "",
        partyName: "",
        CustomerName: "",
      }; // Reset errors

      let isValid = true;

      // Validate Date
      if (!this.duty.DutySlipDate) {
        this.errors.DutySlipDate = "Duty Slip Date is required.";
        isValid = false;
      }

      // Validate Party Name
      if (!this.duty.partyName) {
        this.errors.partyName = "Party Name is required.";
        isValid = false;
      }

      // Validate Customer Name
      if (!this.duty.CustomerName) {
        this.errors.CustomerName = "Customer Name is required.";
        isValid = false;
      }

      // Validate Address
      if (!this.duty.address) {
        this.errors.address = "Address is required.";
        isValid = false;
      }

      // Validate Phone Number
      const phoneRegex = /^[0-9]{10}$/;
      if (!this.duty.phone) {
        this.errors.phone = "Phone number is required.";
        isValid = false;
      } else if (!phoneRegex.test(this.duty.phone)) {
        this.errors.phone = "Phone number must be 10 digits.";
        isValid = false;
      }

      // Validate Bus Number
      if (!this.duty.busNo) {
        this.errors.busNo = "Bus Number is required.";
        isValid = false;
      }

      // Validate Time
      if (!this.duty.time) {
        this.errors.time = "Time is required.";
        isValid = false;
      }

      return isValid;
    },
    setupCanvas() {
      const canvas = document.getElementById("signatureCanvas");
      const ctx = canvas.getContext("2d");

      // Set canvas width and height to match the container
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      // Initial canvas settings
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#000";

      let isDrawing = false;
      let lastX = 0;
      let lastY = 0;

      // Mouse events for desktop
      canvas.addEventListener("mousedown", (e) => this.startDrawing(e, ctx));
      canvas.addEventListener("mousemove", (e) => this.draw(e, ctx));
      canvas.addEventListener("mouseup", () => this.stopDrawing());
      canvas.addEventListener("mouseout", () => this.stopDrawing());

      // Touch events for mobile
      canvas.addEventListener("touchstart", (e) => this.startDrawing(e, ctx));
      canvas.addEventListener("touchmove", (e) => this.draw(e, ctx));
      canvas.addEventListener("touchend", () => this.stopDrawing());
      canvas.addEventListener("touchcancel", () => this.stopDrawing());

      this.startDrawing = (e, ctx) => {
        isDrawing = true;
        const { x, y } = this.getPosition(e);
        lastX = x;
        lastY = y;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
      };

      this.draw = (e, ctx) => {
        if (!isDrawing) return;

        const { x, y } = this.getPosition(e);
        ctx.lineTo(x, y);
        ctx.stroke();
        lastX = x;
        lastY = y;
      };

      this.stopDrawing = () => {
        isDrawing = false;
      };

      this.getPosition = (e) => {
        const canvas = document.getElementById("signatureCanvas");
        const rect = canvas.getBoundingClientRect();
        let x = e.clientX || e.touches[0].clientX;
        let y = e.clientY || e.touches[0].clientY;

        x = x - rect.left;
        y = y - rect.top;

        return { x, y };
      };
    },

    clearSignature() {
      const canvas = document.getElementById("signatureCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      this.duty.ClientSignature = ""; // Reset the signature data
    },

    async submitForm() {
      // Get the base64 signature data URL
      const canvas = document.getElementById("signatureCanvas");
      this.duty.ClientSignature = canvas.toDataURL(); // Store the signature image
      if (this.validateForm()) {
        try {
          // Save data to backend
          await axios.post("http://localhost:5000/dutyslips", this.duty);
          Swal.fire({
            title: "Success!",
            text: "Duty slip submitted successfully!",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
        } catch (error) {
          console.error("Error saving duty slip:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to submit duty slip!",
            icon: "error",
            confirmButtonColor: "#d33",
            confirmButtonText: "Try Again",
          });
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: "Please fill in all required fields.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    },

    updateDate(value) {
      this.selectedDate = value;
    },
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
  },
};
</script>

<style scoped>
input:focus,
textarea:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 5px #6366f1;
}

canvas {
  border: 1px solid #bbb;
  background-color: #f4f4f4;
}
</style>
