[![Build Status](https://travis-ci.org/chawk/bayside.svg?branch=master)](https://travis-ci.org/chawk/bayside)

# BaysideJS

## Installation

```bash
$ npm install bayside
```

## Features

  * Very minimal, high performance Node framework
  * Built for single page app's
  * The entire project is one file for easy debugging
  * Everything is optional from templates to single page app's
  * Built as a simple server side API for modern app's using React or Angular
  
## Security Issues

  If you discover a security vulnerability in Bayside, please see [Security Policies and Procedures](Security.md).

## Instructions:

  In the folder where you want your project to be located, run this command to spin up the sample Bayside app.

```bash
$ npm init
$ npm install --save bayside
```
  Add bayside to your package.json scripts

```bash
$ "bayside": "bayside"
```

  Now bayside can be found in your local node_modules folder.  Create a project named app.

```bash
$ npm run bayside createProject app
```

### Start the server:

```bash
$ node app.js
```

## Philosophy

  The entire philosophy behind Bayside is to do the absolute minimum for the developer.  
  The main idea is to prevent as much black box magic as possible so the developer has 
  absolute control. 

  Bayside is not a full stack framework.   If you want it to be a single page 
  application using Angular, React or Knockout, well that's up to you.  If 
  you wish it to be a standard content website that's up to you as well.   
  Do whatever you want with Bayside.
  
## Examples

  examples will be provided soon.
  
## Tests

  tests will be provided soon.
  
## People

The original author of Bayside is [Chris Hawkes](https://github.com/chawk)

## License

  [MIT](LICENSE)

