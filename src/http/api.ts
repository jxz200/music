import $http from './index';

interface Ilogin {
  username: string;
  password: string;
}

const loginRequest = (data: Ilogin) => {
  return $http.post('/login', data);
};

const getMenus = () => {
  return $http.get('/menus');
};

const getRightsList = () => {
  return $http.get('/rights:tree');
}

const getRolesList = () => {
  return $http.get('/roles');
};

export { loginRequest, getMenus, getRightsList, getRolesList };
