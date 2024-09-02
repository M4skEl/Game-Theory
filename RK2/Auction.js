import getMaximum from '../Brown-Robinson/brownRobinson.js'


const insideValues = Array.from({length: 10},
    (_, i) => Math.floor(Math.random() * 20001))
//console.log("Внутрення ценность", insideValues)

let optimals = insideValues.map(element => (
        Math.round(((insideValues.length - 1) / insideValues.length) * element)
    )
)

//console.log('Оптимально по Нэшу', optimals)


const winner = getMaximum(optimals)

// Print the table header
console.log("------------------------------------------------------------");
console.log("| Номер игрока | Внутренняя стоимость | Оптимально по Нэшу |");
console.log("------------------------------------------------------------");


// Print the table rows
for (let i = 0; i < insideValues.length; i++) {
  console.log("| " + String(i).padEnd(12) + ' | ' + String(insideValues[i]).padEnd(20) + " | " + String(optimals[i]).padEnd(18) + " | ");
}

console.log("------------------------------------------------------------");
console.log("Победитель", winner.index, "Победная ставка", winner.max, "Выигрыш", insideValues[winner.index] - winner.max)
console.log("Цена игры", winner.max)
