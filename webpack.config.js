
const cfg = require('./config')
const path = require('path');
const isProduction = process.env.NODE_ENV == 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    // main file
    entry: path.join(cfg.SRC, 'index.js'),
    mode: process.env.NODE_ENV, // production or development
    
    // main export file
    output: {
        path: cfg.DIST,
        filename: "bundle.js",
    },
    
    // if start a dev server
    devServer: {
        contentBase: cfg.DIST,
        port: cfg.PORT,
        host: 'localhost',
    },
    
    // html export
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(cfg.PUBLIC, 'index.html'),
        }),
    ],
    
    resolve: {
        // alias imports
        alias: {
            "ui": cfg.SRC + "/ui/ui.js",
            "utils": cfg.SRC + "/utils",
            "context": cfg.SRC + "/views/_context.jsx",
            
            // programming in mobile apps
            "eruda": isProduction ? 
                cfg.SRC + "/utils/__eruda-fake.js" : // remove eruda in production
                "eruda",
        },
        extensions: ["*", ".js", ".jsx"]
    },
    
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(jpg|png)$/i,
                type: 'asset',
            },
        ],
    },
};