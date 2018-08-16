const 
	path              = require('path'),
	webpack           = require('webpack'),
	UglifyJSPlugin 	  = require('uglifyjs-webpack-plugin'),
	package           = require('./package.json'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	NODE_ENV          = process.env.NODE_ENV,
	BUILD_ENV         = process.env.BUILD_ENV

const defines = {
  'process.env.NODE_ENV' : JSON.stringify(NODE_ENV),
  'process.env.VERSION'  : JSON.stringify(package.version)
}

let 
	output,
	devtool,
	plugins = [
		new webpack.DefinePlugin(defines),
		new HtmlWebpackPlugin({
			title    : `${package.name} (version ${package.version})`,
			template : './src/index.html'
		})
	]

/**
 * TODO DEFINE CONFIG FOR BUILD_ENV
 */

switch(NODE_ENV){
	case 'development' :
		console.log('WEBPACK - DEV')
		output = {
			path     : path.resolve(__dirname, 'dist'),
			filename : 'bundle.js'
		}
		devtool = 'eval-source-map'
	break
	case 'production' : 
		console.log('WEBPACK - PRODUCTION')
		output = {
			path: path.resolve(__dirname, 'public'),
			filename: 'bundle.js'
		}
		devtool = false
		plugins.push(new UglifyJSPlugin())
	break
	case 'default' :
		console.log('WEBPACK - DEFAULT')
		output = {
			path     : path.resolve(__dirname, 'dist'),
			filename : 'bundle.js'
		}
		devtool = 'eval-source-map'
	break
}

const config = {
    target : 'web',
	mode   : NODE_ENV,
    entry  : [
		'./src/index.js',
		'font-awesome/css/font-awesome.css'
	],
    output : output,
    module : {
		rules : [
			{
				test: /\.scss$/,
				loader: 'style!css!resolve-url!sass?sourceMap'
			  },
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader'   }
				]
			},
			{
				test    : /\.jsx?$/,
				exclude : /node_modules/,
				use : {
					loader : 'babel-loader'
				}
			},{
				test: /\.(jpe?g|gif|png|eot|svg|woff|woff2|ttf)$/,
				loader: 'file-loader',
				options: {
					useRelativePath: process.env.NODE_ENV === 'production'
				}
			}
		]
    },
	devtool : devtool,
	plugins : plugins
}

module.exports = config