<template>
	<div class="top">
		<!-- <img src="../assets/01.top.jpg" class="timg"/> -->
		<div class="topcontainer">
			<span class="title">音乐播放器</span>
			<div class="tbutton">
				<div class="tbleft"><span class="el-icon-arrow-left" @click="$router.back()"></span></div>
				<div class="tbright"><span class="el-icon-arrow-right" @click="$router.forward()"></span></div>
			</div>
			
			<div class="search">
				<input type="text" placeholder="请输入歌曲名" class="itext" v-model="inputValue" @keyup.enter="tosearch"/><span @click="tosearch" @keyup="tosearch">🔍</span>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				inputValue:""
			}
		},
		methods:{
			tosearch(){
				if(this.inputValue==""){
					alert("请输入内容")
				}
				else{
					this.$router.push('/result?q='+this.inputValue);
				}
			}
		}
	}
</script>

<style>
	*{
		margin: 0;
		padding: 0;
	}
	/* .timg{
		height: 57px;
	} */
	.top{
		/* display: flex;
		align-items: center; */
		background-color: #272727;
		width: 100%;
		height: 57px;
		position: fixed;
		padding: 15px 30px 0 50px;
		/* 让顶部不会被其他div遮盖到，即浮在最上面 */
		z-index: 999;
	}
	.topcontainer{
		background-color: #272727;
		width: 95%;
		height: 57px;
	}
	.title{
		font-size: 25px;
		color: white;
		float: left;
		left: 0;
	}
	.search{
		width: 180px;
		height: 30px;
		float: right;
		font-size: 20px;
		line-height: 30px;
		border: solid #ffffff 1xp ;
		background-color: white;
	}
	.search span:hover{
		cursor: pointer;
	}
	.itext{
		width: 150px;
		height: 30px;
		float: left;
		border: none;
	}
	/* 上一步 下一步键 */
	.tbutton{
		width: 200px;
		display: inline-block;
		height: 30px;
		margin: 10px 30px 30px 80px;
	}
	.tbleft,.tbright{
		width: 20px;
		height: 20px;
		border-radius: 15px;
		display: inline-block;
		margin: 0 10px;
		padding: 5px;
	}
	.el-icon-arrow-left,.el-icon-arrow-right{
		color: white;
	}
	.tbleft:hover,.tbright:hover{
		background-color: #959595;
		cursor: pointer;
	}
</style>
