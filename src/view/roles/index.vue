<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getRolesList } from '../../http/api';
import { deleteRoles } from '../../http/roles';
import useList from '../../hooks/list';
import Button from '../../components/button.vue';
import DistributeDialogue from './distributeDialogue.vue';
import addUserDialogue from './addUserDialogue.vue';
import { IRightsInfo } from '../../types/roles';

// 更新列表数据
const { loading, tableData, updateList } = useList(getRolesList);
updateList();

// 分配权限
const distributeDialogueRef = ref<InstanceType<typeof DistributeDialogue> | null>(null);
onMounted(() => {
  distributeDialogueRef.value?.updateRightsList();
});
const roleId = ref<number>(0);
const handleDistributeAuthority = async (row: IRightsInfo[], rid: number) => {
  distributeDialogueRef.value?.showDialogue();
  distributeDialogueRef.value?.updateSelectedKeys(row); //  更改默认选中的权限，权限回显
  roleId.value = rid;
};

// 删除角色
const removeRoles = (id: number) => {
  deleteRoles(id);
  updateList();
};

// 增加角色
const addUserDialogRef = ref<InstanceType<typeof addUserDialogue> | null>(null);
const handleAddUser = () => {
  addUserDialogRef.value?.showDialogue();
};
</script>

<template>
  <div>
    <Button class="bg-blue-400 mb-4" @click="handleAddUser">增加角色</Button>
    <el-table :data="tableData" border stripe class="mb-4" v-loading="loading">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="roleName" label="角色名"> </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
      <el-table-column prop="mg_state" label="选项" min-width="200">
        <template #default="scope">
          <Button class="bg-red-400 mr-4" @click="removeRoles(scope.row.id)">删除</Button>
          <Button class="bg-blue-400" @click="handleDistributeAuthority(scope.row.children, scope.row.id)">分配权限</Button>
        </template>
      </el-table-column>
    </el-table>
    <DistributeDialogue ref="distributeDialogueRef" :roleId="roleId" @update-roles-list="updateList"> </DistributeDialogue>
    <addUserDialogue ref="addUserDialogRef" @updateRolesList="updateList"></addUserDialogue>
  </div>
</template>
