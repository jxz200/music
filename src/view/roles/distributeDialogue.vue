<script setup lang="ts">
import useDialogue from '../../hooks/dialogue';
import { getRightsList } from '../../http/roles';
import { IRightsInfo } from '../../types/roles';
import { distributeAuthority } from '../../http/roles';
import XButton from '../../components/XButton.vue';

const props = defineProps<{
  roleId: number;
}>();

const { dialogVisible, showDialogue, hideDialogue } = useDialogue();

// 获取权限树并渲染
const rightsList = ref<any[]>();
const updateRightsList = async () => {
  const { data } = await getRightsList();
  rightsList.value = data.data;
};

// 分配权限
const defaultProps = {
  children: 'children',
  label: 'authName',
};
const treeRef = ref<any>();
const submit = async () => {
  const result = [...treeRef.value.getCheckedKeys(), ...treeRef.value.getHalfCheckedKeys()].join(',');
  await distributeAuthority(props.roleId, result);
  emit('updateRolesList');
  hideDialogue();
};

// 权限回显
let keys = ref<number>(0); // 刷新el-tree组件用
const selectedKeys = ref<number[]>([]);
function updateSelectedKeys(rightsInfo: IRightsInfo[]) {
  const result: number[] = [];
  getLeafs(rightsInfo);
  function getLeafs(node: IRightsInfo[]) {
    node.forEach((item: IRightsInfo) => {
      if (!item.children) return result.push(item.id);
      getLeafs(item.children);
    });
  }
  selectedKeys.value = result;
  keys.value++; // 刷新el-tree组件
}

const emit = defineEmits(['updateRolesList']);
defineExpose({ showDialogue, updateRightsList, updateSelectedKeys });
</script>

<template>
  <el-dialog v-model="dialogVisible" title="分配权限" width="40%">
    <el-tree
      ref="treeRef"
      :data="rightsList"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="selectedKeys"
      :props="defaultProps"
      :key="keys"
    />
    <div class="flex justify-center">
      <XButton class="bg-gray-400 mr-4" @click="hideDialogue">取 消</XButton>
      <XButton class="bg-blue-400" @click="submit">确 定</XButton>
    </div>
  </el-dialog>
</template>
