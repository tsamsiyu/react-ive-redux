var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');
var LIB_DIR = path.resolve(__dirname, '../src');

var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'react-ive-redux': LIB_DIR
        },
        modules: [
            "node_modules",
            LIB_DIR,
            APP_DIR,
        ],
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: [
                        require.resolve('babel-preset-react'),
                        [require.resolve('babel-preset-es2015'), { "modules": false }],
                        // require.resolve('babel-preset-stage-0')
                      ]
                    }
                },
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: "file-loader?name=[name].html",
            },
        ]
    }
};
  
module.exports = config;