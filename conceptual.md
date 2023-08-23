### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript? 
  callbacks, promises, async/await, timeouts

- What is a Promise? 
  a one time guarantee of a future response

- What are the differences between an async function and a regular function? 
  an async function doesn't finish right away, but the code will continue on regardless whereas a regular function must complete fully before the code will proceed. async functions will always return a promise

- What is the difference between Node.js and Express.js?
  Node allows for JS use outside of the browser and is executes server side code. Express is a web development framework that uses Node

- What is the error-first callback pattern?
  common coding convention where the first argument passed to a function is any errors that may occur

- What is middleware? 
  code that runs between the request and response cycle

- What does the `next` function do? 
  calls the code that is 'next' in the req/res sequence

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
  the awaits are happening sequentially, rather than simultaneously, no try/catch for error handling, repetitive and not reusable code

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
