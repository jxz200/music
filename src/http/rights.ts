import $http from './index';

const getRightsList = () => {
  return $http.get('/rights/list');
};

export { getRightsList };
