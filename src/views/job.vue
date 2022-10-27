<template>
  <h6>
    <i class="fas fa-newspaper"></i> แจ้งปัญหาใหม่<span
      class="float-end"
      style="cursor: pointer"
      @click="$router.replace({ path: '/' })"
      ><i class="fas fa-home"></i
    ></span>
  </h6>
  <hr />
  <div class="card col-xs-12 col-sm-6 col-md-6 mb-3 mx-auto">
    <form ref="form" @submit.prevent="login" class="needs-validation" novalidate>
      <div class="card-body">
        <div class="mb-2">
          <label for="detail" class="form-label">รายละเอียด</label>
          <textarea
            class="form-control form-control-sm"
            id="detail"
            rows="3"
            placeholder="บอกเราตรงนี้.."
            v-model="state.detail"
            @blur="handleBlur('detail')"
            :class="{
              'is-valid': !v$.detail.$error && v$.detail.$dirty,
              'is-invalid': v$.detail.$error,
            }"
          ></textarea>
          <div id="validationServer03Feedback" class="invalid-feedback">
            {{ v$.detail.$errors[0]?.$message }}
          </div>
        </div>
        <div class="mb-2">
          <label for="username" class="form-label">ชื่อ-สกุล</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="username"
            placeholder="..."
            v-model="state.username"
            @blur="handleBlur('username')"
            :class="{
              'is-valid': !v$.username.$error && v$.username.$dirty,
              'is-invalid': v$.username.$error,
            }"
          />
          <div id="validationServer03Feedback" class="invalid-feedback">
            {{ v$.username.$errors[0]?.$message }}
          </div>
        </div>
        <div class="mb-2">
          <label for="tel" class="form-label">เบอร์โทร</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="tel"
            placeholder="..."
            v-model="state.tel"
            @blur="handleBlur('tel')"
            :class="{
              'is-valid': !v$.tel.$error && v$.tel.$dirty,
              'is-invalid': v$.tel.$error,
            }"
            v-maska="'###-###-####'"
            @maska="rawtel = $event.target.dataset.maskRawValue"
          />
          <div id="validationServer03Feedback" class="invalid-feedback">
            {{ v$.tel.$errors[0]?.$message }}
          </div>
        </div>
        <Upload :size="300" :fileTypes="['image/*']" ref="uf">
          <template #header="{ addImage }">
            <!-- <label for="" class="form-label"
              >รูปภาพ<span style="color:lightgray;font-size:10px;">(ขนาดไม่เกิน 300 kb)</span>
              <span class="text-danger" @click="addImage()" style="cursor: pointer"
                ><i class="fas fa-camera"></i></span
                
            ></label> -->
            <button class="btn btn-outline-danger w-25" @click="addImage()"><i class="fas fa-camera"></i><br/><span style="font-size:10px;">เพิ่มรูปภาพ</span></button>
          </template>
        </Upload>
      </div>
      <div class="card-footer">
        <div class="d-sm-none d-md-none d-lg-none d-grid gap-2">
          <button class="btn btn-primary" style="font-weight:bolder;" type="submit" :disabled="v$.$invalid">
            <i class="fas fa-save float-end"></i> บันทึก
          </button>
          <button class="btn btn-warning" style="font-weight:bolder;" type="button" @click="reset()">
            <i class="fas fa-undo-alt float-end"></i> ยกเลิก
          </button>
        </div>
        <div class="d-none d-sm-flex d-md-flex justify-content-center col-12 mx-auto">
          <button
            class="btn btn-primary btn-sm mx-2"
            type="submit"
            :disabled="v$.$invalid"
            style="font-weight:bolder;"
          >
            <i class="fas fa-save"></i> บันทึก
          </button>
          <button class="btn btn-warning btn-sm mx-2" style="font-weight:bolder;" type="button" @click="reset()">
            <i class="fas fa-undo-alt"></i> ยกเลิก
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<style scoped>
h6 {
  font-weight: bolder !important;
}
label {
  font-weight: bolder !important;
  font-size: 14px !important;
}
</style>
<script setup>
import { useJob } from "@/logics/job";
// import { onMounted, ref } from "vue";
// const uf=ref()
const { state, rawtel, form, v$, login, reset, handleBlur } = useJob();
// onMounted(()=>{
//   console.log(uf.value.files)
// })
</script>
