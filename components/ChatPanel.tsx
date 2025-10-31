'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatPanelProps {
  onProposalUpdate: (content: string) => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

const STORAGE_KEY = 'loopia-chat-history';
const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const WARNING_THRESHOLD = 0.8; // 80% of max storage

export default function ChatPanel({ onProposalUpdate, isExpanded = false, onToggleExpand }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [storageUsage, setStorageUsage] = useState(0);
  const [showStorageWarning, setShowStorageWarning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Calculate storage usage
  const calculateStorageUsage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const sizeInBytes = new Blob([stored]).size;
        const percentage = (sizeInBytes / MAX_STORAGE_SIZE) * 100;
        setStorageUsage(percentage);
        setShowStorageWarning(percentage >= WARNING_THRESHOLD * 100);
        return sizeInBytes;
      }
    } catch (e) {
      console.error('Error calculating storage:', e);
    }
    return 0;
  };

  // Load messages from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setMessages(parsed);
        calculateStorageUsage();
      }
    } catch (e) {
      console.error('Error loading chat history:', e);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        calculateStorageUsage();
      } catch (e) {
        console.error('Error saving chat history:', e);
        // If storage is full, show error
        if (e instanceof DOMException && e.name === 'QuotaExceededError') {
          alert('⚠️ Almacenamiento lleno! Por favor limpia el historial del chat.');
        }
      }
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        }),
      });

      if (!response.ok) throw new Error('Error en la respuesta');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);

                // Handle error messages from stream
                if (parsed.error) {
                  throw new Error(parsed.error);
                }

                if (parsed.content) {
                  assistantMessage += parsed.content;
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage && lastMessage.role === 'assistant') {
                      lastMessage.content = assistantMessage;
                    } else {
                      newMessages.push({ role: 'assistant', content: assistantMessage });
                    }
                    return newMessages;
                  });

                  // Si Claude menciona una propuesta, actualizamos el preview
                  if (assistantMessage.includes('```markdown') ||
                      assistantMessage.includes('# PROPUESTA') ||
                      assistantMessage.includes('propuesta')) {
                    const markdownMatch = assistantMessage.match(/```markdown\n([\s\S]*?)```/);
                    if (markdownMatch) {
                      onProposalUpdate(markdownMatch[1]);
                    }
                  }
                }
              } catch (e) {
                // Ignore parse errors for incomplete chunks
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: 'Lo siento, hubo un error. Por favor intenta de nuevo.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearHistory = () => {
    if (confirm('¿Estás seguro de que quieres borrar todo el historial del chat?')) {
      setMessages([]);
      localStorage.removeItem(STORAGE_KEY);
      setStorageUsage(0);
      setShowStorageWarning(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-gray-700">💬 Chat con Loop<span className="text-purple-600">IA</span></h2>
          <div className="flex items-center gap-2">
            {/* Storage indicator */}
            {storageUsage > 0 && (
              <div className="flex items-center gap-1 text-xs">
                <div className={`px-2 py-1 rounded ${
                  showStorageWarning
                    ? 'bg-red-100 text-red-700 border border-red-300'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {showStorageWarning && '⚠️ '}
                  {storageUsage.toFixed(1)}% usado
                </div>
              </div>
            )}
            {/* Clear history button */}
            {messages.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-red-100 hover:text-red-600 transition-colors"
                title="Limpiar historial"
              >
                🗑️
              </button>
            )}
            {/* Expand button */}
            {onToggleExpand && (
              <button
                onClick={onToggleExpand}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-xs"
                title={isExpanded ? "Cerrar" : "Expandir"}
              >
                {isExpanded ? '✕' : '⛶'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg font-semibold mb-2">¡Hola! Soy Loop<span className="text-purple-600">IA</span> 👋</p>
            <p className="text-sm">Estoy aquí para ayudarte con la propuesta de Estudiarte.</p>
            <p className="text-sm mt-2">Pregúntame lo que necesites.</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-secondary'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            className="flex-1 p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
