import $http from './index';

const getRolesById = (id: number) => {
  return $http.get(`/roles/${id}`);
};

const getRolesList = () => {
  return $http.get('/roles');
};

interface Idata {
  roleName: string;
  roleDesc?: string;
}
const addRoles = (data: Idata) => {
  return $http.post('/roles', data);
};

const deleteRoles = (id: number) => {
  return $http.delete(`/roles/${id}`);
};

const distributeAuthority = (roleId: number, rids: string) => {
  return $http.post(`/roles/${roleId}/rights`, { rids });
};

const getRightsList = () => {
  return $http.get('/rights/tree');
};

export { getRolesById, getRolesList, addRoles, distributeAuthority, getRightsList, deleteRoles };
