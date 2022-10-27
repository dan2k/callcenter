<template>
  <!-- <div class="position-absolute top-50 start-50 translate-middle">
   centred
</div> -->
  <div class="gimage position-absolute">
    <img   src="/CDG.jpg" alt="">
  </div>
  <!-- <Headline>Testplugin</Headline> -->
  <div class="c card col-md-3 col-sm-12 mx-auto my-md-5">
    <div class="h card-header bg-info bg-opacity-25 text-center">ระบบรับแจ้งปัญหา</div>
    <div class="card-body">
        <div class="mb-3">
          <label for="username" class="form-label">ผู้ใช้</label>
          <input
            type="text"
            class="form-control"
            id="username"
            aria-describedby="userHelp"
            v-model="username"
            :disabled="isEdit"
          />
          <div v-if="!isEdit && username.length<1" id="userHelp" class="form-text text-warning" >กรุณาระบุชื่อผู้ใช้</div>
        </div>
        <div class="mb-3" v-if="isEdit">
          <label for="username" class="form-label">จังหวัด</label>
          <VueMultiselect
            v-model="province"
            :options="provinces"
            :close-on-select="true"
            :clear-on-select="false"
            placeholder="เลือกจังหวัด"
            label="text"
            track-by="id"
            @select="setPcode"
            />
          
        </div>
        <div class="mb-3" v-if="isEdit">
          <label for="username" class="form-label">สถานที่ปฏิบัติงาน</label>
          <VueMultiselect
            v-model="custpcode"
            :options="custpcodes"
            :close-on-select="true"
            :clear-on-select="false"
            placeholder="เลือกสถานที่"
            label="text"
            track-by="id"
            />
          
        </div>

    </div>
    <div class="card-footer">
        <div class="d-grid gap-2">
          <button v-if="!isEdit" class="btn btn-primary" type="button" @click="login">เข้าสู่ระบบ</button>
          <button v-if="isEdit" class="btn btn-primary" type="button" @click="next" >ต่อไป</button>
          <!-- <button class="btn btn-secondary" type="button" @click="reset">ยกเลิก</button> -->

        </div>
    </div>
  </div>
 
</template>

<style scoped>
.h {
  font-size: 20px;
  font-weight: bolder;
}
label {
  font-weight: bolder;
}
.gimage {
  background-image: url("@/assets/images/bcallcenter.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  top: 0;
}
img {
  width: 8%;
  height: 8%;
  z-index:1000;
  position: absolute;
  top:74% ;
  left:6%;
  
}
</style>
<script setup>
  import { onBeforeMount,getCurrentInstance  } from "vue";
  import VueMultiselect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.css'
  import {useLogin} from "@/logics/login"
  const {
      username,
      custpcode,
      custpcodes,
      province,
      provinces,
      isEdit,
      login,
      next,
      setPcode,
      checkLogin,
  } =useLogin()
  onBeforeMount(()=>{
    
    checkLogin()
    //test plugin
    // const app = getCurrentInstance()
    // console.log(app.appContext.config.globalProperties.$coloredText)

  })   
</script>
