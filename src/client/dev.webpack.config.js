const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = require('./config/paths');
const srcDir = __dirname;

const htmlPluginConfig = {
    inject: true,
    template: path.resolve(srcDir, 'Application', 'index.html'),
    favicon: path.resolve(srcDir, 'Application', 'favicon.ico'),
};

module.exports = {
    devtool: 'eval-cheap-module-source-map',
    entry: [
        'webpack-hot-middleware/client',
        'react-hot-loader/patch',
        path.join(srcDir, "Application", "index.jsx")
    ],
    output: {
        path: paths.buildPath,
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                include: srcDir,
                enforce: 'pre',
                options: {
                    fix: true,
                }
            },
            {
                test: /\.jsx?$/,
                include: srcDir,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.scss$/,
                include: srcDir,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    'sass-loader?sourceMap',
                    'postcss-loader',
                ]
            },
            {
              test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
              include: srcDir,
                loaders: [
                  'url-loader?limit=10000'
                ]
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin([{from: path.join(srcDir, 'public'), to: paths.buildPath}]),
        new HtmlWebpackPlugin(htmlPluginConfig),
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'}),
        new webpack.HotModuleReplacementPlugin(),
    ],
};