import { createRouter, createWebHistory } from "vue-router";
import WillhabenHome from "../views/WillhabenHome";

const routes = [
  {
    path: "/",
    name: "WillhabenHome",
    component: WillhabenHome,
  },
  {
    path: "/scraper",
    name: "WillhabenLinkScraper",
    component: () => import("../views/WillhabenLinkScraper.vue"),
  },
  {
    path: "/chart",
    name: "WillhabenChart",
    component: () => import("../views/WillhabenChart.vue"),
  },
];

const router = createRouter({
  scrollBehavior(to) {
    if (to.hash) {
      // BEFORE:
      // return { selector: to.hash }

      return { el: to.hash };
    } else {
      return { top: 0 };
    }
  },
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
