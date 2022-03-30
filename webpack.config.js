const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = env => {

    let isMario = 'true'
    let character = 'mario'
    if(typeof env.character === 'string' && env.character !== character) {
      character = env.character
      isMario = 'false'
    }


    const isProd = env.production === true

    let mode = 'development'
    const output = {
      path: path.resolve(__dirname, 'build', character),
      filename: 'js/index.[name].[contenthash].js',
      // chunkFilename: '[name].js',
      clean: true,
    }

    if(isProd) {
      mode = 'production'
      output.publicPath = './'
    }

    console.log('\n\n' + JSON.stringify(output, null, 2) + '\n\n')


    return {
        entry: {
          main: path.resolve(__dirname, 'src', 'index.ts'),
          login: path.resolve(__dirname, 'src', 'login.ts'),
          global: path.resolve(__dirname, 'src', 'globals.ts'),
          // Service Imports
          applicationSettings: path.resolve(__dirname, 'src', 'services', 'applicationSettings.ts'),
          characterService: path.resolve(__dirname, 'src', 'services', 'characterService.ts'),
          domService: path.resolve(__dirname, 'src', 'services', 'domService.ts'),
          scoreKeeperService: path.resolve(__dirname, 'src', 'services', 'scoreKeeperService.ts'),
        },
        mode: mode,
        output: output,
        devServer: {
          port: 9000,
          open: true,
          hot: true,
          compress: true
        },
        devtool: 'inline-source-map',
        module: {
          rules: [
            {
              test: /\.ts$/,
              use: 'ts-loader',
              exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
          ],
        },
        resolve: {
          extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [
            new HtmlWebpackPlugin(
            {
                template: path.resolve(__dirname, 'public', 'index.html'),
                minify: false,
                filename: 'index.html',
                chunks: [
                  'main', 
                  'global',
                  // Service Imports
                  'applicationSettings',
                  'characterService', 
                  'domService', 
                  'scoreKeeperService'
                ]
            }),
            new HtmlWebpackPlugin({
              template: path.resolve(__dirname, 'public', 'login.html'),
              chunks: [
                'login', 
                'applicationSettings',
              ],// determine which to load up in as a chunk
              minify: false,
              filename: 'login.html'
            }),

            new webpack.EnvironmentPlugin({
                isMario: isMario
            }),
            new CopyWebpackPlugin({
              patterns: [
                  { 
                    from: path.resolve(__dirname, 'images'),
                    to: 'images'
                  }
              ]
            })
        ],
    }
}