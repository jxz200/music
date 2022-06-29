import axios from "axios";
import { ElMessage } from "element-plus";

enum MessageType {}

const $http = axios.create({
  baseURL: "http://localhost:3000",
});

$http.interceptors.response.use((res) => {
  const code: number = res.data?.code;
  if (code !== 200) {
     ElMessage({
      message: "request scessfully",
      type: "success",
    });
  }else{
    ElMessage({
      message: "request failed",
      type: "error",
    });
  }
  
  return res;
});

export default $http;
