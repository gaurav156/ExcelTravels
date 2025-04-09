<template>
  <head>
    <!-- Other meta tags -->
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
      rel="stylesheet"
    />
  </head>
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
        excel.travel@rediffmail.com
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
          v-model.trim="loginForm.username"
          @input="loginForm.username = loginForm.username.toLowerCase()"
          placeholder="Enter your username"
          autocomplete="off"
          class="focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
          required
        />
      </div>

      <!-- Password -->
      <div class="mb-6 relative">
        <label for="password" class="block text-sm font-medium text-maroon">
          Password
        </label>
        <div class="relative">
          <input
            :type="passwordVisibility.login ? 'text' : 'password'"
            id="password"
            v-model="loginForm.password"
            placeholder="Enter your password"
            class="hide-password-toggle focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
            required
          />
          <button
            type="button"
            @click="passwordVisibility.login = !passwordVisibility.login"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-maroon"
            aria-label="Toggle password visibility"
          >
            <span
              v-if="passwordVisibility.login"
              class="material-icons-outlined text-base"
              >visibility_off</span
            >
            <span v-else class="material-icons-outlined text-base"
              >visibility</span
            >
          </button>
        </div>
      </div>

      <!-- Forgot Password -->
      <div class="mb-3 text-right">
        <a
          href="#"
          class="text-sm text-maroon hover:underline"
          @click.prevent="showRoleSelectionModal"
        >
          Forgot Password?
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

    <!-- Role Selection Modal -->
    <div
      v-if="isRoleSelectionModalVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-md border border-gray-300 w-96"
      >
        <h3 class="text-xl font-bold text-maroon mb-4">Reset Password For</h3>

        <p class="text-sm text-gray-600 mb-4">
          Select the role for which you want to reset the password:
        </p>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <button
            @click="selectRole('admin')"
            class="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-maroon"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-maroon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span class="mt-2 font-medium">Admin</span>
          </button>

          <button
            @click="selectRole('officer')"
            class="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-maroon"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-maroon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="mt-2 font-medium">Officer</span>
          </button>
        </div>

        <div class="flex justify-end">
          <button
            @click="hideRoleSelectionModal"
            class="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md transition duration-300 hover:bg-gray-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Forgot Password Modal -->
    <div
      v-if="isForgotPasswordModalVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-md border border-gray-300 w-96"
      >
        <h3 class="text-xl font-bold text-maroon mb-4">Forgot Password</h3>

        <p class="text-sm text-gray-600 mb-2">
          An OTP will be sent to the {{ selectedRole }}'s registered email:
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
            :disabled="isLoading"
            class="bg-maroon text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md transition duration-300 hover:bg-maroon-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2"
          >
            {{ isLoading ? "Sending..." : "Send OTP" }}
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
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-md border border-gray-300 w-96"
      >
        <h3 class="text-xl font-bold text-maroon mb-4">Enter OTP</h3>
        <p class="text-sm text-gray-600 mb-4">
          An OTP has been sent to your email ({{ email }}).
        </p>
        <div class="otp-inputs mb-6 flex justify-center items-center">
          <input
            v-for="(digit, index) in otp"
            :key="index"
            v-model="otp[index]"
            ref="otpInputs"
            type="text"
            maxlength="1"
            @input="handleInput(index, $event)"
            @keydown.backspace="handleBackspace(index, $event)"
            @paste="handlePaste"
          />
        </div>
        <div class="flex justify-end">
          <button
            @click="verifyOTPForPasswordReset"
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
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-md border border-gray-300 w-96"
      >
        <h3 class="text-xl font-bold text-maroon mb-4">Change Password</h3>

        <!-- New Password Field in Change Password Modal -->
        <div class="mb-4 relative">
          <label
            for="newPassword"
            class="block text-sm font-medium text-maroon"
          >
            New Password
          </label>
          <div class="relative">
            <input
              :type="passwordVisibility.new ? 'text' : 'password'"
              id="newPassword"
              v-model="newPassword"
              placeholder="Enter new password"
              class="hide-password-toggle focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            />
            <button
              type="button"
              @click="passwordVisibility.new = !passwordVisibility.new"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-maroon"
              aria-label="Toggle new password visibility"
            >
              <span
                v-if="passwordVisibility.new"
                class="material-icons-outlined text-base"
                >visibility_off</span
              >
              <span v-else class="material-icons-outlined text-base"
                >visibility</span
              >
            </button>
          </div>
        </div>

        <!-- Confirm Password Field in Change Password Modal -->
        <div class="mb-4 relative">
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-maroon"
          >
            Confirm Password
          </label>
          <div class="relative">
            <input
              :type="passwordVisibility.confirm ? 'text' : 'password'"
              id="confirmPassword"
              v-model="confirmPassword"
              placeholder="Confirm new password"
              class="hide-password-toggle focus:ring-[#800000] focus:outline-none mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-gray-50 focus:ring-maroon focus:border-maroon"
              required
            />
            <button
              type="button"
              @click="passwordVisibility.confirm = !passwordVisibility.confirm"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-maroon"
              aria-label="Toggle confirm password visibility"
            >
              <span
                v-if="passwordVisibility.confirm"
                class="material-icons-outlined text-base"
                >visibility_off</span
              >
              <span v-else class="material-icons-outlined text-base"
                >visibility</span
              >
            </button>
          </div>
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
import { mapActions } from "vuex";
import Swal from "sweetalert2";
import api from "@/utils/api";

