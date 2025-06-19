import type { Punto } from '../types';

interface ListadoPuntosProps {
  puntos: Punto[];
  onEliminar: (indice: number) => void;
}

export function ListadoPuntos({ puntos, onEliminar }: ListadoPuntosProps) {
  return (
    <>
      <h3 className="text-xl font-semibold mb-4 text-indigo-600">Puntos actuales</h3>
      <ul className="list-disc list-inside mb-4 space-y-1">
        {puntos.map((p, idx) => (
          <li key={idx} className="flex justify-between items-center">
            <span>({p.x}, {p.y})</span>
            <button
              onClick={() => onEliminar(idx)}
              className="text-red-500 hover:text-red-700 font-bold"
              aria-label="Eliminar punto"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
