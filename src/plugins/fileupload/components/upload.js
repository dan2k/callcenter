import uniqid from 'uniqid';
import {nextTick,inject} from "vue"
import { MY_FILEUPLOAD_KEY } from '../key';
import { errAlert } from "@/helpers"
export const useUpload=(props,)=>{
    const files=inject(MY_FILEUPLOAD_KEY)
    const trash=(f)=>{
        files.value=files.value.filter((ob,_)=>ob.id!=f.id)
    }
    const addImage=async ()=>{
        var id=uniqid()
        files.value=files.value.filter((ob,_)=>ob.url)
        files.value.push({ name: "", size: 0,url:null,obj:null,id})
        await nextTick(()=> {
            var inputId = "file-" + (files.value.length-1);
            document.getElementById(inputId).click();
            var div=document.getElementById(inputId).parentElement
            div.style.display='none'
        });   
    }
    const fileTypeValid = (f, fileTypes) => {     
        //console.log(f,fileTypes)
        let ck=false
        fileTypes.forEach((v,i)=>{
            let tmp=v.split('/')
            let tmp2=f.type.split('/')
            if(v==='*'){
                ck=true
                return
            }else if(tmp[1]==='*'){
                if(tmp[0]===tmp2[0]){
                    ck=true
                    return 
                } 
            }else{
                if(f.type===v){
                    ck=true
                    return
                }
            }
        })
        // fileTypes.some((fileType) => fileType === file.type);
        return ck
    }
    const upload=(file,e)=>{
        const size=props.size
        let f = e.target.files[0];
        file.name = f.name;
        file.size = f.size;
        var div=e.target.parentElement
        div.style.display=''
        if(!fileTypeValid(f,props.fileTypes)){
            errAlert(`กรุณาระบุประเภทไฟล์ตามนี้เท่านั้น <br>[${props.fileTypes.join(',')}]`)
            trash(file)
            return
        }
        if (file.size > (size * 1024)) {
            //300 kib
            errAlert(`ขนาดไฟล์ไม่ควรเกิน ${size} kb`);
            trash(file)
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
    return {addImage,upload,trash,files}
}