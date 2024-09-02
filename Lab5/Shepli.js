const size = 4;


function Characteristic(subset) {
  switch (subset) {
    case '0':
      return 0
    case '1':
      return 2
    case '2':
      return 3
    case '3':
      return 4
    case '4':
      return 4
    case '12' :
      return 6
    case '13' :
      return 6
    case '14' :
      return 7
    case '23' :
      return 7
    case '24' :
      return 8
    case '34' :
      return 8
    case '123' :
      return 11
    case '124' :
      return 11
    case '134' :
      return 12
    case '234' :
      return 12
    case '1234' :
      return 15
    default:
      return 100000
  }
}

const originalSet = new Set([1, 2, 3, 4]);


function makeSubsets() {
  let subsets = []
  subsets.push(new Set());
  for (const element of originalSet) {
    const newSubsets = subsets.map(subset => {
      const newSubset = new Set(subset);
      newSubset.add(element);
      return newSubset;
    });
    subsets.push(...newSubsets);
  }
  return subsets;
}


const union = (set1, set2) => {
  return new Set([...set1, ...set2])
}

const inter = (set1, set2) => {
  return new Set([...set1].filter(value => set2.has(value)))
}

const subtract = (set1, set2) => {
  let result = new Set(set1); // Создаем копию первого множества
  for (let elem of set2) {
    result.delete(elem); // Удаляем элементы второго множества из результата
  }
  return result;
}


function findIndex(sets, setToFind) {
  for (let i = 0; i < sets.length; i++) {
    const set = sets[i];
    if (set.size === setToFind.size && [...set].every(value => setToFind.has(value))) {
      return i;
    }
  }
  return -1;
}

const foo = [0, 2, 3, 6, 4, 6, 7, 11, 4, 7, 8, 11, 8, 12, 12, 15]


//console.log(union(subsets[1], subsets[9]), foo[findIndex(subsets, union(subsets[1], subsets[9]))])


const areSetsEqual = (set1, set2) => {
  return set1.size === set2.size && [...set1].every(val => set2.has(val))
};

const subsets = makeSubsets()

function checkAdditive() {

  // console.log('size', subsets.length)
  for (let i = 0; i < subsets.length; i++) {
    for (let j = 0; j < subsets.length; j++) {
      if (i === j) continue
      if (findIndex(subsets, inter(subsets[i], subsets[j])) !== 0) continue

      if (foo[findIndex(subsets, union(subsets[i], subsets[j]))] < foo[findIndex(subsets, subsets[i])] + foo[findIndex(subsets, subsets[j])]) {
        console.log(subsets[i], subsets[j], 'union', union(subsets[i], subsets[j]), 'value ', foo[findIndex(subsets, union(subsets[i], subsets[j]))]);
        return false
      }
    }
  }
  return true
}

console.log('Игра супераддитивная', checkAdditive())


function checkVup() {
  for (let i = 0; i < subsets.length; i++) {
    for (let j = 0; j < subsets.length; j++) {
      if (i === j) continue;

      if (foo[findIndex(subsets, union(subsets[i], subsets[j]))] + foo[findIndex(subsets, inter(subsets[i], subsets[j]))] < foo[findIndex(subsets, subsets[i])] + foo[findIndex(subsets, subsets[j])]) {
        console.log(subsets[i], subsets[j])
        console.log('union', union(subsets[i], subsets[j]), 'value ', foo[findIndex(subsets, union(subsets[i], subsets[j]))])
        console.log('inter', inter(subsets[i], subsets[j]), 'value ', foo[findIndex(subsets, inter(subsets[i], subsets[j]))]);
        console.log('Сумма подмножеств', foo[findIndex(subsets, subsets[i])] + foo[findIndex(subsets, subsets[j])])
        return false
      }
    }
  }
  return true
}

console.log("Игра выпуклая?", checkVup())

const factorial = (n) => {
  if (n < 0) {
    return -1;
  } else if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
};


function calcShapli() {
  let shapliArr = [];
  for (let k = 1; k < size + 1; k++) {
    let sum = 0;
    let element = new Set()
    element.add(k)
    for (let i = 0; i < subsets.length; i++) {
      if (subsets[i].has(k)) {
        sum += (factorial(subsets[i].size - 1) *
            factorial(size - subsets[i].size) *
            (foo[findIndex(subsets, subsets[i])] - foo[findIndex(subsets, (subtract(subsets[i], element)))])
        )
      }
    }
    const shapli = Number((1 / factorial(size) * sum).toFixed(2))
    shapliArr.push(shapli)
  }
  return shapliArr
}

console.log(calcShapli())

const shapliVector = calcShapli()

function checkRationality() {
  let sum = 0
  for (let i = 0; i < shapliVector.length; i++) {
    sum += shapliVector[i];
  }
  if (sum === foo[foo.length - 1]) {
    console.log('Условие групповой рационализации выполнено, сумма равна', sum)
  } else {
    console.log('Условие групповой рационализации НЕ выполнено, сумма равна', sum, 'а ожидаемый выигрыш коалиции', foo[foo.length - 1])
    return false
  }

  for (let i = 0; i < shapliVector.length; i++) {
    let elem = new Set()
    elem.add(i + 1)
    if (shapliVector[i] < foo[findIndex(subsets, elem)]) {
      console.log('Условие индивидуальной рационализации НЕ выполнено, для игрока', i + 1, 'одиночный выигрыш ', foo[findIndex(subsets, elem)], 'коалиционный ', shapliVector[i])
      return false
    }
    else {
      console.log('Условие индивидуальной рационализации выполнено, для игрока', i+1, 'одиночный выигрыш ', foo[findIndex(subsets, elem)], 'коалиционный ', shapliVector[i])
    }
  }
  return true
}
console.log(checkRationality())







