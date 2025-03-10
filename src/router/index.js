import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import DutySlipForm from "../components/DutySlipForm.vue";
import DriverDetails from "../components/DriverDetails.vue";
import CompanyDetails from "../components/CompanyDetails.vue";
import EditData from "../components/EditData.vue";
import ViewSlip from "../components/ViewSlip.vue";
import ViewDriver from "../components/ViewDriver.vue";
import ViewCompany from "../components/ViewCompany.vue";

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
        children: [
          {
            path: "viewslip",
            component: ViewSlip,
          },
          {
            path: "viewdriver",
            component: ViewDriver,
          },
          {
            path: "viewcompany",
            component: ViewCompany,
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
