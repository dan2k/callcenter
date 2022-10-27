import Upload from './components/upload.vue'
import { ref} from 'vue'
import { MY_FILEUPLOAD_KEY } from './key';
export const FileUpload = {
    install(app, options) {
        // makes ColoredText available in your Vue.js app as either "$this.coloredText" (in your Source) or "{{ $coloredText }}" in your templates
        // app.config.globalProperties.$uploadSize=options?.size
        // register Headline as a global component, so you can use it wherever you want in your app
        app.component('Upload', Upload)
        app.provide(MY_FILEUPLOAD_KEY,ref([]) );
    }
}

