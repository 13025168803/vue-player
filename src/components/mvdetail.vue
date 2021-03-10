<template>
	<div class="mvdetail">
		<div class="mleft">
			<div class="mlefttop">
				<span class="el-icon-arrow-left" @click="$router.back()"></span> MV详情
			</div>
			<div class="mvplayer">
				<video-player class="video-player vjs-custom-skin"
					ref="videoPlayer"
					:playsinline="true"
					:options="playerOptions">
				</video-player>
			</div>
			<div class="mvdetailmessage">
				<div class="mdmtop">
					<img v-lazy="detail.pic" />
					<div class="mdmtitle">{{detail.creator}}</div>
				</div>
				<div class="mdmname">
					{{detail.name}}
					<div class="mdmicon-play down" :class="down?'a':'hide'" @click="changeupdown"></div>
					<div class="mdmicon-play up" :class="down?'hide':'a'" @click="changeupdown"></div>
				</div>
				<div class="mdmtime">发布：{{detail.time}}</div>
				<div class="mdmcount">播放：{{detail.count}}万</div>
				<div class="mdmtalk" :class="down?'a':'mdmtalkwhole'">{{detail.talk}}</div>
			</div>
			<div class="mleftcomments">
				<div class="mlhotcomments">
					<div class="mlhctop">精彩评论</div>
					<div class="mlhcmain" :class="hidehotcomments?'hide':'a'" v-for="item in hotcomments">
						<img v-lazy="item.user.avatarUrl"/>
						<div class="mlhmsg"><span class="nickname">{{item.user.nickname}}:</span><span class="content">{{item.content}}</span></div>
						<div class="star"><img src="../assets/点赞.png">{{item.likedCount}}</div>
					</div>
				</div>
				<div class="mlnewcomments">
					<div class="mlctop">最新评论</div>
					<div class="mlhcmain" :class="hidenewcomments?'hide':'a'" v-for="item in newcomments">
						<img v-lazy="item.user.avatarUrl"/>
						<div class="mlhmsg"><span class="nickname">{{item.user.nickname}}:</span><span class="content">{{item.content}}</span></div>
						<div class="star"><img src="../assets/点赞.png">{{item.likedCount}}</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 相关推荐 -->
		<div class="mright">
			<div class="mrighttop">相关推荐</div>
			<div class="mdrrecommend">
				<div class="mdritem" v-for="(item,index) in mvs" :key="index">
					<img v-lazy="item.cover" @click="playvideo(item.id)"/>
					<!-- 播放次数 -->
					<div class="mdrcount">
						<div class="mdrcountcontainer">
							<span>{{item.playCount}}万</span><div class="mvvplaycount"></div>
						</div> 
					</div>
					<!-- 视频时间长度 -->
					<div class="mdrtime">
						<div class="mdrtimecontainer">
							<span>{{item.duration}}</span>
						</div> 
					</div>
					<div class="mdrname">{{item.name}}</div>
					<div class="mdrsinger">by {{item.artists[0].name}}</div>
				</div>
			</div>
		</div>
		
		
		
	</div>
</template>

