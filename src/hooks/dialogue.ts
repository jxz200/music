import { ref } from 'vue';

function useDialogue() {
  const dialogVisible = ref(false);
  // 显示对话框
  const showDialogue = async () => {
    dialogVisible.value = true;
  };
  // 取消表单
  const hideDialogue = () => {
    dialogVisible.value = false;
  };

  return {
    dialogVisible,
    showDialogue,
    hideDialogue,
  };
}

export default useDialogue;
