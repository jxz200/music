<template>
  <div>
    <audio src=""></audio>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import $http from "../http/index";
$http.get("/song/url?id=33894312");
</script>

<style scoped></style>
