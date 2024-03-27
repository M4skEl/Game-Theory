import {create, all, matrix} from 'mathjs'

const config = {}
const math = create(all, config)

import { createObjectCsvWriter } from 'csv-writer';
import csv from 'csv-parser'
import fs from 'fs';

const csvWriter = createObjectCsvWriter({
  path: './BrownRobinson.csv',
  header: [
    {id: 'k', title: 'k'},
    {id: 'chooseA', title: 'Выбор Игрока А'},
    {id: 'chooseB', title: 'Выбор Игрока В'},
    {id: 'x1A', title: 'Выигрыш игрока А при x1'},
    {id: 'x2A', title: 'Выигрыш игрока А при x2'},
    {id: 'x3A', title: 'Выигрыш игрока А при x3'},
    {id: 'y1B', title: 'Проигрыш игрока В при у1'},
    {id: 'y2B', title: 'Проигрыш игрока В при у2'},
    {id: 'y3B', title: 'Проигрыш игрока В при у3'},
    {id: 'upPrice', title: 'Верхняя цена игры'},
    {id: 'underPrice', title: 'Нижняя цена игры'},
    {id: 'epsilon', title: 'Разница'}
  ]
});

function arrayFromColumn(matrix) {
  let arr = [];
  for (let i = 0; i < matrix._size[0]; i++) arr.push(matrix._data[i][0])
  return arr;
}


let m = math.matrix([
  [1, 17, 18],
  [14, 6, 16],
  [14, 14, 13]
])

const getMinimum = (array) => {
  let minimum = array[0];
  let index = 0
  for (let i = 1; i < array.length; i++) {
    if (array[i] < minimum) {
      minimum = array[i]
      index = i
    }
  }
  return {minimum, index}
}
const getMaximum = (array) => {
  let max = array[0];
  let index = 0;
  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i]
      index = i
    }
  }
  return {max, index}
}

const checkOnRand = (array) => {
  let element = array[0];
  for (let i = 0; i < array.length; i++)
    if (array[i] !== element) return false
  return true
}


export function brownRobinson(matrix) {
  //______Первая итерация алгоритма______________
  let strategyA = Math.floor(Math.random() * matrix.size()[0])
  let strategyB = Math.floor(Math.random() * matrix.size()[1])

  let winnersA = arrayFromColumn(math.subset(matrix, math.index(math.range(0, matrix.size()[0]), strategyB)))
  let loosersB = matrix._data[strategyA]

  let upPrice = getMaximum(winnersA).max
  let underPrice = getMinimum(loosersB).minimum

  let indexA = getMaximum(winnersA).index
  let indexB = getMinimum(loosersB).index


  let minUpPrice = upPrice
  let maxUnderPrice = underPrice
  let epsilon = minUpPrice - maxUnderPrice

  let valuesA= [strategyA]
  let valuesB= [strategyB]

  /*let data = [{
    k:1,
    chooseA:strategyA,
    chooseB:strategyB,
    x1A:winnersA[0],
    x2A:winnersA[1],
    x3A:winnersA[2],
    y1B:loosersB[0],
    y2B:loosersB[1],
    y3B:loosersB[2],
    upPrice:upPrice,
    underPrice:underPrice,
    epsilon:epsilon,
  }]
  await csvWriter.writeRecords(data)
*/
  let k = 2
  while (epsilon > 0.1) {

    if (checkOnRand(winnersA)) {
      strategyA = Math.floor(Math.random() * matrix.size()[0])
    } else strategyA = indexA
    if (checkOnRand(loosersB)) {
      strategyB = Math.floor(Math.random() * matrix.size()[0])
    } else strategyB = indexB

    winnersA = math.add(winnersA,
        arrayFromColumn(math.subset(matrix, math.index(math.range(0, matrix.size()[0]), strategyB))))
    loosersB = math.add(loosersB, matrix._data[strategyA])

    upPrice = math.round(getMaximum(winnersA).max / k, 3)
    underPrice = math.round(getMinimum(loosersB).minimum / k, 3)

    indexA = getMaximum(winnersA).index
    indexB = getMinimum(loosersB).index

    if (upPrice < minUpPrice) minUpPrice = upPrice
    if (underPrice > maxUnderPrice) maxUnderPrice = underPrice

    epsilon = math.round(minUpPrice - maxUnderPrice, 4);

    valuesA.push(strategyA)
    valuesB.push(strategyB)
   /* data = [{
      k:k,
      chooseA:strategyA,
      chooseB:strategyB,
      x1A:winnersA[0],
      x2A:winnersA[1],
      x3A:winnersA[2],
      y1B:loosersB[0],
      y2B:loosersB[1],
      y3B:loosersB[2],
      upPrice:upPrice,
      underPrice:underPrice,
      epsilon:epsilon,
    }]
    await csvWriter.writeRecords(data)
*/
    k++
  }

  let strategiesA ={}
  valuesA.forEach(item =>{
    if(strategiesA[item]) strategiesA[item]+=1
    else strategiesA[item] = 1
  })
  for(let key in strategiesA){
    strategiesA[key]= math.round(strategiesA[key]/valuesA.length,2)
  }

  let strategiesB ={}
  valuesB.forEach(item =>{
    if(strategiesB[item]) strategiesB[item]+=1
    else strategiesB[item] = 1
  })
  for(let key in strategiesB){
    strategiesB[key]= math.round(strategiesB[key]/valuesB.length,2)
  }

  return {strategiesA, strategiesB, price: math.round((upPrice+underPrice)/2 ,3) }


}


//await brownRobinson(m)


async function getStrategy(path){

  let valuesA =[];
  let valuesB = [];
  let pricesUP = [];
  let pricesLow = [];

  const stream = fs.createReadStream('BrownRobinson.csv').pipe(csv());

  for await (const row of stream){
    valuesA.push(row['Выбор Игрока А'])
    valuesB.push(row['Выбор Игрока В'])
    pricesUP.push(row['Верхняя цена игры'])
    pricesLow.push(row['Нижняя цена игры'])
  }

  let strategiesA ={}
  let strategiesB ={}
  valuesA.forEach(item =>{
    if(strategiesA[item]) strategiesA[item]+=1
    else strategiesA[item] = 1
  })
  for(let key in strategiesA){
    strategiesA[key]= math.round(strategiesA[key]/valuesA.length,2)
  }


  valuesB.forEach(item =>{
    if(strategiesB[item]) strategiesB[item]+=1
    else strategiesB[item] = 1
  })
  for(let key in strategiesB){
    strategiesB[key]= math.round(strategiesB[key]/valuesB.length,2)
  }
  console.log("Стратегии игрока А",strategiesA)
  console.log("Cтратегии игрока В",strategiesB)
  console.log("Верхняя цена игры",pricesUP[pricesUP.length-1])
  console.log("Нижняя цена игры",pricesLow[pricesLow.length-1])
}
//await getStrategy('./BrownRobinson.csv')

