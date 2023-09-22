
const cfg = require('./config')
const path = require('path');
const isProduction = process.env.NODE_ENV == 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = { 

    // main files
    entry: cfg.pages.reduce((config, page) => {
        config[page] = `./src/pages/${page}/index.js`;
        return config;
    }, {}),

    // production or development
    mode: process.env.NODE_ENV, 

    // start a dev server
    devServer: {
        contentBase: cfg.DIST,
        port: cfg.PORT,
        host: 'localhost',
    },
    

    optimization: {
        splitChunks: {
          chunks: "all",
        },
    },

    // main export file
    output: {
        path: cfg.DIST,
        filename: "public/[name].js",
    }, 
    
    // html export
    plugins: [].concat(
        cfg.pages.map(
          (page) =>
            new HtmlWebpackPlugin({
              template: "./public/index.html",
              publicPath: "/",
              filename: `${page}.html`,
              chunks: [page],
            })
        )
      ),
    
    resolve: {
        // alias imports
        alias: {
            "ui": cfg.SRC + "/ui",
            "utils": cfg.SRC + "/utils",
            "styles": cfg.SRC + "/styles",
            "assets": cfg.SRC + "/assets",
           
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