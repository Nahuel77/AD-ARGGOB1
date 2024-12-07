import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    data: number[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
    const labels = data.map((_, index) => `Segmento ${index + 1}`);
  
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Distribución de los valores',
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          borderColor: '#ecf0f1',
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        tooltip: {
          backgroundColor: '#2c3e50',
          titleColor: '#ecf0f1',
          bodyColor: '#ecf0f1',
        },
        legend: {
          labels: {
            fontColor: '#ecf0f1',
          },
        },
      },
    };
  
    return (
      <div style={{ backgroundColor: '#2c3e50', padding: '20px', borderRadius: '10px' }}>
        <h2 style={{ color: '#ecf0f1' }}>Gráfico de Tortas (Tema Oscuro)</h2>
        <Pie data={chartData} options={options} />
      </div>
    );
  };
  
  export default PieChart;