import { createRouter, createWebHistory } from "vue-router";
// import { useStore } from "vuex";
// const store = useStore();
import store from "../store";

const routes = [
  {
    path: "/",
    name: "mainPage",
    component: () => import("@/components/MainPage.vue"),
  },
  {
    path: "/myOrders",
    name: "myOrders",
    component: () => import("@/components/myOrders/MyOrders.vue"),
  },
  {
    path: "/orderDetails/:id",
    name: "orderDetails",
    component: () => import("@/components/myOrders/OrderDetails.vue"),
  },
  {
    path: "/mainCatalogMenu",
    name: "mainCatalogMenu",
    component: () => import("@/components/catalog/MainCatalogMenu.vue"),
  },
  {
    path: "/subMenu/:type",
    name: "subMenu",
    component: () => import("@/components/catalog/SubMenu.vue"),
  },
  {
    path: "/productView/:type/:product",
    name: "productView",
    component: () => import("@/components/catalog/ProductView.vue"),
  },
  {
    path: "/orderCart",
    name: "orderCart",
    component: () => import("@/components/OrderCart.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to, from) => {
  store.dispatch("savePreviousPath", from.fullPath);
});

export default router;
