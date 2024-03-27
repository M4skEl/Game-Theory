import {create, all} from 'mathjs'

const config = {}
const math = create(all, config)

const coefficients = {
  a: -10,
  b: 15,
  c: 60,
  d: -12,
  e: -48,
}

const checkSolution = (x, y, coeffs) => {
  return (x <= -coeffs.e / coeffs.c) && (y >= -coeffs.d / coeffs.c)
}

const valueOfFunction = (coeffs, x, y) => {
  return math.round(coeffs.a * math.pow(x, 2) + coeffs.b * math.pow(y, 2) + coeffs.c * x * y + coeffs.d * x + coeffs.e * y, 3)
}

function solution(coeffs) {
  const y = math.round((-2 * coeffs.e * coeffs.a + coeffs.d * coeffs.c) / (4 * coeffs.a * coeffs.b - math.pow(coeffs.c, 2)), 2)
  const x = math.round(-(coeffs.c * y + coeffs.d) / (2 * coeffs.a), 2)

  if (checkSolution) {
    return {x, y}
  }
  return {x: 0, y: 0}
}

let vector = solution(coefficients)
console.log("Solution: ", vector)
console.log("Price: ", valueOfFunction(coefficients, vector.x, vector.y))
