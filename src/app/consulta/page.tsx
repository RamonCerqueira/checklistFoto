'use client';

import { useState } from 'react';
import { findByPlate, ChecklistItem } from '../../../utils/storage';
import ChecklistDetails from '../../components/ChecklistDetails';
import ActionButtons from '../../components/ActionButtons'; // importa os botões

export default function ConsultaPage() {
  const [plate, setPlate] = useState('');
  const [results, setResults] = useState<ChecklistItem[]>([]);
  const [selected, setSelected] = useState<ChecklistItem | null>(null);

  const handleSearch = () => {
    if (!plate) return alert('Digite a placa!');
    const data = findByPlate(plate);
    if (data.length === 0) {
      alert('Nenhum checklist encontrado para essa placa.');
      return;
    }
    setResults(data);
    setSelected(null);
  };

  const handleSave = () => {
    alert('⚡ Checklist salvo ou exportado!');
  };

  const handleWhatsApp = () => {
    if (!selected) return alert('Selecione um checklist primeiro!');
    const whatsappLink = `https://wa.me/${selected.phone || ''}`;
    window.open(whatsappLink, '_blank');
  };

  const handleClear = () => {
    setPlate('');
    setResults([]);
    setSelected(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white p-5 rounded-2xl shadow-md space-y-4">
        <h1 className="text-xl font-bold text-green-700 text-center">
          🔍 Consulta de Checklist
        </h1>

        {/* Campo de busca */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Placa do veículo"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-3 rounded-xl hover:bg-green-700"
          >
            Buscar
          </button>
        </div>

        {/* Lista de resultados */}
        {!selected && results.length > 0 && (
          <div className="space-y-2">
            {results.map((item) => (
              <div
                key={item.id}
                className="p-3 border rounded-xl bg-gray-50 hover:bg-green-50 cursor-pointer"
                onClick={() => setSelected(item)}
              >
                <p className="font-bold text-gray-800">
                  OS: {item.id.toString().slice(-4)}
                </p>
                <p className="text-sm text-gray-600">
                  Data: {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Detalhe de um checklist */}
        {selected && <ChecklistDetails data={selected} />}

        {/* Botões de ação sempre visíveis */}
        <ActionButtons
          onSave={handleSave}
          onWhatsApp={handleWhatsApp}
          onClear={handleClear}
        />
      </div>
    </div>
  );
}
