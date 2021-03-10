<template>
	<div class="playlist">
		<div class="ptop">
			<img v-lazy="toplist.coverImgUrl" class="cover"/>
			<div class="statetop">精品歌单</div>
			<div class="statemiddle">{{toplist.copywriter}}</div>
			<div class="statebottom">
				{{toplist.description}}
			</div>
			<img v-lazy="toplist.coverImgUrl" alt="1" class="bg" />
			<div class="bg-mask"></div>
		</div>
		<div class="pmiddle">
			  <div class="pcontainer">
				   <span v-for="(item,index) in gedantitle" @click="change(item.name,index)" :class="selected==index?'active':'noacitive'">{{item.name}}</span>
			  </div>
		</div>
		<div class="pmain">
			<div class="pitem" v-for="(item,index) in list" :key="index">
				<!-- <span class="pspan">{{item.copywriter}}</span> -->
				<img v-lazy="item.coverImgUrl" />
				<div class="pplaycount">
					<div class="pcountcontainer">
						<span>{{item.playCount}}</span><div class="pppplaycount"></div>
					</div> 
				</div>
				
				<div class="pplay">
					<div class="icon-play" @click="playgedan(item.id)" ></div>
				</div>
				<div class="pdescription">{{item.description}}</div>
			</div>
		</div>
		<!-- 分页 -->
		<div class="pbottom">
			<el-pagination
			  @current-change="changepage"
			  background
			  layout="prev, pager, next"
			  :total="total"
			  :current-page="page"
			  >
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	axios.defaults.withCredentials = true// 允许跨域设置，不然可能因为拿不到cookie而报错
	axios.defaults.baseURL = 'http://localhost:3000/'   /*这里的地址就是刚刚启起来的服务器地址  */
	
	export default{
		data(){
			return{
				// 歌单分类标签
				gedantitle:{},
				// 歌单标签选中
				selected:'-1',
				// 置顶歌单信息
				toplist:{},
				// 歌单
				list:{},
				// 当前标签的歌单页数
				page:1,
				// 当前标签的歌单总页数
				total:1000,
				// 当前标签
				tags:'全部'
			}
		},
		created(){
			// 拿到歌单分类标签
			axios({
				url:'/playlist/hot',
				// params:{
				// 	limit:10,
				// }
			}).then(res=>{
				// console.log(res);
				this.gedantitle=res.data.tags;
			}),
			//拿到顶部的歌单信息
			axios({
				url:'/top/playlist/highquality'
			}).then(res=>{
				// console.log(res);
				this.toplist=res.data.playlists[0];
			}),
			// 拿到最开始的10个歌单信息
			this.change(this.tags,this.selected)
		},
		methods:{
			change(tags,index){
				axios({
					url:'/top/playlist',
					params:{
						cat:tags,
						offset: (this.page - 1) * 10,
						limit:10,
					}
				}).then(res=>{
					// console.log(res);
					this.selected=index;
					this.total = res.data.total;
					this.list=res.data.playlists;
					if(tags!=this.tags){
						this.page=1;
					}
				})
			},
			playgedan(id) {
			  // console.log(id)
			  axios({
			    url: '/playlist/detail',
			    params: {
			      id // id:id
			    }
			  }).then(res => {
			    // console.log(res);
			    let music={title:'',artist:'',src:'',pic:''};
				let item=res.data.playlist.tracks;
			    music.title=item[0].name;
			    music.pic=item[0].al.picUrl;
			    music.artist= this.$parent.artistname(item[0].ar);
			    axios({
			      url: '/song/url',
			      params: {
			        id:item[0].id // id:id
			      }
			    }).then(res => {
			    	// console.log(res);
			    	if(res.data.data[0].url==null){
			    		this.$parent.open();
			    	}
			    	else{
			    		music.src= res.data.data[0].url;
			    		// console.log(music);
			    		this.$set(this.$parent.audio,0,music);
			    	}
			    })
			  })
			},
			changepage(val){
				// 拿到点击的是哪一页的页码
				this.page = val;
				// console.log(this.page);
				// 重新获取数据
				this.change(this.tags,this.selected);
			}
		}
	}
