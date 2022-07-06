import { ref } from 'vue';
import { FormInstance, FormRules, ElMessage } from 'element-plus';

function useForm() {
  const FormRef = ref<FormInstance>();
  const submitForm = (formEL: FormInstance | undefined, cb: () => void) => {
    if (!formEL) return;
    formEL.validate((valid) => {
      if (valid) {
        cb();
      } else {
        ElMessage.error('表单验证失败');
        return false;
      }
    });
  };
  // 重置表单
  const resetForm = (formEL: FormInstance | undefined) => {
    console.log('重置表单');
    console.log(formEL);

    if (!formEL) return;
    formEL.resetFields();
  };
  return {
    FormRef,
    submitForm,
    resetForm,
  };
}

export default useForm;
