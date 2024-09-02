const isOptimal = (matrix, row, column) => {
  let first = true
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[row].length; j++) {
      if (i === row && j === column) continue;
      if ((matrix[i][j].first > matrix[row][column].first && matrix[i][j].second >= matrix[row][column].second) ||
          (matrix[i][j].first >= matrix[row][column].first && matrix[i][j].second > matrix[row][column].second))
        first = false
    }
  }
  return first
}

function paretoOptimal(matrix) {
  let optimal = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (isOptimal(matrix, i, j)) optimal.push({row: i, col: j})
    }
  }
  return optimal;
}


const getMatrix = (first, second) => {
  let matrix = [];
  for (let i = 0; i < first.length; i++) {
    let buf = [];
    for (let j = 0; j < first[0].length; j++) {
      buf.push({first: first[i][j], second: second[i][j]})
    }
    matrix.push(buf)
  }
  return matrix;
}

/*const cross1 = [[-5, 0], [-10, -1]]
const cross2 = [[-5, -10], [0, -1]]
 */
/*const cross1 = [[4, 0], [0, 1]]
const cross2 = [[1, 0], [0, 4]]*/
/*const cross1 = [[1, 0.9], [2, 0]]
const cross2 = [[1, 2], [0.8, 0]]*/
const cross1 = [[2, 8], [1, 11]]
const cross2 = [[7, 4], [1, 3]]

let mtr = getMatrix(cross1, cross2)
console.log(paretoOptimal(mtr))