import {create, all} from 'mathjs'

import {brownRobinson} from '../Brown-Robinson/brownRobinson.js'

const config = {}
const math = create(all, config)

const k=6;

const coefficients = {
  a: -10,
  b: 15,
  c: 60,
  d: -12,
  e: -48,
}

const valueOfFunction = (coeffs, x, y) => {
  return math.round(coeffs.a * math.pow(x, 2) + coeffs.b * math.pow(y, 2) + coeffs.c * x * y + coeffs.d * x + coeffs.e * y, 3)
}

const makeValuesArray = (N, coeffs) => {
  let valuesArray = math.matrix()
  valuesArray._size[1] = N + 1
  for (let i = 0; i <= N; i++) {
    let row = []
    for (let j = 0; j <= N; j++) {
      row.push(valueOfFunction(coeffs, i / N, j / N))

    }
    valuesArray._data.push(row)
    valuesArray._size[0] += 1

  }
  return valuesArray
}
const getMinimals = (matrix) => {
  let minimals = [];
  for (let i = 0; i < matrix.size()[0]; i++) {
    let min = matrix._data[i][0];
    for (let j = 1; j < matrix.size()[1]; j++) {
      if (matrix._data[i][j] < min) min = matrix._data[i][j];
    }
    minimals.push(min)
  }
  return minimals
}

const maxMin = (matrix) => {
  let minimals = getMinimals(matrix)
  let max = minimals[0]
  for (let i = 1; i < minimals.length; i++) {
    if (minimals[i] > max) max = minimals[i];
  }
  return max
}


function arrayFromColumn(matrix) {
  let arr = [];
  for (let i = 0; i < matrix._size[0]; i++) arr.push(matrix._data[i][0])
  return arr;
}

const getMaximals = (matrix) => {
  let maximus = [];
  for (let i = 0; i < matrix.size()[1]; i++) {
    let column = arrayFromColumn(math.subset(matrix, math.index(math.range(0, matrix._size[0]), i)));
    let max = column[0];
    for (let j = 1; j < column.length; j++) {
      if (max < column[j]) max = column[j]
    }
    maximus.push(max)
  }
  return maximus
}

const minMax = (matrix) => {
  let maximals = getMaximals(matrix)
  let min = maximals[0]
  for (let i = 1; i < maximals.length; i++) {
    if (maximals[i] < min) min = maximals[i];
  }
  return min
}


function getSaddlePoint(matrix) {
  const maxMinValue = maxMin(matrix)
  const minMaxValue = minMax(matrix)

  if (maxMinValue === minMaxValue) {
    for (let i = 0; i < matrix.size()[0]; i++) {
      for (let j = 0; j < matrix.size()[1]; j++) {
        if (matrix._data[i][j] === maxMinValue) return {x: i, y: j, price: maxMinValue}
      }
    }

  }
  return null
}


const checkLastFive = (arr) => {
  let eps = 0
  for (let i = 1; i < arr.length; i++) {
    eps += math.abs(math.abs(arr[i]) - math.abs(arr[i - 1]))
  }
  return eps < 0.07;
}


const getStrategy = (vector) => {
  let maxValue = -Infinity;
  let popularStrategy = null;

  for (let key in vector) {
    if (vector[key] > maxValue) {
      maxValue = vector[key];
      popularStrategy = key;
    }
  }

  return popularStrategy;
}



function numericalMethod(coeffs) {
  let check = false;
  let N = 0;
  let answers = []
  while (!check) {
    console.log('-------------------------Итерация  ', N + 1, '---------------------------------------')

    let solution = {};
    N++;
    let matrix = makeValuesArray(N, coeffs)
    let saddle = getSaddlePoint(matrix)
    if (saddle) {
      solution = {x: math.round(saddle.x / N, 3), y: math.round(saddle.y / N, 3), price: saddle.price}
      console.log("ЕСТЬ седловая точка", solution)
      answers.push(saddle.price)
      if (N > 6) {
        answers.splice(0, 1)
        check = checkLastFive(answers)
      }
      continue
    }

    let brownRobinsonAnswer = brownRobinson(matrix)
    let price = matrix._data[getStrategy(brownRobinsonAnswer.strategiesA)][getStrategy(brownRobinsonAnswer.strategiesB)]
    answers.push(price)

    if (N > k) {
      answers.splice(0, 1)
      check = checkLastFive(answers)
    }


    console.log('matrix:', matrix)

    console.log("X:", math.round(getStrategy(brownRobinsonAnswer.strategiesA) / N, 3))
    console.log("y:", math.round(getStrategy(brownRobinsonAnswer.strategiesB) / N, 3))
    console.log("PRICE:", price)

    if (check) {
      console.log("СОШЛОСЬ")
      console.log("________________________ОТВЕТ ЗА ",N ," ИТЕРАЦИЙ______________________________")
      console.log("X:", math.round(getStrategy(brownRobinsonAnswer.strategiesA) / N, 3))
      console.log("y:", math.round(getStrategy(brownRobinsonAnswer.strategiesB) / N, 3))
      console.log("PRICE:", price)

    }
  }


  return 0

}

numericalMethod(coefficients)







