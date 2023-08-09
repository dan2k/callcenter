<template>
    <nav class="navbar navbar-expand-lg " style="font-weight: bolder;font-size:30px;background-color:#16351a;color:#bbe9f9;">
      <img src="/CDG2-1.png" style="width:25%;left:-10vw;" class="position-absolute  mx-3" alt="">
      <div class="container mx-auto"><span class="mx-auto mt-2">ระบบรับแจ้งปัญหา</span></div>
      <span class="position-absolute " style="cursor:pointer;right:10px;" @click="logout"><i class="fas fa-sign-out-alt  text-danger" ></i></span>
    </nav>
</template>
<script setup>
import { useAuthStore } from "@/store";
const store = useAuthStore();
const logout = () => {
  store.logout();
};

</script>
<style scoped>
a {
  cursor: pointer;
}
</style>
