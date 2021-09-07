'use strict'
const webpack = require('webpack');
// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css'];
module.exports = {
    parallel: false,
    // 基本路径
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
    // 用于嵌套生成的静态资产（js，css，img，fonts）的目录。
    assetsDir: 'static',
    // 以多页模式构建应用程序。
    pages: {
        report: {
            entry: "src/views/report/index.js", //配置入口js文件
            template: "src/views/report/report.html", //主页面
            filename: "report.html", //打包后的html文件名称
            title: "报表" //打包后的.html中<title>标签文本内容
        },
        supplyReport: {
            entry: "src/views/supplyReport/index.js", //配置入口js文件
            template: "src/views/supplyReport/supplyReport.html", //主页面
            filename: "supplyReport.html", //打包后的html文件名称
            title: "供应链报表" //打包后的.html中<title>标签文本内容
        },
        payReport: {
            entry: "src/views/payReport/index.js", //配置入口js文件
            template: "src/views/payReport/payReport.html", //主页面
            filename: "payReport.html", //打包后的html文件名称
            title: "支付报表" //打包后的.html中<title>标签文本内容
        },
        help: {
            entry: "src/views/help/index.js", //配置入口js文件
            template: "src/views/help/help.html", //主页面
            filename: "help.html", //打包后的html文件名称
            title: "帮助中心" //打包后的.html中<title>标签文本内容
        },
        ticketStyle: {
            entry: "src/views/ticketStyle/index.js", //配置入口js文件
            template: "src/views/ticketStyle/ticketStyle.html", //主页面
            filename: "ticketStyle.html", //打包后的html文件名称
            title: "小票样式" //打包后的.html中<title>标签文本内容
        },
        waiterDown: {
            entry: "src/views/waiterDown/index.js", //配置入口js文件
            template: "src/views/waiterDown/waiterDown.html", //主页面
            filename: "waiterDown.html", //打包后的html文件名称
            title: "服务员App下载" //打包后的.html中<title>标签文本内容
        },
        materialMall: {
            entry: "src/views/materialMall/index.js", //配置入口js文件
            template: "src/views/materialMall/materialMall.html", //主页面
            filename: "materialMall.html", //打包后的html文件名称
            title: "物料商城" //打包后的.html中<title>标签文本内容
        },
        tools: {
            entry: "src/views/tools/index.js", //配置入口js文件
            template: "src/views/tools/tools.html", //主页面
            filename: "tools.html", //打包后的html文件名称
            title: "数据导入小工具" //打包后的.html中<title>标签文本内容
        },
        privacyPolicy: {
            entry: "src/views/privacyPolicy/index.js", //配置入口js文件
            template: "src/views/privacyPolicy/privacyPolicy.html", //主页面
            filename: "privacyPolicy.html", //打包后的html文件名称
            title: "隐藏政策" //打包后的.html中<title>标签文本内容
        }
    },
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // 是否使用包含运行时编译器的Vue核心的构建。
    runtimeCompiler: false,
    // 默认情况下babel-loader忽略其中的所有文件node_modules。
    transpileDependencies: [],
    // 生产环境sourceMap
    productionSourceMap: false,
    // webpack配置
    configureWebpack: {
        externals: {
            'echarts': 'echarts', // 配置使用CDN
            vue: 'Vue',
            vuex: 'Vuex',
            'vue-router': 'VueRouter',
            axios: 'axios',
        },
        //关闭 webpack 的性能提示
        performance:{
            hints: false
        },
         //统一配置打包插件 Gzip
        plugins: [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),//匹配文件名
                threshold: 5120,//对5K以上的数据进行压缩
                minRatio: 0.8,
                deleteOriginalAssets:false,//是否删除源文件
            })
        ]
    },

    chainWebpack: config => {
        config.plugins.delete('html')
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
        config.optimization.minimize(true);
        // ============压缩图片 start============
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({ bypassOnDebug: true })
            .end()
        // ============压缩图片 end============
        config
            .plugin('ignore')
            .use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/))

        return config


    
    },
    // css相关配置
    css: {
        // 启用 CSS modules
        modules: false,
        // 是否使用css分离插件
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            // pass options to sass-loader
            sass: {
                // 引入全局变量样式
                data: `
                    @import "@/stylePath/theme.scss;
                `
            }
        },
    },
    // webpack-dev-server 相关配置
    devServer: {
        // host: 'localhost',
        // port: 8080,
        https: false,
        hotOnly: false,

    },
    // enabled by default if the machine has more than 1 cores
    // parallel: require('os').cpus().length > 1,
    // PWA 插件相关配置
    pwa: {},
    // 第三方插件配置
    pluginOptions: {
        // ...
    },
}