<script setup lang="ts">
import { ref } from 'vue';
import XButton from '../../components/XButton.vue';
import { getRolesList } from '../../http/roles';
import { assignRoles } from '../../http/users';
import { IUserList } from '../../types/users';
const props = defineProps<{ currentUserInfo: IUserList }>();
const dialogVisible = ref(false);
const roleId = ref<number>();
interface IRoles {
  id: number;
  roleName: string;
  roleDesc: string;
  children?: IRoles[];
}
const options = ref<IRoles[]>([]);
// 更新角色列表
const updateRolesList = async () => {
  const { data } = await getRolesList();
  options.value = data.data;
};
// 显示对话框
const showDialogue = async () => {
  dialogVisible.value = true;
  updateRolesList();
};
// 取消表单
const hideDialogue = () => {
  dialogVisible.value = false;
};
// 提交表单
const submit = async () => {
  await assignRoles(props.currentUserInfo.id, roleId.value as number);
  emit('updateUserList'); // 更新父组件列表
  hideDialogue();
};
const emit = defineEmits(['updateUserList']);
defineExpose({ showDialogue });
</script>

<template>
  <el-dialog v-model="dialogVisible" title="分配角色" width="40%">
    <p>当前角色：{{ currentUserInfo.role_name }}</p>
    <div class="flex items-center my-4">
      <p>选择角色：</p>
      <el-select v-model="roleId" placeholder="Select">
        <el-option v-for="item in options" :key="item.id" :label="item.roleName" :value="item.id" />
      </el-select>
    </div>

    <div class="flex justify-center">
      <XButton class="bg-gray-400 mr-4" @click="hideDialogue">取 消</XButton>
      <XButton class="bg-blue-400" @click="submit">确 定</XButton>
    </div>
  </el-dialog>
</template>
