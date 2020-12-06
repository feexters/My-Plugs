const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './js/index.js'
    },
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'docs'),
    },
    devServer: {
        port: 3000,
        hot: true
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@img': path.resolve(__dirname, 'src/image'),
            '@scss': path.resolve(__dirname, 'src/scss'),
            '@goods': path.resolve(__dirname, 'src/goods'),
            '@': path.resolve(__dirname, 'src')
        },
        fallback: {
            'path': require.resolve('path-browserify')
          }    
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './index.html' 
        }),
        new HTMLWebpackPlugin({
            filename: 'catalog.html',
            template: './pages/catalog.html' 
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|img|gif|svg)$/,
                use: ['file-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    }
}