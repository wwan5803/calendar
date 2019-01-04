
const express = require('express');
const compression = require('compression');
const path = require('path')

const app = require('express')();
const server = require('http').Server(app);

const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');

const webpackConfig = require('./webpack.config');
// const favicon = require('serve-favicon')
// app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use(compression());
// app.set('views', './build');
app.use(express.static('build'));
app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



const target = process.argv[2];

if (target === 'development') {
    const compiler = webpack(webpackConfig({ development: true }));
    app.use(webpackMiddleware(compiler));
}

//  usyd network hide the host somehow, use localhost as fallback
const host = '0.0.0.0';
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Starting server on ${host}:${port}`);
});


console.log(target, process.version, __dirname);
