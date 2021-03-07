<template>
	<div class="mvs">
		<div class="mtop">
			<div class="totalmvs">全部 MV</div>
			<div class="mvscontainer">
				<table>
					<tbody>
						<tr>
							地区：<td  v-for="(item,index) in areatitle" :class="index==0?'firsttitle':'a'" @click="changemvs(item.name,type,sort)"><span :class="area==item.name?'highlight':'nohighlight'">{{item.name}}</span></td>
						</tr>
						<tr>
							类型: <td v-for="(item,index) in typetitle" :class="index==0?'firsttitle':'a'" @click="changemvs(area,item.name,sort)"><span :class="type==item.name?'highlight':'nohighlight'">{{item.name}}</span></td>
						</tr>
						<tr>
							排序：<td v-for="(item,index) in sorttitle" :class="index==0?'firsttitle':'a'" @click="changemvs(area,type,item.name)"><span :class="sort==item.name?'highlight':'nohighlight'">{{item.name}}</span></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="mmain">
			<div class="mvsitem" v-for="(item,index) in mvs" :key="index">
				<img :src="item.cover" />
				<div class="mvplay">
					<div class="mvicon-play" @click="playvideo(item.id)"></div>
				</div>
				<div class="mvplaycount">
					<div class="mvcountcontainer">
						<span>{{item.playCount}}</span><div class="mvvplaycount"></div>
					</div> 
				</div>
				<p class="mvname">{{item.name}}</p>
				<p class="mvsinger">{{item.artists[0].name}}</p>
			</div>
		</div>
		<!-- 分页 -->
		<div class="mbottom">
			<el-pagination
			  @current-change="changepage"
			  background
			  layout="prev, pager, next"
			  :total="total"
			  :current-page="page"
			  :page-size="40"
			  >
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	axios.defaults.withCredentials = true// 允许跨域设置，不然可能因为拿不到cookie而报错
	axios.defaults.baseURL = 'http://localhost:3000/'   /*这里的地址就是刚刚启起来的服务器地址  */
	
	export default {
		data(){
			return {
				// mvs 地区标签分类
				areatitle:[{name:'全部'},{name:'内地'},{name:'港台'},{name:'欧美'},{name:'韩国'},{name:'日本'}],
				// mvs 类型标签分类
				typetitle:[{name:'全部'},{name:'官方版'},{name:'原声'},{name:'现场版'},{name:'网易出品'}],
				// mvs 排序标签分类
				sorttitle:[{name:'上升最快'},{name:'最热'},{name:'最新'}],
				// mvs保存信息
				mvs:{},
				// mvs标签地区
				area:'全部',
				// mvs标签类型
				type:'全部',
				// mvs保存排序
				sort:'上升最快',
				// 当前标签的mv页数
				page:1,
				// 当前标签的mv总页数
				total:1000,
			}
		},
		created(){
			this.changemvs(this.area,this.type,this.sort)
		},
		methods:{
			changemvs(area,type,sort){
				axios({
					url:'/mv/all',
					params:{
						limit:40,
						area,
						type,
						sort,
						offset:(this.page - 1) * 40,
					}
				}).then(res=>{
					if((area!=this.area)||(this.type!=type)||(this.sort!=sort)){
						this.page=1;
					}
					this.area=area;
					this.type=type;
					this.sort=sort;
					
					this.total=res.data.count;
					this.mvs = res.data.data;
					for(let i=0;i<this.mvs.length;i++){
						if(this.mvs[i].playCount>10000){
							this.mvs[i].playCount=parseInt(this.mvs[i].playCount/10000)+'万';
						}
					}
					// console.log(area+' '+type+' '+sort);
					console.log(res);
					// console.log(this.total);
				})
			},
			changepage(val){
				// 拿到点击的是哪一页的页码
				this.page = val;
				// console.log(this.page);
				// 重新获取数据
				this.changemvs(this.area,this.type,this.sort);
			},
			// 播放MV
			playvideo(id){
				this.$router.push('/mvdetail?q='+id);
			}
		}
	}
</script>

<style>
	
	.mvs{
		width: 90%;
		/* height: 1000px; */
		margin: 5px auto;
		margin-top: 80px;
		margin-left: 120px;
		overflow: hidden;
		position: relative;
	}
	.totalmvs{
		width: 70%;
		height: 50px;
		font-size: 20px;
		font-weight: 600px;
		line-height: 50px;
		font-family: "microsoft yahei";
		margin: 5px auto;
	}
	.highlight{
		width: 50px;
		margin: 5px auto;
		border-radius: 15px;
		background-color: #fcebeb;
		color: red;
	}
	/* mv标签选择类型 */
	.mvscontainer{
		width: 80%;
		height: 120px;
		/* background-color: red; */
		margin: 5px auto;
	}
	.mvscontainer table{
		width: 700px;
		float: left;
		border-collapse:separate;
		border-spacing:0px 10px;
	}
	.mvscontainer table td{
		width: 80px;
		height: 20px;
		border-left: solid 1px #b1b1b1;
		color: #959595;
		font-size: 15px;
		line-height: 20px;
		text-align: center;
	}
	.mvscontainer table td:hover{
		cursor: pointer;
	}
	.mvscontainer table td span{
		padding: 0px 10px;
	}
	.mvscontainer table .firsttitle{
		width: 80px;
		border: none;
	}
	.mmain{
		width: 80%;
		height: 2700px;
		margin-left: 15%;
		/* background-color: black; */
	}
	.mvsitem{
		width: 22%;
		height: 250px;
		display: inline-block;
		margin: 5px 30px 10px 0px;
		float: left;
		position: relative;
	}
	.mvsitem img{
		width: 100%;
		height: 150px;
		border-radius: 5px;
	}
	.mvsitem img:hover{
		cursor: pointer;
	}
	.mvsitem .mvplay{
		right: 90px;
	}
	.mvsitem:hover .mvplay{
		transition: all 0.5s;
		opacity: 0.8;
		cursor: pointer;
	}
	/* 分页 */
	/* 底部分页 */
	.mbottom{
		width: 400px;
		height: 30px;
		margin: 20px auto;
		margin-bottom: 100px;
	}
</style>
