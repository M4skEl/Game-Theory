import {create, all} from 'mathjs'

const config = {}
const math = create(all, config)


const addRowColumn = (matrix) => {
  let newRow = []
  let newColumn = []
  let newMatrix = matrix._data
  for (let i = 0; i < matrix.size()[1]; i++) {
    newRow.push(1)
  }
  newRow.push(0)
  for (let i = 0; i < matrix.size()[0]; i++) matrix._data[i].push(-1)
  matrix._data.push(newRow)
  matrix._size[0] += 1
  matrix._size[1] += 1
  return matrix
}

export function analytic(matrix) {
  matrix = addRowColumn(matrix)

  const inverseMatrix = math.round(math.inv(matrix), 2);

  let vector = []
  for (let i = 0; i < matrix.size()[1] - 1; i++) vector.push(0)
  vector.push(1)

  const result = math.multiply(inverseMatrix, vector);

  return result

}


let m = math.matrix([
  [2, 1, 3],
  [3, 0, 1],
  [1, 2, 1]
])

let t = math.transpose(m)
analytic(m)