'use client';

import { useState } from 'react';
import { Camera, Image } from 'lucide-react';
import ActionButtons from '../../components/ActionButtons';

export default function ChecklistPage() {
  const [plate, setPlate] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneLocked, setPhoneLocked] = useState(false);
  const [photos, setPhotos] = useState<(File | null)[]>(Array(6).fill(null));
  const [descriptions, setDescriptions] = useState<string[]>(Array(6).fill(''));

  // --- Funções da página ---
  const handleSearchPlate = async () => {
    if (!plate) return alert('Digite a placa antes de buscar!');
    try {
      const res = await fetch(`/api/equi_ser/${plate}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPhone(data.phone);
      setPhoneLocked(true);
    } catch {
      setPhone('');
      setPhoneLocked(false);
      alert('Placa não encontrada, informe o telefone manualmente.');
    }
  };

  const handlePhotoChange = (index: number, file: File | null) => {
    const updated = [...photos];
    updated[index] = file;
    setPhotos(updated);
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updated = [...descriptions];
    updated[index] = value;
    setDescriptions(updated);
  };

  const handleSubmit = () => {
    if (!phone) return alert('Informe um telefone válido!');
    if (!plate) return alert('Informe uma placa válida!');
    alert('Checklist salvo com sucesso!');
  };

  const handleWhatsApp = () => {
    if (!phone) return alert('Informe um telefone válido!');
    const whatsappLink = `https://wa.me/${phone}`;
    window.open(whatsappLink, '_blank');
  };

  const handleClearAll = () => {
    setPlate('');
    setPhone('');
    setPhoneLocked(false);
    setPhotos(Array(10).fill(null));
    setDescriptions(Array(10).fill(''));
  };

  // --- JSX ---
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-5 space-y-4 mb-4">
        <h1 className="text-xl font-bold text-center text-green-700">📋 Check List - Registro</h1>

        {/* Placa */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Placa do veículo"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSearchPlate}
            className="bg-green-600 text-white px-3 rounded-xl hover:bg-green-700"
          >
            Buscar
          </button>
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Telefone WhatsApp</label>
          <input
            type="tel"
            placeholder="5571999999999"
            value={phone}
            disabled={phoneLocked}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full p-3 border rounded-xl ${phoneLocked ? 'bg-gray-100' : ''} focus:ring-2 focus:ring-green-500`}
          />
        </div>

        {/* Fotos + descrição + preview */}
        <div className="space-y-2">
          {photos.map((photo, i) => (
            <div key={i} className="border rounded-xl p-3 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-700">
                  Foto {i + 1} {i < 6 && <span className="text-red-500">*</span>}
                </div>

                <div className="flex gap-2">
                  {/* Botão Galeria */}
                  <label className="flex items-center gap-2 text-green-600 cursor-pointer text-sm">
                    <Image size={18} />
                    Galeria
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handlePhotoChange(i, e.target.files?.[0] || null)}
                    />
                  </label>

                  {/* Botão Câmera */}
                  <label className="flex items-center gap-2 text-green-600 cursor-pointer text-sm">
                    <Camera size={18} />
                    Câmera
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={(e) => handlePhotoChange(i, e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
              </div>

              {/* Preview */}
              {photo && (
                <div className="mb-2">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Foto ${i + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow-sm"
                  />
                </div>
              )}

              {/* Descrição */}
              <input
                type="text"
                placeholder="Descrição da foto"
                value={descriptions[i]}
                onChange={(e) => handleDescriptionChange(i, e.target.value)}
                className="w-full p-2 border rounded-xl text-sm focus:ring-2 focus:ring-green-500"
              />
            </div>
          ))}
        </div>

        {/* Botões */}
        <div className='mt-10'>
        <ActionButtons
          onSave={handleSubmit}
          onWhatsApp={handleWhatsApp}
          onClear={handleClearAll}
        />
        </div>
      </div>
    </div>
  );
}
