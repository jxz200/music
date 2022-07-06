import $http from './index';

const getUserList = (query: string, pagenum: number, pagesize: number) => {
  return $http.get(`/users?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`);
};

interface Iuser {
  username: string;
  password: string;
  email?: string;
  mobile?: string;
}
const addUser = (userInfo: Iuser) => {
  return $http.post('/users', userInfo);
};

const changeUserState = (userId: number, mg_state: boolean) => {
  return $http.put(`/users/${userId}/state/${mg_state}`);
};

const deleteUser = (id: number) => {
  return $http.delete(`/users/${id}`);
};

const getUserById = (id: number) => {
  return $http.get(`/users/${id}`);
};

const editUser = (data: any) => {
  return $http.put('/users', data);
};

const assignRoles = (userId: number, rid: number) => {
  return $http.put(`/users/${userId}/role`, { rid });
};

export { getUserList, addUser, deleteUser, getUserById, editUser, assignRoles, changeUserState };
