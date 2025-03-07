# hierarchical-error

[![NPM version](https://img.shields.io/npm/v/hierarchical-error.svg?style=flat-square)](https://www.npmjs.com/package/hierarchical-error)
[![NPM downloads](https://img.shields.io/npm/dm/hierarchical-error.svg?style=flat-square)](https://www.npmjs.com/package/hierarchical-error)
[![Code Style](https://img.shields.io/badge/code%20style-prettier-brightgreen.svg)](https://github.com/prettier/prettier)

An [axios](https://axios-http.com/) instance builder for use on client or server side with common features pre-configured:

- [Timeout](https://axios-http.com/docs/req_config)
- [Cancellation](https://axios-http.com/docs/cancellation)

By default, axios does not configure a timeout or a cancellation timeout. However, ```hierarchical-error``` sets both to 2 seconds by default, which remains configurable.

```hierarchical-error``` also includes an optional exception handler.

## Install

```
npm i -save hierarchical-error
```

## Usage
