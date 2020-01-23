import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/plan",
    name: "plan",
    component: () =>
      import(/* webpackChunkName: "plan" */ "../views/PlanDetails.vue")
  },
  {
    path: "/view",
    name: "view",
    component: () =>
      import(/* webpackChunkName: "view" */ "../views/ViewPlan.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
