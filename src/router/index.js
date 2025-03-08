import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue"; // Your home page component
import DutySlipForm from "../components/DutySlipForm.vue"; // DutySlipForm component
import DriverDetails from "../components/DriverDetails.vue"; // DriverDetails component
import CompanyDetails from "../components/CompanyDetails.vue"; // CompanyDetails component
import EditData from "../components/EditData.vue"; // EditData component

const routes = [
  {
    path: "/",
    component: HomePage,
    redirect: "/dutyslip",
    children: [
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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
