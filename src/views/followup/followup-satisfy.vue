<template>
   <div class="card col-xs-12 col-sm-8 col-md-8 mb-3 mx-auto  ">
        <div class="card-body ">
            <div class="container">
                <div class="row mx-2 my-2">
                    <div class="col-12 my-auto" style="font-size:12px;">
                        <h3 class="card-title text-center">ประเมินความพึงพอใจ</h3>                        
                    </div>
                    
                </div>
                <div class="row">
                    <div class="row mx-2">
                      <table id="satify" class="table table-bordered">
                        <thead>
                          <tr>
                            <th rowspan="2">หัวข้อ</th>
                            <th rowspan="2">รายละเอียดการประเมิน</th>
                            <th colspan="5">ระดับความพึงพอใจ</th>
                          </tr>
                          <tr>
                            <th>มากที่สุด</th>
                            <th>มาก</th>
                            <th>ปานกลาง</th>
                            <th>น้อย</th>
                            <th>น้อยที่สุด</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="s in subject" :key="s.seq">
                            <td align="center">{{ s.seq }}.</td>
                            <td>{{ s.subject_desc }}</td>
                            <td  class="score"><input type="radio" :name="s.subject_id" v-model="s.value" value="5"/></td>
                            <td  class="score"><input type="radio" :name="s.subject_id" v-model="s.value" value="4"/></td>
                            <td  class="score"><input type="radio" :name="s.subject_id" v-model="s.value" value="3"/></td>
                            <td  class="score"><input type="radio" :name="s.subject_id" v-model="s.value" value="2"/></td>
                            <td  class="score"><input type="radio" :name="s.subject_id" v-model="s.value" value="1"/></td>
                          </tr>
                        </tbody>
                      </table>
                     </div>
                </div>
                
                <div class="row">
                  <div class="col-12 text-center">
                    <button  class="btn btn-primary btn-sm" @click="submit">ประเมินความพึงพอใจ</button>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.title {
  font-weight: bolder;
}
.detail {
  text-indent: 5px;
  color: rgb(14, 143, 143);
}
.detail::before {
  content: "  ";
}
</style>
<script setup>
import { onMounted,ref } from "vue";
import { useFollowup } from '@/logics/followup';
import { useRoute,useRouter} from "vue-router";
import {api,start,close,errAlert,okAlert} from '@/helpers'
const {getSubject}=useFollowup()
let subject=ref([])

const route=useRoute()
const router=useRouter()
onMounted(async () => {
  subject.value=await getSubject();
  subject.value=subject.value.map((it,i)=>{
    it['value']=null;
    return it
  })
})
const submit=async ()=>{
  let check=true 
  subject.value.forEach((it,i)=>{
     if(!it.value){
      check=false 
      return 
     }  
  })
  if(!check){
    errAlert("กรุณาเลือกให้ครบทุกข้อ")
    return 
  }
  start()
  try {
    let rs = await api.post(`callcenter/job/v2/saveSatisfy`, {
      subject: subject.value,
      jobid: route.params.jobid,
    });
    close()
    okAlert(rs.data.msg, () => {
      router.replace({ path: `/followup/${route.params.jobid}` });
    });

  } catch (err) {
    errAlert(err);
    close()
  }
  
}
</script>
<style scoped>
  table thead th{
    text-align:center;
    vertical-align: middle;
  }
  table td.score{
    text-align:center;
    vertical-align: middle;
  }
</style>
