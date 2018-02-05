var path = require('path');

const imba = {
	entry: "./apps/imba/app.imba",
	output: { filename: "./apps/imba/app.js" },
	resolve: { extensions: [".imba",".js", ".json"] },
	module: { rules: [{ test: /.imba$/, loader: 'imba/loader' }] }
}

/*
const react = {
  entry: './apps/react/test.jsx',
  output: {
    filename: './apps/react/testout.js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/, options: {presets: ['es2015', 'react']} }
    ]
  }
} */

const react = {
	entry: "./apps/react/js/app.js",
	output: { filename: "./apps/react/app.js" }
}

const client = {
	entry: "./client.imba",
	output: { filename: "./client.js" },
	resolve: { extensions: [".imba",".js", ".json"] },
	module: { rules: [{ test: /.imba$/, loader: 'imba/loader' }] }
}

module.exports = [imba,react,client];