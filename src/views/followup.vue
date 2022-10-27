<template>
  <h6 v-if="store.isLogin">
    <i class="fas fa-eye"></i> ติดตามปัญหา<span
      class="float-end"
      style="cursor: pointer"
      @click="$router.replace({ path: '/' })"
      ><i class="fas fa-home"></i
    ></span>
  </h6>
  <hr v-if="store.isLogin"/>
  <router-view></router-view>
  
</template>
<style scoped>
h6 {
  font-weight: bolder !important;
}

</style>
<script setup>
    import { useAuthStore } from '@/store';
    const store=useAuthStore()

</script>
