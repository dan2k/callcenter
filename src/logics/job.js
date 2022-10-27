import { useVuelidate } from "@vuelidate/core";
import { required,minLength,helpers } from "@vuelidate/validators";
import { reactive,ref } from "vue";
import { useAuthStore } from "@/store";
import { api,okAlert,errAlert,start,close} from "@/helpers"
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
    });
    const store=useAuthStore()
    const rawtel=ref('')
    const form=ref(null)
    const validTel=(tel)=> {
        let pattern = new RegExp("[0-9]{3}-[0-9]{3}-[0-9]{4}");
        if (pattern.test(tel)){
            return true;
        }
        return false;
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
        rawtel,
        form,
        v$,
        login,
        reset,
        handleBlur,
    }
}