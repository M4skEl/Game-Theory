import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import fs from 'fs';

export function graphoAnalitik(matrix) {
  let a1 = matrix._data[0][0] - matrix._data[1][0];
  let b1 = matrix._data[1][0];
  let a2 = matrix._data[0][1] - matrix._data[1][1];
  let b2 = matrix._data[1][1];
  let x1 = (b2 - b1) / (a1 - a2)
  let x2 = 1 - x1
  return {x1, x2}
}

export function graphoAnalitikSecondGamer(matrix) {
  let a1 = matrix._data[0][0] - matrix._data[0][1];
  let b1 = matrix._data[0][1];
  let a2 = matrix._data[1][0] - matrix._data[1][1];
  let b2 = matrix._data[1][1];
  let x1 = (b2 - b1) / (a1 - a2)
  let x2 = 1 - x1
  return {x1, x2}
}

function print(){


// Создаем экземпляр объекта для построения графиков
  const chart = new ChartJSNodeCanvas({ width: 800, height: 600 });

// Задаем данные для обоих графиков
  const data = {
    labels: [],
    datasets: [
      {
        label: '4х',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: '-x+3',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  for (let x = 0; x <= 1; x++) {
    data.labels.push(x);
    data.datasets[0].data.push(4*x);
    data.datasets[1].data.push(-1*x + 3);
  }

// Строим графики на одной координатной плоскости
  (async () => {
    const image = await chart.renderToBuffer({
      type: 'line',
      data: data,
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          },
          y: {
            type: 'linear'
          }
        }
      }
    });

    fs.writeFileSync('combined_graphs2.png', image);
  })();
}

print()