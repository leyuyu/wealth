const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 新版已改为这种用法
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: './dist',
        open: true,
        hot: true,
        hotOnly: true,
    },
    // source-map
    // cheap-source-map
    // inline-source-map
    // eval-source-map
    // inline-cheap-module-source-map
    // eval
    // eval-cheap-module-source-map
    // cheap-module-source-map
    devtool: 'cheap-module-eval-source-map',
    // entry: './src/index.js',
    entry: {
        bundle: './src/index.js',
        // sub: './src/index.js'
    },
    output: {
        // publicPath:'http://cdn.com',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.png$/,
            use: {
                loader: 'url-loader', // file-loader  url-loader
                options: {
                    name: '[name].[ext]',
                    limit: 20480,
                    outputPath: 'imgs',
                    // publicPath:'assets'
                }
            }
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                // {
                //     loader: 'style-loader',
                //     options: {
                //         hmr: true,
                //     }
                // },
                'css-loader',
            ]
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        // modules: true, //开启css模块化打包  
                    },
                }, 'sass-loader', 'postcss-loader']
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [['@babel/preset-env', {
                        useBuiltIns: "usage",
                        targets: { chrome: "64" },
                    }]],
                    // presets和plugins二选一(polyfill和plugin-transform-runtime)
                    // presets+useBuiltIns=179k  plugins= 225k presets+useBuiltIns+target=34.7k
                    // plugins: [["@babel/plugin-transform-runtime", {
                    //     "corejs": 2,
                    //     "helpers": true,
                    //     "regenerator": true,
                    // }]]
                }
            }
        }
        ]
    },
    plugins: [new htmlWebpackPlugin({
        template: 'src/index.html'
    }), new CleanWebpackPlugin(),
    new HotModuleReplacementPlugin(),
    ],
    optimization:{
        splitChunks: {
            minSize: 30000, //引入的模块大于30000字节，则进行拆分
            chunks: 'all', //是否做代码分割
            cacheGroups: { //怎么打包
                // vendors: {
                //     test: /[\\/]node_modules[\\/]/, //引入的库在node_modules中
                //     priority: -10,
                //   },
                // default: false
            }
        }
        //usedExports: true,
    }
}
