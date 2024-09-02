import {create, all, matrix} from 'mathjs'

const config = {}
const math = create(all, config)


function prettyPrintMatrix(matrix) {
  // Функция для форматирования каждого элемента
  function formatNumber(num) {
    // Форматируем число до трех знаков после запятой и обеспечиваем минимальную ширину строки 10 символов
    return num.toFixed(2).padStart(10, ' ');
  }

  // Перебираем каждую строку матрицы
  matrix.forEach(row => {
    // Преобразуем каждый элемент строки с помощью formatNumber и соединяем их в строку с пробелом в качестве разделителя
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

function allEqual(arr) {
  return arr.every((element) => element === arr[0]);
}

function roundVector(vector) {
  let vec = []
  for (let i = 0; i < vector._size; i++) {
    vec.push(Number(vector._data[i].toFixed(2)))
  }
  return math.matrix(vec)
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
const opinions = [math.matrix(Array.from({length: 10}, () => Math.floor(Math.random() * 21)))];

let flag = true;


console.log('Сумма в строках равна', checkOne(mtr))

while (flag) {
  opinions.push(roundVector(math.multiply(mtr, opinions[opinions.length - 1])))
  matrixs.push(roundMatrix(math.multiply(mtr, matrixs[matrixs.length - 1])))

  flag = !allEqual(opinions[opinions.length - 1]._data)

}
console.log("Мнения агентов без влияния изначально")
displayArray(opinions[0]._data)
console.log("Мнения агентов без влияния итоговаое")
displayArray(opinions[opinions.length - 1]._data)
console.log("___________________________________ИТОГОВАЯ  МАТРИЦА____________________________________________");

prettyPrintMatrix(matrixs[matrixs.length - 1]._data)

function generateRandomNumbers() {
  let num1, num2;

  do {
    num1 = Math.floor(Math.random() * 11); // generate a random number between 0 and 10
    num2 = Math.floor(Math.random() * 11); // generate a random number between 0 and 10
  } while (num1 + num2 > 10);

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

// Example usage:
const randomNumbers = generateNonRepeatingRandomNumbers(numbers[0], numbers[1]);
console.log('влияют на 1 игрока', randomNumbers[0]);
console.log('влияют на 2 игрока', randomNumbers[1]);

const value1 = Number((Math.random() * 101).toFixed(2))
const value2 = Number((-Math.random() * 101).toFixed(2))
console.log('Влияние на 1 игрока', value1, 'Влияние на 2 игрока', value2)
let opinionsValue = [opinions[0]]
for (let i = 0; i < randomNumbers[0].length; i++) {
  opinionsValue[0]._data[randomNumbers[0][i]] = value1
}

for (let i = 0; i < randomNumbers[1].length; i++) {
  opinionsValue[0]._data[randomNumbers[1][i]] = value2
}
console.log("Изначальный вектор с влиянием")
displayArray(opinionsValue[0]._data)


flag = true;
let matrixsValue = [mtr]
while (flag) {
  opinionsValue.push(roundVector(math.multiply(mtr, opinionsValue[opinionsValue.length - 1])))
  matrixsValue.push(roundMatrix(math.multiply(mtr, matrixsValue[matrixsValue.length - 1])))

  flag = !allEqual(opinionsValue[opinionsValue.length - 1]._data)

}
console.log("Мнения агентов с влиянием")
displayArray(opinionsValue[opinionsValue.length - 1]._data)
//console.log(matrixsValue[matrixsValue.length - 1])
console.log("________________________________________Итоговая МАТРИЦА____________________________________________");

prettyPrintMatrix(matrixsValue[matrixsValue.length - 1]._data)
