<template>
  <div class="mb-2" v-bind="$attrs">
    <slot name="header" :addImage="addImage">
      <label for="" class="form-label"
        >รูปภาพ
        <span class="text-primary" @click="addImage()" style="cursor: pointer"
          ><i class="fas fa-plus-circle"></i></span
      ></label>
    </slot>

    <br />
    <div class="row w-100">
      <div class="col-6 position-relative text-center" v-for="(file, index) in files">
        <input
          type="file"
          class="form-control"
          :id="`file-${index}`"
          placeholder="..."
          v-show="false"
          :accept="fileTypes.join(',')"
          @change="upload(file, $event)"
        />
        <img
          :src="file.url"
          class="mx-2 img-thumbnail"
          alt=""
          style="width: 150px; height: 150px"
        />
        <br />
        <span
          class="text-danger"
          @click="trash(file)"
          style="cursor: pointer; z-index: 10000"
          ><i class="fas fa-trash"></i
        ></span>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
<script setup>
import { useUpload } from "./upload";
const props = defineProps({
  size: { type: Number, default: 300 },
  fileTypes:{
    //'image/jpeg','image/gif'
    type:Array,default:['*']
  }

});
const { trash, upload, addImage, files } = useUpload(props);
</script>
