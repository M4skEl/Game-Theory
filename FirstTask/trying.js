import { create, all } from 'mathjs'
const config = { }
const math = create(all, config)



function isSubarray(arr1, arr2) {
  const positions = [];

  for (let i = 0; i < arr2.length; i++) {
    // Найдем первое вхождение первого элемента подмассива
    if (arr2[i] === arr1[0]) {
      let found = true;
      // Проверяем остальные элементы подмассива
      for (let j = 1; j < arr1.length; j++) {
        if (arr2[i + j] !== arr1[j]) {
          found = false;
          break;
        }
      }
      // Если нашли подмассив, добавляем позиции в массив
      if (found) {
        for (let k = 0; k < arr1.length; k++) {
          positions.push(i + k);
        }
      }
    }
  }

  return positions;
}
const a1 = [2, 3, 5];
const a2 = [1, 2, 3, 4, 5];
console.log(isSubarray(a1,a2))


const getStrategy=(old, short)=>{
  let rows =[]
  let columns =  []




  return {rows, columns}
}



const getMinimals=(matrix)=>{
  let arr = []
  for(let i=0; i<matrix.size()[0]; i++){
    let min = matrix._data[i][0];
    for(let j=1; j<matrix.size()[1];j++){
      if (matrix._data[i][j]<min) min = matrix._data[i][j]
    }
    arr.push(min)
  }
  return arr
}

function arrayFromColumn(matrix) {
  let arr = [];
  for (let i = 0; i < matrix._size[0]; i++) arr.push(matrix._data[i][0])
  return arr;
}
const getMaximus = (matrix)=>{
  let arr =[];
  for(let i=0; i<matrix.size()[0]; i++){
    let column= arrayFromColumn(math.subset(matrix, math.index(math.range(0, matrix.size()[1]), i)))
    let max = column[0];
    for(let j = 1; j<column.length;j++){
      if(column[j]>max) max = column[j]
    }
    arr.push(max)
  }
  return arr

}
export function prettyPrintArray(array) {
  let minimals = getMinimals(array)
  let maximus = getMaximus(array)
  array = array._data

  let hat= "      Стратегии   |"
  let left_len = hat.length
  for(let i=0; i <array[0].length; i++){
    hat+="  b" +(3*i+1)+"   |"
  }

  hat += "  Min выигрыш А"
  let between = "   " + "-".repeat(hat.length)

  console.log(between);
  console.log(hat)
  console.log(between);

  for (let i = 0; i < array.length; i++) {
    process.stdout.write(" ".repeat(left_len /3 +3)+'a'+(2*i + 1) + " ".repeat(left_len /3 ) + " |");

    for (let j = 0; j < array[i].length; j++) {
      process.stdout.write("   " + array[i][j] + "   |");
    }
    process.stdout.write(" ".repeat(7) + minimals[i] + " ".repeat(7));
    console.log();
  }
  let bottom = '   Max проигрыш B |'
  for(let i =0; i<maximus.length; i++){
    bottom += "   " + maximus[i] + "   |"
  }
  console.log(between)
  console.log(bottom)
  console.log(between);
}

// Пример использования
const matrix = math.matrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]);






prettyPrintArray(matrix);



console.log(matrix)







