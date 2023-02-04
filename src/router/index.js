import {
	createRouter,
	createWebHistory
} from 'vue-router'
import send from '../views/send.vue'
import home from'../views/home.vue'
import list from'../views/list.vue'

const router = createRouter({
	history: createWebHistory(
		import.meta.env.BASE_URL),
	routes: [{
			name:'home',
			path: '/',
			component: home,
		},
		{
			path: '/enter',
			component: () => import('../views/enter.vue'),
			redirect: '/enter/login',
			children: [{
					name:'login',
					path: 'login',
					component: () => import('../views/login.vue'),
				},
				{
					name:'register',
					path: 'register',
					component: () => import('../views/register.vue')
				}
			]
		},
		{
		name:'list'	,
			path: '/list',
			component: list
		},
		{
			name:'send',
			path: '/send',
			// component: () => import('../views/send.vue'),
			component: send
		}
	]
})

export default router
