import { createWebHistory, createRouter } from "vue-router";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
  {
    name: "Index",
    path: "/index",
    component: () => import("@/views/Layout/Index.vue"),
  },
  {
    name: "Home",
    path: "/home",
    component: () => import("@/views/Layout/Home.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  strict: true,
});

router.beforeEach(function (to, from) {
  if (to.path !== "/login" && !cookies.get("sign")) {
    router.push("/login");
  } else if (to.path === "/login" && cookies.get("sign")) {
    if (from.path === "/") {
      router.push("/index");
    } else {
      router.push(from.path);
    }
  }
});

export default router;
