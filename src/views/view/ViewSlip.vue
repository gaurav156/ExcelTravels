<template>
  <div class="p-6 pt-0">
    <!-- Centered Heading with Maroon Color -->
    <h2 class="text-2xl mb-6 text-center text-maroon font-extrabold">
      Duty Slip Data
    </h2>

    <!-- Filter Section - Right-Aligned -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6 justify-end">
      <!-- Custom Dropdown for Date Filter -->
      <div
        v-click-outside="handleClickOutside"
        class="flex items-center relative"
      >
        <label class="mr-2 font-medium text-maroon">Filter by Date:</label>
        <div class="relative">
          <button
            @click="toggleDateDropdown"
            class="p-2 border border-maroon rounded-md focus:ring-maroon focus:border-maroon custom-fselect"
          >
            {{ dateFilter === "newest" ? "Newest First" : "Oldest First" }}
          </button>
          <div
            v-if="isDateDropdownOpen"
            class="absolute mt-1 w-full bg-white border border-maroon rounded-md shadow-lg z-10"
          >
            <div
              @click="selectDateFilter('newest')"
              class="p-2 hover:bg-[#800000] hover:text-white cursor-pointer"
            >
              Newest First
            </div>
            <div
              @click="selectDateFilter('oldest')"
              class="p-2 hover:bg-[#800000] hover:text-white cursor-pointer"
            >
              Oldest First
            </div>
          </div>
        </div>
      </div>

      <!-- Filter by Customer/Company Name with Clear (✖) Icon -->
      <div class="flex items-center relative">
        <label for="nameFilter" class="mr-2 font-medium text-maroon">
          Filter by Name:
        </label>
        <input
          id="nameFilter"
          v-model="nameFilter"
          type="text"
          placeholder="Search by Customer/Company"
          autocomplete="off"
          class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border bg-gray-50 focus:ring-maroon focus:border-maroon outline-none border-[#800000] !important shadow-[0_0_5px_rgba(128,0,0,0.5)] placeholder:text-xs lg:placeholder:text-sm"
        />

        <!-- Cross (✖) Icon to Clear Input -->
        <svg
          v-if="nameFilter"
          @click="nameFilter = ''"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-500 absolute right-3 cursor-pointer hover:text-red-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 9.293l4.95-4.95a1 1 0 011.415 1.414L11.414 10l4.95 4.95a1 1 0 01-1.415 1.415L10 11.414l-4.95 4.95a1 1 0 01-1.415-1.415l4.95-4.95-4.95-4.95A1 1 0 015.05 4.343L10 9.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <!-- Table -->
    <!-- Card Layout for Small and Medium Screens -->
    <div class="sm:block md:block lg:hidden print-hide">
      <div
        v-for="slip in paginatedData"
        :key="slip.dutySlipId"
        class="mb-4 p-4 border-2 rounded-lg shadow-sm hover:shadow-md transition-shadow card-style"
      >
        <!-- Duty Slip Details -->
        <div class="space-y-2">
          <p><strong>Slip ID:</strong> {{ slip.dutySlipId }}</p>
          <p><strong>Customer Name:</strong> {{ slip.customerName }}</p>
          <p><strong>Company Name:</strong> {{ slip.companyName }}</p>
          <p><strong>City:</strong> {{ slip.city }}</p>
          <p><strong>Date:</strong> {{ formatDate(slip.createdAt) }}</p>
          <p><strong>Trip Route:</strong> {{ slip.tripRoute }}</p>
        </div>

        <!-- Action Icons -->
        <div class="flex justify-end gap-4 mt-4">
          <!-- Info Icon -->
          <svg
            @click="viewSlip(slip.dutySlipId)"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-blue-500 hover:text-blue-700 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <!-- Edit Icon -->
          <svg
            @click="editSlip(slip.dutySlipId)"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-green-500 hover:text-green-700 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 4h2m1 16H10m-5 0a2 2 0 002 2h10a2 2 0 002-2m-1-16a2 2 0 00-2-2H7a2 2 0 00-2 2m13.5 5.5L16 8l-5 5v3h3l5.5-5.5z"
            />
          </svg>

          <!-- Share Icon -->
          <svg
            @click="shareSlip(slip)"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-blue-500 hover:text-blue-700 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>

          <!-- Delete Icon -->
          <svg
            @click="allowDelete ? deleteSlip(slip.dutySlipId) : null"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            :class="{
              'text-red-500 hover:text-red-700 cursor-pointer': allowDelete,
              'text-gray-400 cursor-not-allowed': !allowDelete,
            }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            :disabled="!allowDelete"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zm9-11V5a1 1 0 00-1-1H10a1 1 0 00-1 1v3m-4 0h14"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Table Layout for Larger Screens -->
    <div class="hidden lg:block overflow-x-auto">
      <table class="table-auto w-full border-collapse">
        <thead>
          <tr class="bg-maroon text-white">
            <th class="border p-2">Slip ID</th>
            <th class="border p-2 hidden md:table-cell">Company Name</th>
            <th class="border p-2">Customer Name</th>
            <th class="border p-2 hidden md:table-cell">City</th>
            <th class="border p-2 hidden sm:table-cell">Date</th>
            <th class="border p-2 hidden sm:table-cell">Trip Route</th>
            <th class="border p-2">View</th>
            <th class="border p-2">Edit</th>
            <th class="border p-2">Share</th>
            <th class="border p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="slip in paginatedData"
            :key="slip.dutySlipId"
            class="hover:bg-gray-100 transition-all"
          >
            <td class="border p-2 text-center font-bold">
              {{ slip.dutySlipId }}
            </td>
            <td class="border p-2 font-bold hidden md:table-cell">
              {{ slip.companyName }}
            </td>
            <td class="border p-2 font-bold">
              {{ slip.customerName }}
            </td>
            <td class="border p-2 font-bold hidden md:table-cell">
              {{ slip.city }}
            </td>
            <td class="border p-2 font-bold hidden sm:table-cell">
              {{ formatDate(slip.createdAt) }}
            </td>
            <td class="border p-2 font-bold hidden sm:table-cell">
              {{ slip.tripRoute }}
            </td>
            <td class="border p-2 text-center">
              <!-- Details Icon -->
              <svg
                @click="viewSlip(slip.dutySlipId)"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-blue-500 hover:text-blue-700 cursor-pointer mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </td>
            <td class="border p-2 text-center">
              <!-- Edit Icon -->
              <svg
                @click="editSlip(slip.dutySlipId)"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-green-500 hover:text-green-700 cursor-pointer mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 4h2m1 16H10m-5 0a2 2 0 002 2h10a2 2 0 002-2m-1-16a2 2 0 00-2-2H7a2 2 0 00-2 2m13.5 5.5L16 8l-5 5v3h3l5.5-5.5z"
                />
              </svg>
            </td>

            <td class="border p-2 text-center">
              <!-- Share Button (shown when delete is disabled) -->
              <svg
                @click="shareSlip(slip)"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-blue-500 hover:text-blue-700 cursor-pointer mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </td>

            <td class="border p-2 text-center">
              <!-- Delete Icon -->
              <svg
                @click="allowDelete ? deleteSlip(slip.dutySlipId) : null"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mx-auto"
                :class="{
                  'text-red-500 hover:text-red-700 cursor-pointer': allowDelete,
                  'text-gray-400 cursor-not-allowed': !allowDelete,
                }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                :disabled="!allowDelete"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zm9-11V5a1 1 0 00-1-1H10a1 1 0 00-1 1v3m-4 0h14"
                />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination -->
    <div class="flex justify-center mt-4">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        class="pagination-btn"
        :class="{ 'bg-maroon text-white': currentPage === page }"
      >
        {{ page }}
      </button>
    </div>

    <!-- View/Edit Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[1000] overflow-y-auto modal-content"
    >
      <div
        class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        <!-- Modal Header with Close Button -->
        <div
          class="flex justify-between items-center p-6 border-b border-gray-200 bg-maroon"
        >
          <h3 class="text-xl font-bold text-white">
            {{ isEditMode ? "Edit Duty Slip" : "View Duty Slip" }}
          </h3>
          <!-- Close Button [x] -->
          <button
            @click="closeModal"
            class="text-white hover:text-gray-200 focus:outline-none"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="overflow-y-auto p-6">
          <!-- Duty Slip Details -->
          <div v-if="!isEditMode" class="space-y-6">
            <!-- Duty Slip ID and Created At -->
            <div>
              <h4 class="text-lg font-semibold text-maroon mb-2">
                Duty Slip Information
              </h4>
              <hr class="mb-4" />
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm font-medium text-gray-700">Duty Slip ID</p>
                  <p class="text-gray-500">
                    {{ selectedSlip.dutySlipId }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Created At</p>
                  <p class="text-gray-500">
                    {{ formatDate(selectedSlip.createdAt) }}
                  </p>
                </div>
                <div v-if="selectedSlip.modifiedAt">
                  <p class="text-sm font-medium text-gray-700">Modified At</p>
                  <p class="text-gray-500">
                    {{ formatDate(selectedSlip.modifiedAt) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Customer Information -->
            <div>
              <h4 class="text-lg font-semibold text-maroon mb-2">
                Customer Information
              </h4>
              <hr class="mb-4" />
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm font-medium text-gray-700">Company ID</p>
                  <p class="text-gray-500">
                    {{ selectedSlip.companyId }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Company Name</p>
                  <p class="text-gray-500">
                    {{ selectedSlip.companyName }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Customer Name</p>
                  <p class="text-gray-500">
                    {{ selectedSlip.customerName }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">City</p>
                  <p class="text-gray-500">
                    {{ selectedSlip.city }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Address</p>
                  <p class="text-gray-500">
                    {{ selectedSlip.address }}
                  </p>
                </div>
              </div>
            </div>
            <!-- Driver Information -->
            <div>
              <h4 class="text-lg font-semibold text-maroon mb-2">
                Driver Information
              </h4>
              <hr class="mb-4" />
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm font-medium text-gray-700">Driver ID</p>
                  <p class="text-gray-500">
                    {{ selectedSlip.driverId }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Driver Name</p>
                  <p class="text-gray-500">
                    {{ selectedSlip.driverName }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Phone Number</p>
                  <p class="text-gray-500">
                    {{ selectedSlip.phoneNumber }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Car Number</p>
                  <p class="text-gray-500">
                    {{ selectedSlip.carNumber }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Car Booked</p>
                  <p class="text-gray-500">
                    {{ selectedSlip.carBooked }}
                  </p>
                </div>
              </div>
            </div>
            <!-- Duty Information -->
            <div>
              <h4 class="text-lg font-semibold text-maroon mb-4">
                Duty Information
              </h4>
              <hr class="mb-4" />
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm font-medium text-gray-700">Date From</p>
                  <p class="text-gray-500">
                    {{ formatDate(selectedSlip.dateFrom) }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Date To</p>
                  <p class="text-gray-500">
                    {{ formatDate(selectedSlip.dateTo) }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Pickup Time</p>
                  <p class="text-gray-500">
                    {{ selectedSlip.pickupTime }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Duty Type</p>
                  <p class="text-gray-500">
                    {{ selectedSlip.dutyType }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Trip Route</p>
                  <p class="text-gray-500">
                    {{ selectedSlip.tripRoute }}
                  </p>
                </div>
                <div class="hidden md:block">
                  <p class="text-sm font-medium text-gray-700"></p>
                  <p class="text-gray-500"></p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Start KM</p>
                  <p class="text-gray-500">
                    {{ selectedSlip.startKM }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">End KM</p>
                  <p class="text-gray-500">
                    {{ selectedSlip.endKM }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Start Time</p>
                  <p class="text-gray-500">
                    {{ selectedSlip.startTime }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">End Time</p>
                  <p class="text-gray-500">
                    {{ selectedSlip.endTime }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Parking Fees</p>
                  <p class="text-gray-500">₹{{ formattedParkingFees }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Toll Fees</p>
                  <p class="text-gray-500">₹{{ formattedTollFees }}</p>
                </div>
              </div>
            </div>

            <!-- Images Section -->
            <div>
              <h4 class="text-lg font-semibold text-maroon mb-4">Images</h4>
              <hr class="mb-4" />
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Start KM Photo -->
                <div>
                  <p class="text-sm font-medium text-gray-700">
                    Start KM Photo
                  </p>
                  <div
                    v-if="selectedSlip.startKMPhoto"
                    class="relative group mt-1"
                  >
                    <img
                      :src="selectedSlip.startKMPhoto"
                      alt="Start KM Photo"
                      class="w-full h-32 object-cover rounded-lg shadow-sm"
                      @error="handleImageError('startKMPhoto')"
                    />
                    <button
                      class="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300 text-white text-sm font-medium"
                      @click="openImage(selectedSlip.startKMPhoto)"
                    >
                      View Full Image
                    </button>
                  </div>
                  <p v-else class="text-gray-500">No image available</p>
                </div>

                <!-- End KM Photo -->
                <div>
                  <p class="text-sm font-medium text-gray-700">End KM Photo</p>
                  <div
                    v-if="selectedSlip.endKMPhoto"
                    class="relative group mt-1"
                  >
                    <img
                      :src="selectedSlip.endKMPhoto"
                      alt="End KM Photo"
                      class="w-full h-32 object-cover rounded-lg shadow-sm"
                      @error="handleImageError('endKMPhoto')"
                    />
                    <button
                      class="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300 text-white text-sm font-medium"
                      @click="openImage(selectedSlip.endKMPhoto)"
                    >
                      View Full Image
                    </button>
                  </div>
                  <p v-else class="text-gray-500">No image available</p>
                </div>
              </div>
            </div>

            <!-- Totals -->
            <div>
              <h4 class="text-lg font-semibold text-maroon mb-4">Totals</h4>
              <hr class="mb-4" />
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm font-medium text-gray-700">Total KM</p>
                  <p class="text-gray-500">{{ totalKM }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Total Time</p>
                  <p class="text-gray-500">{{ totalTime }}</p>
                </div>
              </div>
            </div>

            <!-- Signature Section -->
            <div>
              <h4 class="text-lg font-semibold text-maroon mb-4">Signature</h4>
              <hr class="mb-4" />
              <div class="signature-section">
                <p class="text-sm font-medium text-gray-700">
                  Customer Signature
                </p>
                <div
                  v-if="selectedSlip.customerSignature"
                  class="relative group mt-1 max-w-xs mx-auto"
                >
                  <img
                    :src="selectedSlip.customerSignature"
                    alt="Customer Signature"
                    class="w-full h-32 object-cover rounded-lg shadow-sm"
                    @error="handleImageError('customerSignature')"
                  />
                  <button
                    class="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300 text-white text-sm font-medium"
                    @click="openImage(selectedSlip.customerSignature)"
                  >
                    View Full Image
                  </button>
                </div>
                <p v-else class="text-gray-500">No signature available</p>
              </div>

              <!-- Print Button -->
              <div class="mt-6 flex justify-end">
                <button
                  @click="printDutySlip"
                  class="flex items-center px-4 py-2 bg-maroon text-white rounded-md hover:bg-maroon-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  Print
                </button>
              </div>
              <div class="print-footer">
                © 2025 Excel Tours & Travels. All rights reserved.<br />
                Email: excel.travel@rediffmail.com
              </div>
              <!-- Custom Image Preview Modal -->
              <div
                v-if="fullImage"
                class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
              >
                <div
                  class="bg-white rounded-lg shadow-lg w-full max-w-4xl h-[90vh] md:h-[80vh] lg:h-[70vh] flex flex-col overflow-hidden"
                >
                  <!-- Modal Header with Close Button -->
                  <div
                    class="flex justify-between items-center p-6 border-b border-gray-200 bg-maroon"
                  >
                    <h3 class="text-xl font-bold text-white">Image Preview</h3>
                    <!-- Close Button [x] -->
                    <button
                      @click="fullImage = null"
                      class="text-white hover:text-gray-200 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <!-- Image Display -->
                  <div
                    class="p-6 flex justify-center items-center flex-1 overflow-auto"
                  >
                    <img
                      :src="fullImage"
                      class="max-w-full max-h-full object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Edit Form -->
          <form v-else @submit.prevent="validateAndSave" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Read-Only Fields (no changes needed) -->
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Duty Slip ID</label
                >
                <input
                  v-model="selectedSlip.dutySlipId"
                  type="text"
                  readonly
                  disabled
                  class="mt-1 block w-full px-4 py-2 border border-[#800000] rounded-md shadow-sm bg-gray-100"
                />
              </div>
              <!-- <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Created At</label
                >
                <input
                  v-model="selectedSlip.createdAt"
                  type="text"
                  readonly
                  disabled
                  class="mt-1 block w-full px-4 py-2 border border-[#800000] rounded-md shadow-sm bg-gray-100"
                />
              </div> -->
              <!-- <div v-if="selectedSlip.modifiedAt">
                <label class="block text-sm font-medium text-gray-700"
                  >Modified At</label
                >
                <input
                  v-model="selectedSlip.modifiedAt"
                  type="text"
                  readonly
                  disabled
                  class="mt-1 block w-full px-4 py-2 border border-[#800000] rounded-md shadow-sm bg-gray-100"
                />
              </div> -->

              <!-- Editable Fields (now with required attribute) -->
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Company ID</label
                >
                <input
                  v-model="selectedSlip.companyId"
                  type="text"
                  class="mt-1 block w-full px-4 py-2 border border-[#800000] rounded-md shadow-sm bg-gray-100"
                  readonly
                  disabled
                />
              </div>
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700">
                  Pickup Time <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input
                    id="pickupTime2"
                    v-model="selectedSlip.pickupTime"
                    type="time"
                    class="time-input focus:ring-[#800000] focus:outline-none bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon pr-10 cursor-pointer"
                    required
                  />
                  <!-- Custom Clock Icon (Only one remains) -->
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
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Company Name <span class="text-red-500">*</span>
                </label>
                <VueSelect
                  v-model="selectedSlip.companyName"
                  :options="filteredCompanies"
                  @search="updateCompanySearchQuery"
                  @update:modelValue="handleCompanySelection"
                  label="companyName"
                  placeholder="Select Company"
                  class="mt-1 block w-full custom-vue-select"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Customer Name <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="selectedSlip.customerName"
                  type="text"
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  City <span class="text-red-500">*</span>
                </label>
                <VueSelect
                  v-model="selectedSlip.city"
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
                  class="mt-1 block w-full custom-vue-select"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Address <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="selectedSlip.address"
                  type="text"
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Car Booked <span class="text-red-500">*</span>
                </label>
                <VueSelect
                  v-model="selectedSlip.carBooked"
                  :options="['Sedan', 'SUV', 'Luxury']"
                  placeholder="Select Car Type"
                  class="mt-1 block w-full custom-vue-select"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Phone Number <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="selectedSlip.phoneNumber"
                  type="tel"
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Duty Type <span class="text-red-500">*</span>
                </label>
                <VueSelect
                  v-model="selectedSlip.dutyType"
                  :options="['Local', 'Outstation']"
                  placeholder="Select Duty Type"
                  class="mt-1 block w-full custom-vue-select"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Driver ID</label
                >
                <input
                  v-model="selectedSlip.driverId"
                  type="text"
                  readonly
                  disabled
                  class="mt-1 block w-full px-4 py-2 border border-[#800000] rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Driver Name <span class="text-red-500">*</span>
                </label>
                <VueSelect
                  v-model="selectedSlip.driverName"
                  :options="filteredDrivers"
                  @search="updateDriverSearchQuery"
                  @update:modelValue="handleDriverSelection"
                  label="name"
                  placeholder="Select Driver"
                  class="mt-1 block w-full custom-vue-select"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Car Number <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="selectedSlip.carNumber"
                  type="text"
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Trip Route <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="selectedSlip.tripRoute"
                  type="text"
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                  required
                />
              </div>
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700">
                  Date From <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formattedDateFrom"
                  type="date"
                  class="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon pr-10 cursor-pointer"
                  required
                />
                <!-- Custom Calendar Icon -->
                <svg
                  class="absolute right-3 top-11 transform -translate-y-1/2 h-5 w-5 text-maroon pointer-events-none"
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

              <div class="relative">
                <label class="block text-sm font-medium text-gray-700">
                  Date To <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formattedDateTo"
                  type="date"
                  class="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon pr-10 cursor-pointer"
                  required
                />
                <!-- Custom Calendar Icon -->
                <svg
                  class="absolute right-3 top-11 transform -translate-y-1/2 h-5 w-5 text-maroon pointer-events-none"
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
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Parking Fees (₹)
                </label>
                <input
                  v-model.number="selectedSlip.parkingFees"
                  type="number"
                  min="0"
                  step="0.01"
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Toll Fees (₹)
                </label>
                <input
                  v-model.number="selectedSlip.tollFees"
                  type="number"
                  min="0"
                  step="0.01"
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
                />
              </div>
            </div>

            <!-- Save and Cancel Buttons -->
            <div class="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-maroon text-white rounded-md hover:bg-maroon-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api";
import Swal from "sweetalert2";
import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import clickOutside from "../../directives/clickOutside";

export default {
  name: "DutySlipList",
  components: {
    VueSelect,
  },
  directives: {
    clickOutside,
  },
  props: {
    isModalOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dutySlips: [], // All duty slips fetched from the API
      currentPage: 1,
      // itemsPerPage: 15,
      dateFilter: "newest", // Default filter: newest first
      nameFilter: "", // Filter by customer/company name
      isDateDropdownOpen: false, // Control the visibility of the date dropdown
      isEditMode: false, // Toggles between view and edit modes
      selectedSlip: {}, // Stores the selected duty slip data
      drivers: [], // List of drivers fetched from the API
      driverSearchQuery: "", // Search query for drivers
      companies: [], // List of companies fetched from the API
      companySearchQuery: "", // Search query for companies
      windowWidth: window.innerWidth, // Track window width for responsiveness
      fullImage: null,
      allowDelete: false,
      parkingFees: 0, // Initialize with 0
      tollFees: 0, // Initialize with 0
    };
  },
  computed: {
    totalKM() {
      // Ensure values are numbers and calculate difference
      return (
        Number(this.selectedSlip.endKM) - Number(this.selectedSlip.startKM) || 0
      );
    },
    totalTime() {
      if (!this.selectedSlip.startTime || !this.selectedSlip.endTime)
        return "N/A";

      // Convert times to Date objects
      const start = new Date(`1970-01-01T${this.selectedSlip.startTime}`);
      const end = new Date(`1970-01-01T${this.selectedSlip.endTime}`);

      // Calculate difference in minutes
      let diffMinutes = Math.floor((end - start) / (1000 * 60));

      if (diffMinutes < 0) return "Invalid Time"; // Handle invalid cases

      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;

      return `${hours}h ${minutes}m`;
    },
    formattedParkingFees() {
      const value = this.selectedSlip.parkingFees;
      return (value || 0).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
    formattedTollFees() {
      const value = this.selectedSlip.tollFees;
      return (value || 0).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
    // Dynamically adjust itemsPerPage based on screen size
    itemsPerPage() {
      if (this.windowWidth < 1024) {
        return 5; // 5 items for small and medium screens
      } else {
        return 15; // 15 items for large screens
      }
    },
    // Filtered data based on date and name filters
    filteredData() {
      let data = this.dutySlips;

      // Filter by customer/company name
      if (this.nameFilter) {
        const searchTerm = this.nameFilter.toLowerCase();
        data = data.filter(
          (slip) =>
            slip.customerName.toLowerCase().includes(searchTerm) ||
            slip.companyName.toLowerCase().includes(searchTerm)
        );
        return data;
      }

      // Filter by date
      if (this.dateFilter === "newest") {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Newest first
      } else {
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Oldest first
      }

      return data;
    },
    // Paginated data based on current page
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredData.slice(start, start + this.itemsPerPage);
    },
    // Total pages for pagination
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
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
    // Computed property for dateFrom
    formattedDateFrom: {
      get() {
        return this.formatDateForInput(this.selectedSlip.dateFrom);
      },
      set(value) {
        this.selectedSlip.dateFrom = value ? new Date(value).toISOString() : "";
      },
    },
    // Computed property for dateTo
    formattedDateTo: {
      get() {
        return this.formatDateForInput(this.selectedSlip.dateTo);
      },
      set(value) {
        this.selectedSlip.dateTo = value ? new Date(value).toISOString() : "";
      },
    },
    // Filter companies based on search query
    filteredCompanies() {
      return this.companies
        .filter((company) =>
          company.companyName
            .toLowerCase()
            .includes(this.companySearchQuery.toLowerCase())
        )
        .slice(0, 5); // Limit the number of displayed options
    },
  },
  mounted() {
    const role =
      this.$store.state.user?.role ||
      JSON.parse(sessionStorage.getItem("user")).role;
    this.allowDelete = role && role === "admin";
  },
  created() {
    this.fetchDutySlips();
    this.fetchDrivers(); // Fetch drivers when the component is created
    this.fetchCompanies(); // Fetch companies when the component is created
    window.addEventListener("resize", this.handleResize); // Add resize listener
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize); // Clean up listener
  },
  methods: {
    handleClickOutside() {
      this.isDateDropdownOpen = false;
    },
    printDutySlip() {
      const modalContent = document.querySelector(".modal-content");
      if (!modalContent) return;

      // Clone modal content for printing
      const printContent = modalContent.cloneNode(true);

      // Ensure full content is visible
      printContent.style.height = "auto";
      printContent.style.maxHeight = "none";
      printContent.style.overflow = "visible";

      // Create a full-page print container
      const printContainer = document.createElement("div");
      printContainer.style.position = "absolute";
      printContainer.style.left = "0";
      printContainer.style.top = "0";
      printContainer.style.width = "100vw";
      printContainer.style.height = "auto"; // Use auto height
      printContainer.style.overflow = "visible";
      printContainer.style.background = "white";
      printContainer.appendChild(printContent);

      document.body.appendChild(printContainer);

      window.print();

      document.body.removeChild(printContainer);
    },
    formatDateOnlyJP(dateString) {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },

    //     *Driver Login Details:*
    // 🔹 Username: ${slip.driverId || "N/A"}
    // 🔹 Password: ${driverPwd}

    shareSlip(slip) {
      // Get last 5 digits of driver's phone number
      const driverPwd = slip.phoneNumber ? slip.phoneNumber.slice(-5) : "N/A";

      // Format the message with all requested details
      const message = `Hello ${slip.driverName || "Driver"},


*Trip Information:*
🚗 Duty Slip ID: ${slip.dutySlipId}
📅 Date: ${this.formatDateOnlyJP(slip.dateFrom)}
⏰ Pickup Time: ${slip.pickupTime}
📍 Route: ${slip.tripRoute}

*Customer Details:*
👤 ${slip.customerName}
🏢 ${slip.companyName}

Please login to the app using the credentials above for more details.`;

      // Clean the phone number (remove any non-digit characters)
      const cleanedPhone = slip.phoneNumber
        ? slip.phoneNumber.replace(/\D/g, "")
        : null;

      if (cleanedPhone) {
        // Create WhatsApp URL with phone number
        const whatsappUrl = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(
          message
        )}`;

        // Open in a new tab
        window.open(whatsappUrl, "_blank");
      } else {
        // Fallback to regular share if no phone number
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
          message
        )}`;
        window.open(whatsappUrl, "_blank");

        // Optional: Show alert if no phone number exists
        Swal.fire({
          title: "No Phone Number",
          text: "Driver phone number not available, opened general WhatsApp share instead",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      }
    },

    // Fetch duty slips from the API
    async fetchDutySlips() {
      try {
        const response = await api.get("/dutyslips");
        this.dutySlips = response.data;
      } catch (error) {
        console.error("Error fetching duty slips:", error);
      }
    },
    // Handle window resize to update windowWidth
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    // View slip details
    async viewSlip(dutySlipId) {
      try {
        const response = await api.get(`/dutyslips/${dutySlipId}`);
        this.selectedSlip = response.data;
        this.isEditMode = false;
        this.$emit("update:isModalOpen", true); // Emit modal state to parent
      } catch (error) {
        console.error("Error fetching duty slip details:", error);
      }
    },
    // Edit slip
    async editSlip(dutySlipId) {
      try {
        const response = await api.get(`/dutyslips/${dutySlipId}`);
        this.selectedSlip = response.data;
        this.originalSlip = JSON.parse(JSON.stringify(response.data)); // Deep copy
        this.isEditMode = true;
        this.$emit("update:isModalOpen", true);
      } catch (error) {
        console.error("Error fetching duty slip details:", error);
      }
    },
    validateAndSave() {
      // List of required fields
      const requiredFields = [
        "companyName",
        "customerName",
        "city",
        "address",
        "carBooked",
        "phoneNumber",
        "dutyType",
        "driverName",
        "carNumber",
        "tripRoute",
        "formattedDateFrom",
        "formattedDateTo",
        "pickupTime",
      ];

      // Check if any required field is empty
      const isInvalid = requiredFields.some((field) => {
        const value =
          field === "formattedDateFrom" || field === "formattedDateTo"
            ? this[field]
            : this.selectedSlip[field];
        return !value || value.trim() === "";
      });

      if (isInvalid) {
        Swal.fire({
          title: "Validation Error",
          text: "Please fill in all required fields",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        return;
      }

      this.saveSlip();
    },
    // Save edited slip
    async saveSlip() {
      try {
        // Check if any field has changed
        const hasChanges = Object.keys(this.selectedSlip).some(
          (key) =>
            JSON.stringify(this.originalSlip[key]) !==
            JSON.stringify(this.selectedSlip[key])
        );

        if (!hasChanges) {
          this.closeModal();
          Swal.fire({
            title: "No Changes",
            text: "No fields were modified.",
            icon: "info",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
          return;
        }

        // Only proceed with update if there are changes
        await api.put(
          `/dutyslips/${this.selectedSlip.dutySlipId}`,
          this.selectedSlip
        );
        this.closeModal();
        this.fetchDutySlips();
        Swal.fire({
          title: "Success!",
          text: "Duty slip details updated successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error updating duty slip:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to update duty slip details.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    },
    openImage(imageUrl) {
      this.fullImage = imageUrl;
    },
    // Handle image loading errors
    handleImageError(field) {
      console.error(`Error loading ${field} image`);

      // Replace the failed image with a placeholder or a message
      this.selectedSlip[field] =
        "https://via.placeholder.com/150?text=Image+Not+Available"; // Placeholder URL
    },
    // Close modal
    closeModal() {
      this.selectedSlip = {};
      this.$emit("update:isModalOpen", false); // Emit modal state to parent
    },
    // Delete slip
    async deleteSlip(dutySlipId) {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        customClass: {
          popup: "swal2-popup", // Apply custom class
        },
      });

      // If user confirms deletion
      if (result.isConfirmed) {
        try {
          // Call API to delete the company
          await api.delete(`/dutyslips/${dutySlipId}`);

          // Remove the company from the local list
          this.dutySlips = this.dutySlips.filter(
            (dutySlip) => dutySlip.dutySlipId !== dutySlipId
          );

          // Check if the current page is empty after deletion
          if (this.paginatedData.length === 0 && this.currentPage > 1) {
            this.currentPage -= 1; // Move to the previous page
          }

          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: "The duty slip has been deleted.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
            customClass: {
              popup: "swal2-popup", // Apply custom class
            },
          });
        } catch (error) {
          console.error("Error deleting duty slip:", error);

          // Show error message
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the duty slip. Please try again.",
            icon: "error",
            confirmButtonColor: "#d33",
            confirmButtonText: "OK",
            customClass: {
              popup: "swal2-popup", // Apply custom class
            },
          });
        }
      }
    },
    // Toggle the date dropdown
    toggleDateDropdown() {
      this.isDateDropdownOpen = !this.isDateDropdownOpen;
    },
    // Select a date filter option
    selectDateFilter(option) {
      this.dateFilter = option;
      this.isDateDropdownOpen = false;
    },
    // Format date and time
    formatDate(dateString) {
      const date = new Date(dateString);

      if (!date) return ""; // Handle empty dates
      const d = new Date(date);

      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const year = d.getFullYear();
      let hours = d.getHours();
      const minutes = String(d.getMinutes()).padStart(2, "0");
      const seconds = String(d.getSeconds()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // The hour '0' should be '12'
      const formattedHours = String(hours).padStart(2, "0");

      return `${day}-${month}-${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
    },
    // Fetch drivers from the API
    async fetchDrivers() {
      try {
        const response = await api.get("/drivers");
        this.drivers = response.data;
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    },
    // Update driver search query dynamically
    updateDriverSearchQuery(query) {
      this.driverSearchQuery = query;
    },
    // Handle driver selection
    handleDriverSelection(selectedDriver) {
      if (selectedDriver) {
        this.selectedSlip.driverName = selectedDriver.name;
        this.selectedSlip.driverId = selectedDriver.driverId;
        this.selectedSlip.phoneNumber = selectedDriver.contact;
      } else {
        this.selectedSlip.driverName = "";
        this.selectedSlip.driverId = "";
        this.selectedSlip.phoneNumber = "";
      }
    },
    // Helper function to format date as YYYY-MM-DD
    formatDateForInput(date) {
      if (!date) return ""; // Handle empty dates
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    // Fetch companies from the API
    async fetchCompanies() {
      try {
        const response = await api.get("/companies");
        this.companies = response.data;
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    },
    // Update company search query dynamically
    updateCompanySearchQuery(query) {
      this.companySearchQuery = query;
    },
    // Handle company selection
    handleCompanySelection(selectedCompany) {
      if (selectedCompany) {
        // Update company name and ID
        this.selectedSlip.companyName = selectedCompany.companyName;
        this.selectedSlip.companyId = selectedCompany.companyId;
      } else {
        // Reset if no company is selected
        this.selectedSlip.companyName = "";
        this.selectedSlip.companyId = "";
      }
    },
  },
};
</script>

<style scoped>
.print-footer {
  display: none;
}

/* Maroon background for header */
.bg-maroon {
  background-color: maroon;
}

/* Glowing maroon edges */
td,
th {
  border: 2px solid maroon;
  box-shadow: 0 0 5px maroon;
}

/* White text for header */
thead th {
  color: white;
}

/* Center align icons */
td svg {
  display: block;
  margin: auto;
}

/* Pagination buttons */
.pagination-btn {
  border: 2px solid maroon;
  padding: 6px 12px;
  margin: 3px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: bold;
  background-color: white;
  color: black;
}

.pagination-btn:hover {
  background-color: maroon;
  color: white;
}

.text-maroon {
  color: #800000;
}

/* Maroon border with subtle glow */
.border-maroon {
  border-color: #800000;
  box-shadow: 0 0 5px rgba(128, 0, 0, 0.5);
}

/* Custom select dropdown */
.custom-fselect {
  appearance: none; /* Removes default styles */
  border: 1px solid #800000 !important;
  border-radius: 4px !important;
  -webkit-appearance: none; /* Safari */
  -moz-appearance: none; /* Firefox */
  background-color: white;
  color: black !important;
  cursor: pointer;
  /* Ensure text does not overlap with arrow */
  padding-right: 2.5rem; /* Increase space for the arrow */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23800000'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center; /* Adjust arrow position */
  background-size: 1.25rem;
}

/* Ensure focus styling is applied correctly */
.custom-fselect:focus {
  outline: none;
  border-color: #800000 !important;
  box-shadow: 0 0 5px rgba(128, 0, 0, 0.5);
}

/* Card Styling */
.card-style {
  background-color: #f5f5dc; /* Background color */
  border-color: maroon; /* Border color */
  box-shadow: 0 0 8px maroon; /* Glowing effect */
}

/* Hover effect for cards */
.card-style:hover {
  box-shadow: 0 0 12px maroon; /* Stronger glow on hover */
}
/* VueSelect Custom Styles */
:deep(.vs__dropdown-toggle) {
  border: 1px solid #800000 !important;
  border-radius: 4px !important;
  background-color: white !important;
  color: black !important;
  box-shadow: 0 0 5px rgba(128, 0, 0, 0.2);
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  padding-left: 0.5rem;
}

:deep(.vs__open-indicator) {
  appearance: none; /* Removes default styles */
  -webkit-appearance: none; /* Safari */
  -moz-appearance: none; /* Firefox */
  cursor: pointer !important;
  color: #800000;
  font-size: 1.2rem;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23800000'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.25rem;
  padding-right: 2.5rem;
}

:deep(.vs__clear) {
  fill: #800000 !important;
}

:deep(.vs__dropdown-menu) {
  background-color: #fff !important;
  border: 1px solid #ccc !important;
}

:deep(.vs__dropdown-option) {
  color: black !important; /* Changed to black */
}

:deep(.vs__dropdown-option--highlight) {
  background-color: #800000 !important;
  color: #fff !important;
}

:deep(.vs__clear) {
  color: #800000 !important; /* Maroon color for close icon */
  font-size: 1.2rem; /* Adjust size if needed */
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
textarea:focus:not([readonly]):not([disabled]) {
  outline: none;
  border-color: #800000 !important;
  box-shadow: 0 0 5px rgba(128, 0, 0, 0.5);
}

/* Ensure focus and open state gets the glow effect */
:deep(.vs__dropdown-toggle:focus-within),
:deep(.vs__dropdown-toggle.vs--open) {
  outline: none;
  border-color: #800000 !important;
  box-shadow: 0 0 5px rgba(128, 0, 0, 0.5) !important; /* Glow effect */
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
/* Ensure uniform image size */
.group img {
  transition: transform 0.3s ease-in-out;
}
.group:hover img {
  transform: scale(1.05);
}

@media print {
  .print-hide {
    display: none !important;
  }
  /* Hide everything except the modal content */
  body * {
    visibility: hidden;
  }

  .modal-content,
  .modal-content * {
    visibility: visible;
    position: static !important; /* Ensure modal content is not constrained */
    height: auto !important; /* Ensure full height */
    max-height: none !important; /* Remove max-height constraints */
    overflow: visible !important; /* Ensure no content is clipped */
    overflow-y: auto; /* Allow scrolling on small screens */
  }
  .modal-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    box-shadow: none; /* Remove any shadows for printing */
  }

  /* Hide buttons and other unnecessary elements */
  button {
    display: none;
  }

  /* Add a footer for the printed page */
  .print-footer {
    display: block;
    text-align: center;
    margin-top: 20px;
    font-size: 12px;
    color: #666;
  }
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
</style>
