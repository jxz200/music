<script setup lang="ts">
import useList from '../../hooks/list';
import { getCategories } from '../../http/goods';
const { pagenum, pagesize, loading, tableData, updateList } = useList(getCategories);

const updateGoodsList = () => {
  updateList(pagenum.value, pagesize.value);
};

updateGoodsList();
</script>

<template>
  <div>
    <el-table :data="tableData!.result" border stripe class="mb-4" v-loading="loading">
      <el-table-column prop="cat_id" label="商品ID"> </el-table-column>
      <el-table-column prop="cat_name" label="分类名称"> </el-table-column>
      <el-table-column prop="cat_level" label="分类等级"> </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="pagenum"
      v-model:page-size="pagesize"
      :page-sizes="[1, 5, 10, 20]"
      layout=" sizes, prev, pager, next, jumper"
      :total="tableData.total"
      @size-change="updateGoodsList"
      @current-change="updateGoodsList"
    />
  </div>
</template>
