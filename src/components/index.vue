<template>
	<div class="indexcontainer">
		<div class="index" :class="noshow?'hide':'a'">
			<!-- 左侧导航栏 -->
			<div class="navcontainer">
				<div class="nav" >
				<ul>
					<li  class="selected">
						<router-link to="/discovery">发现音乐</router-link>
					</li>
					<li  class="navtwo">
						<router-link to="/playlists">推荐歌单</router-link>
					</li>
					<li  class="navthree">
						<router-link to="/songs">最新音乐</router-link>
					</li>
					<li  class="navfour">
						<router-link to="/mvs">最新 MV</router-link>
					</li>
				</ul>
			</div>
			</div>
			
			<!-- 右侧容器 -->
			<div class="main"> 
				<!-- 路由出口 -->
				<router-view></router-view>
			</div>
		</div>
		
		<div class="playaudio" :class="noshow?'hide':'a'">
			<!-- <audio autoplay controls><source :src="musicUrl" type="audio/mpeg"></audio> -->
			<aplayer :music="audio[0]"  ref="aplayer" repeat="repeat-all" :list="audio" :listFolded="true"></aplayer>
			<el-button :plain="true" @click="open" >打开消息提示</el-button>
		</div>
	</div>
</template>

<script>
	import aplayer from "vue-aplayer";  
	
	// import discovery from './03.discovery.vue'
	export default{
		data(){
			return {
				// 播放器播放的音乐的地址
				musicUrl:"",
				audio:  [
				            {
				                title:"马德里不思议",
				                artist: "蔡依林",
				                src: "http://m7.music.126.net/20210305231938/b1960514655cad4a64eaae80d797f0e3/ymusic/b153/eb78/167d/351d8b066097db21e7c7323b75f2279d.mp3",
				                pic: "http://p3.music.126.net/owr7Ak1Dk6AAn96hirnUDg==/109951163251449978.jpg",
				            }
				        ],
				// 控制左边导航栏和播放器的显示
				noshow:false,
				
			}
		},
		
		components: { aplayer },
		methods:{
			open() {
			    this.$message('没有播放资源');
			},
			hide(){
				this.noshow=true;
			},
			// 多个歌手名字合在一起并截取合适长度
			artistname(item)
			{
				let artistname='';
				if(item.length!=null)
				{
					if(item.length>0){
						artistname=item[0].name;
						for(let x=1;x<item.length;x++){
							if(item[x].name!=null){
								artistname+='/'+item[x].name;
							}
						}
						if((artistname!=null))
						{
							artistname=artistname.slice(0,25);
							if(artistname.length>=25)
							{
								artistname+='...';
							}
						}
					}
				}
				return artistname;
			},
		}
	} 
</script>

<style scoped>
	.indexcontainer{
		width: 100%;
		position: relative;
	}
	.index{
		display: flex;
		height: 800px;
		position: relative;
	}
	.navcontainer{
		width: 150px;
		height: 100%;
		background-color: #ededed;
		position: fixed;
		top: 75px;
		/* z-index: 500; */
	}
	.index .nav{
		padding-top: 20px;
		width: 150px;
		/* background-color: #ededed; */
		position: fixed;
	}
	.index .nav li{
		width: 100px;
		text-align: center;
		margin: 30px auto;
		list-style: none;
	}
	.index .nav li a{
		text-decoration: none;
		font-size: 18px;
		line-height: 30px;
		color: #3D3D3D;
		/* letter-spacing: 0.2em; */
	}
	.index .nav li a.router-link-active {
	  color: #dd6d60;
	}
	.index .nav li:hover{
		cursor: pointer;
	}
	.main{
		/* background-color: #FF7F50; */
		height:70%;
		flex: 1;
	}
	.index .nav li:after{
		color: white;
	}
	.liclick{
		color: white;
		background-color: #ec4141;
	}
	/* 播放条 */
	.playaudio{
		width: 100%;
		height: 80px;
		position: fixed;
		bottom: 0px;
		background-color: #ffffff;
		overflow: hidden;
	}
	audio{
		width: 50%;
		float: right;
		height: 100%;
		background-color: white!important;
		border-radius: 5px;
	}
	.aplayer{
		width: 100%;
		height: 100%;
	}
	.el-button{
		display: none !important;
	}
	.hide{
		display: none;
	}
</style>
