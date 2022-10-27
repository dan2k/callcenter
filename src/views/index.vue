<template>
  <hr/>
  <div class="row justify-content-md-center">
    <div class="col-12 col-md-4">
      <div class="alert alert-danger border border-danger border-2  rounded-pill px-4 text-center" role="alert" @click="$router.replace({path:'/job'})">
        แจ้งปัญหาใหม่
        <span class="float-end"><i class="fas fa-newspaper"></i></span>
      </div>
    </div>
    <div class="col-12 col-md-4">
      <div class="alert alert-primary border border-primary border-2 rounded-pill px-4 text-center" role="alert"  @click="$router.replace({path:'/followup'})">
        ติดตามปัญหา
        <span class="float-end"><i class="fas fa-eye"></i></span>
      </div>
    </div>
    <div class="col-12 col-md-4">
      <div class="alert alert-success border border-success border-2 rounded-pill px-4 text-center" role="alert"  @click="$router.replace({path:'/search'})">
        ค้นหาปัญหา
        <span class="float-end"><i class="fas fa-search"></i></span>
      </div>
    </div>
    <div class="col-12 col-md-4">
      <div class="alert alert-secondary border border-secondary border-2 rounded-pill px-4 text-center" role="alert"  @click="$router.replace({path:'/manual'})">
        คู่มือการใช้งาน
        <span class="float-end"><i class="fas fa-book-open"></i></span>
      </div>
    </div>
  </div>
</template>
<style scoped>
    /* div.alert.alert-success{
        font-size:16px;
        font-weight: bolder;
        color:black;
        cursor:pointer;
    } */
    /* div.alert.alert-success:hover{
        color:rgb(80, 175, 237);
        
    } */
    div.alert{
      cursor:pointer;
    }
</style>
<script setup>

</script>
