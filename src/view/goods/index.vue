<script setup lang="ts">
import useList from '../../hooks/list';
import { getGoodsList } from '../../http/goods';
const { pagenum, pagesize, loading, tableData, updateList } = useList(getGoodsList);

const updateGoodsList = () => {
  updateList(pagenum.value, pagesize.value);
};

updateGoodsList();
</script>

<template>
  <div>
    <el-table :data="tableData!.goods" border stripe class="mb-4" v-loading="loading">
      <el-table-column prop="goods_id" label="商品ID"> </el-table-column>
      <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
      <el-table-column prop="goods_price" label="商品价格"> </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="pagenum"
      v-model:page-size="pagesize"
      :page-sizes="[1, 5, 10, 20]"
      layout=" sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="updateGoodsList"
      @current-change="updateGoodsList"
    />
  </div>
</template>
