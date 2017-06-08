var webpack            = require('webpack');
var commonsPlugin      = new webpack.optimize.CommonsChunkPlugin('common.js');
var path               = require('path');
var HtmlwebpackPlugin  = require('html-webpack-plugin');
var ExtractTextPlugin  = require("extract-text-webpack-plugin");
var ROOT_PATH          = path.resolve(__dirname);
var BUILD_PATH         = path.resolve(ROOT_PATH, 'build');
var SRC_PATH           = path.resolve(ROOT_PATH, 'src');
var INDEXJS            = path.resolve(ROOT_PATH, 'src/javascripts/index.js');
var NODE_MODULE        = path.resolve(ROOT_PATH, 'node_modules');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var debug = true;

module.exports = {
    devtool: 'source-map',
    entry: {
        analytic: INDEXJS
    },
    output: {
        path: BUILD_PATH,
        publicPath: debug? '../build/': 'http://cdn.site.com/',
        chunkFilename: './javascripts/chunk/[id].js',
        filename: 'javascripts/[name].js'
    },
    resolve: {
        alias: {
            SRC_PATH: SRC_PATH
        }
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel', query: {presets: ['es2015']}}
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.BannerPlugin('created by chhuangxiaolong@jd.com')
    ]
};

// webpack --progress --colors --watch
// webpack --progress --colors