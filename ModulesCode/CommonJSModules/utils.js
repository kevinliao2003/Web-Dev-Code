const DEFAULT = 389;

/* Note:
  For reduce if you don't provide the initialValue
  the accumulator will be equal to the first element 
  of the array, and the curValue will be the second value
  */

function add(...args) {
  console.log("add all: ", args);
  return args.reduce((acc, c) => acc + c);
}

function multiply(...args) {
  console.log("multiply all: ", args);
  return args.reduce((acc, c) => acc * c);
}

module.exports = { DEFAULT, add, multiply };
