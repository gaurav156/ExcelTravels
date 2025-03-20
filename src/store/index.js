import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
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
    async verifyOTP({ commit, state }, otp) {
      try {
        const response = await axios.post("/api/verify-otp", {
          email: state.email,
          otp,
        });
        if (response.data.success) {
          return true;
        }
      } catch (error) {
        console.error("OTP verification failed:", error);
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
