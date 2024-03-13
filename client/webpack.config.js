const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: '/index.html', //path to html file
        title: 'Text Editor',
      }),
      new InjectManifest({
        swSrc: './src-sw.js', // source service worker file
        swDest: 'service-worker.js', // filename for the  output 
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Text Editor',
        short_name: 'TxtEditor',
        description: 'TextEditor challenge 19',
        background_color: '#BCB88A',
        theme_color: '#5C4033',
        start_url: '/',
        icons: [
          {
            src: path.resolve('./src.images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], 
            destination: path.join('icons')
          },
        ],
      }),
    ],
    

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
