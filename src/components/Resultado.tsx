interface ResultadoProps {
  resultado: number | null;
  xEval: string;
}

export function Resultado({ resultado, xEval }: ResultadoProps) {
  if (resultado === null) return null;
  const x = parseFloat(xEval).toFixed(2);
  return (
    <div className="mt-4 bg-teal-500 text-white p-4 rounded text-center font-medium mx-auto w-full max-w-2xl shadow-lg">
      <strong>Resultado:</strong> P({x}) = {resultado.toFixed(2)}
    </div>
  );
}
