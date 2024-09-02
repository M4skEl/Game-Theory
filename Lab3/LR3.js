import {create, all, matrix} from 'mathjs'

const config = {}
const math = create(all, config)

/*const A = math.matrix([[0, 11], [7, 6]]);
const B = math.matrix([[1, 4], [8, 3]]);*/


const A = math.matrix([[2, 8], [1, 11]]);
const B = math.matrix([[7, 4], [1, 3]]);

const u = math.matrix([1, 1])
const uTrans = math.matrix([[1], [1]])

//console.log(math.multiply(math.multiply(u, math.inv(A)), uTrans))

const vector1 = 1 / (math.multiply(math.multiply(u, math.inv(A)), uTrans))._data[0]
const vector2 = 1 / (math.multiply(math.multiply(u, math.inv(B)), uTrans))._data[0]

const xBuf = math.multiply(math.multiply(vector2, u), math.inv(B))

const x = math.matrix([xBuf._data[0].toFixed(2), xBuf._data[1].toFixed(2)])

const yBuf = math.multiply(math.multiply(vector1, math.inv(A)), uTrans)
const y = math.matrix([yBuf._data[0][0].toFixed(2), yBuf._data[1][0].toFixed(2)])

console.log("X:", x._data)
console.log("Y:", y._data)

console.log("Равновесный выигрыш v1", vector1.toFixed(2))
console.log("Равновесный выигрыш v2", vector2.toFixed(2))

