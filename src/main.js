import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/route";
import { plugin as storePlugin } from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "@/assets/js/fontawesome";
import "@/assets/js/regular";
import "@/assets/js/solid";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Maska from 'maska'
//test plugin
import {FileUpload} from "@/plugins/fileupload"
const app=createApp(App)
app.config.devtools = true;
app.use(VueSweetalert2);
app.use(Maska);
window.Swal =  app.config.globalProperties.$swal;
app.use(storePlugin)
app.use(router)
//test plugin
app.use(FileUpload,{size:300})
router.isReady().then(() => {
    app.mount('#app')
})

