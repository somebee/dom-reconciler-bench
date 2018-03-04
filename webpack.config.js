var path = require('path');

const imba = {
	entry: "./apps/imba/app.imba",
	output: { filename: "./apps/imba/app.js" },
	resolve: { extensions: [".imba",".js", ".json"] },
	module: { rules: [{ test: /\.imba$/, loader: 'imba/loader' }] }
}

const react = {
  entry: './apps/react/app.jsx',
  output: {
    filename: './apps/react/app.js'
  },
  resolve: { extensions: [".jsx",".js", ".json"] },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/, options: {presets: ['es2015', 'react']} }
    ]
  }
}

const client = {
	entry: "./client.imba",
	output: { filename: "./client.js" },
	resolve: { extensions: [".imba",".js", ".json"] },
	module: { rules: [{ test: /\.imba$/, loader: 'imba/loader' }] }
}

module.exports = [imba,react,client];