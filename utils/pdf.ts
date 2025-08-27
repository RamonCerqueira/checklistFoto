import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ChecklistItem } from "./storage";

export const generateChecklistPDF = async (data: ChecklistItem) => {
  const doc = new jsPDF();

  // Cabeçalho
  doc.setFontSize(18);
  doc.text("Checklist de Avarias", 14, 20);

  doc.setFontSize(12);
  doc.text(`Placa: ${data.plate}`, 14, 30);
  doc.text(`Telefone: ${data.phone}`, 14, 37);
  doc.text(`Data: ${new Date(data.createdAt).toLocaleString()}`, 14, 44);

  let y = 50;

  // Tabela com descrições
  autoTable(doc, {
    startY: y,
    head: [["Foto", "Descrição"]],
    body: data.photos.map((p, i) => [`Foto ${i + 1}`, p.description || "-"]),
  });

  y = (doc as any).lastAutoTable.finalY + 10;

  // Adicionar imagens
  for (let i = 0; i < data.photos.length; i++) {
    const photo = data.photos[i];
    if (!photo.url) continue;

    try {
      const imgData = await toBase64(photo.url);
      doc.addImage(imgData, "JPEG", 14, y, 60, 40);
      doc.text(`Foto ${i + 1}`, 80, y + 20);
      y += 50;

      if (y > 250) {
        doc.addPage();
        y = 20;
      }
    } catch (err) {
      console.warn(`Erro ao carregar imagem ${i + 1}`, err);
    }
  }

  // Salvar PDF
  doc.save(`checklist-${data.plate}.pdf`);
};

// Converte URL para Base64
function toBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas não suportado");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/jpeg", 0.7));
    };
    img.onerror = (err) => reject(err);
  });
}
