import { create, all } from 'mathjs'
const config = { }
const math = create(all, config)

import {domination, dezerofication} from './Matrix.js'
import {graphoAnalitik, graphoAnalitikSecondGamer} from './graphoAnalitic.js'
import {analytic} from './analytic.js'
import {prettyPrintArray} from './trying.js'

let m = math.matrix([
  [5, 3, 0, 4, -1],
  [2, -1, 2, 1, 1],
  [1, 1, 2, 1, 2],
  [4, 2, 0, 3, -1],
  [-1, 0, 2, 1, 1]
])

prettyPrintArray(m)


let matrix = domination(dezerofication(m));
prettyPrintArray(matrix)
console.log("Графо-аналитически",graphoAnalitik(matrix))
console.log("Графо-аналитически игрок В",graphoAnalitikSecondGamer(matrix))

console.log('Аналитический метод для игрока А', analytic(math.transpose(matrix)));
console.log('Аналитический метод для игрока В', analytic(matrix));

//analiticFirst(matrix)
