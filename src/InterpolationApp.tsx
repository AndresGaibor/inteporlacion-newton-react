import { useState, useMemo, useEffect } from 'react';
import { dividedDifferences, newtonPolynomial } from './utils/newton';
import 'katex/dist/katex.min.css';
import type { ChartOptions } from 'chart.js';
import type { Punto, PuntoNuevo } from './types';
import { FormPunto } from './components/FormPunto.tsx';
import { ListadoPuntos } from './components/ListadoPuntos.tsx';
import { InputEvaluacion } from './components/InputEvaluacion.tsx';
import { Resultado } from './components/Resultado.tsx';
import { Ecuacion } from './components/Ecuacion.tsx';
import { Grafica } from './components/Grafica.tsx';

export default function AppInterpolacion() {
  const [puntos, setPuntos] = useState<Punto[]>([]);
  const [nuevoPunto, setNuevoPunto] = useState<PuntoNuevo>({ x: '', y: '' });
  const [xEvaluar, setXEvaluar] = useState('');
  const [resultado, setResultado] = useState<number | null>(null);
  const [ecuacion, setEcuacion] = useState('');

  const agregarPunto = () => {
    const x = parseFloat(nuevoPunto.x);
    const y = parseFloat(nuevoPunto.y);
    if (!isNaN(x) && !isNaN(y)) {
      setPuntos([...puntos, { x, y }]);
      setNuevoPunto({ x: '', y: '' });
      setResultado(null);
      setEcuacion('');
    }
  };

  const eliminarPunto = (indice: number) => {
    setPuntos(puntos.filter((_, i) => i !== indice));
    setResultado(null);
    setEcuacion('');
  };

  const calcularInterpolacion = () => {
    if (puntos.length < 2) {
      alert('Se necesitan al menos 2 puntos.');
      setResultado(null);
      setEcuacion('');
      return;
    }
    const xs = puntos.map(p => p.x);
    const ys = puntos.map(p => p.y);
    const coefs = dividedDifferences(xs, ys);
    const xe = parseFloat(xEvaluar);
    if (isNaN(xe)) {
      setResultado(null);
      setEcuacion('');
      return;
    }
    const yInterp = newtonPolynomial(coefs, xs, xe);
    setResultado(yInterp);

    // generar polinomio simplificado estándar
    const n = coefs.length;
    const base: number[][] = [ [1] ];
    for (let i = 1; i < n; i++) {
      const ant = base[i-1];
      const pol = new Array(ant.length+1).fill(0);
      const xi = xs[i-1];
      ant.forEach((coef, j) => {
        pol[j] += coef * -xi;
        pol[j+1] += coef;
      });
      base.push(pol);
    }
    const coefPol = new Array(n).fill(0);
    base.forEach((b, i) => b.forEach((c, j) => coefPol[j] += c * coefs[i] ));
    let eq = '';
    coefPol.reverse().forEach((c, idx) => {
      const pot = n-1-idx;
      const val = parseFloat(c.toFixed(2));
      if (val === 0) return;
      const signo = val > 0 ? (eq ? ' + ' : '') : ' - ';
      const absV = Math.abs(val).toFixed(2);
      eq += signo + (pot > 1 ? `${absV}x^${pot}` : pot === 1 ? `${absV}x` : absV);
    });
    setEcuacion(`P(x) = ${eq}`);
  };

  // Generar ecuación automáticamente cuando cambian los puntos
  useEffect(() => {
    if (puntos.length < 2) {
      setEcuacion('');
      return;
    }
    const xs = puntos.map(p => p.x);
    const ys = puntos.map(p => p.y);
    const coefs = dividedDifferences(xs, ys);
    const n = coefs.length;
    // generar polinomio en forma estándar
    const base: number[][] = [[1]];
    for (let i = 1; i < n; i++) {
      const ant = base[i - 1];
      const pol = new Array(ant.length + 1).fill(0);
      const xi = xs[i - 1];
      ant.forEach((coef, j) => {
        pol[j] += coef * -xi;
        pol[j + 1] += coef;
      });
      base.push(pol);
    }
    const coefPol = new Array(n).fill(0);
    base.forEach((b, i) => b.forEach((c, j) => (coefPol[j] += c * coefs[i])));
    let eq = '';
    coefPol
      .slice()
      .reverse()
      .forEach((c, idx) => {
        const pot = n - 1 - idx;
        const val = parseFloat(c.toFixed(2));
        if (val === 0) return;
        const signo = val > 0 ? (eq ? ' + ' : '') : ' - ';
        const absV = Math.abs(val).toFixed(2);
        eq += signo + (pot > 1 ? `${absV}x^${pot}` : pot === 1 ? `${absV}x` : absV);
      });
    setEcuacion(`P(x) = ${eq}`);
  }, [puntos]);

  const datosGrafica = useMemo(() => {
    const datasets = [];
    if (puntos.length) {
      const xs = puntos.map(p => p.x);
      const ys = puntos.map(p => p.y);
      const coefs = dividedDifferences(xs, ys);
      // curva
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const paso = (maxX - minX)/100 || 0.1;
      const curva = [];
      for (let x = minX; x <= maxX; x += paso) {
        const y = newtonPolynomial(coefs, xs, x);
        if (!isNaN(y)) curva.push({ x, y });
      }
      const hue = Math.abs(coefs[coefs.length-1]*60)%360;
      datasets.push({ type: 'line', label: 'Interpolación', data: curva, borderColor: `hsl(${hue},70%,45%)`, backgroundColor: 'transparent', borderWidth: 3, tension: 0.1, fill: false, pointRadius: 0, order: 0 });
      datasets.push({ type: 'scatter', label: 'Puntos dados', data: puntos, backgroundColor: 'rgba(54,162,235,1)', borderColor: '#fff', borderWidth: 2, pointRadius: 6, showLine: false, order: 1 });
      if (resultado !== null && !isNaN(parseFloat(xEvaluar))) {
        datasets.push({ type: 'scatter', label: 'Punto evaluado', data: [{ x: parseFloat(xEvaluar), y: resultado }], backgroundColor: 'rgba(0,200,0,1)', borderColor: '#fff', borderWidth: 2, pointRadius: 8, pointStyle: 'triangle', order: 2 });
      }
    }
    return { datasets };
  }, [puntos, xEvaluar, resultado]);

  const opciones: ChartOptions<'scatter'> = { scales: { x: { type: 'linear', position: 'bottom', title: { display: true, text: 'X' } }, y: { title: { display: true, text: 'Y' } } }, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Interpolación de Newton' } }, responsive: true, maintainAspectRatio: false };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-100 to-indigo-200 p-4 md:p-8 text-gray-800">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">Interpolación de Newton</h2>
      <div className="bg-white shadow-xl rounded-lg p-6 mb-6 mx-auto max-w-2xl">
        <ListadoPuntos puntos={puntos} onEliminar={eliminarPunto} />
        <FormPunto punto={nuevoPunto} onChange={(campo, val) => setNuevoPunto({ ...nuevoPunto, [campo]: val })} onAgregar={agregarPunto} />
      </div>
      {/* Ecuación automática tras ingresar puntos */}
      <Ecuacion ecuacion={ecuacion} />
      <div className="flex flex-wrap gap-3 items-center justify-center mt-6 mb-6 mx-auto max-w-2xl">
        <InputEvaluacion xEval={xEvaluar} onChange={setXEvaluar} onCalcular={calcularInterpolacion} />
      </div>
      <Resultado resultado={resultado} xEval={xEvaluar} />
      <Grafica chartData={datosGrafica} opciones={opciones} />
    </div>
  );
}