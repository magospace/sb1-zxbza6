import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PetHealthChartProps {
  petName: string;
  weights: number[];
  dates: string[];
}

const PetHealthChart: React.FC<PetHealthChartProps> = ({ petName, weights, dates }) => {
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Peso (kg)',
        data: weights,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Historial de Peso de ${petName}`,
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default PetHealthChart;