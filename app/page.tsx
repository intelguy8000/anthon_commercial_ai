'use client';

import { useState } from 'react';
import ChatPanel from '@/components/ChatPanel';
import PreviewPanel from '@/components/PreviewPanel';
import CheatSheetTabs from '@/components/CheatSheetTabs';
import FinancialModel from '@/components/FinancialModel';
import Timeline from '@/components/Timeline';

type Section = 'cheatsheet' | 'financial' | 'timeline' | 'chat' | 'preview';

export default function Home() {
  const [proposalContent, setProposalContent] = useState('');
  const [fullscreenSection, setFullscreenSection] = useState<Section | null>(null);

  const toggleFullscreen = (section: Section) => {
    setFullscreenSection(fullscreenSection === section ? null : section);
  };

  if (fullscreenSection) {
    return (
      <div className="h-screen w-screen bg-gray-50 overflow-hidden">
        {/* Fullscreen Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {fullscreenSection === 'cheatsheet' && 'Cheat Sheets'}
            {fullscreenSection === 'financial' && 'Modelo Financiero'}
            {fullscreenSection === 'timeline' && 'Timeline de Desarrollo'}
            {fullscreenSection === 'chat' && 'Chat con Lupia'}
            {fullscreenSection === 'preview' && 'Vista Previa de Propuesta'}
          </h2>
          <button
            onClick={() => setFullscreenSection(null)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
          >
            ✕ Salir
          </button>
        </div>

        {/* Fullscreen Content */}
        <div className="h-[calc(100vh-72px)] overflow-y-auto p-6">
          {fullscreenSection === 'cheatsheet' && <CheatSheetTabs />}
          {fullscreenSection === 'financial' && <FinancialModel />}
          {fullscreenSection === 'timeline' && <Timeline />}
          {fullscreenSection === 'chat' && (
            <div className="h-full">
              <ChatPanel onProposalUpdate={setProposalContent} />
            </div>
          )}
          {fullscreenSection === 'preview' && (
            <div className="h-full">
              <PreviewPanel content={proposalContent} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Lupia</h1>
              <p className="text-sm text-gray-500">Asistente Comercial Inteligente</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-gray-100 rounded-full">
              <span className="text-sm text-gray-600"><strong>Cliente:</strong> Estudiarte</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Vertical Scroll */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Section 1: Cheat Sheets */}
        <section className="relative group">
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => toggleFullscreen('cheatsheet')}
              className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg text-xs font-medium shadow-sm"
            >
              ⛶ Pantalla completa
            </button>
          </div>
          <CheatSheetTabs />
        </section>

        {/* Section 2: Financial Model */}
        <section className="relative group">
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => toggleFullscreen('financial')}
              className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg text-xs font-medium shadow-sm"
            >
              ⛶ Pantalla completa
            </button>
          </div>
          <FinancialModel />
        </section>

        {/* Section 3: Timeline */}
        <section className="relative group">
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => toggleFullscreen('timeline')}
              className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg text-xs font-medium shadow-sm"
            >
              ⛶ Pantalla completa
            </button>
          </div>
          <Timeline />
        </section>

        {/* Section 4: Chat & Preview - Side by Side */}
        <div className="grid grid-cols-2 gap-6">
          <section className="relative group">
            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => toggleFullscreen('chat')}
                className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg text-xs font-medium shadow-sm"
              >
                ⛶ Pantalla completa
              </button>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 h-[600px] overflow-hidden">
              <ChatPanel onProposalUpdate={setProposalContent} />
            </div>
          </section>

          <section className="relative group">
            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => toggleFullscreen('preview')}
                className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg text-xs font-medium shadow-sm"
              >
                ⛶ Pantalla completa
              </button>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 h-[600px] overflow-hidden">
              <PreviewPanel content={proposalContent} />
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-sm text-gray-500 text-center">
            Powered by Claude • © 2025 Loopera
          </p>
        </div>
      </footer>
    </div>
  );
}
