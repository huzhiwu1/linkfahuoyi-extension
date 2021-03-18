const Path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

module.exports = {
    entry: {
        background: Path.resolve(__dirname, "../src/background/index.ts"),
        popup: Path.resolve(__dirname, "../src/popup/index.tsx"),
        content: Path.resolve(__dirname, "../src/content/index.ts"),
        
    },
    output: {
        filename: "[name].js",
        path:Path.resolve(__dirname,"../dist")
    },
    resolve: {
        extensions:[".tsx",".ts",".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use:"ts-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders:1
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        
        new HtmlWebpackPlugin({
            template: Path.resolve(__dirname, "../public/index.html"),
            chunks: ["popup"],
            filename:"popup.html"
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: Path.resolve(__dirname, "../manifest.json"),
                    to: Path.resolve(__dirname, "../dist"),
                    force:true
                },
                {
                    from: Path.resolve(__dirname, "../assets"),
                    to: Path.resolve(__dirname, "../dist"),
                    force:true
                }
            ]
        }),
        // new CleanWebpackPlugin({
        //     verbose:true
        // }),

    ]
}