<script>
	import axios from 'axios'
	axios.defaults.withCredentials = true// 允许跨域设置，不然可能因为拿不到cookie而报错
	axios.defaults.baseURL = 'http://localhost:3000/'   /*这里的地址就是刚刚启起来的服务器地址  */
	
	export default {
		data() {
			return {
				// 视频播放插件的数据
				playerOptions: {
					playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
					autoplay: true, // 如果为true,浏览器准备好时开始回放。
					muted: false, // 默认情况下将会消除任何音频。
					loop: false, // 是否视频一结束就重新开始。
					preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
					language: 'zh-CN',
					aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
					fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
					sources: [{
						type: "video/mp4", // 类型
						// src: 'http://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/5014014370/ec8cd20ef4f213317c2176b8bb1672f8.mp4?wsSecret=9f18a00b0ac8ed56120e0fe6bc0f47f5&wsTime=1615002237' // url地址
						src:''
					}],
					poster: '', // 封面地址
					notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
					controlBar: {
						timeDivider: true, // 当前时间和持续时间的分隔符
						durationDisplay: true, // 显示持续时间
						remainingTimeDisplay: false, // 是否显示剩余时间功能
						fullscreenToggle: true // 是否显示全屏按钮
					}
				},
				// 相关推荐视频
				mvs:{},
				// 选中视频id
				id:this.$route.query.q,
				// 视频详细信息
				detail:{
					// 发布者头像
					pic:'../assets/头像.jpg',
					// 视频上传者
					creator:'',
					// 视频名字
					name:'',
					// 上传时间
					time:'',
					// 播放次数
					count:0,
					// 视频描述
					talk:''
				},
				// 判断三角形向上还是向下
				down:true,
				// 精彩评论
				hotcomments:{},
				// 最新评论
				newcomments:{},
				// 没有精彩评论时隐藏
				hidehotcomments:false,
				// 没有最新评论时隐藏
				hidenewcomments:false,
			}
		},
		created(){
			this.geturl(this.id);
			this.getcomments(this.id);
			this.getmsg(this.id);
			this.getrelativemv(this.id);
		},
		methods:{
			playvideo(id){
				this.geturl(id);
				this.getcomments(id);
				this.getmsg(id);
				this.getrelativemv(id);
			},
			
			changeupdown(){
				this.down=!this.down;
			},
			// 获取选中视频的地址
			geturl(id){
				axios({
					url:'/mv/url',
					params:{
						id
					}
				}).then(res=>{
					// console.log(res);
					this.playerOptions.sources[0].src=res.data.data.url;
				})
			},
			
			
			// 获取相关视频
			getrelativemv(id){
				axios({
					url:'/simi/mv',
					params:{
						mvid:id
					}
				}).then(res=>{
					// console.log(res);
					this.mvs=res.data.mvs;
					// 转化毫秒为分秒 次数转问几万次
					for (let i = 0; i < this.mvs.length; i++) {
					  let duration = this.mvs[i].duration
					  let min = parseInt(duration / 1000 / 60)
					  // 规范分
					  if (min < 10) {
					    min = '0' + min
					  }
					  let sec = parseInt((duration / 1000) % 60)
					  if (sec < 10) {
					    sec = '0' + sec
					  }
					  // es6语法 替换
					  this.mvs[i].duration = `${min}:${sec}`;
					  this.mvs[i].playCount=res.data.mvs[i].playCount;
					  if(res.data.mvs[i].playCount>10000){
						  this.mvs[i].playCount=parseInt(res.data.mvs[i].playCount/10000);
					  }
					}
				})
			},
			
			
			// 获取选中视频的信息
			getmsg(id){
				axios({
					url:'/mv/detail',
					params:{
						mvid:this.id
					}
				}).then(res=>{
					console.log(res);
					if(res.data.bufferPic!=null){
						this.detail.pic=res.data.data.cover;
					}
					this.detail.creator=this.$parent.artistname(res.data.data.artists);
					this.detail.name=res.data.data.name;
					this.detail.time=res.data.data.publishTime;
					this.detail.count=res.data.data.playCount ;					
					if(res.data.data.playCount>10000){
						this.detail.count=parseInt(res.data.data.playCount/10000) ;
					}
					this.detail.talk=res.data.data.desc;
				})
			},
			
			
			// 获取MV评论
			getcomments(id){
				axios({
					url:'/comment/mv',
					params:{
						id
					}
				}).then(res=>{
					console.log(res);
					if(res.data.hotComments.length>2)
					{
						this.hotcomments[0]=res.data.hotComments[0];
						this.hotcomments[1]=res.data.hotComments[1];
					}
					else if(res.data.hotComments==null){
						this.hidehotcomments=true;
					}	
					else{
						this.hotcomments=res.data.hotComments;
					}
					if(res.data.hotComments.length>5){
						for(let i=0;i<5;i++){
							this.newcomments[i]=res.data.comments[i];
							// console.log(this.newcomments[0]);
						}
					}
					else if(res.data.hotComments==null){
						this.hidenewcomments=true;
					}
					else{
						this.newcomments=res.data.comments;
					}
					// console.log(this.hotcomments);
					
				})
			}
			
		}
	}
</script>

