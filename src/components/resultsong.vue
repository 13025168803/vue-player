<template>
	<!-- 歌曲 -->
	<div class="songmain" >
		<table class="songretable">
			<tbody>
				<tr v-for="(item,index) in songs" :class="index%2==0?'dark':'bright'" @dblclick="playsong(item)">
					<td class="songreblank"></td>
					<td class="songreorder">{{index<9?'0'+(index+1):index+1}}</td>
					<td class="songresongname">{{item.name}}</td>
					<td class="songresingername">{{item.ar[0].name}}</td>
					<td class="songrealbum">{{item.al.name}}</td> 
					<td class="songretime">{{item.dt}}</td>
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
		props:{page:''},
		data(){
			return{
				keywords:this.$route.query.q,
				// 歌单
				songs:{},
				total:1000,
				// 页面大小
				pagesize:100
			}
		},
		created(){
			this.searchsongs(this.$route.query.q);
		},
		watch:{
			page(){
				this.searchsongs(this.$route.query.q);
			}
		},
		methods:{
			searchsongs(keywords){
				// console.log("刷新"+this.page);
				this.pagesize=100;
				this.keywords=this.$route.query.q;
				axios({
					url:'/cloudsearch',
					params:{
						keywords,
						type:1,
						limit:this.pagesize,
						offset:(this.page - 1) * this.pagesize,
					}
				}).then(res=>{
					// console.log(res);
					this.songs=res.data.result.songs;
					
					
					for (let i = 0; i < this.songs.length; i++) {
					  // 转换歌曲时间 毫秒变分秒
					  let dt = this.songs[i].dt
					  let min = parseInt(dt / 1000 / 60)
					  // 规范分
					  if (min < 10) {
					    min = '0' + min
					  }
					  let sec = parseInt((dt / 1000) % 60)
					  if (sec < 10) {
					    sec = '0' + sec
					  }
					  // es6语法 替换
					  this.songs[i].dt = `${min}:${sec}`
					  
					  // 歌手名字整合	  
					  if(this.songs[i].ar.length!=null)
					  {
						  if(this.songs[i].ar.length>0)
						  {
							  this.songs[i].ar[0].name=this.songs[i].ar[0].name;
							  for(let x=1;x<this.songs[i].ar.length;x++){
								{
									if(this.songs[i].ar[x].name!=null){
										this.songs[i].ar[0].name+=','+this.songs[i].ar[x].name;
									}
								}
							  }
							if((this.songs[i].ar[0].name!=null)){
								
								  this.songs[i].ar[0].name=this.songs[i].ar[0].name.slice(0,17);
								  if(this.songs[i].ar[0].name.length>=17){
									  this.songs[i].ar[0].name+='...';
								  }
							}
						  }
					   }
					} 
					 
					this.total=res.data.result.songCount;
					this.$parent.updatecount(this.total);
					// console.log(this.total);
				})
			},
			playsong(item) {
				console.log(item);
				let music={title:'',artist:'',src:'',pic:''};
				music.title=item.name;
				music.pic=item.al.picUrl;
				music.artist=item.ar[0].name;
				
				axios({
				  url: '/song/url',
				  params: {
				    id:item.id // id:id
				  }
				}).then(res => {
					console.log(res);
					console.log(this.$parent.$parent);
					if(res.data.data[0].url==null){
						this.$parent.$parent.open();
					}
					else{
						music.src= res.data.data[0].url;
						// console.log(music);
						this.$set(this.$parent.$parent.audio,0,music);
					}
				})
			},
		}
	}
</script>

<style>
	.songmain{
		width: 100%;
		height: 100%;
	}
	.songmain{
		width: 100%;
		height: 100%;
	}
	.songreblank{
		width: 3%;
	}
	.songreorder{
		width: 4%;
	}
	.songresongname{
		width: 20%;
		padding: 5px;
	}
	.songresingername{
		width: 15%;
	}
	.songrealbum{
		width: 20%;
	}
	.songretime{
		width: 5%;
	}
	.songretable td{
		height: 40px;
		font-weight: 400px;
		color: #6a6a6a;
	}
	.songretable tr:hover{
		cursor: pointer;
	}
</style>