</script>

<style>
	
	.playlist{
		width: 90%;
		height: 1000px;
		margin-left: 150px;
		margin-top: 80px;
		overflow: hidden;
	}
	.ptop{
		width: 1100px;
		height: 180px;
		margin: 5px auto;
		border-radius: 5px;
		/* display: inline-block; */
		position: relative;
		overflow: hidden;
	}
	.cover{
		width: 150px;
		height: 150px;
		margin: 15px;
	}
	.bg{
		width: 100%;
		height: 400px;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: -10;
		/* opacity: 0.3; */
		filter: blur(30px);
	}
	.statetop{
		display: inline-block;
		width: 100px;
		height: 30px;
		border: solid 1px #ff0000;
		border-radius: 5px;
		position: absolute;
		top: 15px;
		color: #ff0000;
		text-align: center;
		line-height: 30px;
		font-size: 15px;
	}
	.statemiddle{
		display:inline-block ;
		width: 70%;
		height: 30px;
		position: absolute;
		top: 50px;
		color: white;
		margin: 2px auto;
	}
	.statebottom{
		display: inline-block;
		width: 79%;
		height: 80px;
		margin: 5px 0;
		position: absolute;
		top: 70px;
		font-size: 15px;
		color: #3d3d3d;
		overflow: hidden;
	}
	/* 中间的标签栏 */
	 .pmiddle{
		 width: 65%;
		 height: 30px;
		 /* margin: 20px auto; */
		 margin: 20px 0;
		 margin-left: 330px;
	 }
	 .pcontainer{
		 float: right;
	 }
	 .pmiddle span{
		 margin: 5px 10px;
	 }
	 .pmiddle span:hover{
		 cursor: pointer;
	 }
	 .active{
		 color: #FF0000;
	 }
	 .noacitive{
		 color: #272727;
	 }
	 /* 推荐歌单内容 */
	 .pmain{
	 	width: 90%;
	 	height: 500px;
	 	margin: 5px auto;
		margin-left: 100px;
	 }
	 .pitem{
	 	width: 200px;
		height: 240px;
	 	margin: 5px 10px;
	 	display: inline-block;
	 	position: relative;
	 	/* border-radius: 15px; */
	 	overflow: hidden;
	 }
	 .pitem:hover .pplay{
	 	transition: all 0.5s;
	 	opacity: 0.8;
	 	cursor: pointer;
	 }
	 .pitem img{
	 	width: 190px;
	 	height: 190px;
	 	/* border:  solid black 1px; */
	 	border-radius: 15px;
	 }
	 .pdescription{
	 	width: 180px;
	 	height: 40px;
		overflow: hidden;
	 	font-family: "arial black";
	 	font-size: 15px;
		display: inline-block;
	 }
	 /* 画个圆儿 */
	 .pplay{
	 	display: inline-block;
	 	width: 60px;
	 	height: 60px;
	 	top:120px;
	 	background: white;
	 	right: 15px;
	 	opacity:0;
	 	border-radius: 30px;
	 	position: absolute;
	 }
	 
	 .pplaycount{
		 display: inline-block;
	 	width: 93%;
	 	height: 30px;
	 	position: absolute;
	 	right: 15px;
	 	top: 2px;
	 	color: white;
		
	 }
	 .pcountcontainer{
		 float: right;
		 display: inline-block;
	 }
	 .pppplaycount{
	 	width: 0;
	 	height: 0;
		float: right;
	 	display: inline-block; 
		margin-top: 5px;
	 	border-top: 5px solid transparent;
	 	border-left: 10px solid white;
	 	border-bottom: 5px solid transparent;
	 }
	 .pcountcontainer span{
		 float: right;
	 }
	 /* 底部分页 */
	 .pbottom{
		 width: 400px;
		 height: 30px;
		 margin: 15px auto;
		 margin-top: 100px;
	 }
</style>
