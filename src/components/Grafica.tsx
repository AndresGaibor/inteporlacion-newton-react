import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  ScatterController,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';

// Registración de componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  ScatterController
);

interface GraficaProps {
  chartData: {
    datasets: any[];
  };
  opciones: ChartOptions<'scatter'>;
}

export function Grafica({ chartData, opciones }: GraficaProps) {
  if (!chartData || chartData.datasets.length === 0) return null;
  return (
    <div className="mt-8 w-full h-72 md:h-96 bg-white/80 backdrop-blur-md shadow-xl rounded-lg p-4 mx-auto max-w-4xl">
      <Line data={chartData} options={opciones} />
    </div>
  );
}
