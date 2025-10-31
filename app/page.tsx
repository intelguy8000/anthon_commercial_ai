'use client';

import { useState } from 'react';
import ChatPanel from '@/components/ChatPanel';
import PreviewPanel from '@/components/PreviewPanel';
import ProjectCashFlow from '@/components/ProjectCashFlow';
import TimelineCompact from '@/components/TimelineCompact';
import CheatSheetTabs from '@/components/CheatSheetTabs';

export default function Home() {
  const [proposalContent, setProposalContent] = useState('');
  const [cheatSheetOpen, setCheatSheetOpen] = useState(false);

  // Estado reactivo que se actualiza desde el chat
  const [projectCost, setProjectCost] = useState(38);
  const [weeksTimeline, setWeeksTimeline] = useState(8);

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/loopera-logo.png" alt="Loopera" className="h-8" />
            <div className="h-8 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-base font-semibold text-gray-900">Loop<span className="text-purple-600">IA</span></h1>
              <p className="text-xs text-gray-500">Hola Santiago 👋</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-gray-100 rounded-full">
              <span className="text-xs text-gray-600"><strong>Cliente:</strong> Estudiarte</span>
            </div>
            <div className="px-3 py-1.5 bg-green-100 rounded-full">
              <span className="text-xs text-green-700 font-semibold">● Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - 3 Columns */}
      <div className="flex-1 overflow-hidden p-4">
        <div className="h-full grid grid-cols-[1fr,1fr,1fr] gap-4">
          {/* Column 1: Chat con Lupia */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <ChatPanel onProposalUpdate={setProposalContent} />
          </div>

          {/* Column 2: Modelo Financiero */}
          <div className="overflow-hidden">
            <ProjectCashFlow projectCost={projectCost} weeksTimeline={weeksTimeline} />
          </div>

          {/* Column 3: Vista Previa */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <PreviewPanel content={proposalContent} />
          </div>
        </div>
      </div>

      {/* Timeline - Below main content */}
      <div className="flex-shrink-0 px-4 pb-4">
        <TimelineCompact weeksTotal={weeksTimeline} />
      </div>

      {/* CheatSheet - Collapsible at bottom */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white">
        <button
          onClick={() => setCheatSheetOpen(!cheatSheetOpen)}
          className="w-full py-3 px-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">📋</span>
            <span className="text-sm font-semibold text-gray-700">Cheat Sheet</span>
            <span className="text-xs text-gray-500">Líneas rojas, números clave, objeciones</span>
          </div>
          <span className="text-gray-400 text-lg transform transition-transform duration-200"
            style={{ transform: cheatSheetOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ▼
          </span>
        </button>

        {cheatSheetOpen && (
          <div className="border-t border-gray-200 p-4 animate-slideDown">
            <div className="max-h-[300px] overflow-y-auto">
              <CheatSheetTabs />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 300px;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
