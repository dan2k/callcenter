import {api,start,close,errAlert} from '@/helpers'
import {ref} from "vue"
import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router';

export const useFollowup=()=>{
    const detail=ref({})
    const store = useAuthStore()
    const router=useRouter()
    const jobs =ref([])
    const solve=ref(null)
    const getDetail=async (jobid)=>{
        start()
        try{
            let rs=await api.get(`callcenter/job/v1/getJobDetail/${jobid}`)
            detail.value=rs.data.data[0]
            if(detail.value.job_status==1){
                await getSolve(jobid)
            }
        }catch(err){
            errAlert(err)
        }
        close()
    }
    const getSolve=async (jobid)=>{
        start()
        try{
            let rs=await api.get(`callcenter/job/v1/getSolve/${jobid}`)
            solve.value=rs.data.data[0]
        }catch(err){
            errAlert(err)
        }
        close()
    }
    const getJobs=async ()=>{
        start()
        try{
            let rs =await api.get(`callcenter/job/v1/getJobs/${store.userData.ses_custptype}/${store.userData.ses_custpcode}`)
            jobs.value=rs.data.data
        }catch(err){
            errAlert(err)
        }
        close()
    }
    const showDetail=(jobid)=>{
        router.replace({path:`/followup/${jobid}`})
    }
    return {
        detail,
        jobs,
        solve,
        getDetail,
        showDetail,
        getJobs,
    }
}