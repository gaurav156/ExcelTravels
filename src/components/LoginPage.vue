<template>
  <div
    style="background-color: #f5f5dc"
    class="p-8 rounded-lg shadow-xl border-2 border-maroon max-w-lg mx-auto transform transition duration-300 hover:shadow-2xl relative"
  >
    <!-- Login Icon -->
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
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
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
    <h2 class="text-3xl font-extrabold text-maroon text-center mb-6">Login</h2>

    <!-- Login Form -->
    <form
      @submit.prevent="handleLogin"
      class="bg-white p-6 rounded-lg shadow-md border border-gray-300"
    >
      <!-- Username -->
      <div class="mb-6">
        <label for="username" class="block text-sm font-medium text-maroon">
          Username
        </label>
        <input
          type="text"
          id="username"
          v-model="loginForm.username"
          placeholder="Enter your username"
          class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
          required
        />
      </div>

      <!-- Password -->
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-maroon">
          Password
        </label>
        <input
          type="password"
          id="password"
          v-model="loginForm.password"
          placeholder="Enter your password"
          class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
          required
        />
      </div>

      <!-- Forgot Password -->
      <div class="mb-6 text-right">
        <a
          href="#"
          class="text-sm text-maroon hover:underline"
          @click.prevent="showForgotPasswordModal"
        >
          Forgot Password?
        </a>
      </div>

      <!-- Change Password (Only for Super Admin) -->
      <!-- <div class="mb-6 text-right" v-if="isSuperAdmin"> -->
      <div class="mb-6 text-right">
        <a
          href="#"
          class="text-sm text-maroon hover:underline"
          @click.prevent="showChangePasswordModal"
        >
          Change Password
        </a>
      </div>

      <!-- Submit Button -->
      <div class="mt-6">
        <button
          type="submit"
          class="w-full bg-maroon text-white px-4 py-3 rounded-md text-lg font-semibold shadow-md transition duration-300 hover:bg-maroon-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2"
        >
          Login
        </button>
      </div>
    </form>

    <!-- Forgot Password Modal -->
    <div
      v-if="isForgotPasswordModalVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-md border border-gray-300 w-96"
      >
        <h3 class="text-xl font-bold text-maroon mb-4">Forgot Password</h3>

        <p class="text-sm text-gray-600 mb-4">
          An OTP will be sent to your registered email.
        </p>
        <input
          v-model="email"
          class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon mb-4"
          required
          readonly
        />
        <div class="flex justify-end">
          <button
            @click="sendOTP"
            class="bg-maroon text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md transition duration-300 hover:bg-maroon-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2"
          >
            Send OTP
          </button>
          <button
            @click="hideForgotPasswordModal"
            class="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md transition duration-300 hover:bg-gray-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- OTP Modal -->
    <div
      v-if="isOTPModalVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-md border border-gray-300 w-96"
      >
        <h3 class="text-xl font-bold text-maroon mb-4">Enter OTP</h3>
        <p class="text-sm text-gray-600 mb-4">
          An OTP has been sent to your email.
        </p>
        <div class="flex justify-between mb-4">
          <input
            v-for="i in 6"
            :key="i"
            type="text"
            v-model="otp[i - 1]"
            maxlength="1"
            class="w-12 h-12 text-center border border-gray-400 rounded-md shadow-sm focus:ring-maroon focus:border-maroon"
          />
        </div>
        <div class="flex justify-end">
          <button
            @click="verifyOTP"
            class="bg-maroon text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md transition duration-300 hover:bg-maroon-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2"
          >
            Verify OTP
          </button>
          <button
            @click="hideOTPModal"
            class="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md transition duration-300 hover:bg-gray-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div
      v-if="isChangePasswordModalVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-md border border-gray-300 w-96"
      >
        <h3 class="text-xl font-bold text-maroon mb-4">Change Password</h3>
        <div class="mb-4">
          <label
            for="newPassword"
            class="block text-sm font-medium text-maroon"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            v-model="newPassword"
            placeholder="Enter new password"
            class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
            required
          />
        </div>
        <div class="mb-4">
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-maroon"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="Confirm new password"
            class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
            required
          />
        </div>
        <div class="flex justify-end">
          <button
            @click="changePassword"
            class="bg-maroon text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md transition duration-300 hover:bg-maroon-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2"
          >
            Change Password
          </button>
          <button
            @click="hideChangePasswordModal"
            class="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md transition duration-300 hover:bg-gray-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "excel.travel@rediffmail.com",
      loginForm: {
        username: "",
        password: "",
      },
      forgotPasswordEmail: "excel.travel@rediffmail.com",
      otp: Array(6).fill(""),
      isForgotPasswordModalVisible: false,
      isOTPModalVisible: false,
      isChangePasswordModalVisible: false,
      newPassword: "",
      confirmPassword: "",
      userRoles: {
        superAdmin: { password: "superadmin123", canResetPassword: true },
        admin: { password: "admin123", canResetPassword: false },
        officer: { password: "officer123", canResetPassword: false },
      },
    };
  },
  computed: {
    isSuperAdmin() {
      return this.loginForm.password === this.userRoles.superAdmin.password;
    },
  },
  methods: {
    ...mapActions(["login", "sendOTP", "verifyOTP"]),
    async handleLogin() {
      const { password } = this.loginForm;
      const role = Object.keys(this.userRoles).find(
        (key) => this.userRoles[key].password === password
      );

      if (role) {
        Swal.fire({
          title: "Success!",
          text: `Logged in as ${role}.`,
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        this.$router.push("/dashboard");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Invalid username or password.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    },
    showForgotPasswordModal() {
      this.isForgotPasswordModalVisible = true;
    },
    hideForgotPasswordModal() {
      this.isForgotPasswordModalVisible = false;
    },
    showChangePasswordModal() {
      this.isChangePasswordModalVisible = true;
    },
    hideChangePasswordModal() {
      this.isChangePasswordModalVisible = false;
    },
    async sendOTP() {
      try {
        await this.sendOTP(this.forgotPasswordEmail);
        this.hideForgotPasswordModal();
        this.isOTPModalVisible = true;
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to send OTP. Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    },
    async verifyOTP() {
      const enteredOTP = this.otp.join("");
      try {
        await this.verifyOTP({
          email: this.forgotPasswordEmail,
          otp: enteredOTP,
        });
        Swal.fire({
          title: "Success!",
          text: "OTP verified successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        this.hideOTPModal();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Invalid OTP. Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    },
    hideOTPModal() {
      this.isOTPModalVisible = false;
    },
    async changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        Swal.fire({
          title: "Error!",
          text: "Passwords do not match.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        return;
      }

      try {
        // Add your logic to change the password here
        // For example, you might call an API to update the password
        Swal.fire({
          title: "Success!",
          text: "Password changed successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        this.hideChangePasswordModal();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to change password. Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
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
  border-color: #800000;
  box-shadow: 0 0 10px rgba(128, 0, 0, 0.8);
}
</style>
