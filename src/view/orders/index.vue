<script setup lang="ts">
import useList from '../../hooks/list';
import { getRightsList } from '../../http/rights';
const { loading, tableData, updateList } = useList(getRightsList);

updateList();
</script>

<template>
  <div>
    <el-table :data="tableData" border stripe class="mb-4" v-loading="loading">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="authName" label="权限名"> </el-table-column>
      <el-table-column prop="level" label="等级"> </el-table-column>
    </el-table>
  </div>
</template>
