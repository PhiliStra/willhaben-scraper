import { createRouter, createWebHistory } from "vue-router";
import WillhabenHome from "../views/WillhabenHome.vue";
import WillhabenUpdate from "../views/WillhabenUpdate.vue";

const routes = [
  {
    path: "/",
    name: "WillhabenHome",
    component: WillhabenHome,
  },
  {
    path: "/update",
    name: "WillhabenUpdate",
    component: WillhabenUpdate,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () =>
    //import(/* webpackChunkName: "about" */ "../views/Update.vue"),
  },
  {
    path: "/chart",
    name: "WillhabenChart",
    // component: Update,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/WillhabenChart.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
