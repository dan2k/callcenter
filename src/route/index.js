import { useAuthStore } from "@/store"
import {
	createRouter,
	createWebHistory,
} from "vue-router";

import { close, start } from '@/helpers/nprogress'
async function beforeEnter(to, from, next) {

    const store=useAuthStore()
	await store.checkLogin()
	if (store.isLogin) {
		next()
		return;
	}
	store.$reset()
	next("/login");
}
const routes = [
	{
		path: "/:pathMatch(.*)*",
		name: "PageNotFound",
		component: () => import("../views/error.vue"),
	},
	{
		path: "/",
		component: () => import("../views/main.vue"),
		children:[
			{
				path: '',
				name: 'index',
				component: ()=>import("@/views/index.vue"),
				beforeEnter: beforeEnter,
			},
			{
				path: 'job',
				name: 'job',
				component: ()=>import("@/views/job.vue"),
				beforeEnter: beforeEnter,
			},
			{
				path: 'followup',
				name: 'followup',
				component: ()=>import("@/views/followup.vue"),
				children:[
					{
						path: '',
						name:'followup-list',
						component: ()=>import("@/views/followup/followup-list.vue"),
						beforeEnter: beforeEnter,
					},
					{
						path: ':jobid',
						name:'followup-detail',
						component: ()=>import("@/views/followup/followup-detail.vue"),
					},
				],
			},
			{
				path: 'manual',
				name: 'manual',
				component: ()=>import("@/views/manual.vue"),
				beforeEnter: beforeEnter,
			},
			{
				path: 'search',
				name: 'search',
				component: ()=>import("@/views/search.vue"),
				children:[
					{
						path: '',
						name:'search-list',
						component: ()=>import("@/views/search/search-list.vue"),
						beforeEnter: beforeEnter,
					},
					{
						path: ':jobid',
						name:'search-detail',
						component: ()=>import("@/views/search/search-detail.vue"),
					},
				],
			},
		],
		
	},
	{
		path: "/login",
		name: "login",
		component: () => import("../views/login.vue"),
		// beforeEnter: beforeEnter,
	},
	
]
const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_PRIVATE_BASE_URL),
	routes,
});
router.beforeEach((pre, next) => {
	start()
})
router.afterEach(() => {
	close()
})
export default router;