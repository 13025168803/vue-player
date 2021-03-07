<template>
	<!-- MV -->
	<div class="remvmain" >
		<div class="mvsitem" v-for="(item,index) in mvs" :key="index" @click="playvideo(item.id)">
			<img :src="item.cover" />
			<div class="mvplaycount">
				<div class="mvcountcontainer">
					<span>{{item.playCount}}</span><div class="mvvplaycount"></div>
				</div> 
			</div>
			<p class="mvname">{{item.name}}</p>
			<p class="mvsinger">{{item.artists[0].name}}</p>
		</div>
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
				mvs:{},
				total:1000,
				// 页面大小
				pagesize:100,
			}
		},
		created(){
			this.searchmv(this.$route.query.q);
		},
		watch:{
			page(){
				this.searchmv(this.$route.query.q);
			}
		},
		methods:{
			searchmv(keywords){
				this.pagesize=12;
				axios({
					url:'/cloudsearch',
					params:{
						keywords,
						type:1004,
						limit:this.pagesize,
						offset:(this.page - 1) * this.pagesize,
					}
				}).then(res=>{
					console.log(res);
					this.mvs=res.data.result.mvs;
					for(let i=0;i<this.mvs.length;i++){
						if(this.mvs[i].playCount>10000){
							this.mvs[i].playCount=parseInt(this.mvs[i].playCount/10000)+'万';
						}
					}
					
					this.total=res.data.result.mvCount;
					this.$parent.updatecount(this.total);
					// console.log(this.total);
				})
			},
			// 播放MV
			playvideo(id){
				this.$router.push('/mvdetail?q='+id);
			}
		}
	}
</script>

<style>
	.remvmain{
		width: 100%;
		height: 800px;
		margin: 0;
	}
</style>
