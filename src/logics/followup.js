import {api,start,close,errAlert} from '@/helpers'
import {ref} from "vue"
import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router';
import { useUpload } from "@/plugins/fileupload";

export const useFollowup=()=>{
    const detail=ref({})
    const store = useAuthStore()
    const router=useRouter()
    const jobs =ref([])
    const pics=ref([])
    const solve=ref(null)
    const {files}=useUpload()
    files.value.length=0
    const getDetail=async (jobid)=>{
        start()
        try{
            let rs=await api.get(`callcenter/job/v1/getJobDetail/${jobid}`)
            detail.value=rs.data.data[0]
            pics.value=await getPic(jobid)
            close()
            if(detail.value.job_status==1){
                await getSolve(jobid)
            }
        }catch(err){
            errAlert(err)
            close()
        }
        
    }
    const getPic=async (jobid)=>{
        start()
        try{
            let rs=await api.get(`callcenter/job/v1/getJobPic/${jobid}`)
            close()
            return rs.data.data
        }catch(err){
            errAlert(err)
            close()
        }
    }

    const getSolve=async (jobid)=>{
        start()
        try{
            let rs=await api.get(`callcenter/job/v1/getSolve/${jobid}`)
            close()
            solve.value=rs.data.data[0]
        }catch(err){
            errAlert(err)
            close()
        }
    }
    const getJobs=async ()=>{
        start()
        try{
            let rs =await api.get(`callcenter/job/v2/getJobs/${store.userData.ses_custptype}/${store.userData.ses_custpcode}/${store.userData.ses_user}`)
            jobs.value=rs.data.data
            close()
        }catch(err){
            errAlert(err)
            close()
        }
        
    }
    const showDetail=(jobid)=>{
        router.replace({path:`/followup/${jobid}`})
    }
    const savePic =async (jobid) => {
            const formData=new FormData();
            //clear null objects
            files.value=files.value.filter((ob,i)=>ob.url)
            for(let i=0;i<files.value.length;i++){
                formData.append('file_'+i,files.value[i].obj.files[0]);
            }
            start()
            try{
                await api.post(`callcenter/job/v1/updatePic/${jobid}`, formData, {
                    headers: {
                    "Content-Type": "multipart/form-data",
                    },
                });
                close()
                
            }catch(err){
                errAlert(err)
                close()
            }
            
    };
    const getSubject = async () => {
        start()
        try {
          let rs = await api.get(`callcenter/job/v2/getSubject`);
          close()
          return rs.data.data;
        } catch (err) {
          errAlert(err);
          close()
        }
      };
    return {
        detail,
        jobs,
        solve,
        pics,
        files,
        getDetail,
        showDetail,
        getJobs,
        savePic,
        getPic,
        getSubject,
    }
}