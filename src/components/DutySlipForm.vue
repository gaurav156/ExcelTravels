<template>
  <div
    class="max-w-3xl mx-auto p-6 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg rounded-xl border border-gray-300"
  >
    <div class="flex justify-between items-center mb-6">
      <div class="text-sm text-indigo-600">{{ email }}</div>
      <div class="text-3xl font-semibold text-purple-700">
        {{ companyName }}
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
        />
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
        />
      </div>

      <div class="flex items-center w-1/2">
        <label class="w-32 font-medium text-gray-700 text-center mr-2"
          >Customer Name:</label
        >
        <input
          type="text"
          v-model="duty.CustomerName"
          class="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200"
        />
      </div>
    </div>

    <!-- Address -->
    <div class="flex items-start mt-2 mb-2">
      <label class="w-24 font-medium text-gray-700 mt-2">Address:</label>
      <textarea
        v-model="duty.address"
        class="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200"
        rows="3"
      ></textarea>
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
      />
    </div>

    <!-- Bus No & Time -->
    <div class="flex items-center justify-between gap-8 mb-4 mr-4">
      <div class="flex items-center w-1/2">
        <label class="w-32 font-medium text-gray-700 text-left">Bus No:</label>
        <input
          type="text"
          v-model="duty.busNo"
          class="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200"
        />
      </div>

      <div class="flex items-center w-1/2">
        <label class="w-32 font-medium text-gray-700 text-center mr-2">
          Time:
        </label>
        <input
          type="time"
          v-model="duty.time"
          class="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200"
        />
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
            type="text"
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
            type="text"
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
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center w-full mt-4">
      <!-- Driver Name & Advance -->
      <div class="flex items-center justify-center gap-6 w-full max-w-3xl">
        <!-- Driver Name -->
        <div class="flex items-center w-1/2">
          <label class="w-36 font-medium text-gray-700 text-right mr-2">
            Driver Name:
          </label>
          <input
            type="text"
            v-model="duty.driverName"
            class="w-full max-w-[250px] border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-indigo-200"
            placeholder="Enter driver's name"
          />
        </div>

        <!-- Advance -->
        <div class="flex items-center w-1/2">
          <label class="w-36 font-medium text-gray-700 text-right mr-2">
            Advance:
          </label>
          <input
            type="number"
            v-model="duty.advance"
            class="w-full max-w-[250px] border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-indigo-200"
            placeholder="Enter advance amount"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col items-start w-full mt-6">
      <!-- Balance Payment Field -->
      <div class="flex items-center w-full max-w-2xl">
        <label class="w-64 font-medium text-gray-700 text-right">
          Please Pay Balance Rs.
        </label>
        <input
          type="number"
          v-model="duty.Balance"
          class="w-1/3 min-w-[180px] border border-gray-300 px-4 py-2 rounded-md focus:ring focus:ring-indigo-200 mx-3 text-center"
          placeholder="Enter balance amount"
        />
        <span class="font-medium text-gray-700">to Driver Before Start</span>
      </div>
    </div>

    <div class="mb-4">
      <div class="grid grid-cols-2 gap-4 text-gray-700">
        <p>Extra Km. @ Rs. ______ Per Km.</p>
        <p>Extra Hrs. @ Rs. ______ Per Hr.</p>
        <p>Tax Rs.: ______</p>
        <p>D.A. Rs.: ______ Per day</p>
      </div>
      <div class="flex items-center mt-3">
        <label class="w-24 font-medium">Mumbai to:</label>
        <input
          type="text"
          v-model="duty.tripRoute"
          class="border border-gray-400 px-3 py-2 rounded-md focus:ring focus:ring-indigo-200"
        />
      </div>
    </div>

    <div class="text-sm text-gray-700">
      <p>KILOMETERS AND TIMING WILL BE CHARGED FROM GARAGE TO GARAGE.</p>
      <p>TOLL TAX, ENTRY, PARKING TO BE PAID BY PARTY.</p>
    </div>

    <div class="text-right mt-4">
      <div class="border-t pt-2 font-medium">Client's Signature</div>
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
// import { ref } from 'vue';
import axios from "axios";
import VueDatepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// const form = ref({
//   partyName: '',
//   busNo: '',
//   phone: '',
//   time: '',
//   address: '',
//   startKms: '',
//   endKms: '',
//   totalHours: '',
//   driverName: ''
// });

export default {
  name: "DutyReceipt",
  components: {
    VueDatepicker,
  },
  data() {
    return {
      email: "excel.travel@rediffmail.com",
      companyName: "Excel Travels",
      // dateFrom: new Date(),
      // dateTo: new Date(),
      // time: new Date(),
      // partyName: "",
      // address: "",
      // phone: "",
      // busNo: "",
      // closingKms: "",
      // totalHours: "",
      // tripRoute: "",
      duty: {
        DutySlipID: "",
        // DutySlipDate: new Date(),
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
        startTime: new Date(),
        closingTime: new Date(),
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
    };
  },

  methods: {
    async submitForm() {
      try {
        // Save data to backend
        await axios.post("http://localhost:5000/dutyslips", this.duty);
        alert("Duty slip submitted successfully!");
      } catch (error) {
        console.error("Error saving duty slip:", error);
      }
    },
    updateDate(value) {
      this.selectedDate = value;
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
</style>
