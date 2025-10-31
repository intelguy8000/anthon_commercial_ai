'use client';

import { useState } from 'react';
import ChatPanel from '@/components/ChatPanel';
import PreviewPanel from '@/components/PreviewPanel';
import CheatSheet from '@/components/CheatSheet';

export default function Home() {
  const [proposalContent, setProposalContent] = useState('');

  return (
    <main className="h-screen w-screen overflow-hidden bg-gray-100">
      {/* Header */}
      <header className="bg-primary shadow-lg">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Lupia - Asistente Comercial IA</h1>
          <p className="text-sm text-white/80 mt-1">
            Powered by Claude • Cliente: Estudiarte
          </p>
        </div>
      </header>

      {/* 3-Panel Layout */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Chat Panel - 40% */}
        <div className="w-[40%] shadow-lg">
          <ChatPanel onProposalUpdate={setProposalContent} />
        </div>

        {/* Preview Panel - 35% */}
        <div className="w-[35%] shadow-lg">
          <PreviewPanel content={proposalContent} />
        </div>

        {/* Cheat Sheet - 25% */}
        <div className="w-[25%] shadow-lg">
          <CheatSheet />
        </div>
      </div>
    </main>
  );
}
