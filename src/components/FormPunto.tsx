export interface PuntoNuevo { x: string; y: string; }

interface FormPuntoProps {
  punto: PuntoNuevo;
  onChange: (campo: keyof PuntoNuevo, valor: string) => void;
  onAgregar: () => void;
}

export function FormPunto({ punto, onChange, onAgregar }: FormPuntoProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <input
        type="number"
        placeholder="X"
        value={punto.x}
        className="border border-gray-300 rounded p-2 w-24 sm:w-32 text-gray-700 focus:ring-2 focus:ring-indigo-400 outline-none"
        onChange={e => onChange('x', e.target.value)}
      />
      <input
        type="number"
        placeholder="Y"
        value={punto.y}
        className="border border-gray-300 rounded p-2 w-24 sm:w-32 text-gray-700 focus:ring-2 focus:ring-indigo-400 outline-none"
        onChange={e => onChange('y', e.target.value)}
      />
      <button
        onClick={onAgregar}
        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
      >
        Añadir punto
      </button>
    </div>
  );
}
