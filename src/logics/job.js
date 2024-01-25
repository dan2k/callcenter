import { useVuelidate } from "@vuelidate/core";
import { required,minLength,helpers } from "@vuelidate/validators";
import { reactive,ref } from "vue";
import { useAuthStore } from "@/store";
import { api,apiicc,okAlert,errAlert,start,close} from "@/helpers"
import { useRouter } from "vue-router"
import { useUpload } from "@/plugins/fileupload";
export const useJob=()=>{
    const {files}=useUpload()
    files.value.length=0
    const router=useRouter()
    const state = reactive({
    detail: "",
    username: "",
    tel: "",
    job_type:""
    });

    const store=useAuthStore()
    const rawtel=ref('')
    const form=ref(null)
    const isHw=store.userData.ses_isHw
    const validTel=(tel)=> {
        let pattern = new RegExp("[0-9]{3}-[0-9]{3}-[0-9]{4}");
        if (pattern.test(tel)){
            return true;
        }
        return false;
    }
    const validType=(type)=>{
        let r=false;
        if(store.userData.ses_isHw==0){
            r=true;
        }else{
            if(type){
                r=true
            }
        }
        // console.log({r})
        return r
    }
    const roles = {
        detail: { 
            required: helpers.withMessage('กรุณาระบุรายละเอียดของปัญหาให้ครบถ้วน', required), 
            // minLength:helpers.withMessage('กรุณาระบุไม่น้อยกว่า 10 ตัวอักษร',minLength(10))
        },
        username: { 
            required: helpers.withMessage('กรุณาระบุชื่อเพื่อความรวดเร็วในการติดต่อ', required), 
            // minLength:helpers.withMessage('กรุณาระบุไม่น้อยกว่า 5 ตัวอักษร',minLength(5))
        },
        tel: { 
            required: helpers.withMessage('ระบุเบอร์โทร', required), 
            telValid:{
                $validator: validTel,
                $message: 'รูปแบบเบอร์โทรไม่ถูกต้อง ตัวอย่าง 000-000-0000'
            }  
        },
        job_type: { 
            typeValid:{
                $validator: validType,
                $message: 'กรุณาระบุประเภทปัญหา'
            }  
        },
    };
    const v$ = useVuelidate(roles, state);
    const handleBlur = (key) => {
        v$.value[key].$dirty = true;
    };
    const login =async () => {
        const result = await v$.value.$validate()
        if (result) {
            const formData=new FormData();
            
            //clear null objects
            files.value=files.value.filter((ob,i)=>ob.url)
            for(let i=0;i<files.value.length;i++){
                formData.append('file_'+i,files.value[i].obj.files[0]);
            }
            formData.append('tel',rawtel.value)
            formData.append('detail',state.detail)
            formData.append('username',state.username)
            formData.append('job_type',state.job_type)
            formData.append('custptype',store.userData.ses_custptype)
            formData.append('custpcode',store.userData.ses_custpcode)
            start()
            try{
                let rs = await api.post(`callcenter/job/v1/newJob`, formData, {
                    headers: {
                    "Content-Type": "multipart/form-data",
                    },
                });
                // console.log(rs)
                //เพิ่มเติมไปเปิดใน sv_service ด้วย 
                if(state.job_type==1){
                    let userData=rs.data.userData 
                    if(userData.length<1){
                        throw new Error('ไม่พบ user กลางของหน่วยงานนี้จึงไม่สามารถเปิดปัญหาในส่วนของ  sv_service ได้');
                    }else{
                        userData=userData[0]
                        let data={
                            ref_inform3_jobid:rs.data.jobno,
                            msv_type:1,
                            cust_ptype:store.userData.ses_custptype,
                            cust_pcode:store.userData.ses_custpcode,
                            msv_detail:state.detail,
                            user_id:userData.user_id,
                            open_flag:1,//เว็บ
                            line_flag:1,
                            userData		
                        };
                        let rs2=await apiicc.post('v1/saveProblem',{data:data})
                        if(!rs2.data.status){
                            throw new Error('ไม่สามารถสร้าง หมายเลขปัญหาที่ sv_service ได้');
                        }
                    }
                }
               //
                okAlert(rs.data.msg,()=>{
                    router.replace({path:`/followup`})
                })
            }catch(err){
                errAlert(err)
            }
            close()

        }
    };
    
    const reset=()=>{
        form.value.reset()
        v$.value.$reset()
        state.detail=''
        state.username=''
        state.tel=''
        files.value.length=0
    }
    
    return {
        state, 
        isHw,
        rawtel,
        form,
        v$,
        login,
        reset,
        handleBlur,
    }
}