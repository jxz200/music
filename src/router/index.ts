import { createRouter, createWebHistory, Router } from "vue-router";
import Home from "../view/home.vue";
import { Component } from "vue";

interface IRoutes {
  path: string;
  name: string;
  component: Component;
  alias?: string;
}
const routes: Array<IRoutes> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  //   {
  //     path: "/home",
  //     name: ''
  //   }
];
const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
