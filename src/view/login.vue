<template>
  <div class="w-screen h-screen grid place-items-center bg-sky-300">
    <div class="w-2/5 h-72 grid place-items-center bg-white rounded-lg shadow-xl">
      <div class="w-full px-12">
        <div class="flex items-center justify-center relative mb-8">
          <svg viewBox="0 0 248 31" class="text-slate-900 dark:text-white w-auto h-9 translate-x-16">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
              fill="#38bdf8"
            ></path>
          </svg>
          <h1 class="text-center text-4xl text-sky-400 absolute left-64">登录</h1>
        </div>

        <el-form ref="FormRef" :model="ruleForm" :rules="rules" class="mb-6">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password" class="ml-3"></el-input>
          </el-form-item>
        </el-form>
        <div class="flex justify-center">
          <Button class="bg-sky-400 hover:bg-sky-600 mr-4" @click="submitForm(FormRef, login)">登录</Button>
          <Button class="bg-gray-400 hover:bg-gray-600" @click="resetForm(FormRef)">重置</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { FormRules } from 'element-plus';
import { useRouter } from 'vue-router';
import { loginRequest } from '../http/api';
import useForm from '../hooks/useForm';
import { useUserStore } from '../store/user';
import { useMenusStore } from '../store/menus';
import { initDanamicRoutes } from '../router';

const router = useRouter();

// 提交重置表单
const { FormRef, submitForm, resetForm } = useForm();

// 存储权限信息
const { updateMenus } = useMenusStore();

// 存储用户信息
const { setUserInfo } = useUserStore();

// 规则校验
const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' },
  ],
};

// 登录
interface ILogin {
  username: string;
  password: string;
}
const ruleForm = reactive<ILogin>({
  username: 'admin',
  password: '123456',
});
const login = async () => {
  const { data: result } = await loginRequest(ruleForm); // 发送登录请求
  result.data.token && localStorage.setItem('token', result.data.token); // 存储token到localStorage

  // setUserInfo(result.data); // 获取用户信息并存储

  await updateMenus(); // 获取并存储权限信息
  initDanamicRoutes(); // 开启动态路由
  console.log('hahha');

  router.push('/home'); // 跳转至主页
  console.log('hahhdsadsa');
};
</script>
