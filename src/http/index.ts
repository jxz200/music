import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';

const $http = axios.create({
  baseURL: 'https://shop-2064130-1312774387.ap-shanghai.run.tcloudbase.com/api/private/v1/',
});
//  baseURL: 'http://175.27.228.178:3434/api/private/v1/', 别人的
// https://shoping-4g580wyf7b21b684-1308088731.ap-shanghai.app.tcloudbase.com/container-shop/api/private/v1/ 腾讯云
// https://shop-2064130-1312774387.ap-shanghai.run.tcloudbase.com/api/private/v1/  // 微信云
$http.interceptors.request.use((config) => {
  if (!config.headers) return config;
  config.headers.Authorization = localStorage.getItem('token') as string;
  return config;
});

$http.interceptors.response.use((res) => {
  const code: number = res.data?.meta.status;
  const msg: string = res.data?.meta.msg;
  if (code !== 200 && code !== 201) {
    return ElMessage({
      message: `${msg}`,
      type: 'error',
    });
  }
  ElMessage({
    message: `${msg}`,
    type: 'success',
  });
  return res;
});

export default $http;
