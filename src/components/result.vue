<template>
	<div class="result">
		<div class="resulttop">
			{{this.$route.query.q}}<span>找到{{total}}个结果</span>
		</div>
		<div class="resulttitle">
			<el-tabs v-model="activeTab" @tab-click="handleClick" class="titlenav" >
			    <el-tab-pane label="歌曲" name="first">歌曲</el-tab-pane>
			    <el-tab-pane label="歌单" name="second">歌单</el-tab-pane>
			    <el-tab-pane label="MV" name="third">MV</el-tab-pane>
			</el-tabs>
		</div>
		<div class="resultmain">
			<!-- 歌曲 歌单 MV -->
			<router-view :page="page"></router-view>
		</div>
		
		
		
		
		
		<!-- 歌单 -->
		<!-- <div class="listmain" :class="selected=='listshow'?'a':'hide'">
			<table class="listretable">
				<tbody>
					<tr v-for="(item,index) in lists" :class="index%2==0?'dark':'bright'" >
						
						<td class="listrepic"><img :src="item.coverImgUrl"></td>
						<td class="listresongname">{{item.name}}</td>
						<td class="listrecount" >{{item.trackCount}}首</td>
						<td class="listrecreator">by {{item.creator.nickname}}</td> 
					</tr>
				</tbody>
			</table>
		</div> -->
		<!-- MV -->
		<!-- <div class="mvmain" :class="selected=='mvshow'?'a':'hide'">
			<div class="mvsitem" v-for="(item,index) in mvs" :key="index">
				<img :src="item.cover" />
				<div class="mvplaycount">
					<div class="mvcountcontainer">
						<span>{{item.playCount}}</span><div class="mvvplaycount"></div>
					</div> 
				</div>
				<p class="mvname">{{item.name}}</p>
				<p class="mvsinger">{{item.artists[0].name}}</p>
			</div>
		</div> -->
		<!-- 分页 -->
		<div class="resultbottom">
			<el-pagination
			  @current-change="changepage"
			  background
			  layout="prev, pager, next"
			  :total="total"
			  :current-page="page"
			  :page-size="pagesize"
			  >
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import resultlist from './resultlist.vue'
	import axios from 'axios'
	axios.defaults.withCredentials = true
	axios.defaults.baseURL = 'http://localhost:3000/'  
	
	export default {
		name:'resultsong',
		data(){
			return{
				//默认选中标签
				activeTab: 'first',
				keywords:this.$route.query.q,
				// 结果个数
				total:1000,
				// 当前页数
				page:1,
				// 页面大小
				pagesize:100,
			}
		},
		watch:{
			'$route.query.q':function(){
				this.keywords=this.$route.query.q;
				this.activeTab="first";
				this.$router.push('/result/resultsong?q='+this.keywords);
			}
		},
		created(){
			this.$router.push('/result/resultsong?q='+this.keywords);
		},
		methods:{
			// 搜索结果标签栏 切换标签事件
			handleClick(tab) {
			    // console.log(tab.$el.innerHTML);
				this.page=1;
				if(tab.$el.innerHTML=='歌曲'){
					this.$router.push('/result/resultsong?q='+this.keywords);
				}
				else if(tab.$el.innerHTML=='歌单'){
					this.$router.push('/result/resultlist?q='+this.keywords);
				}
				else{
					this.$router.push('/result/resultmv?q='+this.keywords);
				}
			},
			updatecount(data){
				this.total=data;
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
			playsong(url){
				this.$parent.musicUrl = url;
			}
		}
	}
	
</script>

<style scoped>
	
	.result{
		width: 90%;
		/* height: 1000px; */
		margin: 10px auto;
		margin-top: 80px;
		margin-left: 150px;
		overflow: hidden;
		position: relative;
	}
	
	.resulttop{
		width: 70%;
		height: 50px;
		padding: 0;
		margin: 0 auto;
		margin-top: 20px;
		/* background-color: brown; */
		font-size: 30px;
		font-weight: 600px;
		line-height: 50px;
		padding-left: 18px;
		
	}
	.resulttop span{
		color: #B1B1B1;
		font-size: 18px;
		padding: 0;
		margin: 0 5px;
		line-height: 50px;
	}
	/* 搜索结果标签栏 */
	.resulttitle{
		width: 68%;
		height: 40px;
		overflow: hidden;
		padding: 0;
		margin: 2px auto;
		
		/* background-color: aqua; */
	}
	/deep/ .el-tabs__item.is-active{
		color: #c3473a;
	}
	/deep/ .el-tabs__active-bar{
		background-color: #c3473a;
	}
	/deep/.el-tabs__item {
	  font-size: 18px !important;
	/*  color: #c3473a; */
	}
	/* 歌曲表格 */
	.resultmain,.mvmain{
		width: 80%;
		/* height: 5100px; */
		overflow: hidden;
		margin: 50px auto;
		margin-left: 12%;
		/* background-color: #000000; */
	}
	/* mv */
	.mvmain{
		width: 100%;
		height: 800px;
		margin: 0;
	}
	/* 分页 */
	.resultbottom{
		width: 400px;
		height: 30px;
		margin-left: 40%;
		margin-bottom: 100px;
	}
	/* 切换歌曲歌单mv div */
	.hide{
		display: none;
	}
</style>
