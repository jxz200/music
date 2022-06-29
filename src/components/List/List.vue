<template>
  <div class="h-screen grid place-items-center bg-green-300">
    <div>
      <input
        id="shit"
        type="text"
        name="name"
        v-model="inputValue"
        class="w-48 h-12 outline-none rounded-md p-2"
      />
      <ul>
        <li
          v-for="(item, index) in list"
          :key="item"
          class="w-48 grid grid-cols-[3fr_1fr] mb-4 items-center"
        >
          <div>
            <input type="checkbox" ref="checkboxRef" @click="handleSelect" />
            <span>{{ item }}</span>
          </div>
          <button class="a bg-red-300 rounded-md" @click="romove(index)">
            delete
          </button>
        </li>
      </ul>
      <div class="w-48 gird place-items-start">
        <input type="checkbox" ref="selectAllRef" @click="handleSelectAll" />
        <span>全选</span>
      </div>
    </div>

    <div class="w-48 grid justify-items-center">
      <button
        class="w-10 h-7 bg-amber-400 grid place-items-center rounded-md text-white"
        @click="add"
      >
        +
      </button>
      <button
        class="w-32 h-7 bg-amber-400 grid place-items-center rounded-md text-white"
        @click="deleteAll"
      >
        delete all
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect, onMounted, onUpdated, nextTick } from "vue";
const inputValue = ref<string>("");
const list = ref<string[]>(["shit"]);
const checkboxRef = ref<HTMLInputElement[]>([]);
// const selectAll = ref<boolean>(true);
const selectAllRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  console.log(checkboxRef.value);
});

onUpdated(() => {});

const handleSelect = () => {
  selectAllRef.value!.checked = checkboxRef.value.every(
    (item) => item.checked === true
  );
};

const handleSelectAll = () =>
  checkboxRef.value.forEach(
    (element) => (element.checked = selectAllRef.value!.checked)
  );

const add = () => {
  list.value.push(inputValue.value);
};
const romove = (index: number) => {
  list.value.splice(index, 1);
};
const deleteAll = () => {
  list.value.length = 0;
};
</script>

<style scoped></style>
