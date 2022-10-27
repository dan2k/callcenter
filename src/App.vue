<script setup>
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  import Nav from './components/nav.vue'
  import { useAuthStore } from '@/store';
  const store =useAuthStore()
 </script>

<template>
  <Nav v-if="store.isLogin"  />
  <!-- <div v-if="store.isLogin" class="mt-0">&nbsp;</div>  -->
  <router-view class="mt-1"></router-view>
  <!-- <div class="container-fuild fixed-bottom mb-5 d-none d-md-inline d-md-inline"><div class="col-12 mx-auto  text-center"><img  src="/CDG.jpg" /></div></div> -->
</template>

<style scoped>
  img{
    width:12%;
    height:12%;
  }

</style>
