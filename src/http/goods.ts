import $http from './index';

const getGoodsList = (pagenum: number, pagesize: number) => {
  return $http.get(`/goods?pagenum=${pagenum}&pagesize=${pagesize}`);
};

const getOrdersList = (pagenum: number, pagesize: number) => {
  return $http.get(`/orders?pagenum=${pagenum}&pagesize=${pagesize}`);
};

const getCategories = (pagenum: number, pagesize: number) => {
  return $http.get(`/categories?pagenum=${pagenum}&pagesize=${pagesize}`);
};

export { getGoodsList, getOrdersList, getCategories };