<style scoped>
	.mvdetail{
		width: 90%;
		margin-left: 150px;
		margin-top: 80px;
		height: 1500px;
		/* z-index: 999; */
		padding:30px;
	}
	/* 左半部分 */
	.mleft{
		width: 60%;
		/* height: 100%; */
		display: inline-block;
		margin-right: 60px;
		float: left;
	}
	/* 左半部分--头部 */
	.mlefttop,.mrighttop{
		width: 100%;
		height: 40px;
		font-size: 20px;
		line-height: 40px;
		margin-bottom: 10px;
	}
	.mlefttop .el-icon-arrow-left{
		color: black;
	}
	.mvplayer{
		width: 100%;
		height: 500px;
	}
	.el-icon-arrow-left{
		cursor: pointer;
	}
	/* 左半部分--视频信息 */
	.mvdetailmessage{
		width: 100%;
		/* height: 500px; */
	}
	.mdmtop{
		width: 100%;
		height: 70px;
		position: relative;
		margin: 5px 0;
	}
	.mdmtop img{
		width: 70px;
		height: 70px;
		border-radius: 35px;
		border: #6A6A6A solid 1px;
	}
	.mdmtitle{
		display: inline-block;
		width: 400px;
		height: 40px;
		font-size: 20px;
		line-height: 40px;
		position: absolute;
		top: 15px;
		margin: 0 20px;
	}
	.mdmname{
		width: 100%;
		height: 60px;
		font-size: 25px;
		font-weight: 700;
		line-height: 70px;
		margin: 10px 0;
		position: relative;
	}
	.mdmcount,.mdmtime{
		display: inline-block;
		width:150px;
		height: 30px;
		font-size: 15px;
		line-height: 30px;
		color: #abb2ba;
	}
	.mdmtalk{
		width: 100%;
		height: 50px;
		margin: 5px 0;
		font-size: 15px;
		line-height: 25px;
		overflow: hidden;
		color: #666666;
	}
	.mdmtalkwhole{
		height: 200px;
	}
	.mdmicon-play{
		width: 0;
		height: 0;
		display: inline-block;
		margin-left: 15px;
		position: absolute;
		bottom: 18px;
		cursor: pointer;
	}
	.down{
		border-left: 7px solid transparent;
		border-top: 14px solid black;
		border-right: 7px solid transparent;
	}
	.up{
		border-left: 7px solid transparent;
		border-bottom: 14px solid black;	
		border-right: 7px solid transparent;
	}
	.hide{
		display: none;
	}
	/* 评论 */
	.mleftcomments{
		width: 100%;
		height: 300px;
	}
	.mlnewcomments,.mlhotcomments{
		width: 100%;
		height: 200px;
		font-size: 20px;
		font-weight: 600;
		line-height: 30px;
		margin: 30px 0;
		
	}
	.mlhcmain{
		width: 100%;
		height: 60px;
		margin: 10px 0;
		position: relative;
	}
	.mlhcmain img{
		width: 60px;
		height: 60px;
		border-radius: 30px;
		float: left;
	}
	.mlhmsg{
		width: 70%;
		height: 60px;
		font-size: 18px;
		font-weight: 300;
		line-height: 60px;
		display: inline-block;
		margin: 0 20px;
		overflow: hidden;
	}
	.nickname{
		color: #0b58b0;
	}
	.content{
		font-size: 16px;
		margin: 0 5px;
	}
	.star{
		width: 10%;
		height: 20px;
		line-height: 20px;
		font-size: 15px;
		float: right;
		margin-top: 20px;
	}
	.star img{
		width: 20px;
		height: 20px;
		margin-right: 5px;
		display: inline-block;
	}
	/* 右半部分 */
	.mright{
		width: 30%;
		height: 100%;
		display: inline-block;
	}
	.mrighttop{
		width: 100%;
		/* height: 5%; */
		/* display: inline-block; */
	}	
	.mrrecommend{
		width: 100%;
		height: 95%;
	}
	.mdritem{
		width: 100%;
		height:150px;
		display: inline-block;
		margin: 5px 30px 10px 0px;
		float: left;
		position: relative;
	}
	.mdritem img{
		width: 50%;
		height: 150px;
		border-radius: 5px;
		float: left;
	}
	.mdritem img:hover{
		cursor: pointer;
	}
	.mdrname,.mdrsinger{
		width: 50%;
		display: inline-block;
		font-size: 18px;
		font-weight: 300;
		margin-left: 10px;
		overflow: hidden;
	}
	.mdrname{
		height: 50px;
		position: absolute;
		top: 10%;
	}
	.mdrsinger{
		height: 30px;
		position: absolute;
		bottom: 10%;
		color: #90969D;
	}
	.mdrcount,.mdrtime{
		width: 50%;
		height: 30px;
		display: inline-block;
		color: white;
		text-align: right;
	}
	.mdrcount{
		position: absolute;
		top: 0;
		left: 0;
	}
	.mdrtime{
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.mdrcountcontainer,.mdrtimecontainer{
		width: 60%;
		height: 100%;
		float: right;
		margin: 0 5px;
	}
	.mdrcountcontainer span,.mdrtimecontainer span{
		float: right;
	}
	.mdrcountcontainer .mvvplaycount{
		margin: 6px 5px;
	}
	
</style>
