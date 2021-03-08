# vue-player

## 项目介绍
这是一个仿网易云音乐网页播放器，基于 Vue + Element UI 构建，是一个vue练手项目，因此整体页面样式都比较简洁，只实现了大部分主要功能，后续将继续更新完善。

#### 实行功能
1. 获取歌单、MV、歌曲等信息并展示
2. 播放音乐
3. 播放MV视频
4. 搜索
4. 轮播图推荐
5. 分页功能
6. 返回上一步、下一步

#### 部分界面预览

[发现音乐页面](https://github.com/13025168803/vue-player/blob/master/docs/%E5%8F%91%E7%8E%B0%E9%9F%B3%E4%B9%90.png)



[推荐音乐页面](https://github.com/13025168803/vue-player/blob/master/docs/%E6%8E%A8%E8%8D%90%E9%9F%B3%E4%B9%90.png)


[最新音乐页面](https://github.com/13025168803/vue-player/blob/master/docs/%E6%9C%80%E6%96%B0%E9%9F%B3%E4%B9%90.png)


[最新MV页面](https://github.com/13025168803/vue-player/blob/master/docs/%E6%9C%80%E6%96%B0MV.png)


[搜索](https://github.com/13025168803/vue-player/blob/master/docs/%E6%90%9C%E7%B4%A2.png)
[搜索歌单](https://github.com/13025168803/vue-player/blob/master/docs/%E6%90%9C%E7%B4%A2MV.png)
[搜索MV](https://github.com/13025168803/vue-player/blob/master/docs/%E6%90%9C%E7%B4%A2%E6%AD%8C%E5%8D%95.png)


[MV详情](https://github.com/13025168803/vue-player/blob/master/docs/MV%E8%AF%A6%E6%83%85.png)


[播放音乐](https://github.com/13025168803/vue-player/blob/master/docs/%E6%92%AD%E6%94%BE%E9%9F%B3%E4%B9%90.png)

#### 项目接口
项目接口是 [网易云音乐 NodeJS 版 API](https://github.com/Binaryify/NeteaseCloudMusicApi) 

## 下载运行

#### 准备接口

##### 将 [网易云音乐 NodeJS 版 API](https://github.com/Binaryify/NeteaseCloudMusicApi) clone到本地或服务器，完成初始化工作
```
$ git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git
```


```
$ npm install
```
##### 服务器端口
服务器启动默认端口为 3000


##### 启动
进入下载到本地的文件夹，cmd打开命令窗口，启动服务

```
$ node app.js
```
#### 准备本项目

##### clone到本地或服务器, 完成初始化工作
```
$ git clone https://github.com/13025168803/vue-player.git
```

```
$ npm install
```

##### 运行或构建
进入下载到本地的文件夹，cmd进入命令行窗口，启动

```
$ npm run serve
```


## 技术栈

- Vue Cli(Vue 脚手架工具)
- Vue 
- Vue-Router(页面路由)
- Element- UI
- ES6
- Axios


## 项目目录图


```
├───docs           				//描述截图
│       MV详情.png
│       发现音乐.png
│       推荐音乐.png
│       搜索.png
│       搜索MV.png
│       搜索歌单.png
│       播放音乐.png
│       最新MV.png
│       最新音乐.png
│       
├───node_modules				//vue-cli依赖包
│                   
├───public		
│       favicon.ico
│       index.html
│       头像.jpg
│       
└───src
    │   App.vue					//根组件
    │   main.js					//入口主文件
    │   
    ├───assets					//存放图片
    │       logo.png
    │       头像.jpg
    │       点赞.png
    │       
    └───components				//存放组件
            discovery.vue		//发现音乐
            index.vue			//主页
            mvdetail.vue		//MV详情
            mvs.vue				//最新MV
            playlists.vue		//推荐歌单
            result.vue			//搜索
            resultlist.vue		//搜索结果歌单
            resultmv.vue		//搜索结果MV
            resultsong.vue		//搜索结果歌曲
            songs.vue			//最新音乐
            top.vue				//头部组件
```
