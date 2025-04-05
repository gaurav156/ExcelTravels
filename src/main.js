import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import clickOutside from './directives/clickOutside';

// Function to restore both token and user data
const initializeAuth = async () => {
  const token = sessionStorage.getItem("token");

  let user = null;
  try {
    user = JSON.parse(sessionStorage.getItem("user"));
  } catch (e) {
    console.error("Failed to parse user data", e);
    sessionStorage.removeItem("user");
  }

  if (token) {
    store.commit("SET_TOKEN", token);
    
    // Only restore user data if it exists
    if (user) {
      store.commit("SET_USER", user);
    } else {
      // Optional: Fetch fresh user data if needed
      try {
        await store.dispatch("fetchUser"); // API call to /me or /user
      } catch (error) {
        console.error("Failed to fetch user", error);
        sessionStorage.removeItem("token"); // Clear invalid token
        store.commit("CLEAR_TOKEN");
      }
    }
  }
};

// Initialize auth state before mounting the app
initializeAuth();

// Create and mount the app
createApp(App)
  .use(router)
  .use(store)
  .directive('click-outside', clickOutside)
  .mount("#app");