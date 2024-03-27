//const math = require('mathjs')
import {matrix, abs, add,zeros} from 'mathjs'
import { create, all } from 'mathjs'
const config = { }
const math = create(all, config)

let m =matrix([
  [5, 3, 0, 4, -1],
  [2, -1, 2, 1, 1],
  [1, 1, 2, 1, 2],
  [4, 2, 0, 3, -1],
  [-1, 0, 2, 1, 1]
])


console.log("Start matrix", m._data)


const minElement = (matrix) => {
  let min = matrix._data[0][0];
  for (let i = 0; i < matrix._size[0]; i++) {
    for (let j = 0; i < matrix._size[0]; i++) {
      if (matrix._data[i][j] < min && matrix._data[i][j] <= 0) min = matrix._data[i][j]
    }
  }
  console.log('Min Element ', min)
  return min
}

export function dezerofication(matrix) {
  let minimum = minElement(matrix);

  if (minimum > 0) return matrix

  minimum = abs(minimum)
  console.log(minimum)
  for (let i = 0; i < matrix._size[0]; i++) {
    matrix._data[i] = add(matrix._data[i], minimum)
  }
  return matrix;
}


const compareString = (str1, str2, isColumn) => {
  let check = true
  if (isColumn) {
    for (let k = 0; k < str1.length; k++) {
      if (str1[k] > str2[k]) return false
    }
  } else {
    for (let k = 0; k < str1.length; k++) {
      if (str1[k] < str2[k]) return false
    }
  }

  return check
}

function deleteString(matrix, index) {

  let newMatrix = zeros(matrix.size()[0] - 1, matrix.size()[1]);
  //до строки
  newMatrix.subset(math.index(math.range(0, index), math.range(0, matrix.size()[1])),
      matrix.subset(math.index(math.range(0, index), math.range(0, matrix.size()[1]))))
  //после строки
  if (index === newMatrix.size()[0]) {
    return newMatrix
  }
  newMatrix.subset(math.index(math.range(index, newMatrix.size()[0]), math.range(0, matrix.size()[1])),
      matrix.subset(math.index(math.range(index + 1, matrix.size()[0]), math.range(0, matrix.size()[1]))))

  return newMatrix
}


const deletingStrings = (matrix) => {
  let flag = false

  for (let i = 0; i < matrix._size[0]; i++) {
    for (let j = 0; j < matrix._size[0]; j++) {
      if (i === j) continue;
      if (compareString(matrix._data[i], matrix._data[j], false)) {
        matrix = deleteString(matrix, j)
        return {flag, matrix}
      }
    }
  }
  flag = true
  return {flag, matrix}
}

function deleteColumn(matrix, index) {
  let numRows = matrix.size()[0];
  let newMatrix = math.zeros(numRows, matrix.size()[1] - 1);

  for (let i = 0; i < numRows; i++) {
    // Копируем элементы до
    newMatrix.subset(math.index(i, math.range(0, index)),
        matrix.subset(math.index(i, math.range(0, index))));
    // Копируем элементы после столбца
    newMatrix.subset(math.index(i, math.range(index, newMatrix._size[1])),
        matrix.subset(math.index(i, math.range(index + 1, matrix._size[1]))));
  }

  return newMatrix;
}

function arrayFromColumn(matrix) {
  let arr = [];
  for (let i = 0; i < matrix._size[0]; i++) arr.push(matrix._data[i][0])
  return arr;
}

const deletingColumns = (matrix) => {
  let flag = false
  //console.log("deleting column in ....", matrix)
  for (let i = 0; i < matrix._size[1]; i++) {

    let column1 = arrayFromColumn(math.subset(matrix, math.index(math.range(0, matrix._size[0]), i)));
    for (let j = 0; j < matrix._size[1]; j++) {

      if (i === j) continue;

      let column2 = arrayFromColumn(math.subset(matrix, math.index(math.range(0, matrix._size[0]), j)));
      if (compareString(column1, column2, true)) {
        matrix = deleteColumn(matrix, j)
        return {flag, matrix}
      }
    }
  }
  flag = true
  return {flag, matrix}
}

const basicStrategy = (size) => {
  let strategies = [];
  for (let i = 1; i < size+1; i++) strategies.push(i);
  return strategies
}

export function domination(matrix) {
  let flagString = false
  let flagColumn = false
  let player1Strategy = basicStrategy(matrix.size()[0])
  let player2Strategy = basicStrategy(matrix.size()[1])


  while (!(flagString && flagColumn)) {
    let deleteStr = deletingStrings(matrix)
    matrix = deleteStr?.matrix
    flagString = deleteStr?.flag
    console.log('after check str', matrix)

    let deleteCol = deletingColumns(matrix)
    matrix = deleteCol?.matrix
    flagColumn = deleteCol?.flag
    console.log('after check col', matrix)
  }
  return matrix
}

let mtr = dezerofication(m);
console.log('without zero', mtr)
mtr = domination(mtr);



//________NBR стратегии_____________//

const get_min_max_arr = (arr) => {
  let min = arr[0]
  let max = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i]
    if (arr[i] > max) max = arr[i]
  }
  return {min, max}
}

//____Выбираем все столбцы в которых элементы больше минимального в строке___
const get_NBR_row = (matrix) => {
  let bestStrategy = new Set()

  for (let i = 0; i < matrix.size()[0]; i++) {
    let min = get_min_max_arr(matrix._data[i]).min

    for (let j = 0; j < matrix.size()[1]; j++) {
      if (matrix._data[i][j] === min) bestStrategy.add(j)
    }
  }
  let nbr = new Set()
  for (let i = 0; i < matrix.size()[1]; i++) {
    if (!bestStrategy.has(i)) nbr.add(i)
  }
  return nbr
}

const get_NBR_column = (matrix) => {
  let bestStrategy = new Set()

  for (let i = 0; i < matrix.size()[1]; i++) {
    let column = arrayFromColumn(math.subset(matrix, math.index(math.range(0, matrix._size[0]), i)));
    let max = get_min_max_arr(column).max

    for (let j = 0; j < column.length; j++) {
      if (column[j] === max) bestStrategy.add(j)
    }
  }

  let nbr = new Set()
  for (let i = 0; i < matrix.size()[0]; i++) {
    if (!bestStrategy.has(i)) nbr.add(i)
  }
  return nbr
}

export function deleteNBR(matrix) {
  let flag = true
  while (flag) {

    console.log("Matrix", matrix)

    let nbrA = []
    get_NBR_row(matrix).forEach(item => {
      nbrA.push(item)
    })
    console.log('NBR strings', nbrA)
    for (let i = 0; i < nbrA.length; i++) {
      matrix = deleteColumn(matrix, nbrA[i])

      //nbrA = nbrA.map(element => element-1)
    }

    console.log('NBR columns', nbrA)

    let nbrB = []
    get_NBR_column(matrix).forEach(item => {
      nbrB.push(item)
    })
    for (let i = 0; i < nbrB.length; i++) {
      matrix = deleteString(matrix, nbrB[i])
      nbrB = nbrB.map(element => element - 1)
    }

    console.log('NBR columns', nbrB)

    flag = Boolean(nbrA.length + nbrB.length)
  }
  return matrix
}

deleteNBR(dezerofication(m))







