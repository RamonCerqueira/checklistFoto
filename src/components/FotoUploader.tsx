'use client';

import Image from 'next/image';

interface FotoData {
  file: File | null;
  preview: string | null;
}

interface FotoUploaderProps {
  index: number;
  foto: FotoData;
  obrigatoria?: boolean;
  onChange: (index: number, file: File | null) => void;
}

export default function FotoUploader({ index, foto, obrigatoria = false, onChange }: FotoUploaderProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="flex flex-col items-center justify-center w-24 h-24 bg-gray-100 border rounded-lg text-sm cursor-pointer">
        {foto.preview ? (
          <Image
            src={foto.preview}
            alt={`Foto ${index + 1}`}
            width={96}
            height={96}
            className="object-cover w-24 h-24 rounded-lg"
          />
        ) : (
          <span className="text-gray-500">
            Foto {index + 1}
            {obrigatoria ? '*' : ''}
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            onChange(index, file);
          }}
        />
      </label>
      <span className="text-sm text-gray-600">
        {obrigatoria ? '(Obrigatória)' : '(Opcional)'}
      </span>
    </div>
  );
}
