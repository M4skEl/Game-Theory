const { lpSolve } = require('pulp');

// Определяем переменные и ограничения
const lp = lpSolve([
  { maximize: 'x + y', subjectTo: ['3*x + 4*y <= 25', 'x + y >= 5'] }
]);

// Выводим результат
console.log('Оптимальное решение:');
console.log('x =', lp.result.x);
console.log('y =', lp.result.y);

