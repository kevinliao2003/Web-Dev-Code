const DEFAULT = 389;

function add(...args) {
  console.log("add all: ", args);
  return args.reduce((acc, c) => acc + c);
}

function multiply(...args) {
  console.log("multiply all: ", args);
  return args.reduce((acc, c) => acc * c);
}

export { DEFAULT, add, multiply };

/* We can export each individually 

export function multiply(...args) {
  console.log("multiply all: ", args);
  return args.reduce((acc, c) => acc * c);
}

*/
