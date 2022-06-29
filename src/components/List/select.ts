import { ref } from "vue";
const checkboxRef = ref<HTMLInputElement[]>([]);
const selectAllRef = ref<HTMLInputElement | null>(null);

const handleSelect = () => {
  selectAllRef.value!.checked = checkboxRef.value.every(
    (item) => item.checked === true
  );
};

const handleSelectAll = () =>
  checkboxRef.value.forEach(
    (element) => (element.checked = selectAllRef.value!.checked)
  );
