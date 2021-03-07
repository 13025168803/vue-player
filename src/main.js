import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入
import VueRouter from 'vue-router'
// use
Vue.use(VueRouter)
// 导入 需要通过路由管理的组件
import discovery from './components/discovery.vue'
import playlists from './components/playlists.vue'
import songs from './components/songs.vue'
import mvs from './components/mvs.vue'
import result from './components/result.vue'
import resultsong from './components/resultsong.vue'
import resultlist from './components/resultlist.vue'
import resultmv from './components/resultmv.vue'
import mvdetail from './components/mvdetail.vue'
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

// 导入 element-ui
import ElementUI from 'element-ui'
// 导入 element-ui 的样式
import 'element-ui/lib/theme-chalk/index.css';
// use一下
Vue.use(ElementUI)

// 导入vue-video-player
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)

new Vue({
  render: h => h(App),
  // 挂载到Vue实例上
  router// router:router
}).$mount('#app')

// import axios from 'axios'
// axios.defaults.withCredentials = true// 允许跨域设置，不然可能因为拿不到cookie而报错

// axios.defaults.baseURL = 'http://localhost:3000/'   /*这里的地址就是刚刚启起来的服务器地址  */