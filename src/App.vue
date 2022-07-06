<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { initDanamicRoutes } from './router';

initDanamicRoutes();
</script>

<style scoped></style>
