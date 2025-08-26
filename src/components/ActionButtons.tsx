'use client';

import { Camera, Send } from 'lucide-react';

interface ActionButtonsProps {
  onSave: () => void;
  onWhatsApp: () => void;
  onClear: () => void;
}

export default function ActionButtons({ onSave, onWhatsApp, onClear }: ActionButtonsProps) {
  return (
    <div className="flex gap-3 pt-3 flex-wrap">
      <button
        onClick={onSave}
        className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-medium py-3 rounded-xl shadow hover:bg-green-700 transition"
      >
        <Camera size={18} /> Salvar Checklist
      </button>

      <button
        onClick={onWhatsApp}
        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-medium py-3 rounded-xl shadow hover:bg-blue-700 transition"
      >
        <Send size={18} /> WhatsApp
      </button>

      <button
        onClick={onClear}
        className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white font-medium py-3 rounded-xl shadow hover:bg-red-700 transition"
      >
        ✖ Limpar Tudo
      </button>
    </div>
  );
}
