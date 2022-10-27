<template>
  <h6>
    <i class="fas fa-search"></i> ค้นปัญหา<span
      class="float-end"
      style="cursor: pointer"
      @click="$router.replace({ path: '/' })"
      ><i class="fas fa-home"></i
    ></span>
  </h6>
  <hr />
  <router-view></router-view>
</template>
<style scoped>
h6 {
  font-weight: bolder !important;
}
</style>
<script setup></script>
