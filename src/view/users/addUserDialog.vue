<script setup lang="ts">
import { ref } from 'vue';
import { addUser } from '../../http/users';
import XButton from '../../components/XButton.vue';

const dialogVisible = ref(false);
// 显示对话框
const showDialogue = () => {
  resetFields();
  dialogVisible.value = true;
};
// 取消表单
const cancelAdd = () => {
  dialogVisible.value = false;
};

const username = ref('');
const password = ref('');
const email = ref('');
const mobile = ref('');
// 重置表单
const resetFields = () => {
  username.value = '';
  password.value = '';
  email.value = '';
  mobile.value = '';
};
const emit = defineEmits(['updateUserList']);

// 提交表单
const submitAdd = async () => {
  await addUser({
    username: username.value,
    password: password.value,
    email: email.value,
    mobile: mobile.value,
  });
  emit('updateUserList');
  cancelAdd();
};

defineExpose({ showDialogue });
</script>

<template>
  <el-dialog v-model="dialogVisible" title="新增用户" width="40%">
    <el-form>
      <el-form-item label="用户" prop="username">
        <el-input v-model="username" type="text"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="password">
        <el-input v-model="email" type="password"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="password">
        <el-input v-model="mobile" type="password"></el-input>
      </el-form-item>
    </el-form>
    <div class="flex justify-center">
      <XButton class="bg-gray-400 mr-4" @click="dialogVisible = false">取 消</XButton>
      <XButton class="bg-blue-400" @click="submitAdd">确 定</XButton>
    </div>
  </el-dialog>
</template>
