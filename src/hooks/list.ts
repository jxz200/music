import { ref } from 'vue';

function useList(callback: Function) {
  const pagenum = ref<number>(1);
  const pagesize = ref<number>(10);
  const tableData = ref<object[]>();
  const loading = ref(false);
  const updateList = async (...params: Array<number | string>) => {
    loading.value = true;
    const { data } = await callback(...params);
    tableData.value = data.data;
    loading.value = false;
  };
  return {
    pagenum,
    pagesize,
    loading,
    tableData,
    updateList,
  };
}

export default useList;
