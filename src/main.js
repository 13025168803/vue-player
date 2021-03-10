import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入
import VueRouter from 'vue-router'
// use
Vue.use(VueRouter)

// 导入懒加载插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

// 按需导入 element-ui组件
import {Carousel,CarouselItem,Button,Message,Pagination,Tabs,TabPane} from 'element-ui';
Vue.prototype.$message = Message;
Vue.component('el-button', Button);
Vue.component('el-carousel',Carousel);
Vue.component('el-carousel-item',CarouselItem);
Vue.component('el-pagination',Pagination);
Vue.component('el-tabs',Tabs);
Vue.component('el-tab-pane',TabPane);

// 导入vue-video-player
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)

// 导入 需要通过路由管理的组件
const discovery = () => import('./components/discovery.vue')
const songs = () => import('./components/songs.vue')
const playlists = () => import('./components/playlists.vue')
const mvs = () => import('./components/mvs.vue')
const result = () => import('./components/result.vue')
const resultsong = () => import('./components/resultsong.vue')
const resultlist = () => import('./components/resultlist.vue')
const resultmv = () => import('./components/resultmv.vue')
const mvdetail = () => import('./components/mvdetail.vue')

// 创建路由
let router = new VueRouter({
  routes:[
    // 配置地址 和 组件的对应关系
    {
      // 地址
      path:"/discovery",
      // 组件
      component:discovery
    },
    {
      // 地址 空地址 
      path:"/",
      // 组件
      component:discovery
    },
    {
      // 地址
      path:"/playlists",
      // 组件
      component:playlists
    },
    {
      // 地址
      path:"/songs",
      // 组件
      component:songs
    },
    {
      // 地址
      path:"/mvs",
      // 组件
      component:mvs
    },
    {
      // 地址
      path:"/result",
      // 组件
      component:result,
	  children:[
			{
				path:'resultsong',
				component:resultsong,
				name:'resultsong'
			},
			{
				path:'resultlist',
				component:resultlist,
				name:'resultlist'
			},
			{
				path:'resultmv',
				component:resultmv,
				name:'resultmv'
			}
	  ]
    },
	{
	  // 地址
	  path:"/mvdetail",
	  // 组件
	  component:mvdetail
	},
  ]
})



new Vue({
  render: h => h(App),
  // 挂载到Vue实例上
  router// router:router
}).$mount('#app')

// import axios from 'axios'
// axios.defaults.withCredentials = true// 允许跨域设置，不然可能因为拿不到cookie而报错

// axios.defaults.baseURL = 'http://localhost:3000/'   /*这里的地址就是刚刚启起来的服务器地址  */