import * as VueRouter from "vue-router";
import store from "./store";

const Homepage = () => import("./pages/Homepage");
const ApartmentPage = () => import("./pages/Apartment");
const ErrorPage = () => import("./pages/ErrorPage");
const LoginPage = () => import("./pages/Login");
const RegistrationPage = () => import("./pages/Registration");
const MyOrdersPage = () => import("./pages/MyOrders");

const routes = [
  {
    path: "/",
    component: Homepage,
    name: "homepage",
  },
  {
    path: "/apartments/:id",
    component: ApartmentPage,
    name: "apartment",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/my-orders",
    component: MyOrdersPage,
    name: "my-orders",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    component: LoginPage,
    name: "login-page",
    meta: {
      hideForAuth: true,
    },
  },
  {
    path: "/registration",
    component: RegistrationPage,
    name: "registration-page",
    meta: {
      hideForAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: ErrorPage,
    name: "errorpage",
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const isLoggedIn = store.getters["auth/isLoggedIn"];

  if (to.meta.requiresAuth && !isLoggedIn && to.name !== "login-page")
    return { name: "login-page" };
  if (to.meta.hideForAuth && isLoggedIn) return { name: "homepage" };
});

export default router;
