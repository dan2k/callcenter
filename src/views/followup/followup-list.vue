<template>
  <div class="card col-xs-12 col-sm-8 col-md-8 mb-3 mx-auto">
    <!-- <div class="card-header text-center">&nbsp;</div> -->
    <div class="card-body">
      <table class="table table-hover table-striped">
        <tbody>
          <tr v-for="job in jobs" @click="showDetail(job.job_id)" style="cursor:pointer;">
            <th width="20%">
              <div class="row">
                <div class="col-12" style="line-height:12px;">
                    {{job.job_id}}<br/>
                    <span style="font-size:8px;">{{job.sdate}} {{job.stime}}</span>
                </div>
              </div>
            </th>
            <td class="desc">
              <span>{{ job.job_desc }}</span>
            </td>
            <td width="20%" :class="{'text-danger':Number(job.job_status)==99 , 'text-info':[0,2,3,4,5,6,7,8,9].includes(Number(job.job_status)) ,'text-success':Number(job.job_status)==1}" >{{ job.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scoped>
.desc{
    max-width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
table{
    font-size:12px;
}
</style>
<script setup>
    import { onMounted } from 'vue'
    import { useFollowup } from '@/logics/followup';
    const {jobs,showDetail,getJobs}=useFollowup()
    
    onMounted(() => {
      getJobs()
    })
</script>