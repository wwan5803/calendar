const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const { paths } = require("./src/calendar/config");
const path = require('path');
const autoprefixer = require("autoprefixer");


//css-module should be disable 
const moduleDisabledPaths = [
    // path.resolve(__dirname, 'src', 'finlogix', 'global.css'),
    // path.resolve(__dirname, 'src', 'finlogix', 'antd-override.css'),
    path.resolve(__dirname, 'node_modules')
]

exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        historyApiFallback: true,
        stats: 'errors-only',
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        overlay: {
            errors: true,
            warnings: true,
        },
    },
});
exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                include,
                exclude,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: true,
                        localIdentName: "[name]_[local]"
                    }
                }, {
                    loader: "postcss-loader",
                    options: {
                        ident: "postcss",
                        plugins: () => [
                            autoprefixer({
                                browsers: [
                                    ">1%",
                                    "last 4 versions",
                                    "Firefox ESR",
                                    "not ie < 9"
                                ]
                            })
                        ]
                    }
                },
                'sass-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: () => [
                                autoprefixer({
                                    browsers: [
                                        ">1%",
                                        "last 4 versions",
                                        "Firefox ESR",
                                        "not ie < 9"
                                    ]
                                })
                            ]
                        }
                    }
                ]
            },
        ],
    },
});


exports.extractCSS = () => {
    // Output extracted CSS to a file
    const plugin = new MiniCssExtractPlugin({
        filename: "[name].[contenthash:8].css",
        chunkFilename: "[contenthash:8].css"
    });

    return {
        module: {
            rules: [
                {
                    test: /\.(css|sass|scss)$/,
                    exclude: [
                        ...moduleDisabledPaths
                    ],
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: true,
                                localIdentName: '[hash:base64:4]'
                            }
                        },
                        'sass-loader'],
                },
                {
                    test: /\.(less|css)$/,
                    include: [
                        ...moduleDisabledPaths
                    ],
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                        }],
                },
            ],
        },
        plugins: [plugin],
    };
};
exports.loadImages = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg|svg)$/,
                include,
                exclude,
                use: {
                    loader: 'url-loader',
                    options,
                },
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: "file-loader",
                options: {
                    name: "fonts/[name].[ext]",
                },
            },
        ],
    },
});
exports.generateSourceMaps = ({ type }) => ({
    devtool: type,
});


exports.clean = (...path) => ({
    plugins: [
        new CleanWebpackPlugin([...path]),
    ],
});

exports.minifyCSS = ({ options }) => ({
    plugins: [
        new OptimizeCSSAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: options,
            canPrint: false,
        }),
    ],
});
exports.setFreeVariable = (key, value) => {
    const env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins: [
            new webpack.DefinePlugin(env),
        ],
    };
};

exports.loadJavaScript = ({ include, exclude, ant = true }) => ({
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include,
                exclude,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: [
                        ['@babel/preset-env', {
                            "targets": {
                                "esmodules": true,
                                "chrome": '66'
                            }
                        }],
                        '@babel/preset-react'
                    ],
                    plugins: [
                        [
                            "babel-plugin-react-css-modules",
                            {
                                context: paths.appSrc,
                                generateScopedName: "[name]_[local]_[hash:base64:5]",
                                handleMissingStyleName: "warn",
                                filetypes: {
                                    ".scss": {
                                        syntax: "postcss-scss"
                                    }
                                }
                            }
                        ],
                        '@babel/plugin-transform-runtime',
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-syntax-dynamic-import',
                        '@babel/plugin-proposal-export-default-from',
                        ["import", { 'libraryName': 'antd', 'libraryDirectory': 'lib' ,style:'css'}],
                    ]
                },
            },
        ],
    },
});

exports.external = () => ({
    externals: {
        react: "React",
        'react-dom': "ReactDOM"
    },
})