<script setup>
	import {RouterLink,RouterView,useRoute,useRouter} from 'vue-router';
	import {ref,reactive,computed} from "vue";
	import	{useStore} from './store/index.js';
	import msg from './components/myMessage.js';
	
	const store=useStore();
	const router = useRouter();
	const route = useRoute();
	let login = computed(()=>store.login);
	let show = ref(false);
	let title = ref('--提示--');
	let text = ref('确定退出吗?');

	function quit(){
		show.value=false;
		store.login=false;
		router.push('/');
	}
</script>
<template>
	<div class="content">
		<!-- 弹窗 -->
		<el-dialog v-model="show" :title="title" width="30%" center>
		    <span>{{text}}</span>
		    <template #footer>
		      <span class="dialog-footer">
				<el-button type="primary" @click="quit" >确定</el-button>
		        <el-button @click="show = false">取消</el-button>
		      </span>
		    </template>
		  </el-dialog>
		<!-- 头部 -->
		<header>
			<img src="./assets/homeicon.png" alt="" class="icon first" />
			<el-menu :default-active="route.path" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
				<el-menu-item index="/">首页</el-menu-item>
				<el-menu-item index="/send" >我要寄件</el-menu-item>
				<el-menu-item index="/list" >快件查询</el-menu-item>
			</el-menu>
			<router-link class="login to" v-if="!login" to="/enter" >快速登录/注册</router-link>
			<div class="login" v-else>
					<img src="./assets/head.jpg" alt="" class="icon" @click="router.push('/list')"/>
				<span>你好!{{store.user.userName}}</span>
				<a @click="show=true" >
					<img src="./assets/end.svg" alt="" class="icon"/>
				</a>
			</div>
		</header>

		<div class="body" >
			<router-view/>
		</div>
		<!-- 底部 -->
		<footer>
			<p>版权所有</p>
			<p>版权所有</p>
		</footer>
	</div>
</template>

<style scoped lang="scss">
	@import'./assets/global.scss';
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		text-align: center;
	}

	header {
		padding: 0px 20px;
		flex: 0 0 50px;
		display: flex;
		background-color: $theme-color;
		justify-content: space-between;
		align-items: center;
		.el-menu {
			width: 330px;
			display: flex;
			border-bottom: none;
			margin:{
				left: 10px;
				right: 10px;
			}
		}

		.icon {
			width: 45px;
			height: 45px;
		}

		.first {
			border-radius: 0;
			box-shadow: 0px 0px 2px black;
			background-color: aquamarine;
			
		}

		.login {
			display: inline-flex;
			height: 100%;
			align-items: center;
			justify-content: space-evenly;
			color: white;
			.icon {border-radius: 50%; padding: 5px;}
			.icon:hover {
				padding: 0px;
			}
		}
	}

	.body {
		flex: auto;
	}

	footer {
		flex: 0 0 50px;
	}
</style>
