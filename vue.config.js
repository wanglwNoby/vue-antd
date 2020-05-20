const AntDesignThemePlugin = require("antd-theme-webpack-plugin");
const path = require("path");

const options = {
    antDir: path.join(__dirname, "./node_modules/ant-design-vue"), //antd包位置
    stylesDir: path.join(__dirname, "./src/styles"), //主题文件所在文件夹
    varFile: path.join(__dirname, "./src/styles/variables.less"), // 自定义默认的主题色
    mainLessFile: path.join(__dirname, "./src/styles/main.less"), // 项目中其他自定义的样式
    outputFilePath: path.join(__dirname, "./public/color.less"), //提取的less文件输出到什么地方
    indexFileName: "./public/index.html", // index.html所在位置
    generateOnce: false,
    themeVariables: [
        '@layout-header-background',
        '@layout-body-background',
        '@primary-color',
        '@heading-color',
        '@text-color',
        '@text-color-secondary',
        '@table-header-background',
        '@table-body-background',
        '@menu-background',
        '@tabs-background',
        '@line-color'
    ] //要改变的主题变量
};

module.exports = {
    css: {
        requireModuleExtension: true,
        loaderOptions: {
            css: {
                modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                },
                localsConvention: 'camelCaseOnly'
            },
            less: {
                modifyVars: {},
                javascriptEnabled: true
            }
        }
    },
    configureWebpack: {
        plugins: [new AntDesignThemePlugin(options)]
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8011',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}