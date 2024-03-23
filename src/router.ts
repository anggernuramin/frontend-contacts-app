import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/about",
      component: () => import("./views/About.vue"),
    },
    {
      path: "/contacts",
      component: () => import("./views/Contact.vue"),
    },
    {
      path: "/contacts/cli",
      component: () => import("./views/Cli.vue"),
    },
    {
      path: "/contact/add",
      component: () => import("./views/AddContact.vue"),
    },
    {
      path: "/contact/search",
      name: "SearchContact",
      component: () => import("./views/Contact.vue"),
    },
    {
      path: "/contact/update/:id",
      component: () => import("./views/updateContact.vue"),
    },
    {
      path: "/contacts/:id",
      component: () => import("./views/DetailContact.vue"),
    },
    {
      path: "/about",
      component: () => import("./views/About.vue"),
    },

    {
      path: "/:pathMatch(.*)*",
      component: () => import("./views/NotFound.vue"),
    },
  ],
});
