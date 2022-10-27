import { defineStore } from 'pinia'
import { api,errAlert,start,close } from "@/helpers"
import router  from "@/route"
export const useAuthStore = defineStore('auth-store',  {
  state:()=>{
    return{
      isLogin:false,
      userData:null,
      custpdesc:null,
    }
  },
  actions:{
    async checkLogin(){
      start()
      try{
        let res=await api.get('callcenter/auth/v1/login')
        this.isLogin=res.data.status
        this.userData=res.data.user 
      }catch(err){
        // errAlert(err)
        console.log(err)
      }
      close()
    },
    async logout(){
      start()
      try{
        let res=await api.post('callcenter/auth/v1/logout')
        this.$reset()
        router.replace({path:'/login'})
      }catch(err){
        errAlert(err)
        console.log(err)
      }
      close()
    },
    async setLogin(custptype,custpcode,custpdesc,user){
      start()
      try{
        let res=await api.post(`callcenter/auth/v1/setLogin/${custptype}/${custpcode}/${user}`)
        await this.checkLogin()
        if(this.isLogin){
          this.custpdesc=custpdesc
        }
        router.replace({path:'/'})
      }catch(err){
        errAlert(err)
        console.log(err)
      }
      close()
    }
  }
})
