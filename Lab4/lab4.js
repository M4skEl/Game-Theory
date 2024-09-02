const deep = 7;

const hardCode = [
  {value: [{first: 15, second: 5, third: 0}], priority: null},
  {value: [{first: 15, second: 7, third: 3}], priority: null},
  {value: [{first: 11, second: 8, third: 9}], priority: null},
  {value: [{first: 9, second: 10, third: 5}], priority: null},
  {value: [{first: 3, second: 5, third: 11}], priority: null},
  {value: [{first: 3, second: 7, third: 11}], priority: null},
  {value: [{first: 0, second: 15, third: 2}], priority: null},
  {value: [{first: 3, second: 6, third: 11}], priority: null},
  {value: [{first: 4, second: 2, third: 8}], priority: null},
  {value: [{first: 12, second: 7, third: 12}], priority: null},
  {value: [{first: 4, second: 5, third: 0}], priority: null},
  {value: [{first: 5, second: 2, third: 11}], priority: null},
  {value: [{first: 9, second: 9, third: 9}], priority: null},
  {value: [{first: 8, second: 7, third: 0}], priority: null},
  {value: [{first: 3, second: 15, third: 0}], priority: null},
  {value: [{first: 4, second: 11, third: 15}], priority: null},
]


const changeTurn = (nowTurn) => {
  switch (nowTurn) {
    case 'first':
      return 'third';
    case 'second':
      return 'first';
    case 'third':
      return 'second';
    default:
      return 'first';
  }
}

function getMaxInNode(node, turn) {
  let max = node[0][turn]
  for (let i = 0; i < node.length; i++) {
    if (max < node[i][turn]) max = node[i][turn];
  }
  return max;
}


function choose(player, left, right, level) {
  if (getMaxInNode(left, player) > getMaxInNode(right, player)) {
    level.push({value: left, priority: ''})
    //return 1
  } else if (getMaxInNode(left, player) < getMaxInNode(right, player)) {
    level.push({value: right, priority: ''})
    //return 2
  } else if (getMaxInNode(left, player) === getMaxInNode(right, player)) {
    const value = left.concat(right)
    level.push({value: value, priority: ''})
    //return 3
  }
}


function findWay(nowLevel, prevLevel, root) {
  for (let i = 0; i < nowLevel.length; i++) {

    for (let j = 0; j < root[0].value.length; j++) {
      for (let d = 0; d < nowLevel[i].value.length; d++) {
        if (root[0].value[j] === (nowLevel[i].value[d])) {
          //console.log(i)
          const k = Math.trunc(i / 2)
          let priorityChild = ''
          if (i % 2 === 0) priorityChild = 'l'
          else priorityChild = 'r'

          prevLevel[k].priority += priorityChild

          //console.log(prevLevel, k)
          //console.log(priorityChild)
        }
      }
    }
  }
}


export function recursiveUP() {
  const level7 = Array.from({length: 64}, () => {
    return {
      value: [{
        first: Math.floor(Math.random() * 16),
        second: Math.floor(Math.random() * 16),
        third: Math.floor(Math.random() * 16)
      }],
      priority: null,
    };
  });

  const level1 = [];
  const level2 = [];
  const level3 = [];
  const level4 = [];
  const level5 = [];
  const level6 = [];

  let turn = 'third';

  for (let i = 0; i < level7.length;) {
    if (i > level7.length) break;
    const left = level7[i].value;
    const right = level7[i + 1].value;
    choose(turn, left, right, level6)
    i += 2;
  }
  turn = changeTurn(turn);

  for (let i = 0; i < level6.length;) {
    if (i > level6.length) break;
    const left = level6[i].value;
    const right = level6[i + 1].value;
    choose(turn, left, right, level5)
    i += 2;
  }
  turn = changeTurn(turn);
  for (let i = 0; i < level5.length;) {
    if (i > level5.length) break;
    const left = level5[i].value;
    const right = level5[i + 1].value;
    choose(turn, left, right, level4)
    i += 2;
  }
  //console.log(level4)
  turn = changeTurn(turn);
  for (let i = 0; i < level4.length;) {
    //if (i>level4.length) break;
    const left = level4[i].value;
    const right = level4[i + 1].value;
    choose(turn, left, right, level3)
    i += 2;
  }
  //console.log(level3)
  turn = changeTurn(turn);
  for (let i = 0; i < level3.length;) {
    //if (i>level4.length) break;
    const left = level3[i].value;
    const right = level3[i + 1].value;
    choose(turn, left, right, level2)
    i += 2;
  }
  //console.log(level2)
  turn = changeTurn(turn);
  for (let i = 0; i < level2.length;) {
    //if (i>level4.length) break;
    const left = level2[i].value;
    const right = level2[i + 1].value;
    choose(turn, left, right, level1)
    i += 2;
  }
  //console.log(level1[0])
  findWay(level2, level1, level1);
  findWay(level3, level2, level1);
  findWay(level4, level3, level1);
  findWay(level5, level4, level1);
  findWay(level6, level5, level1);
  findWay(level7, level6, level1);
  console.log('fff')
  /*for (let i = 0; i < level3.length; i++) {

    for (let j = 0; j < level1[0].value.length; j++) {
      for (let d = 0; d < level3[i].value.length; d++) {
        if (level1[0].value[j] === (level3[i].value[d])) {
          console.log(i)
          const k = Math.trunc(i / 2)
          let priorityChild = ''
          if (i % 2 === 0) priorityChild = 'l'
          else priorityChild = 'r'

          level2[k].priority += priorityChild

          console.log('level2 ', k)
          console.log(priorityChild)
        }
      }
    }
    //i+=2
  }*/


  return {
    level0: level1,
    level1: level2,
    level2: level3,
    level3: level4,
    level4: level5,
    level5: level6,
    level6: level7
  }
}


recursiveUP()