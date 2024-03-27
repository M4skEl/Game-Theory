import {create, all, matrix} from 'mathjs'
const config = { }
const math = create(all, config)


export function printAnalytic(matrix, matrixSecond){

  let hat= "      Стратегии    |"
  let left_len = hat.length
  for(let i=0; i <matrix.size()[0]-1; i++){
    hat+="   " +(i+1)+"    |"
  }
  hat += "    Цена игры   |"

  let firstLine = '      Первый игрок |'
  for(let i=0; i <matrix.size()[0]; i++){
    firstLine+="  " +matrix._data[i]+"   |"
  }

  let secondLine = '      Второй игрок |'
  for(let i=0; i <matrixSecond.size()[0]; i++){
    secondLine+="  " +matrixSecond._data[i]+"   |"
  }

  console.log(hat)
  let between = "   " + "-".repeat(hat.length)
  console.log(between)
  console.log(firstLine)
  console.log(secondLine)

}