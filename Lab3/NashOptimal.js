const matrixRows = 10;
const matrixColumns = 10
const matrixFirst = Array.from({length: matrixRows},
    () => Array.from({length: matrixColumns},
        () => Math.floor(Math.random() * 101) - 50));

const matrixSecond = Array.from({length: matrixRows},
    () => Array.from({length: matrixColumns},
        () => Math.floor(Math.random() * 101) - 50));

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


//console.log(getMatrix(matrixFirst, matrixSecond))


const isOptimal = (matrix, row, column) => {
  //Равновесие для первого игрока - проверка по столбцу
  let first = true
  for (let i = 0; i < matrix.length; i++) {
    if (i === row) continue;
    if (matrix[i][column].first > matrix[row][column].first) first = false
  }
  //Равновесие для второго игрока - проверка по строке
  let second = true;
  for (let i = 0; i < matrix[row].length; i++) {
    if (i === column) continue;
    if (matrix[row][i].second > matrix[row][column].second) second = false
  }
  return first && second
}

export function getNash(matrix) {
  let optimal = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (isOptimal(matrix, i, j)) optimal.push({row: i, col: j})
    }
  }
  return optimal;
}


const cross1 = [[2, 8], [1, 11]]
const cross2 = [[7, 4], [1, 3]]

let mtr = getMatrix(cross1, cross2)
console.log(getNash(mtr))