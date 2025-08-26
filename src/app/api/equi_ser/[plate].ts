import type { NextApiRequest, NextApiResponse } from 'next';

// Mock de dados da tabela equi_ser
const equiSerTable = [
  { CodEquipamento: 'ABC1234', Rec2: '55999999999' },
  { CodEquipamento: 'XYZ9876', Rec2: '55888888888' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { plate } = req.query;
  const record = equiSerTable.find(
    (item) => item.CodEquipamento.toUpperCase() === String(plate).toUpperCase()
  );

  if (record) {
    res.status(200).json({ phone: record.Rec2 });
  } else {
    res.status(404).json({ message: 'Placa não encontrada' });
  }
}
