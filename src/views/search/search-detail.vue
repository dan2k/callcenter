<template>
    <div class="card col-xs-12 col-sm-8 col-md-8 mb-3 mx-auto  ">
        <div class="card-body ">
            <div class="container">
                <div class="row mx-2 my-2">
                    <div class="col-7 my-auto" style="font-size:12px;">
                        <h3 class="card-title ">รายละเอียด</h3>                        
                    </div>
                    <div class="col-5">
                        <div class="alert  float-end" :class="{'alert-danger border border-danger border-2':Number(detail.job_status)==99 , 'alert-info border border-info border-2':[0,2,3,4,5,6,7,8,9].includes(Number(detail.job_status)) ,'alert-success border border-success border-2':Number(detail.job_status)==1}">
                            <h6 class="mb-0 card-title">{{detail.job_id}}</h6>
                            <!-- <p style="font-size:10px;line-height:8px;color:lightgray">{{detail.job_add_datetime}}</p> -->
                            <p style="font-size:10px;line-height:16px;">{{detail.status}}</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="row mx-2 sub-detail">
                            <div class="mb-1 col-12"><b>สถานที่:</b> {{detail.cust_pdesc}}</div>
                            <div class="mb-1 col-12 col-sm-6 col-md-6 "><b>ผู้แจ้ง:</b> {{detail.job_add_user}} </div>
                            <div class="mb-1 col-12 col-sm-6 col-md-6 "><b>วันเวลา:</b> {{ detail.job_add_datetime}} </div>
                            <div v-if="detail.group_desc" class="mb-1 col-12 col-sm-6 col-md-6 "><b>ระบบงาน:</b> {{ detail.group_desc}} </div>
                            <div v-if="detail.sub1_desc" class="mb-1 col-12 col-sm-6 col-md-6 "><b>โปรแกรม:</b> {{ detail.sub1_desc}} </div>
                            <div v-if="detail.sub2_desc" class="mb-1 col-12 col-sm-6 col-md-6 "><b>เมนู:</b> {{ detail.sub2_desc}} </div>
                            <div v-if="detail.sub3_desc" class="mb-1 col-12 col-sm-6 col-md-6 "><b>เมนูย่อย:</b> {{ detail.sub3_desc}} </div>

                            <!-- <div class="mb-1 col-12 col-sm-6 col-md-6 ">เบอร์โทร: <a :href="`tel:${detail.job_phone}`">{{ detail.job_phone }}</a></div> -->
                            <br/>
                            <div v-if="detail.job_status!=99" class="mb-1 col-12 col-sm-6 col-md-6 "><b>ผู้รับผิดชอบ:</b> {{detail.job_add_user}} </div>
                            <div v-if="detail.job_status!=99" class="mb-1 col-12 col-sm-6 col-md-6 "><b>วันเวลา:</b> {{ detail.job_add_datetime}} </div>
                            <!-- <div v-if="detail.job_status!=99" class="mb-1 col-12 col-sm-6 col-md-6 ">เบอร์โทรผู้รับผิดชอบ: <a :href="`tel:${detail.job_phone}`">{{ detail.job_phone }}</a></div> -->
                        </div>
                </div>
                <div class="row mx-2">
                    <div class="col-12">
                        <h6 class="card-title">ปัญหา:</h6>
                        <p style="text-indent: 1.5em;" class="sub-detail">{{detail.job_desc}}</p>
                    </div>
                    
                </div>
                <div class="row mx-2" v-if="isPic==='1' && pics.length">
                    <div class="col-12">
                        <h6 class="card-title">รูปภาพ:</h6>
                        
                        <div class="col-12 mx-auto" >
                            <viewer  
                                :options="{navbar:pics.map((ob,i)=>`${JOBIMAGE}${ob.pic_name}`).length>1}"
                                :images="pics.map((ob,i)=>`${JOBIMAGE}${ob.pic_name}`)"
                                class="viewer text-center" 
                            >
                                 <template #default="scope">
                                     <img v-for="src in scope.images" :src="src" :key="src" class="image">
                                </template>
                            </viewer>
                        </div>
                    </div>
                    
                </div>
                <div v-if="detail.job_status==1" class="row mx-2">
                    <div class="col-12">
                        <h6 class="card-title">การแก้ไข:</h6>
                        <pre v-if="job_type=='SW'" style="text-indent: 1.5em;" class="sub-detail">{{solve?.comment_desc}}</pre>
                        <p v-if="job_type=='HW'" style="text-indent: 1.5em;" class="sub-detail">
                            1.ทำการตรวจสอบ {{ solve.comment_desc.split('||')[0] }}<br>
                            2.ดำเนินการ {{ solve.comment_desc.split('||')[1] }}<br>
                            3.ทำการทดสอบ {{ solve.comment_desc.split('||')[2] }}<br>
                        </p>
                    </div>
                    
                </div>
                <br/>
                <a class="card-link float-end" style="cursor:pointer" @click="$router.replace({path:'/search',query:{txtsearch:$route.query.search}})">ย้อนกลับ</a>
            </div>
        </div>
    </div>
</template>
<style scoped>
 h3,h6{
    font-weight:bolder;
 }
 .sub-detail{
    font-size:14px;
 }
 .image {
  cursor: pointer;
  margin: 5px;
  display: inline-block;
  width:100px;
  height:100px;
}
</style>
<script setup>
    import { useSearch} from "@/logics/search"
    import { onMounted } from 'vue';
    import 'viewerjs/dist/viewer.css'
    import Viewer from "ice-vue-viewer/src/component.vue"
    const {detail,getDetail,solve,pics,job_type,isPic} = useSearch()
    const JOBIMAGE=import.meta.env.VITE_PRIVATE_JOBIMAGE;
    onMounted(()=>{
        getDetail()
    })
</script>