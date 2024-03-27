import SimpleSimplex from 'simple-simplex';


// initialize a solver
const solver = new SimpleSimplex({
  objective: {
    a: 1,
    b: 1,
  },
  constraints: [
    {
      namedVector: { a: 1, b: 4 },
      constraint: '<=',
      constant: 1,
    },
    {
      namedVector: { a: 3, b: 2,},
      constraint: '<=',
      constant: 1,
    },

  ],
  optimizationType: 'max',
});

// call the solve method with a method name
const result = solver.solve({
  methodName: 'simplex',
});

// see the solution and meta data
console.log({
  solution: result.solution,
  isOptimal: result.details.isOptimal,
});
