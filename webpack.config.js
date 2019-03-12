var path = require('path');

module.exports = {
    entry: './src/main/js/Index.js',
    devtool: 'sourcemaps',
    cache: true,
    mode: 'development',
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader?url=false'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.eot$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader?url=false'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test:  /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader:'file-loader',
                        options: {
                            outputPath: 'webpack/out/'
                        }
                    }
                ]
            }
        ]
    }
};