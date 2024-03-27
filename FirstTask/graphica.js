import {create, all} from 'mathjs'

const config = {}
const math = create(all, config)

import {ChartJSNodeCanvas} from 'chartjs-node-canvas';
import fs from 'fs';


const m = math.matrix([
  [4, 0],
  [2, 3]
])

const t = math.transpose(m)


async function createInequalityGraph(first, second, solution) {
  const width = 400;
  const height = 400;

  const chartJSNodeCanvas = new ChartJSNodeCanvas({width, height});

  // Определение данных и настроек для графика
  const configuration = {
    type: 'line',
    data: {
      labels: ['0', '1'],
      datasets: [
        {
          label: '',
          data: [2, 2],
          //borderColor: 'rgb(255, 99, 132)',
          fill: '1',
          backgroundColor: 'rgba(0, 255, 0, 0.05)',
        },
        {
          label: 'x1>=1/4',
          data: [first[0], first[0] + first[1]],
          borderColor: 'rgb(255, 99, 132)',
          fill: '-2',
          backgroundColor: 'rgba(255, 0, 0, 0.05)',
          tension: 0.05,
        },
        {
          label: 'x1>=1/2-3/2*x2',
          data: [second[0], second[0] + second[1]],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.05,
          fill: '-2',
          backgroundColor: 'rgba(75, 192, 192, 0.1)',
        },
        {
          label: 'solution',
          data: [solution[0][0] + solution[1][0], -(1 - (solution[0][0] + solution[1][0]))],
          borderColor: 'rgb(120, 100, 0)',
          borderDash: [5, 5]
        },


      ]
    },
    options: {
      scales: {
        x: {
          min: 0,
          max: 1,
          ticks: {
            stepSize: 0.1
          },
        },
        y: {
          min: 0,
          max: 1,
          ticks: {
            stepSize: 0.1
          }
        }
      }
    }
  };


  // Рендеринг графика на холсте
  const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);

  // Сохранение изображения в файл
  fs.writeFileSync('graph.png', imageBuffer);
  console.log('The image was saved!');


}

async function createChart() {
  const width = 800;
  const height = 600;

  const chartCallback = (ChartJS) => {
    ChartJS.defaults.global.elements.point.radius = 0;
  };

  const chartNode = new ChartJSNodeCanvas({width, height});

  const configuration = {
    type: 'line',
    data: {
      labels: 'y=1/3',
      datasets: {
        label: 'y = 1/3',
        data: Array.from({length: 100}, (_, i) => 1 / 3),
        borderColor: 'blue',
        borderWidth: 2,
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        fill: true,
        spanGaps: true,
        clip: {
          values: [0, 1]
        },
      }
    },
    options: {
      scales: {
        xAxes: {
          scaleLabel: {
            display: true,
            labelString: 'x'
          }
        },
        yAxes: {
          scaleLabel: {
            display: true,
            labelString: 'y'
          }
        }
      }
    }
  };

  const image = await chartNode.drawChart(configuration);
  return image;
}


export function graphical(matrix) {

  const b = math.matrix([[1], [1]]);

// Solve the system of equations
  const solution = math.round(math.lusolve(matrix, b), 2);
  console.log(solution)
  const first = [(b._data[0] / matrix._data[0][0]), (-matrix._data[0][1] / matrix._data[0][0])]
  const second = [(b._data[0] / matrix._data[1][0]), (-matrix._data[1][1] / matrix._data[1][0])]


  createInequalityGraph(first, second, solution._data)
  console.log('Price', math.round(1 / (solution._data[0][0] + solution._data[1][0]), 1))

}

graphical(t)
