import {api,errAlert,start,close} from "@/helpers"
import { ref } from "vue";
import 'vue-multiselect/dist/vue-multiselect.css'
import {useAuthStore} from '@/store'
import { useRouter } from "vue-router";
const router=useRouter()
export const useLogin=()=>{
    const username = ref('')
    const custpcode = ref([])
    const custpcodes=ref([])
    const province = ref([])
    const provinces=ref([])
    const store=useAuthStore()
    const isEdit=ref(false)
    const isHw=ref(false)
    const login= async ()=>{
        if(username.value.trim().length<1){
            errAlert('กรุณาระบุชื่อใช้งาน')
            return 
        }
        start()
        try{
            let rs = await api.get(`callcenter/auth/v1/getProvince/${username.value}`)
            if(rs.data.provinces.length<1 && !rs.data.isOne){
                errAlert('ไม่พบชื่อผู้ใช้งานในระบบ กรุณาระบุใหม่อีกครั้ง')
                close()
                return 
            }
            
            isHw.value=rs.data.isHw
            if(rs.data.isOne){
              custpcodes.value=rs.data.data.map((ob,i)=>{
                  return {id:`${ob.cust_ptype}|${ob.cust_pcode}`,text:`${ob.cust_pcode}:${ob.cust_pdesc}`}
              })
              if(custpcodes.value.length==1){
                  custpcode.value=custpcodes.value[0]
                  next()
                  close()
                  return 
              }
            }else{
              provinces.value=rs.data.provinces.map((ob,i)=>{
                  return {id:`${ob.province_id}`,text:`${ob.province_name.replace('จังหวัด',`${ob.province_id}:`)}`}
              })
            }
            isEdit.value=true
            // console.log(custpcodes.value)
        }catch(err){
            errAlert(err)
        }
        close()
    }
    const next=()=>{
        // console.log(custpcode.value)
        if(custpcode.value.length==0){
              errAlert('กรุณาระบุสถานที่ปฏิบัติงาน')
              return 
        }
        // console.log(custpcode.value)
        let {id,text}=custpcode.value
        let tmp=id.split('|')
        let tmp2=text.split(':')
        store.setLogin(tmp[0],tmp[1],tmp2[1],username.value,isHw.value)
      }
      const setPcode=async (opt,index)=>{
        if(opt){
          start()
          try{
              let rs = await api.get(`callcenter/auth/v1/getCustpcode/${username.value}/${opt.id}`)
              custpcodes.value=rs.data.data.map((ob,i)=>{
                    return {id:`${ob.cust_ptype}|${ob.cust_pcode}`,text:`${ob.cust_pcode}:${ob.cust_pdesc}`}
              })
              if(custpcodes.value.length==1){
                custpcode.value=custpcodes.value[0]
                next()
                close()
                 return 
              }
          }catch(err){
            errAlert(err)
          }
          close()
        }
      }
      const checkLogin=()=>{
        if(store.isLogin){
            router.replace({path:'/'})
            return 
        }
        store.$reset()
      }
      return {
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
      }
}