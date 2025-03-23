import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"; // Import the Vuex store

createApp(App)
  .use(router) // Use the router
  .use(store) // Use the Vuex store
  .mount("#app");
