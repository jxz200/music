import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import { Component, nextTick } from 'vue';
import { useMenusStore } from '../store/menus';
import { routes, routesMap } from './route';
import { IRightsInfo } from '../types/roles';

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

let hasRoles = true;
// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.name === 'login') return next();
  if (!localStorage.getItem('token')) next('/login');
  const { rightsInfo } = useMenusStore();

  if (hasRoles) {
    initDanamicRoutes();
    hasRoles = false;
    next({ ...to, replace: true });
  } else {
    next();
  }
});

// 生成动态路由
export function initDanamicRoutes() {
  const { rightsInfo: rights } = useMenusStore();

  // const rights = JSON.parse(sessionStorage.getItem('rightsList')!);
  // const rights = rightsInfo;
  if (!rights) return;
  for (const item of rights!) {
    for (const subItem of item.children!) {
      const curRoute = routesMap.get(subItem.path);
      curRoute!.meta = { rights: subItem.children };
      router.addRoute('home', curRoute!);
    }
  }
  console.log(router.getRoutes());
}
export default router;
