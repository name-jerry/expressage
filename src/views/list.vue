<script setup>
  import myverify from '../components/myverify .vue';
  import withLoading from '../components/withLoading.js';
  import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
  import { useStore } from '../store/index.js';
  import { ref, reactive, computed, inject, onMounted } from "vue";
  import axios from "axios";
  import { ElMessage } from 'element-plus';
  let store = useStore();
  const router = useRouter();
  const route = useRoute();
  let url = inject('url');
  let login = computed(() => store.login);
  let expressId = ref('');
  let pageSize = ref(4);
  let currentPage = ref(1);
  //自动更改显示数量
  let content = ref();
  let test = ref();
  const myObserver = new ResizeObserver(entries => {
    if (!entries[1] || currentPage.value != 1) return;
    let testH = entries[1].contentRect.height;
    if (testH > 100) {
      pageSize.value++;
    } else if (testH < 10 && pageSize.value > 4) {
      pageSize.value--;
    }

  });
  onMounted(() => {
    let height = test.value.offsetHeight;
    if (height > 600) {
      pageSize.value += 5;
    } else if (height > 400) {
      pageSize.value += 4;
    }
    myObserver.observe(content.value);
    myObserver.observe(test.value);
  });
  //默认加载
  withLoading(axios)({
    url: url + "/express/list",
    method: "get"
  }).then(res => {
    if (!res?.data?.data) return ElMessage('请使用火狐浏览器,否则无法正常获取后端数据');
    store.data = res.data.data;
  })
  console.log(store.data)
  let list = computed(() => {
    if (store.data.list) return store.data.list;
    return [];
  });
  let showList = computed(() => list.value.filter((value, index) => index >= (currentPage.value - 1) * pageSize.value &&
    index <= currentPage.value * pageSize.value - 1));
  let total = computed(() => list.value.length);
  // 搜索按钮
  function search() {
    if (expressId.value) {
      withLoading(axios)({
        url: url + "/express/info?expressId=" + expressId.value,
        method: "get"
      }).then(res => {
        if (res.data.errcode == 0) return store.data.list = [res.data.data.express];
        ElMessage(res.data.errmsg)
      })
    } else {
      withLoading(axios)({
        url: url + "/express/list",
        method: "get"
      }).then(res => {
        console.log(res.data.data);
        store.data = res.data.data;
      })
    }
  }
  //撤回
  //操作
  // function operate({url,data,method = 'get',isShow,type}) {
  // 	console.log('operate',optionData.list)
  // 		withLoading(axios)({
  // 				url,
  // 				method,
  // 				data
  // 			})
  // 			.then(res => {
  // 				getList({
  // 					data: {
  // 						current: 0,
  // 						size: 100,
  // 						networkId: store.user.networkId
  // 					},
  // 					url: listUrl.value,
  // 				});
  // 				console.log('axios返回', res.data);
  // 			})
  // }
</script>

<template>
  <div class="content" ref="content">
    <el-input v-model="expressId">
      <template #prepend>
        单号:
      </template>
      <template #append>
        <el-button type="primary" @click="search">搜索</el-button>
      </template>
    </el-input>
    <template v-if="store.data!=''">
      <el-table :data="showList" border table-layout="auto">
        <el-table-column prop="expressId" label="快递单号" />
        <el-table-column label="寄件人">
          <template #default='{ row, column, $index }'>
            {{row.senderName}}<br />{{row.senderPhone}}
          </template>
        </el-table-column>
        <el-table-column label="寄件人地址">
          <template #default='{ row, column, $index }'>
            {{row.senderProvince}}&nbsp{{row.senderCity}}{{row.senderArea}}<br />{{row.senderAddress}}
          </template>
        </el-table-column>
        <el-table-column label="收件人">
          <template #default='{ row, column, $index }'>
            {{row.receiverName}}<br />{{row.receiverPhone}}
          </template>
        </el-table-column>
        <el-table-column label="收件人地址">
          <template #default='{ row, column, $index }'>
            {{row.receiverProvince}}{{row.receiverCity}}{{row.receiverArea}}<br />{{row.receiverAddress}}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default='{ row, column, $index }'>
            <template v-if="row.status==0">待审核</template>
            <template v-else-if="row.status==1">待揽件</template>
            <template v-else-if="row.status==2">揽件中</template>
            <template v-else-if="row.status==3">运输中</template>
            <template v-else-if="row.status==4">派件中</template>
            <template v-else-if="row.status==5">已投妥</template>
            <template v-else-if="row.status==8">已撤单</template>
            <template v-else-if="row.status==9">已拒收</template>
            <template v-else>{{row.status}}</template>
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="重量" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="gmtCreate" label="下单时间" />
        <!-- <el-table-column label="操作">
				<template #default='{ row, column, $index }'>
					<el-button type="primary" :disabled="row.status!=2" @click="operate({url:'/express/list',})">撤回</el-button>
				</template>
			</el-table-column> -->
      </el-table>
    </template>
    <el-pagination :hide-on-single-page="total<=pageSize" background layout="prev, pager, next" :page-size='pageSize'
      :total="total" v-model:current-page="currentPage" />
    <div ref="test" class="flex-auto" />
  </div>

</template>

<style scoped lang="scss">
  .flex-auto {
    flex: auto;
  }

  .content {
    display: flex;
    flex-flow: column;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 1%;
    background-image: linear-gradient(160deg, #00ffd5 20%, #008cff 80%);

    .el-input {
      margin-bottom: 20px;
    }
  }

  .el-table :deep(.cell) {
    text-align: center;
  }
</style>
