const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    entry: {
        app: path.join(__dirname, 'src', 'index.tsx')
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js",
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            camelCase: true
                        },
                    }, {
                    loader: 'sass-loader'
                }],
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html')
        })
    ],
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    }
};