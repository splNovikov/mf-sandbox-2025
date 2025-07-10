const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    mode: 'development', // or 'production'
    entry: './src/bootstrap.tsx',
    devtool: 'source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devServer: {
        static: './dist',
        port: 3000,
        open: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        new ModuleFederationPlugin({
            name: 'channel',
            filename: 'remoteEntry.js',
            // Убираем hard dependency на remotes - они будут загружаться динамически
            shared: {
                react: { singleton: true, requiredVersion: '^19.1.0' },
                'react-dom': { singleton: true, requiredVersion: '^19.1.0' },
            },
        }),
    ],
};
