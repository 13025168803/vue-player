

// 导包
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 匹配文件名
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
// 配置
module.exports = {
	publicPath: "./",
	
	assetsDir: "static",
	
	outputDir: 'dist',
	
 configureWebpack: config => {
   if (process.env.NODE_ENV === 'production') {
     return {
       plugins: [
         new CompressionWebpackPlugin({
           filename: '[path].gz[query]',
           algorithm: 'gzip',  // 默认为gzip
           test: productionGzipExtensions,
           threshold: 2048, // 对超过2k的数据进行压缩 
           minRatio: 0.8,  // 仅压缩比该比率更好的（minRatio = Compressed Size / Original Size）
           deleteOriginalAssets: false  // 是否删除原文件
         })
       ]
     }
   }
 }
}
