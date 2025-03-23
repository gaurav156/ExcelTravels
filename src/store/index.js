import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: null,
    token: null,
    email: "",
    otpSent: false,
    otp: "",
    isAuthenticated: false,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = true;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_EMAIL(state, email) {
      state.email = email;
    },
    SET_OTP_SENT(state, status) {
      state.otpSent = status;
    },
    LOGOUT(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const response = await axios.post("/api/login", { username, password });
        commit("SET_USER", response.data.user);
        commit("SET_TOKEN", response.data.token);
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    async sendOTP({ commit }, email) {
      try {
        await axios.post("/api/send-otp", { email });
        commit("SET_EMAIL", email);
        commit("SET_OTP_SENT", true);
      } catch (error) {
        console.error("OTP sending failed:", error);
      }
    },
    async verifyOTP({ state }, otp) {
      try {
        // Make the API call
        const response = await axios.post("/api/verify-otp", {
          email: state.email,
          otp,
        });
  
        // Check if the OTP verification was successful
        if (response.data.success) {
          return true;
        } else {
          console.error("OTP verification failed:", response.data.message);
          return false;
        }
      } catch (error) {
        // Log the full error object for debugging
        console.error("OTP verification failed:", error);
  
        // Check if the error is due to a network issue
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Server responded with status:", error.response.status);
          console.error("Response data:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from the server");
        } else {
          // Something happened in setting up the request
          console.error("Error setting up the request:", error.message);
        }
  
        return false;
      }
    },
    async changePassword({ state }, newPassword) {
      try {
        await axios.post("/api/change-password", {
          email: state.email,
          newPassword,
        });
      } catch (error) {
        console.error("Password change failed:", error);
      }
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
  },
});