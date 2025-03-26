import { createStore } from "vuex";
import api from "@/utils/api";

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
    CLEAR_USER(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    CLEAR_TOKEN(state) {
      state.token = null;
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
        const response = await api.post("/auth/login", { username, password });
        commit("SET_USER", response.data.user);
        commit("SET_TOKEN", response.data.token);
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    async sendOTP({ commit }, email) {
      try {
        await api.post("/auth/send-otp", { email });
        commit("SET_EMAIL", email);
        commit("SET_OTP_SENT", true);
      } catch (error) {
        console.error("OTP sending failed:", error);
      }
    },
    async verifyOTP({ state }, otp) {
      try {
        // Make the API call
        const response = await api.post("/auth/verify-otp", {
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
        await api.post("/auth/change-password", {
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
    // Async action to fetch user data
    async fetchUser({ commit, state }) {
      try {
        // Call your API (uses the stored token)
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        
        // Update Vuex state
        commit('SET_USER', response.data);
        
        // Optional: Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        
        return response.data; // Return data for optional chaining
      } catch (error) {
        console.error('Failed to fetch user:', error);
        
        // Clear invalid token on failure (e.g., expired)
        localStorage.removeItem('token');
        commit("CLEAR_TOKEN");
        throw error; // Re-throw for error handling in components
      }
    },
  },
});