import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import DutySlipForm from "../components/forms/DutySlipForm.vue";
import DriverDetails from "../components/forms/DriverDetails.vue";
import CompanyDetails from "../components/forms/CompanyDetails.vue";
import EditData from "../views/EditData.vue";
import ViewSlip from "../views/view/ViewSlip.vue";
import ViewDriver from "../views/view/ViewDriver.vue";
import ViewCompany from "../views/view/ViewCompany.vue";
import LoginPage from "../components/LoginPage.vue";
import store from "../store"

const routes = [
  {
    path: "/",
    component: HomePage,
    redirect: "/login",
    children: [
      {
        path: "login",
        component: LoginPage,
        meta: { requiresAuth: false },
      },
      {
        path: "dutyslip",
        component: DutySlipForm,
        meta: { requiresAuth: true },
      },
      {
        path: "driver",
        component: DriverDetails,
        meta: { requiresAuth: true },
      },
      {
        path: "company",
        component: CompanyDetails,
        meta: { requiresAuth: true },
      },
      {
        path: "records",
        component: EditData,
        meta: { requiresAuth: true },
      },
      {
        path: "records/viewslip",
        component: ViewSlip,
        meta: { requiresAuth: true },
      },
      {
        path: "records/viewdriver",
        component: ViewDriver,
        meta: { requiresAuth: true },
      },
      {
        path: "records/viewcompany",
        component: ViewCompany,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Example: Use savedPosition to restore scroll position when navigating back
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.token !== null || localStorage.getItem('token');

  // Redirect authenticated users away from login page
  if (to.path === "/login" && isAuthenticated) {
    next("/dutyslip"); // Redirect to dashboard/home
    return;
  }

  // Protect authenticated routes
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
    return;
  }

  // Handle about:blank case
  if (from.path === '/dutyslip' && to.path === 'about:blank') {
    next(false); // Prevent navigation
    return;
  }

  next(); // Proceed normally
});

export default router;
