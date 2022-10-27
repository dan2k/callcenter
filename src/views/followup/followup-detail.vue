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
                            <div class="mb-1 col-12">สถานที่: {{detail.cust_pdesc}}</div>
                            <div class="mb-1 col-12 col-sm-6 col-md-6 ">ผู้แจ้ง: {{detail.job_add_user}} </div>
                            <div class="mb-1 col-12 col-sm-6 col-md-6 ">วันเวลา: {{ detail.job_add_datetime}} </div>
                            <!-- <div class="mb-1 col-12 col-sm-6 col-md-6 ">เบอร์โทร: <a :href="`tel:${detail.job_phone}`">{{ detail.job_phone }}</a></div> -->
                            <div v-if="detail.job_status!=99" class="mb-1 col-12 col-sm-6 col-md-6 ">ผู้รับผิดชอบ: {{detail.job_add_user}} </div>
                            <div v-if="detail.job_status!=99" class="mb-1 col-12 col-sm-6 col-md-6 ">วันเวลา: {{ detail.job_add_datetime}} </div>
                            <div v-if="detail.job_status!=99" class="mb-1 col-12 col-sm-6 col-md-6 ">เบอร์โทรผู้รับผิดชอบ: <a :href="`tel:${detail.job_phone}`">{{ detail.job_phone }}</a></div>
                        </div>
                </div>
                <div class="row mx-2">
                    <div class="col-12">
                        <h6 class="card-title">ปัญหา:</h6>
                        <p style="text-indent: 1.5em;" class="sub-detail">{{detail.job_desc}}</p>
                    </div>
                    
                </div>
                <div v-if="detail.job_status==1" class="row mx-2">
                    <div class="col-12">
                        <h6 class="card-title">การแก้ไข:</h6>
                        <p style="text-indent: 1.5em;" class="sub-detail">{{solve.comment_desc}}</p>
                    </div>
                    
                </div>
                <br/>
                <a class="card-link float-end" style="cursor:pointer" @click="$router.replace({path:'/followup'})">ย้อนกลับ</a>
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
</style>
<script setup>
    import { useRoute } from 'vue-router';
    import { useFollowup } from '@/logics/followup';
    import { onMounted } from 'vue';
    const route=useRoute()
    const {detail,getDetail,solve}=useFollowup()
    onMounted(()=>{
        getDetail(route.params.jobid)
    })
</script>