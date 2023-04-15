import { createWebHistory, createRouter } from "vue-router";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  strict: true, 
});

export default router;
