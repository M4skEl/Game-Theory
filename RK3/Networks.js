import {create, all, matrix} from 'mathjs'

const config = {}
const math = create(all, config)


function prettyPrintMatrix(matrix) {

  function formatNumber(num) {
    return num.toFixed(2).padStart(10, ' ');
  }

  matrix.forEach(row => {
    const formattedRow = row.map(formatNumber).join('');
    console.log(formattedRow);
  });
}


function displayArray(arr) {
  let output = '[';
  for (let i = 0; i < arr.length; i++) {
    if (i > 0) {
      output += ', ';
    }
    if (i % 3 === 0 && i !== 0) {
      output += '\n  ';
    }
    output += arr[i];
  }
  output += ']';

  console.log(output);
}


function arrayFromColumn(matrix) {
  let arr = [];
  for (let i = 0; i < matrix._size[0]; i++) arr.push(matrix._data[i][0])
  return arr;
}

function allEqual(mtr) {
  for (let i = 0; i < mtr._size[1]; i++) {
    let column = arrayFromColumn(math.subset(mtr, math.index(math.range(0, mtr._size[0]), i)));
    if (!column.every((element) => element === column[0])) return false
  }
  return true
}

function roundMatrix(matrix) {
  let mtr = []
  for (let i = 0; i < matrix._size[0]; i++) {
    let row = []
    for (let j = 0; j < matrix._size[1]; j++) {
      row.push(Number(matrix._data[i][j].toFixed(2)))
    }
    mtr.push(row)
  }
  return math.matrix(mtr)
}


function checkOne(matrix) {
  //let sum = 0
  let vec = []
  for (let i = 0; i < matrix._size[0]; i++) {
    let sum = 0
    for (let j = 0; j < matrix._size[1]; j++) {
      sum += matrix._data[i][j]
    }
    vec.push(sum)
  }
  return vec
}


function generateRandomMatrix(rows, cols) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    let sum = 0;

    for (let j = 0; j < cols; j++) {
      row[j] = Math.random();
      sum += Number(row[j].toFixed(2));
    }

    for (let j = 0; j < cols; j++) {
      row[j] = Number((row[j] / sum).toFixed(2));
    }
    let sumInRow = 0
    for (let j = 0; j < row.length; j++) {
      sumInRow += row[j]
    }
    row[row.length - 1] += (1 - sumInRow)

    matrix.push(row);
  }
  return matrix;
}

// Создаем матрицу 10x10
const randomMatrix = generateRandomMatrix(10, 10);


const mtr = math.matrix(randomMatrix)
console.log("________________________________________ИЗНАЧАЛЬНАЯ МАТРИЦА____________________________________________");
prettyPrintMatrix(mtr._data)

let matrixs = [mtr]

let flag = true;


console.log('Сумма в строках равна', checkOne(mtr))

while (flag) {
  //opinions.push(roundVector(math.multiply(mtr, opinions[opinions.length - 1])))
  matrixs.push(roundMatrix(math.multiply(mtr, matrixs[matrixs.length - 1])))

  flag = !allEqual(matrixs[matrixs.length - 1])

}

console.log("___________________________________ИТОГОВАЯ  МАТРИЦА____________________________________________");

prettyPrintMatrix(matrixs[matrixs.length - 1]._data)

function generateRandomNumbers() {
  let num1, num2;

  do {
    num1 = Math.floor(Math.random() * 11); // generate a random number between 0 and 10
    num2 = Math.floor(Math.random() * 11); // generate a random number between 0 and 10
  } while (num1 + num2 > 10 || num1 === 0 || num2 === 0);

  return [num1, num2];
}

const numbers = generateRandomNumbers();
console.log('Агентов влияния у игроков', numbers)

function generateNonRepeatingRandomNumbers(n1, n2) {

  let set = new Set()
  const result1 = [];
  while (result1.length < n1) {
    const number = Math.floor(Math.random() * 10)
    if (set.has(number)) continue
    result1.push(number);
    set.add(number)
  }
  const result2 = [];
  while (result2.length < n2) {
    const number = Math.floor(Math.random() * 10)
    if (set.has(number)) continue
    result2.push(number);
    set.add(number)
  }

  return [result1, result2];
}

const randomNumbers = generateNonRepeatingRandomNumbers(numbers[0], numbers[1]);
console.log('влияют на 1 игрока', randomNumbers[0]);
console.log('влияют на 2 игрока', randomNumbers[1]);


let a = 1
let b = 6
let c = 3
let d = 5
let f = 6
let s = 6

const Hf = Number((a / (2 * b)).toFixed(2))
const Hs = Number((c / (2 * d)).toFixed(2))

console.log("Оптимальное мнение 1 игрока", Hf)
console.log("Оптимальное мнение 2 игрока", Hs)

const r = (agents) => {
  let sum = 0;
  for (let i = 0; i < agents.length; i++) {
    sum += matrixs[matrixs.length - 1]._data[0][agents[i]]
  }
  return sum
}

const rf = Number(r(randomNumbers[0]).toFixed(2))
const rs = Number(r(randomNumbers[1]).toFixed(2))
//a = 2
//b = 4
//c = 4
//d = 2
//f = 1
//s = 2
//const rf = 0.326
//const rs = 0.34
console.log('r_f = ', rf)
console.log('r_s = ', rs)

const u = Number(((2 * a * d * (rs ** 2) * rf + s * a * rf - 2 * b * c * rs ** 2 * rf) /
    (2 * d * rs ** 2 * f + f * s + 2 * b * rf ** 2 * s)).toFixed(3))
const v = Number(((u * f - a * rf + b * 2 * u * rf ** 2) / (-2 * b * rs * rf)).toFixed(3))

console.log("u", u)
console.log("v", v)


const X = rf * u + rs * v
console.log("Точка утопии", X)

const delta1 = Number(Math.abs(X - Hf).toFixed(3))
const delta2 = Number(Math.abs(X - Hs).toFixed(3))

console.log("delta 1 игрока", delta1)
console.log("delta 2 игрока", delta2)

if (delta1 < delta2) {
  console.log("Победа 1го игрока")
} else {
  console.log("Победа 2го игрока")
}


const H_f_itogi = Number((a * X - b * X ** 2).toFixed(3))

const H_s_itogi = Number((c * X - d * X ** 2).toFixed(3))

console.log("H_f", H_f_itogi)
console.log("H_s", H_s_itogi)

if (H_f_itogi > H_s_itogi) {
  console.log("Победа 1го игрока")
} else {
  console.log("Победа 2го игрока")
}

