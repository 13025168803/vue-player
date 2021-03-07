<template>
	<div class="songs">
		<div class="stop">
			<div class="stcontainer">
				<span type="0" @click="changesong(0)" :class="selected==0?'active':'noacitive'">全部</span>
				<span type="7" @click="changesong(7)" :class="selected==7?'active':'noacitive'">华语</span>
				<span type="96" @click="changesong(96)" :class="selected==96?'active':'noacitive'">欧美</span>
				<span type="8" @click="changesong(8)" :class="selected==8?'active':'noacitive'">日本</span>
				<span type="16" @click="changesong(16)" :class="selected==16?'active':'noacitive'">韩国</span>
			</div>
		</div>
		<table>
			<tbody>
				<tr v-for="(item,index) in songs" :class="index%2==0?'dark':'bright'">
					<td class="sblank"></td>
					<td class="sorder">{{index<9?'0'+(index+1):index+1}}</td>
					<td class="ssongpic">
						<img :src="item.album.blurPicUrl" />
						<div class="splay">
							<div class="sicon-play" @click="playMusic(item)"></div>
						</div>
					</td>
					<td class="ssongname">{{item.name}}</td>
					<td class="ssingername">{{item.album.artists['0'].name}}</td>
					<td class="salbum">{{item.album.name}}</td>
					<td class="stime">{{item.duration}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import axios from 'axios'
	axios.defaults.withCredentials = true// 允许跨域设置，不然可能因为拿不到cookie而报错
	axios.defaults.baseURL = 'http://localhost:3000/'   /*这里的地址就是刚刚启起来的服务器地址  */
	
	export default {
		data(){
			return{
				songs:{},
				// 选中歌曲分离title
				selected:'0'
			}
		},
		created(){
			this.changesong(0)
		},
		methods:{
			changesong(type){
				axios({
					url:'/top/song',
					params:{
						type
					}
				}).then(res=>{
					console.log(res);
					this.songs=res.data.data;
					this.selected=type;
					// 转换歌曲时间 毫秒变分秒
					for (let i = 0; i < this.songs.length; i++) {		
					  let duration = this.songs[i].duration
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
					  this.songs[i].duration = `${min}:${sec}`
						
					  //得到合并后的手名 
					  this.songs[i].album.artists[0].name=this.$parent.artistname(this.songs[i].album.artists);
					}
				})
			},
			// 点击播放 生成播放列表并传给父组件的播放器
			playMusic(item) 
			{
				let music={title:'',artist:'',src:'',pic:''};
				music.title=item.name;
				music.pic=item.album.blurPicUrl;
				// music.artist=item.song.artists[0].name;
				axios({
				  url: '/song/url',
				  params: {
				    id:item.id // id:id
				  }
				}).then(res => {
					console.log(res);
					music.artist=this.$parent.artistname(item.artists);
					if(res.data.data[0].url==null){
						this.$parent.open();
					}
					else{
						music.src= res.data.data[0].url;
						// console.log(music);
						this.$set(this.$parent.audio,0,music);
					}
				})
			},
		}
	}
</script>

<style>
	
	.songs{
		width: 90%;
		/* height: 1000px; */
		margin-left: 150px;
		margin-top: 80px;
		overflow: hidden;
	}
	/* 头部标签栏 */
	.stop{
		width: 91%;
		height: 30px;
		margin: 20px auto;
		/* margin-left: 5%; */
	}
	.stcontainer{
		 float: left;
	}
	
	.stop span{
		margin: 5px 20px;
	}
	.stop span:hover{
		cursor: pointer;
	}
	.active{
		color: #FF0000;
	}
	.noacitive{
		color: #272727;
	}
	/* table */
	table{
		width: 100%;
		margin: 5px auto;
		padding: 0 80px;
		border-collapse: collapse;
	}
	.dark{
		background-color: #f9f9f9;
	}
	.bright{
		background-color: #ffffff;
	}
	table td{
		/* width: 15%; */
		height: 80px;
	}
	.sblank{
		width: 4%;
	}
	.sorder{
		width: 4%;
	}
	.ssongpic{
		width: 5%;
		padding: 2px;
		position: relative;
	}
	.ssongpic img{
		width: 75px;
		height: 75px;
		border-radius: 5px;
	}
	/* 播放音乐的圆 */
	.splay{
		display: inline-block;
		width: 50px;
		height: 50px;
		right: 32%;
		top:20%;
		background:white;
		opacity:0;
		border-radius: 30px;
		position: absolute;
	}
	.sicon-play{
		width: 0;
		height: 0;
		display: inline-block; 
		margin: 10px auto;
		margin-left: 15px;
		border-top: 15px solid transparent;
		border-left: 30px solid red;
		border-bottom: 15px solid transparent;
	}
	.ssongpic:hover .splay{
		transition: all 0.5s;
		opacity: 0.8;
		cursor: pointer;
	}
	.ssongname{
		width: 18%;
		padding: 5px;
	}
	.ssingername{
		width: 20%;
	}
	.salbum{
		width: 20%;
	}
	.stime{
		width: 5%;
	}
</style>
