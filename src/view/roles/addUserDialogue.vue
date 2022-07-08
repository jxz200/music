<script setup lang="ts">
import { ref } from 'vue';
import useDialogue from '../../hooks/dialogue';
import { addRoles } from '../../http/roles';

const { dialogVisible, showDialogue, hideDialogue } = useDialogue();

// 提交
const roleName = ref('');
const roleDesc = ref('');
const submit = async () => {
  await addRoles({
    roleName: roleName.value,
    roleDesc: roleDesc.value,
  });
  emit('updateRolesList');
  hideDialogue();
};

const emit = defineEmits(['updateRolesList']);
defineExpose({ showDialogue });
</script>

<template>
  <el-dialog v-model="dialogVisible" title="分配权限" width="40%">
    <el-form ref="formRef">
      <el-form-item label="角色名称" prop="username">
        <el-input v-model="roleName" type="text"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="password">
        <el-input v-model="roleDesc" type="text"></el-input>
      </el-form-item>
    </el-form>
    <div class="flex justify-center">
      <XButton class="bg-gray-400 mr-4" @click="hideDialogue">取 消</XButton>
      <XButton class="bg-blue-400" @click="submit">确 定</XButton>
    </div>
  </el-dialog>
</template>
