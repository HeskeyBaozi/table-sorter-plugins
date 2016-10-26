'use strict';

const path = require('path');
const webpack = require('webpack');
const myPackage = require('./package');
const banner = `${myPackage.name} ${myPackage.version} - ${myPackage.description}\nCopyright (c) ${ new Date().getFullYear() } ${myPackage.author} - ${myPackage.homepage}\nLicense: ${myPackage.license}`;


module.exports = {
    context: __dirname,
    entry: {
        sorter: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        library: `Sorter`,
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    externals: {
        'jquery': 'jQuery',
        'lodash': '_'
    },
    plugins: [
        new webpack.BannerPlugin(banner)
    ],
    devtool: '#source-map'
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]);
}