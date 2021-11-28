const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

let HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: 'app/index.html',
    inject: true
});

var config = {
    entry: [
        './app/index.js'
    ],
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' },
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.html$/, use: 'html-loader' },
            { test: /\.png$/, type: 'asset/resource' },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            },
        ]
    },
    output: {
        filename: 'index_bundle.js',
        path: __dirname + '/dist'
    },
    plugins: [
        HTMLWebpackPluginConfig,
        new VueLoaderPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, '/dist'),
        historyApiFallback: true,
        watchContentBase: true,
        port: 5000,
        host: '0.0.0.0',
        overlay: {
            warnings: true,
            errors: true
        }
    }

};

module.exports = (env, argv) => {
    if (argv.mode = 'development') {
        config.devServer = {
            contentBase: path.join(__dirname, '/dist'),
            watchContentBase: true,
            port: 5000,
            host: '0.0.0.0',
            overlay: {
                warnings: true,
                errors: true
            }
        }

    }
    return config;
};
