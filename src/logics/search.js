import {api,start,close,errAlert} from '@/helpers'
import { ref,watch,onMounted} from 'vue'
import _ from 'lodash'
import { useAuthStore } from '@/store';
import { useRouter,useRoute } from 'vue-router';
import { useFollowup } from './followup';

export const useSearch=()=>{
    const router=useRouter()
    const route=useRoute()
    const store = useAuthStore()
    const jobs =ref([])
    const search =ref('')
    const page=ref(null)
    const total=ref(0)
    const isFinish=ref(true)  
    const detail=ref({}) 
    const solve=ref(null) 
    const job_type=ref('');
    const pics=ref([]);
    const {getPic} =useFollowup();
    const doSearch = async (key='') => {
        if(key.length<1){
          // jobs.value.length=0
          // page.value=1
          // total.value=0
          // return 
          key='searchAll'
        }
        
        start()
        try{
          let rs = await api.get(`callcenter/job/v1/getSearch/${store.userData.ses_user}/${key}`)
          jobs.value=rs.data.data  
          page.value=1
          total.value=rs.data.total 
          isFinish.value=total.value<10?true:false
        }catch(err){
          errAlert(err)
        }
        close()
      }
      watch(() => search.value,_.debounce((val)=>doSearch(val),500))
      onMounted(()=>{
        doSearch('');
      });
      const showDetail=(jobid)=>{
          router.push({path:`/search/${jobid}`,query:{search:search.value}})
      }
      const more=async ()=>{
        start()
        try{
          let searchtxt=search.value?search.value:'searchAll'
          let rs = await api.get(`callcenter/job/v1/getSearch/${store.userData.ses_user}/${searchtxt}/${page.value}`)
          isFinish.value=rs.data.data.length<1?true:false 
          jobs.value=jobs.value.concat(rs.data.data)  
          page.value++;
        }catch(err){
          errAlert(err)
        }
        close()
      }
      const checkQuery=()=>{
        let t =route.query.txtsearch
        if(t){
          search.value=t
        }
      }
      const getDetail=async ()=>{
        start()
        try{
            let jobid=route.params.jobid
            let rs=await api.get(`callcenter/job/v1/getJobDetail/${jobid}`)
            detail.value=rs.data.data[0]
            pics.value=await getPic(jobid);
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
            job_type.value=rs.data.job_type
        }catch(err){
            errAlert(err)
        }
        close()
    }
      return{
        jobs,
        search,
        total,
        isFinish,
        detail,
        solve,
        job_type,
        pics,
        isPic:store.userData.ses_isPic,
        showDetail,
        more,
        checkQuery,
        getDetail,
      }
}