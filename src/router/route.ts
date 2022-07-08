import { RouteRecordRaw } from 'vue-router';
const users: RouteRecordRaw = {
  path: 'users',
  name: 'users',
  component: () => import('../view/users/index.vue'),
};
const roles: RouteRecordRaw = {
  path: 'roles',
  name: 'roles',
  component: () => import('../view/roles/index.vue'),
};

const rights: RouteRecordRaw = {
  path: 'rights',
  name: 'rights',
  component: () => import('../view/rights/index.vue'),
};

const reports: RouteRecordRaw = {
  path: 'reports',
  name: 'reports',
  component: () => import('../view/reports/index.vue'),
};

const goods: RouteRecordRaw = {
  path: 'goods',
  name: 'goods',
  component: () => import('../view/goods/index.vue'),
};

const categories: RouteRecordRaw = {
  path: 'categories',
  name: 'categories',
  component: () => import('../view/categories/index.vue'),
};

const orders: RouteRecordRaw = {
  path: 'orders',
  name: 'orders',
  component: () => import('../view/orders/index.vue'),
};

const params: RouteRecordRaw = {
  path: 'params',
  name: 'params',
  component: () => import('../view/params/index.vue'),
};

const routesMap = new Map([
  ['users', users],
  ['rights', rights],
  ['roles', roles],
  ['reports', reports],
  ['goods', goods],
  ['categories', categories],
  ['orders', orders],
  ['params', params],
]);

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../view/home.vue'),
    redirect: '/home/users',
    children: [],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../view/404.vue'),
  },
  // {
  //   path: '/:catchAll(.*)',
  //   redirect: '/404',
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import('../view/login.vue'),
  },
  {
    path: '/',
    redirect: '/login',
  },
];

export { routes, routesMap };
