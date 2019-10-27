# Webpack Frontend Starterkit

[![Greenkeeper badge](https://badges.greenkeeper.io/wbkd/webpack-starter.svg)](https://greenkeeper.io/)

A lightweight foundation for your next webpack based frontend project.

### Setting up the Development Environment

For the purpose of this challenge, the development environment chosen is based on Webpack-starter kit by wbkd.

(A lightweight foundation for any webpack based frontend project)

https://github.com/wbkd/webpack-starter

### Installation

```
Install all modules listed as dependencies in package.json
	> npm install
```

### Start Dev Server

```
npm start

```

### Experiment with different sets of data

A number of different scenarios representing input data are defined - data, data02, data03, data04
Just change the contents of the array data and hit save, and the browser will be live refreshed.

The object representing the output is rendered as the text content of a Div element in the browser, but also in the console.

### Build Prod Version

```
npm run build
```

### Features:

- ES6 Support via [babel](https://babeljs.io/) (v7)
- SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
- Linting via [eslint-loader](https://github.com/MoOx/eslint-loader)

When you run `npm run build` we use the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) to move the css to a separate file. The css file gets included in the head of the `index.html`.
