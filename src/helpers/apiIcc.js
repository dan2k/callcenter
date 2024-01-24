import axios from "axios";
// import { useRouter } from 'vue-router'
// import router from "@/route"
// import { useAuthStore } from "@/store"
const obj = axios.create({
	baseURL: import.meta.env.VITE_AXIOS_BASE_ICC_URL,
	timeout: 10000,
	params: {}, // do not remove this, its added to add params later in the config
});
/*obj.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		if (error.response.status === 401) {
			let store=useAuthStore()
			store.$reset()
			// const router=useRouter()
			router.replace({path:'/login'})
		}
		return Promise.reject(error);
	}
);*/
export const apiicc = obj;
