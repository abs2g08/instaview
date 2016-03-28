# Instaview

Instaview is an isomorphic React.js based clone of [instagram.com](https://instagram.com).

Technology Stack: React/Webpack/ES6/alt/Karma/Mocha

>It's a Work In Progress (WIP), so be easy on it :)

Currently it is possible to:

* Login using OAuth
* View your activity feed
* Search for users (WIP)

## Features

* Isomorphic (client/server side) application
* Full stack coded in ES6 JavaScript syntax
* Custom Webpack.js build (with hot reloading)
* Linted using eslint & Sublime 2 plugin
* Frameworks: React.js/alt.js flux architecture
* SASS/CSS/SVG loaders. (Compass mixins)
* Unit tests using Karma.js

## Screenshots

![Screen Shot 1](http://i.imgur.com/AHw9GuG.png)

![Screen Shot 2](http://i.imgur.com/2sF9FQq.png)

## Prerequisites

* [Git](http://git-scm.com/)
* [Node@4.2.0](http://nodejs.org/)
* [n](https://www.npmjs.com/package/n)

## Installation

* `n 4.2.0`
* `git clone git@github.com:abs2g08/instaview.git`
* `cd instaview`
* `npm install`

NOTE: Two warnings will appear when running npm install.
These are due to stale dependencies within external 3rd party modules.

## Running

* `npm start`
* Available at: http://localhost:3000.

## Tests

NOTE: Assumes already run `npm start`

* `npm install`
* `npm run test`

## Building

`npm run build`
