const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const path = require('path');
const webpack = require('webpack');

module.exports = withSass(withCss({
	target: 'server',
	exportTrailingSlash: true,
	webpack: (config, {}) => {
		config.resolve.alias = {
			...config.resolve.alias,
			"@": path.resolve(__dirname, "./src")
		}

		config.module.rules.push({
			test: /\.scss$/,
			use: {
				loader: "sass-loader",
				options: {
					includePaths: [ path.resolve(__dirname, "./sass") ],
					data: '@import "./src/sass/global.scss";'
				}
			}
		})

		return config;
	}
}));