const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./js/app.js",

    mode: "development",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        publicPath: "/"
    },

    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 3000,
        hot: true
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.(scss|sass)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.txt$/,
                use: "raw-loader"
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({ template: "./index.html" }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
