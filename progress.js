// setup 
const data = {
  labels: ['Mon'],
  datasets: [{
    label: 'Weekly Sales',
    data: [50, 100],
    borderColor: [
      '#332E38',
    ],
    backgroundColor: [
      'rgba(255, 26, 104, 1)',
    ],
    borderWidth: 1,
    borderSkipped : false,
    borderRadius : 20,
    barPercentage : 0.4,
    categoryPercentage : 0.8
  }]
};

const progressBar = {
    id: 'progressBar',
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;
        ctx.save();

        const barHeight = height / y.ticks.length * data.datasets[0].barPercentage * data.datasets[0].categoryPercentage;
        const radius = 20;

        data.datasets[0].data.forEach((dataPoint, index) => {
            const fontSizeDataPoint = 30;
            ctx.font = `${fontSizeDataPoint}px sans-serif`;
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${data.datasets[0].data[0]}%`, right, y.getPixelForValue(0) - fontSizeDataPoint - 5);
    
            ctx.beginPath();
            ctx.fillStyle = data.datasets[0].borderColor[index];

            const xPos = left;
            const yPos = y.getPixelForValue(index) - (barHeight / 2);
            const barWidth = width;
            const barHeightWithRadius = barHeight;

            // Draw rounded rectangle path
            ctx.moveTo(xPos + radius, yPos);
            ctx.lineTo(xPos + barWidth - radius, yPos);  // Top line
            ctx.quadraticCurveTo(xPos + barWidth, yPos, xPos + barWidth, yPos + radius);  // Top-right corner
            ctx.lineTo(xPos + barWidth, yPos + barHeightWithRadius - radius);  // Right side
            ctx.quadraticCurveTo(xPos + barWidth, yPos + barHeightWithRadius, xPos + barWidth - radius, yPos + barHeightWithRadius);  // Bottom-right corner
            ctx.lineTo(xPos + radius, yPos + barHeightWithRadius);  // Bottom line
            ctx.quadraticCurveTo(xPos, yPos + barHeightWithRadius, xPos, yPos + barHeightWithRadius - radius);  // Bottom-left corner
            ctx.lineTo(xPos, yPos + radius);  // Left side
            ctx.quadraticCurveTo(xPos, yPos, xPos + radius, yPos);  // Top-left corner

            ctx.closePath();
            ctx.fill();  // Fill the rounded rectangle
        });

        ctx.restore();
    }
};


// config 
const config = {
  type: 'bar',
  data,
  options: {
    maintainAspectRatio: false,
    indexAxis : 'y',
    plugins : {
        legend : {
            display : false
        }
    },
    scales: {
        x: {
            display : false,
            grid : {
                display : false,
                drawBorder : false
            },
            ticks : {
                display : false
            },
          },
      y: {
        display : false,
        beginAtZero: true,
        grid : {
            display : false,
            drawBorder : false
        },
        ticks : {
            display : false
        }
      }
    }
  },
  plugins : [progressBar]
};

// render init block
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);

// Instantly assign Chart.js version
// const chartVersion = document.getElementById('chartVersion');
