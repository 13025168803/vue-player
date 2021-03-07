<template>
	<!-- 歌单 -->
	<div class="listmain">
		<table class="listretable">
			<tbody>
				<tr v-for="(item,index) in lists" :class="index%2==0?'dark':'bright'" >
					
					<td class="listrepic"><img :src="item.coverImgUrl"></td>
					<td class="listresongname">{{item.name}}</td>
					<td class="listrecount" >{{item.trackCount}}首</td>
					<td class="listrecreator">by {{item.creator.nickname}}</td> 
					<!-- <td class="listreblank"></td> -->
				</tr>
			</tbody>
		</table>
		
	</div>
</template>

<script>
	import axios from 'axios'
	axios.defaults.withCredentials = true
	axios.defaults.baseURL = 'http://localhost:3000/'  
	
	export default {
		name:'resultlist',
		props:['page'],
		data(){
			return{
				keywords:this.$route.query.q,
				// 歌单
				lists:{},
				total:1000,
				// // 当前页数
				// page:4,
				// 页面大小
				pagesize:100,
			}
		},
		created(){
			this.searchlist(this.$route.query.q);
		},
		watch:{
			page(){
				this.searchlist(this.$route.query.q);
			}
		},
		methods:{
			searchlist(keywords){
				this.pagesize=100;
				axios({
					url:'/cloudsearch',
					params:{
						keywords,
						type:1000,
						limit:this.pagesize,
						offset:(this.page - 1) * this.pagesize,
					}
				}).then(res=>{
					console.log(res);
					this.lists=res.data.result.playlists;
					this.total=res.data.result.playlistCount;
					this.$parent.updatecount(this.total);					
				})
			},
			changepage(val){
				// 拿到点击的是哪一页的页码
				this.page = val;
				// console.log(this.page);
				// 重新获取数据
				if(this.selected=='songshow'){
					this.searchsongs(this.keywords);
				}
				if(this.selected=='listshow'){
					this.searchlist(this.keywords);
				}
				if(this.selected=='mvshow'){
					this.searchmv(this.keywords);
				}
				
			},
			playsong(id){
				axios({
				  url: '/song/url',
				  params: {
				    id // id:id
				  }
				}).then(res => {
				  // console.log(res);
				  let url = res.data.data[0].url;
				  // console.log(this.$parent.musicUrl)
				  // 设置给父组件的 播放地址
				  this.$parent.musicUrl = url;
				})
			}
		}
	}
</script>

<style scoped>
	
	/* 歌单表格 */
	.listmain{
		width: 100%;
		height: 100%;
	}
	.listpic{
		width: 7%;
	}
	.listrepic img{
		width:70px;
		height: 70px;
		border-radius: 2px;
	}
	.listresongname{
		width: 40%;
	}
	.listrecount{
		width: 15%;
	}
	.listrecreator{
		width: 35%;
	}
</style>
