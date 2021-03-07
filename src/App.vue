<template>
  <div>
   <!-- 头部组件 -->
   <top></top>
   <!-- 主体组件 -->
   <index></index>

  </div>
</template>

<script>
	// 引入 相当于创建一个变量然后把引入的内容赋给它
	import top from './components/top.vue'
	import index from './components/index.vue'
	export default {
		components:{
			top,
			index
		}
	}
</script>

<style >
	*{
		margin: 0;
		padding: 0;
	}
	
</style>
