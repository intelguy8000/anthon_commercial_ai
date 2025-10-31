'use client';

import { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PreviewPanelProps {
  content: string;
}

export default function PreviewPanel({ content }: PreviewPanelProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!previewRef.current) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`propuesta-estudiarte-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Error al exportar PDF:', error);
      alert('Error al generar el PDF. Por favor intenta de nuevo.');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-secondary flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">📄 Vista Previa</h2>
          <p className="text-sm text-white/80 mt-1">Propuesta en Markdown</p>
        </div>
        <button
          onClick={handleExportPDF}
          className="px-4 py-2 bg-white text-secondary rounded-lg hover:bg-gray-100 font-semibold text-sm"
        >
          📥 Exportar PDF
        </button>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide" ref={previewRef}>
        {content ? (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-secondary mb-4" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-secondary mt-6 mb-3" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-secondary mt-4 mb-2" {...props} />,
                p: ({ node, ...props }) => <p className="text-secondary-80 mb-3 leading-relaxed" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-3 space-y-1" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />,
                li: ({ node, ...props }) => <li className="text-secondary-80" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-bold text-secondary" {...props} />,
                em: ({ node, ...props }) => <em className="italic" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic text-secondary-70 my-4" {...props} />
                ),
                code: ({ node, ...props }) => (
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono" {...props} />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-16">
            <p className="text-lg font-semibold mb-2">Sin contenido aún</p>
            <p className="text-sm">La propuesta aparecerá aquí cuando hables con Lupia.</p>
          </div>
        )}
      </div>
    </div>
  );
}
