'use client';

import { Camera, Send, ArrowLeft, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ActionButtonsProps {
  onSave: () => void;
  onWhatsApp: () => void;
  onClear: () => void;
}

export default function ActionButtons({ onSave, onWhatsApp, onClear }: ActionButtonsProps) {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-t flex justify-around items-center p-2 z-50">
      {/* Voltar */}
      <button
        onClick={() => router.back()}
        className="flex flex-col items-center justify-center gap-1"
      >
        <ArrowLeft size={28} className="text-gray-700" />
        <span className="text-xs text-gray-700 font-semibold">Voltar</span>
      </button>

      {/* Salvar */}
      <button
        onClick={onSave}
        className="flex flex-col items-center justify-center gap-1"
      >
        <Camera size={28} className="text-green-600" />
        <span className="text-xs text-green-600 font-semibold">Salvar</span>
      </button>

      {/* WhatsApp */}
      <button
        onClick={onWhatsApp}
        className="flex flex-col items-center justify-center gap-1"
      >
        <Send size={28} className="text-blue-600" />
        <span className="text-xs text-blue-600 font-semibold">WhatsApp</span>
      </button>

      {/* Limpar */}
      <button
        onClick={onClear}
        className="flex flex-col items-center justify-center gap-1"
      >
        <Trash2 size={28} className="text-red-600" />
        <span className="text-xs text-red-600 font-semibold">Limpar</span>
      </button>
    </div>
  );
}
