# hierarchical-error

[![NPM version](https://img.shields.io/npm/v/hierarchical-error.svg?style=flat-square)](https://www.npmjs.com/package/hierarchical-error)
[![NPM downloads](https://img.shields.io/npm/dm/hierarchical-error.svg?style=flat-square)](https://www.npmjs.com/package/hierarchical-error)
[![Code Style](https://img.shields.io/badge/code%20style-prettier-brightgreen.svg)](https://github.com/prettier/prettier)

Hierarchical errors provide a structured and more efficient way of managing error logging in complex applications, particularly those with multiple layers of function calls, as is common in node applications.

By encapsulating the original error, its context, and any additional information at each layer of the call stack, hierarchical errors allow for a more comprehensive view of what went wrong without unnecessary duplication in the logs. This approach also ensures that relevant context is preserved, which can be crucial for debugging and understanding the flow of execution.

By using the HierarchicalError class, developers can maintain the integrity of the error message while preventing log clutter and improving the clarity of error reports, ultimately making troubleshooting much easier and more effective.

[Read more](https://paulgrenyer.blogspot.com/2025/01/hierarchical-error-reducing-log.html)

## Install

```
npm i -save hierarchical-error
```

## Example

```
const httpCall = () => {
    const someContext = 'the url we called';
    try {
        throw new Error('Something went wrong!');
    } catch (error: any) {
        throw new HierarchicalError(error.message, { someContext }, error);
    }
};

const callService = () => {
    const someContext = 'The service we called';
    try {
        httpCall();
    } catch (error: any) {
        throw new HierarchicalError(`Service failed.`, { someContext }, error);
    }
};

const getController = () => {
    try {
        callService();
    } catch (error: any) {
        if (isHierarchicalError(error)) {
            log(error.message, error.toJSON());
        } else {
            log(error);
        }
    }
};

```
### Example Output
```
[ERROR] Service failed: Something went wrong! {
  message: 'Service failed.',
  context: { someContext: 'The service we called' },
  cause: {
    message: 'Something went wrong!',
    context: { url: 'http://example.com' },
    cause: Error: Something went wrong!
        at httpCall (/.../solution.js:19:15)
        at callService (/.../solution.js:28:9)
        at get (/.../solution.js:36:9)
        at main (/.../solution.js:48:5)
        ...
  }
}
```
