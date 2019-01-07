const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const webpack = require('webpack')
const PATHS = {
    root: path.join(__dirname, 'src'),
    app: path.join(__dirname, 'src', 'calendar'),
    client: path.join(__dirname, 'src', 'client'),
    build: path.join(__dirname, 'build'),
    dist: path.join(__dirname, 'dist')
};


const productionConfig = merge([
    {
        entry: {
            app: PATHS.app,
        },
        mode: 'production',
        resolve: {
            modules: [
                PATHS.app,
            ],
            extensions: ['.js', '.jsx', '.scss', '.css']
        },
        output: {
            chunkFilename: 'calendar.[chunkhash:8].js',
            filename: 'calendar.[chunkhash:8].js',
            library: 'Static'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production'),
                // 'process.env.ACY': true
            }),
        ],
    },
    parts.loadCSS(),
    parts.loadImages({
        options: {
            limit: 150000000,
            name: '[name].[hash:8].[ext]',
        },
    }),
    parts.clean(PATHS.build, PATHS.dist),
    parts.minifyCSS({
        options: {
            discardComments: {
                removeAll: true,
            },
            // Run cssnano in safe mode to avoid
            // potentially unsafe transformations.
            safe: true,
        },
    }),])



const commonConfig = merge([
    {
        entry: {
            app: PATHS.app,
        },

        output: {
            path: PATHS.build,
            filename: '[name].js',
        },
        resolve: {
            modules: [
                PATHS.app,
                "node_modules"
            ],
            alias: {
                components: path.resolve(__dirname, './src/calendar/components/'),
                utils: path.resolve(__dirname, './src/calendar/utils/'),
                language: path.resolve(__dirname, './src/calendar/language/'),
                store: path.resolve(__dirname, './src/calendar/store/'),
                config: path.resolve(__dirname, './src/calendar/config/'),
                "babel-plugin-react-css-modules": path.resolve(__dirname, "./node_modules/babel-plugin-react-css-modules")
            },
            extensions: ['.js', '.jsx', '.scss', '.css']
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: '!!raw-loader!index.ejs',
                filename: 'index.html',
            }),
        ],
    },
    parts.loadJavaScript({ include: PATHS.root }),
]);


const developmentConfig = merge(
    [
        {
            mode: 'development',
            entry: PATHS.client,
            output: {
                publicPath: '/',
                // devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
            },
            devtool: 'cheap-module-source-map',
            plugins: [
                new WriteFilePlugin(),
                new webpack.EnvironmentPlugin({
                    NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
                    DEBUG: false,
                    ACY: true
                })
            ]
        },
        parts.loadImages({
            options: {
                limit: 15000,
                name: '[name].[ext]',
            },
        }),
        // parts.external(),
        parts.generateSourceMaps({ type: 'eval-source-map' }),
        parts.loadCSS(),
        parts.devServer({
            // Customize host/port here if needed
            host: process.env.HOST,
            port: process.env.PORT,
        }),
    ]);


const statusConfig = merge([{
    plugins: [new BundleAnalyzerPlugin()]
}])

module.exports = env => {
    console.log('eee', env)
    let mergedConfig = commonConfig;
    if (env.production) {
        mergedConfig = merge(mergedConfig, productionConfig)
    } else {
        mergedConfig = merge(commonConfig, developmentConfig);
    }

    if (env.status) {
        mergedConfig = merge(mergedConfig, statusConfig)
    }


    console.dir(mergedConfig)
    return mergedConfig
};

