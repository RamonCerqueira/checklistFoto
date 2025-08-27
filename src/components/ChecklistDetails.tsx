'use client';

import { ChecklistItem } from '../../utils/storage';
import { generateChecklistPDF } from '../../utils/pdf'; // importe a função de PDF

interface Props {
  data: ChecklistItem;
}

export default function ChecklistDetails({ data }: Props) {
  const handleDownloadPDF = async () => {
    try {
      await generateChecklistPDF(data);
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
      alert("Falha ao gerar PDF. Veja o console para detalhes.");
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-700">
        Detalhes do Checklist - {data.plate}
      </h2>
      <p className="text-sm text-gray-600">Telefone: {data.phone}</p>
      <p className="text-sm text-gray-600">Data: {new Date(data.createdAt).toLocaleString()}</p>

      <div className="grid grid-cols-2 gap-3">
        {data.photos.map((photo, i) => (
          <div key={i} className="bg-white p-2 rounded-xl shadow-sm">
            <img
              src={photo.url}
              alt={`Foto ${i + 1}`}
              className="w-full h-28 object-cover rounded-md mb-1"
            />
            {photo.description && (
              <p className="text-xs text-gray-600">{photo.description}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <button
          className="flex-1 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700"
          onClick={() => window.open(`https://wa.me/${data.phone}`, '_blank')}
        >
          Enviar via WhatsApp
        </button>
        <button
          className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
          onClick={handleDownloadPDF}
        >
          Baixar PDF
        </button>
      </div>
    </div>
  );
}
