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

const routes = [
  {
    path: "/",
    component: HomePage,
    redirect: "/login",
    children: [
      {
        path: "login",
        component: LoginPage,
      },
      {
        path: "dutyslip",
        component: DutySlipForm,
      },
      {
        path: "driver",
        component: DriverDetails,
      },
      {
        path: "company",
        component: CompanyDetails,
      },
      {
        path: "records",
        component: EditData,
      },
      {
        path: "records/viewslip",
        component: ViewSlip,
      },
      {
        path: "records/viewdriver",
        component: ViewDriver,
      },
      {
        path: "records/viewcompany",
        component: ViewCompany,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Example: Log the route information (optional)
    console.log(`Navigating from ${from.path} to ${to.path}`);

    // Example: Use savedPosition to restore scroll position when navigating back
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