export default {
  name: "LoginForm",
  props: {
    isModalOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      email: "phatakjanita@gmail.com",
      loginForm: {
        username: "",
        password: "",
      },
      passwordVisibility: {
        login: false,
        new: false,
        confirm: false,
      },

      showConfirmPassword: false,
      otp: Array.from({ length: 6 }, () => ""),
      isRoleSelectionModalVisible: false,
      isForgotPasswordModalVisible: false,
      isOTPModalVisible: false,
      isChangePasswordModalVisible: false,
      newPassword: "",
      confirmPassword: "",
      isLoading: false,
      selectedRole: null,
      userRoles: {
        superAdmin: {
          password: "superadmin123",
          canResetPassword: true,
          canChangeOthersPassword: true,
        },
        admin: {
          password: "admin123",
          canResetPassword: false,
          canChangeOthersPassword: false,
        },
        officer: {
          password: "officer123",
          canResetPassword: false,
          canChangeOthersPassword: false,
        },
      },
    };
  },
  methods: {
    ...mapActions(["login", "setUser"]),

    async handleLogin() {
      if (!this.loginForm.username || !this.loginForm.password) {
        this.showError("Please enter both username and password");
        return;
      }

      this.isLoading = true;

      try {
        const response = await api.post("/auth/login", this.loginForm);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        this.$store.commit("SET_USER", response.data.user);
        this.$store.commit("SET_TOKEN", response.data.token);

        this.showSuccess(`Welcome ${response.data.user.username}!`);
        this.$router.replace("/dutyslip");
        this.$store.commit("SET_DROPDOWN_STATE", false);
      } catch (error) {
        const message = error.response?.data?.message || "Login failed";
        this.showError(message);
      } finally {
        this.isLoading = false;
      }
    },

    showRoleSelectionModal() {
      this.isRoleSelectionModalVisible = true;
    },

    hideRoleSelectionModal() {
      this.isRoleSelectionModalVisible = false;
    },

    async selectRole(role) {
      this.selectedRole = role;
      this.isLoading = true;

      try {
        // Fetch the email for the selected role
        const response = await api.get(`/auth/get-role-email/${role}`);
        this.email = response.data.email; // Update the email with the fetched value

        this.hideRoleSelectionModal();
        this.showForgotPasswordModal();
      } catch (error) {
        const message =
          error.response?.data?.message ||
          "Failed to fetch email for this role";
        this.showError(message);
        this.hideRoleSelectionModal();
      } finally {
        this.isLoading = false;
      }
    },

    showForgotPasswordModal() {
      this.isForgotPasswordModalVisible = true;
      if (!this.email) {
        this.showError("No email associated with this account");
        return;
      }
      this.isForgotPasswordModalVisible = true;
    },

    hideForgotPasswordModal() {
      this.isForgotPasswordModalVisible = false;
      this.selectedRole = null;
    },

    async sendOTP() {
      if (!this.email) {
        this.showError("Please enter your email address");
        return;
      }

      this.isLoading = true;

      try {
        const endpoint = this.selectedRole
          ? `/auth/send-otp/${this.selectedRole}`
          : "/auth/send-otp";

        await api.post(endpoint, { email: this.email });
        // this.showSuccess("OTP sent to your email");
        this.isForgotPasswordModalVisible = false;
        this.isOTPModalVisible = true;
      } catch (error) {
        const message = error.response?.data?.message || "Failed to send OTP";
        this.showError(message);
      } finally {
        this.isLoading = false;
      }
    },

    hideOTPModal() {
      this.isOTPModalVisible = false;
      this.otp = Array(6).fill("");
    },

    handleInput(index, event) {
      const value = event.target.value;
      if (/\d/.test(value)) {
        this.otp[index] = value;
        if (index < this.otp.length - 1) {
          this.$refs.otpInputs[index + 1].focus();
        }
      } else {
        this.otp[index] = "";
      }
    },
    handleBackspace(index) {
      if (!this.otp[index] && index > 0) {
        this.$refs.otpInputs[index - 1].focus();
      }
    },
    handlePaste(event) {
      event.preventDefault();
      const pastedData = event.clipboardData
        .getData("text")
        .slice(0, 6)
        .split("");
      pastedData.forEach((char, i) => {
        if (i < this.otp.length) {
          this.otp[i] = char;
        }
      });
      this.$nextTick(() => {
        const nextEmptyIndex = this.otp.findIndex((val) => val === "");
        if (nextEmptyIndex !== -1) {
          this.$refs.otpInputs[nextEmptyIndex].focus();
        }
      });
    },

    async verifyOTPForPasswordReset() {
      if (this.otp.some((digit) => !digit)) {
        this.showError("Please enter complete OTP");
        return;
      }

      this.isLoading = true;

      try {
        const endpoint = this.selectedRole
          ? `/auth/verify-otp/${this.selectedRole}`
          : "/auth/verify-otp";

        await api.post(endpoint, {
          email: this.email,
          otp: this.otp.join(""),
        });

        this.showSuccess("OTP verified successfully");
        this.isOTPModalVisible = false;
        this.isChangePasswordModalVisible = true;
      } catch (error) {
        const message = error.response?.data?.message || "Invalid OTP";
        this.showError(message);
      } finally {
        this.isLoading = false;
      }
    },

    hideChangePasswordModal() {
      this.isChangePasswordModalVisible = false;
      this.newPassword = "";
      this.confirmPassword = "";
      // Reset visibility states
      this.passwordVisibility.new = false;
      this.passwordVisibility.confirm = false;
    },

    async changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.showError("Passwords do not match");
        return;
      }

      if (this.newPassword.length < 8) {
        this.showError("Password must be at least 8 characters");
        return;
      }

      this.isLoading = true;

      try {
        const endpoint = this.selectedRole
          ? `/auth/change-password/${this.selectedRole}`
          : "/auth/change-password";

        await api.post(endpoint, {
          email: this.email,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword,
          isReset: true,
        });

        this.showSuccess("Password changed successfully");
        this.resetPasswordForms();
      } catch (error) {
        const message =
          error.response?.data?.message || "Failed to change password";
        this.showError(message);
      } finally {
        this.isLoading = false;
      }
    },

    resetPasswordForms() {
      this.newPassword = "";
      this.confirmPassword = "";
      this.otp = Array(6).fill("");
      this.selectedRole = null;
      this.isChangePasswordModalVisible = false;
    },

    showSuccess(message) {
      Swal.fire({
        title: "Success!",
        text: message,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    },

    showError(message) {
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
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
.otp-inputs input {
  width: 40px;
  height: 40px;
  text-align: center;
  margin: 5px;
  font-size: 20px;
}
/* Responsive styles for small screens */
@media (max-width: 480px) {
  .otp-inputs {
    display: flex;
    justify-content: center;
    gap: 3px;
    margin-bottom: 15px;
  }

  .otp-inputs input {
    width: 35px;
    height: 35px;
    font-size: 18px;
    margin: 3px;
  }
}

/* Hide default password toggle in all browsers */
input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear,
input[type="password"]::-webkit-contacts-auto-fill-button,
input[type="password"]::-webkit-credentials-auto-fill-button {
  display: none !important;
  visibility: hidden !important;
  pointer-events: none !important;
  position: absolute;
  right: -9999px;
}

/* For Edge specifically */
input::-ms-reveal {
  display: none;
}

/* For Chrome/Safari */
input::-webkit-credentials-auto-fill-button {
  display: none !important;
  visibility: hidden !important;
  pointer-events: none !important;
}

/* .hide-password-toggle::-ms-reveal,
.hide-password-toggle::-ms-clear,
.hide-password-toggle::-webkit-contacts-auto-fill-button,
.hide-password-toggle::-webkit-credentials-auto-fill-button {
  display: none !important;
  visibility: hidden !important;
  pointer-events: none !important;
  position: absolute;
  right: -9999px;
} */
</style>
