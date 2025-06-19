import { BlockMath } from 'react-katex';

interface EcuacionProps {
  ecuacion: string;
}

export function Ecuacion({ ecuacion }: EcuacionProps) {
  if (!ecuacion) return null;
  return (
    <div className="mt-2 p-4 bg-white shadow-inner rounded-lg text-sm text-gray-800 mx-auto w-full max-w-2xl">
      <BlockMath math={ecuacion} />
    </div>
  );
}
