<script setup lang="ts">
import { ref } from 'vue';
import Button from '../../components/button.vue';
import { getUserList, deleteUser, changeUserState } from '../../http/users';
import addUserDialog from './addUserDialog.vue';
import assignRolesDialogVue from './assignRolesDialog.vue';
import { IUserList } from '../../types/users';
import { useRouter, useRoute } from 'vue-router';
const route = useRoute();
console.log('route23', route);
// 更新数据
const query = ref<string>('');
const pagenum = ref(1);
const pagesize = ref(10);
const tableData = ref<IUserList[]>([]);
const updateUserList = async () => {
  const res = await getUserList(query.value, pagenum.value, pagesize.value);
  const data = res.data.data;
  tableData.value = data.users;
};
updateUserList();

// 是否允许登录
const handleChangeStatus = (value: boolean, id: number) => {
  changeUserState(id, value);
};

// 新增用户
const addUserDialogRef = ref<InstanceType<typeof addUserDialog> | null>(null);
const handleAddUser = () => {
  addUserDialogRef.value?.showDialogue();
};

// 分配角色
const currentUserInfo = ref<IUserList>();
const assignRolesDialogRef = ref<InstanceType<typeof assignRolesDialogVue> | null>(null);
const handleAssignRoles = (userInfo: IUserList) => {
  currentUserInfo.value = userInfo;
  assignRolesDialogRef.value?.showDialogue();
};

// 删除用户
const handleDelete = async (row: any) => {
  await deleteUser(row.id);
  updateUserList();
};
</script>

<template>
  <div>
    <div class="flex justify-between mb-4">
      <el-input v-model="query" placeholder="请输入用户名来搜索" class="w-80 h-10" clearable>
        <template #append> <button @click="updateUserList">搜索</button> </template>
      </el-input>
      <Button class="bg-blue-400 hover:bg-blue-600" @click="handleAddUser">新增用户</Button>
    </div>
    <el-table :data="tableData" border stripe class="mb-4">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="手机"> </el-table-column>
      <el-table-column prop="role_name" label="角色名"> </el-table-column>
      <el-table-column prop="mg_state" label="是否允许登录">
        <template #default="scope">
          <el-switch v-model="scope.row.mg_state" @change="handleChangeStatus(scope.row.mg_state, scope.row.id)" />
        </template>
      </el-table-column>
      <el-table-column prop="mg_state" label="选项" min-width="200">
        <template #default="scope">
          <Button class="bg-red-400 hover:bg-red-600 mr-4" @click="handleDelete(scope.row)" v-permission="{ route, permission: '删除用户' }">删除</Button>
          <Button class="bg-blue-400 hover:bg-blue-600" @click="handleAssignRoles(scope.row)" v-permission="{ route, permission: '分配用户角色' }"
            >分配角色</Button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:currentPage="pagenum"
      v-model:page-size="pagesize"
      :page-sizes="[1, 5, 10, 20]"
      layout=" sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="updateUserList"
      @current-change="updateUserList"
    />
    <addUserDialog ref="addUserDialogRef" @updateUserList="updateUserList"></addUserDialog>
    <assignRolesDialogVue ref="assignRolesDialogRef" :currentUserInfo="(currentUserInfo as IUserList)" @updateUserList="updateUserList"></assignRolesDialogVue>
  </div>
</template>
