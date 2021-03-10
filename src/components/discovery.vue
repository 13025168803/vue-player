<template>
	<div class="discovery" ref="discovery">
		<!-- <img src="../assets/03.discovery.png" class="dimg"/> -->
		<div id="dtop">
			<el-carousel :interval="4000" type="card" height=" 200px ">
			    <el-carousel-item v-for="(item,index) in banners" :key="index">
					<img v-lazy="item.imageUrl"  :key='item.imageUrl' @click="playbanner(item.targetId)"/>
			    </el-carousel-item>
			</el-carousel>
		</div>
		<!-- 推荐歌单 -->
		<div class="recommend">
			<div class="rtop">
				<span>推荐歌单</span>
			</div>
			<div class="rmain" >
				<div class="ritem" v-for="(item,index) in list" :key="index">
					<span class="rspan">{{item.copywriter}}</span>
					<img v-lazy="item.picUrl" />
					<div class="rplay">
						<div class="icon-play" @click="playgedan(item.id)" ></div>
					</div>
					<p>{{item.name}}</p>
				</div>
			</div>
		</div>
		<!-- 最新音乐 -->
		<div class="newmusic">
			<div class="rtop">
				<span>最新音乐</span>
			</div>
			<div class="nmain">
				<div class="nitem" v-for="(item,index) in songs" :key="index">
					<img v-lazy="item.picUrl" />
					<span class="musicname">{{item.name}}</span>
					<span class="singer">{{item.song.artists[0].name}}</span>
					<div class="nplay">
						<div class="nicon-play" @click="playMusic(item)"></div>
					</div>
				</div>
			</div>
		</div>
		<!-- 最新 MV-->
		<div class="MV">
			<div class="rtop">
				<span>最新 MV</span>
			</div>
			<div class="mvmain">
				<div class="mvitem" v-for="(item,index) in mvs" :key="index">
					<img v-lazy="item.cover" />
					<div class="mvplay">
						<div class="mvicon-play" @click="playmv(item.id)"></div>
					</div>
					
					<div class="mvplaycount">
						<div class="mvcountcontainer">
							<span>{{item.playCount}}</span><div class="dmvvplaycount"></div>
						</div> 
					</div>
					<p class="mvname">{{item.name}}</p>
					<p class="mvsinger">{{item.artists[0].name}}</p>
					<!-- <video width="320" height="240" :src="mvurl" >
					</video> -->
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
	  name: 'discovery',
	  props:['music'],
	  
	  data() {
	    return {
	      // 走马灯
	      banners: [],
	      // 推荐歌单
	      list: [],
	      // 最新音乐
	      songs: [],
	      // 推荐mv
	      mvs:[],
		  //播放音乐的地址
		  id:"",
		  //播放音乐的id
		  mvurl:"",
		  // mv播放地址
	    }
	  },
	  created() {
	    // 轮播图接口
	    axios({
	      url: '/banner',	
	    }).then(res => {
	      // console.log(res);
	      this.banners = res.data.banners;
	    })
	
	    // 推荐歌单
	    axios({
	      url: '/personalized',
	      params: {
	        // 获取的数据量
	        limit: 10
	      }
	    }).then(res => {
	      // console.log(res);
	      this.list = res.data.result;
	    })
	
	    // 最新音乐
	    axios({
	      url: '/personalized/newsong',
	    }).then(res => {
	      // console.log(res);
	      this.songs = res.data.result;
		  for(let i=0;i<this.songs.length;i++){
			  this.songs[i].song.artists[0].name= this.$parent.artistname(this.songs[i].song.artists);
		  }
		  
	    })
	
	    // 最新 mv
	    axios({
	      url: '/mv/first',
		  params:{
			  limit:4
		  }
	    }).then(res => {
	      // console.log(res);
	      this.mvs = res.data.data;
		  for(let i=0;i<this.mvs.length;i++){
		  	if(this.mvs[i].playCount>10000){
		  		this.mvs[i].playCount=parseInt(this.mvs[i].playCount/10000)+'万';
		  	}
		  }
	    })
	  },
	  methods: {
		playbanner(id) {
		  	let music={title:'',artist:'',src:'',pic:''};
		    axios({
		      url: '/song/detail',
		      params: {
		        ids:id 
		      }
		    }).then(res => {	
		  	  // console.log(res);
		  	  if(res.data.songs.length>0){
		  		if(res.data.songs[0].al.name!=null){
		  			music.title=res.data.songs[0].al.name;
		  			music.pic=res.data.songs[0].al.picUrl;
		  		}
		  		music.artist=this.$parent.artistname(res.data.songs[0].ar);
				// console.log(music.artist);
		  	  }
		  	  else{
		  		  music.title='';
		  		  music.artist='';
		  		  music.pic='';
		  	  }
		    })
		    axios({
		      url: '/song/url',
		      params: {
		        id // id:id
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
		},
	    playMusic(item) {
			let music={title:'',artist:'',src:'',pic:''};
			music.title=item.name;
			music.pic=item.picUrl;
			music.artist= this.$parent.artistname(item.song.artists);
			axios({
			  url: '/song/url',
			  params: {
			    id:item.id // id:id
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
		playmv(id){
			this.$router.push('/mvdetail?q='+id);
		}
	  }
	}
</script>

<style>
	
	.discovery{
		width: 90%;
		margin-left: 120px;
		margin-top: 80px;
		height: 1900px;
	}
	/* 走马灯 */
	#dtop{
		width: 75%;
		height: 200px;
		margin: 5px auto;
	}
	#dtop img{
		width: 100%;
		height: 200px;
	}
	  
	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
		border-radius: 12px;
	}
	  
	.el-carousel__item:nth-child(2n+1) {
	    background-color: #d3dce6;
		border-radius: 12px;
	}
	/* 推荐歌单 */
	.recommend{
		width: 100%;
		height: 600px;
		margin-top: 50px;
	}
	.rtop{
		width: 250px;
		height: 40px;
	}
	.rtop span{
		font-weight: 400px;
		font-size: 20px;
		margin-left: 150px;
		line-height: 40px;
	}
	.rmain{
		width: 90%;
		height: 500px;margin: 5px auto;
		margin-left: 120px;
		
	}
	.ritem{
		width: 200px;
		margin: 5px 12px;
		display: inline-block;
		position: relative;
		/* border-radius: 15px; */
		overflow: hidden;
	}
	.rspan{
		position: absolute;
		padding: 5px;
		width: 180px;
		height: 35px;
		top:-50px;
		font-size: 12px;
		background-color: black;
		opacity: 0.7;
		overflow: hidden;
		color: white;
		border-radius: 15px 15px 0 0;
	}
	.ritem:hover .rspan{
		transition: all 0.5s;
		top:0;
	}
	.ritem:hover .rplay{
		transition: all 0.5s;
		opacity: 0.8;
		cursor: pointer;
	}
	.ritem img{
		width: 190px;
		height: 190px;
		/* border:  solid black 1px; */
		border-radius: 15px;
	}
	.ritem p{
		width: 180px;
		height: 50px;
		font-family: "arial black";
		font-size: 15px;
	}
	/* 画个圆儿 */
	.rplay,.nplay{
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
	/* 画个三角形 */
	.icon-play,.nicon-play,.mvicon-play{
		width: 0;
		height: 0;
		display: inline-block; 
		margin: 15px auto;
		margin-left: 20px;
		border-top: 15px solid transparent;
		border-left: 30px solid red;
		border-bottom: 15px solid transparent;
	}
	/* 最新音乐 */
	.nmain{
		margin-left: 150px;
		width: 100%;
		height: 600px;
	}
	.nitem{
		width: 40%;
		height: 100px;
		position: relative;
		display: inline-block;
		margin: 5px 0;
	}
	.nitem img{
		width: 100px;
		height: 100px;
		position: absolute;
		left: 0;
		top: 0;
	}
	.musicname{
		position: absolute;
		left: 110px;
		top: 10px;
		font-size: 18px;
	}
	.singer{
		position: absolute;
		left: 110px;
		bottom: 10px;
		font-size: 18px;
		color: #90969d;
	}
	.nplay{
		left: 20px;
		top: 20px;
	}
	.nitem:hover .nplay{
		transition: all 0.5s;
		opacity: 0.8;
		cursor: pointer;
	}
	/* 推荐MV */
	.mvmain{
		margin-left: 110px;
		width: 90%;
		height: 250px;
		
	}
	.mvitem{
		width: 22%;
		height: 250px;
		display: inline-block;
		margin: 5px 10px;
		/* position: relative; */
		float: left;
		position: relative;
	}
	.mvitem img{
		width: 100%;
		height: 150px;
		border-radius: 15px;
		
	}
	.mvname{
		font-size: 15px;
		line-height: 22px;
		margin: 5px 5px;
	}
	.mvsinger{
		font-size: 15px;
		color: #90969d;
		margin: 5px 5px;
	}
	.mvplay{
		display: inline-block;
		width: 60px;
		height: 60px;
		top:40px;
		background:white;
		right: 100px;
		opacity:0;
		border-radius: 30px;
		position: absolute;
	}
	.mvitem:hover .mvplay{
		transition: all 0.5s;
		opacity: 0.8;
		cursor: pointer;
	}
	.mvplaycount{
		display: inline-block;
		width: 100%;
		height: 30px;
		position: absolute;
		right:5px;
		top: 2px;
		color: white;
	}
	.mvcountcontainer{
		float: right;
		display: inline-block;
	}
	.dmvvplaycount,.mvvplaycount{
		width: 0;
		height: 0;
		float: right;
		display: inline-block; 
		margin-top: 7px;
		border-top: 5px solid transparent;
		border-left: 10px solid white;
		border-bottom: 5px solid transparent;
	}
	.mvvplaycount{
		margin-top:5px;
	}
	.mvcountcontainer span{
		float: right;
	}
</style>




