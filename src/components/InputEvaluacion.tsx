interface InputEvaluacionProps {
  xEval: string;
  onChange: (valor: string) => void;
  onCalcular: () => void;
}

export function InputEvaluacion({ xEval, onChange, onCalcular }: InputEvaluacionProps) {
  return (
    <>
      <input
        type="number"
        className="border border-gray-300 rounded p-2 w-32 sm:w-48 text-gray-700 focus:ring-2 focus:ring-indigo-400 outline-none"
        placeholder="Evaluar en x = ..."
        value={xEval}
        onChange={e => onChange(e.target.value)}
      />
      <button
        onClick={onCalcular}
        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
      >
        Calcular
      </button>
    </>
  );
}
