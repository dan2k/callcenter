import { useVuelidate } from "@vuelidate/core";
import { required,minLength,helpers } from "@vuelidate/validators";
import { reactive,ref,nextTick } from "vue";
import { useAuthStore } from "@/store";
import { api,okAlert,errAlert,start,close} from "@/helpers"
import uniqid from 'uniqid';
import { useRouter } from "vue-router"
export const useJob=()=>{
    const router=useRouter()
    const state = reactive({
    detail: "",
    username: "",
    tel: "",
    });
    const store=useAuthStore()
    const files=ref([])
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
            required: helpers.withMessage('ระบุรายละเอียดของปัญหา', required), 
            minLength:helpers.withMessage('กรุณาระบุไม่น้อยกว่า 10 ตัวอักษร',minLength(10))
        },
        username: { 
            required: helpers.withMessage('ระบุชื่อผู้แจ้ง', required), 
            minLength:helpers.withMessage('กรุณาระบุไม่น้อยกว่า 5 ตัวอักษร',minLength(5))
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
    //   console.log(v$)
        v$.value[key].$dirty = true;
    };
    const login =async () => {
        const result = await v$.value.$validate()
        if (result) {
            const formData=new FormData();
            // console.log(files)
            for(let i=0;i<files.value.length;i++){
                // console.log(i)
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
    const trash=(f)=>{
        files.value=files.value.filter((ob,i)=>ob.id!=f.id)
    }
    const reset=()=>{
        form.value.reset()
        v$.value.$reset()
        state.detail=''
        state.username=''
        state.tel=''
        files.value.length=0
    }
    const addImage=()=>{
        var id=uniqid()
        files.value.push({ name: "", size: 0,url:null,obj:null,id})
        nextTick(()=> {
            var inputId = "file-" + (files.value.length-1);
            document.getElementById(inputId).click();
            var div=document.getElementById(inputId).parentElement
            div.style.display='none'
        });  
    }

    const upload=(file,e)=>{
        let f = e.target.files[0];
        file.name = f.name;
        file.size = f.size;
        var div=e.target.parentElement
        div.style.display=''
        if (file.size > 300 * 1024) {
            //300 kib
            alert('ขนาดไฟล์ไม่ควรเกิน 300 kb')
            files.value.pop(file)
            return 
        }
        let input=e.target;
        if (input.files && input.files[0]) {
            // create a new FileReader to read this image and convert to base64 format
            var reader = new FileReader();
            // Define a callback function to run, when FileReader finishes its job
            reader.onload = (e) => {
                // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                // Read image as base64 and set to imageData
                file.url = e.target.result;
                file.obj=input
            }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
        }
    }
    return {
        state, 
        files,
        rawtel,
        form,
        v$,
        login,
        trash,
        reset,
        upload,
        addImage,
        handleBlur,
    }
}