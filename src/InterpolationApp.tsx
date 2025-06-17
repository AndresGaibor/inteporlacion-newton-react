import { useState, useMemo } from 'react';
import { dividedDifferences, newtonPolynomial } from './utils/newton';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ScatterController,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ScatterController
);

export default function InterpolationApp() {
  const [points, setPoints] = useState<{ x: number; y: number; }[]>([]);
  const [newPoint, setNewPoint] = useState({ x: '', y: '' });
  const [xEval, setXEval] = useState('');
  const [result, setResult] = useState<number | null>(null);

  // Función para eliminar un punto por índice
  const deletePoint = (idx: number) => {
    setPoints(points.filter((_, i) => i !== idx));
    setResult(null);
  };

  const addPoint = () => {
    const x = parseFloat(newPoint.x);
    const y = parseFloat(newPoint.y);
    if (!isNaN(x) && !isNaN(y)) {
      setPoints([...points, { x, y }]);
      setNewPoint({ x: '', y: '' });
      setResult(null);
    }
  };

  const computeInterpolation = () => {
    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    const coefs = dividedDifferences(xs, ys);
    const xe = parseFloat(xEval);
    if (!isNaN(xe)) {
      const yInterp = newtonPolynomial(coefs, xs, xe);
      setResult(yInterp);
    }
  };

  const chartData = useMemo(() => {
    if (points.length < 2) return null;
    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    const coefs = dividedDifferences(xs, ys);

    const lastCoef = coefs[coefs.length - 1];
    const hue = Math.abs(lastCoef * 60) % 360; // Adjusted multiplier for more color variation
    const lineColor = `hsl(${hue}, 70%, 45%)`; // Darker line for better contrast on light bg

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const step = (maxX - minX) / 100;
    const curvePoints: { x: number; y: number }[] = [];
    for (let x = minX; x <= maxX; x += step) {
      const y = newtonPolynomial(coefs, xs, x);
      curvePoints.push({ x, y });
    }

    return {
      datasets: [
        {
          label: 'Interpolación',
          data: curvePoints,
          showLine: true,
          fill: false,
          borderColor: lineColor,
          backgroundColor: lineColor, // Can be same as borderColor or a lighter shade
          tension: 0.1 // Smoother curve
        },
        {
          label: 'Puntos dados',
          data: points,
          showLine: false,
          pointRadius: 6, // Slightly larger points
          pointBackgroundColor: '#0D47A1', // Dark blue for points
        },
      ],
    };
  }, [points]);

  const options: ChartOptions<'scatter'> = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: { display: true, text: 'X', color: '#333' },
        ticks: { color: '#555' },
        grid: { color: 'rgba(0, 0, 0, 0.05)' }
      },
      y: {
        title: { display: true, text: 'Y', color: '#333' },
        ticks: { color: '#555' },
        grid: { color: 'rgba(0, 0, 0, 0.05)' }
      }
    },
    plugins: {
      legend: { position: 'top', labels: { color: '#333' } },
      title: { display: true, text: 'Interpolación de Newton', color: '#1A237E' }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-100 to-indigo-200 p-4 md:p-8 font-sans text-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-8">Interpolación y Gráfica con Newton</h2>

      <div className="bg-white shadow-xl rounded-lg p-6 mb-6 mx-auto w-full max-w-2xl">
        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-indigo-600">Puntos actuales</h3>
        <ul className="list-disc list-inside mb-4 space-y-1">
          {points.map((p, i) => (
            <li key={i} className="flex justify-between items-center">
              <span>({p.x}, {p.y})</span>
              <button
                onClick={() => deletePoint(i)}
                className="text-red-500 hover:text-red-700 font-bold"
                aria-label="Eliminar punto"
              >✕</button>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="number"
            className="border border-gray-300 rounded p-2 w-24 sm:w-32 text-gray-700 focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="X"
            value={newPoint.x}
            onChange={e => setNewPoint({ ...newPoint, x: e.target.value })}
          />
          <input
            type="number"
            className="border border-gray-300 rounded p-2 w-24 sm:w-32 text-gray-700 focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Y"
            value={newPoint.y}
            onChange={e => setNewPoint({ ...newPoint, y: e.target.value })}
          />
          <button
            onClick={addPoint}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
          >Añadir punto</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center justify-center mb-6 mx-auto w-full max-w-2xl">
        <input
          type="number"
          className="border border-gray-300 rounded p-2 w-32 sm:w-48 text-gray-700 focus:ring-2 focus:ring-indigo-400 outline-none"
          placeholder="Evaluar en x = ..."
          value={xEval}
          onChange={e => setXEval(e.target.value)}
        />
        <button
          onClick={computeInterpolation}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
        >Calcular</button>
      </div>

      {result !== null && (
        <div className="mt-4 bg-teal-500 text-white p-4 rounded text-center font-medium mx-auto w-full max-w-2xl shadow-lg">
          <strong>Resultado:</strong> P({xEval}) = {result}
        </div>
      )}

      {chartData && (
        <div className="mt-8 w-full h-64 md:h-[32rem] bg-white/80 backdrop-blur-md shadow-xl rounded-lg p-4 mx-auto max-w-4xl">
          <Scatter data={chartData} options={options} />
        </div>
      )}
    </div>
  );
}