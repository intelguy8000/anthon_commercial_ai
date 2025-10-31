'use client';

import { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PreviewPanelProps {
  content: string;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export default function PreviewPanel({ content, isExpanded = false, onToggleExpand }: PreviewPanelProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!previewRef.current) return;

    try {
      // Create a temporary container with proper styling for PDF
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '800px';
      tempDiv.style.background = 'white';
      tempDiv.style.padding = '40px';
      tempDiv.innerHTML = previewRef.current.innerHTML;
      document.body.appendChild(tempDiv);

      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      document.body.removeChild(tempDiv);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'letter');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Calculate how many pages we need
      const ratio = pdfWidth / imgWidth;
      const scaledHeight = imgHeight * ratio;
      const pageCount = Math.ceil(scaledHeight / pdfHeight);

      for (let i = 0; i < pageCount; i++) {
        if (i > 0) pdf.addPage();

        const position = -(pdfHeight * i) / ratio;
        pdf.addImage(imgData, 'PNG', 0, position * ratio, pdfWidth, scaledHeight);
      }

      pdf.save(`propuesta-loopera-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Error al exportar PDF:', error);
      alert('Error al generar el PDF. Por favor intenta de nuevo.');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-2 border-b border-gray-200 bg-white flex justify-between items-center flex-shrink-0">
        <h2 className="text-sm font-semibold text-gray-700">📄 Vista Previa</h2>
        <div className="flex gap-2">
          {content && (
            <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
              {content.length} chars
            </span>
          )}
          {onToggleExpand && (
            <button
              onClick={onToggleExpand}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-xs"
              title={isExpanded ? "Cerrar" : "Expandir"}
            >
              {isExpanded ? '✕' : '⛶'}
            </button>
          )}
          <button
            onClick={handleExportPDF}
            disabled={!content}
            className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            📥 PDF
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto p-8" ref={previewRef}>
          {content ? (
            <div className="bg-white rounded-lg shadow-sm p-8 loopera-proposal">
              <style jsx>{`
                .loopera-proposal {
                  font-family: 'Calibri', 'Arial', sans-serif;
                  color: #2A2623;
                  line-height: 1.6;
                }
                .loopera-proposal h1 {
                  color: #EA2839;
                  font-size: 28px;
                  font-weight: bold;
                  margin-bottom: 16px;
                  padding-bottom: 8px;
                  border-bottom: 3px solid #EA2839;
                }
                .loopera-proposal h2 {
                  color: #EA2839;
                  font-size: 20px;
                  font-weight: bold;
                  margin-top: 32px;
                  margin-bottom: 16px;
                  padding-bottom: 8px;
                  border-bottom: 2px solid #EA2839;
                }
                .loopera-proposal h3 {
                  color: #2A2623;
                  font-size: 16px;
                  font-weight: bold;
                  margin-top: 20px;
                  margin-bottom: 10px;
                }
                .loopera-proposal p {
                  margin-bottom: 12px;
                  text-align: justify;
                }
                .loopera-proposal ul, .loopera-proposal ol {
                  margin: 10px 0 15px 25px;
                }
                .loopera-proposal li {
                  margin: 5px 0;
                  line-height: 1.5;
                }
                .loopera-proposal strong {
                  font-weight: bold;
                  color: #2A2623;
                }
                .loopera-proposal em {
                  font-style: italic;
                }
                .loopera-proposal blockquote {
                  background: #F8F8F8;
                  border-left: 4px solid #0065BD;
                  padding: 15px;
                  margin: 15px 0;
                }
                .loopera-proposal code {
                  background: #F8F8F8;
                  padding: 2px 6px;
                  border-radius: 4px;
                  font-family: 'Courier New', monospace;
                  font-size: 0.9em;
                }
                .loopera-proposal pre {
                  background: #2A2623;
                  color: white;
                  padding: 16px;
                  border-radius: 8px;
                  overflow-x: auto;
                  margin: 16px 0;
                }
                .loopera-proposal pre code {
                  background: transparent;
                  color: white;
                  padding: 0;
                }
                .loopera-proposal table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 20px 0;
                }
                .loopera-proposal table thead {
                  background: #EA2839;
                  color: white;
                }
                .loopera-proposal table th {
                  padding: 12px;
                  text-align: left;
                  font-weight: bold;
                }
                .loopera-proposal table td {
                  padding: 10px 12px;
                  border-bottom: 1px solid #D5D2CA;
                }
                .loopera-proposal table tbody tr:nth-child(even) {
                  background: #F8F8F8;
                }
                .loopera-proposal table tbody tr:hover {
                  background: #FFF5F6;
                }
                .loopera-proposal hr {
                  border: none;
                  border-top: 2px solid #D5D2CA;
                  margin: 30px 0;
                }
              `}</style>
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 {...props} />,
                  h2: ({ node, ...props }) => <h2 {...props} />,
                  h3: ({ node, ...props }) => <h3 {...props} />,
                  p: ({ node, ...props }) => <p {...props} />,
                  ul: ({ node, ...props }) => <ul {...props} />,
                  ol: ({ node, ...props }) => <ol {...props} />,
                  li: ({ node, ...props }) => <li {...props} />,
                  strong: ({ node, ...props }) => <strong {...props} />,
                  em: ({ node, ...props }) => <em {...props} />,
                  blockquote: ({ node, ...props }) => <blockquote {...props} />,
                  code: ({ node, inline, ...props }: any) =>
                    inline ? <code {...props} /> : <code {...props} />,
                  pre: ({ node, ...props }) => <pre {...props} />,
                  table: ({ node, ...props }) => <table {...props} />,
                  thead: ({ node, ...props }) => <thead {...props} />,
                  tbody: ({ node, ...props }) => <tbody {...props} />,
                  tr: ({ node, ...props }) => <tr {...props} />,
                  th: ({ node, ...props }) => <th {...props} />,
                  td: ({ node, ...props }) => <td {...props} />,
                  hr: ({ node, ...props }) => <hr {...props} />,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-16">
              <p className="text-lg font-semibold mb-2">Sin contenido aún</p>
              <p className="text-sm">La propuesta aparecerá aquí cuando hables con Loop<span className="text-purple-600">IA</span>.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
