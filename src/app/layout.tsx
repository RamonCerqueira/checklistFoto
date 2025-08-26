import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checklist App',
  description: 'Registro de avarias e fotos para serviços',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}