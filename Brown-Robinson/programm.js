import {create, all, matrix} from 'mathjs'

const config = {}
const math = create(all, config)

import {analytic} from "../FirstTask/analytic.js"
import {printAnalytic} from "./printAnalytic.js"
/*let m =matrix([
  [2, 1, 3],
  [3, 0, 1],
  [1, 2, 1]
])*/
let m = matrix([
  [1, 17, 18],
  [14, 6, 16],
  [14, 14, 13]
])
const first = (analytic(math.transpose(m)))

console.log('Первый игрок', first._data)

console.log('Второй игрок', analytic(m)._data)


//printAnalytic(first,analytic(m))




