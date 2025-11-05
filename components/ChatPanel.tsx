'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatPanelProps {
  onProposalUpdate: (content: string) => void;
  onFinancialUpdate?: (price: number, weeks: number) => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

interface PendingAction {
  type: 'proposal' | 'financial' | 'both';
  proposalContent?: string;
  financialData?: {
    price: number;
    weeks: number;
  };
}

const STORAGE_KEY = 'loopia-chat-history';
const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const WARNING_THRESHOLD = 0.8; // 80% of max storage

export default function ChatPanel({ onProposalUpdate, onFinancialUpdate, isExpanded = false, onToggleExpand }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [storageUsage, setStorageUsage] = useState(0);
  const [showStorageWarning, setShowStorageWarning] = useState(false);
  const [useOpus, setUseOpus] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastAssistantMessageRef = useRef<string>('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Detect hashtags in message
  const detectHashtags = (text: string): string[] => {
    const hashtagMatch = text.match(/#\w+/g);
    return hashtagMatch || [];
  };

  // Extract financial data from message
  const extractFinancialData = (text: string) => {
    const priceMatch = text.match(/\$?(\d+)M/i);
    const weeksMatch = text.match(/(\d+)\s*semanas?/i);

    return {
      price: priceMatch ? parseInt(priceMatch[1]) : null,
      weeks: weeksMatch ? parseInt(weeksMatch[1]) : null,
    };
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
    const userHashtags = detectHashtags(input);

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Create abort controller for this request
    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          useOpus: useOpus,
          hashtags: userHashtags, // Pass detected hashtags
        }),
        signal: controller.signal,
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
                  lastAssistantMessageRef.current = assistantMessage; // Keep track for hashtag processing
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
                }
              } catch (e) {
                // Ignore parse errors for incomplete chunks
              }
            }
          }
        }
      }

    } catch (error: any) {
      console.error('Error:', error);
      if (error.name === 'AbortError') {
        setMessages((prev) => [...prev, {
          role: 'assistant',
          content: '⏹ Generación detenida por el usuario.'
        }]);
      } else {
        setMessages((prev) => [...prev, {
          role: 'assistant',
          content: 'Lo siento, hubo un error. Por favor intenta de nuevo.'
        }]);
      }
    } finally {
      setIsLoading(false);
      setAbortController(null);
      // Reset Pro mode to false after using (one-time use)
      if (useOpus) {
        setUseOpus(false);
      }

      // Process hashtags after streaming completes (or is aborted)
      if (userHashtags.length > 0 && lastAssistantMessageRef.current) {
        const hasProposal = userHashtags.some(tag => tag.toLowerCase() === '#lapropuesta' || tag.toLowerCase() === '#todo');
        const hasFinancial = userHashtags.some(tag => tag.toLowerCase() === '#modelofinanciero' || tag.toLowerCase() === '#todo');

        let pendingProposal: string | undefined;
        let pendingFinancial: { price: number; weeks: number } | undefined;

        const assistantMessage = lastAssistantMessageRef.current;
        console.log('🔍 Procesando hashtags:', { hasProposal, hasFinancial, messageLength: assistantMessage.length });

        // Extract proposal from assistant message
        if (hasProposal) {
          // Strategy 1: Try to match complete markdown block first (with closing ```)
          let markdownMatch = assistantMessage.match(/```markdown\s*\n([\s\S]*?)```/);

          // Strategy 2: If not found, try to match unclosed block (generation stopped)
          if (!markdownMatch) {
            markdownMatch = assistantMessage.match(/```markdown\s*\n([\s\S]*)/);
          }

          // Strategy 3: If still nothing, try without language tag
          if (!markdownMatch) {
            markdownMatch = assistantMessage.match(/```\s*\n([\s\S]*?)```/);
          }

          // Strategy 4: Last resort - try unclosed block without language tag
          if (!markdownMatch) {
            markdownMatch = assistantMessage.match(/```\s*\n([\s\S]*)/);
          }

          if (markdownMatch && markdownMatch[1]) {
            let proposalContent = markdownMatch[1].trim();

            // Clean up any trailing ``` that might be in the middle
            proposalContent = proposalContent.replace(/```\s*$/, '').trim();

            // Only consider it a proposal if it has headers
            if (proposalContent.includes('# ') || proposalContent.includes('## ')) {
              pendingProposal = proposalContent;
              console.log('📄 Propuesta extraída:', proposalContent.length, 'caracteres');
            }
          } else {
            console.warn('⚠️ No se pudo extraer markdown del mensaje');
          }
        }

        // Extract financial data
        if (hasFinancial) {
          const financialData = extractFinancialData(assistantMessage);
          if (financialData.price && financialData.weeks) {
            pendingFinancial = {
              price: financialData.price,
              weeks: financialData.weeks,
            };
          }
        }

        // Set pending action if we found data
        if (pendingProposal || pendingFinancial) {
          setPendingAction({
            type: pendingProposal && pendingFinancial ? 'both' : pendingProposal ? 'proposal' : 'financial',
            proposalContent: pendingProposal,
            financialData: pendingFinancial,
          });
        }

        // Clear the ref
        lastAssistantMessageRef.current = '';
      }
    }
  };

  const handleStop = () => {
    if (abortController) {
      abortController.abort();
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

  const handleApplyChanges = () => {
    if (!pendingAction) return;

    // Apply proposal update
    if (pendingAction.proposalContent) {
      onProposalUpdate(pendingAction.proposalContent);
    }

    // Apply financial update
    if (pendingAction.financialData && onFinancialUpdate) {
      onFinancialUpdate(pendingAction.financialData.price, pendingAction.financialData.weeks);
    }

    // Clear pending action
    setPendingAction(null);
  };

  const handleCancelChanges = () => {
    setPendingAction(null);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-gray-700">💬 Chat con Loop<span className="text-purple-600">IA</span></h2>
            {/* Model indicator */}
            {isLoading && (
              <span className={`text-xs px-2 py-0.5 rounded ${
                useOpus
                  ? 'bg-purple-100 text-purple-700 border border-purple-300 font-semibold'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {useOpus ? '🧠 GPT-4 Turbo' : '⚡ GPT-4o'}
              </span>
            )}
          </div>
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
            {/* Stop button - only during loading */}
            {isLoading && (
              <button
                onClick={handleStop}
                className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-semibold border border-red-300"
                title="Detener generación"
              >
                ⏹ Stop
              </button>
            )}
            {/* LoopAI Pro button - one-time GPT-4 Turbo trigger */}
            {!isLoading && (
              <button
                onClick={() => setUseOpus(!useOpus)}
                className={`px-3 py-1 text-xs rounded-lg font-semibold transition-colors whitespace-nowrap ${
                  useOpus
                    ? 'bg-purple-600 text-white border-2 border-purple-700 hover:bg-purple-700'
                    : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300'
                }`}
                title={useOpus ? "Siguiente mensaje usará GPT-4 Turbo" : "Activar LoopAI Pro (GPT-4 Turbo)"}
              >
                {useOpus ? '🧠 Pro ON' : '🧠 LoopAI Pro'}
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

      {/* Confirmation Banner */}
      {pendingAction && (
        <div className="px-4 py-3 border-t border-yellow-300 bg-yellow-50">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-yellow-800">⚠️ Cambios pendientes de confirmación</span>
              </div>
              <div className="text-xs text-yellow-700">
                {pendingAction.type === 'proposal' && (
                  <span>• Vista previa de la propuesta lista para actualizar</span>
                )}
                {pendingAction.type === 'financial' && (
                  <span>• Modelo financiero: ${pendingAction.financialData?.price}M, {pendingAction.financialData?.weeks} semanas</span>
                )}
                {pendingAction.type === 'both' && (
                  <>
                    <div>• Vista previa de la propuesta lista para actualizar</div>
                    <div>• Modelo financiero: ${pendingAction.financialData?.price}M, {pendingAction.financialData?.weeks} semanas</div>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleApplyChanges}
                className="px-3 py-1.5 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
              >
                ✓ Aplicar
              </button>
              <button
                onClick={handleCancelChanges}
                className="px-3 py-1.5 text-xs bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"
              >
                ✕ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

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
