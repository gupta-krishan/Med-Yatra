import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Loader2, X, Minimize2, Maximize2 } from 'lucide-react';
import { getGeneralAdvice } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Hello! I am your MedYatra assistant. How can I help you today regarding medical treatment in India?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const advice = await getGeneralAdvice(input);
      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: advice };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      const errorMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: "I'm sorry, I'm having trouble connecting. Please try again later." };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            id="ai-assistant-toggle"
            className="fixed bottom-6 right-6 w-16 h-16 bg-brand-cyan text-white rounded-full flex items-center justify-center shadow-xl hover:bg-brand-teal transition-colors z-50 group"
          >
            <Bot className="w-8 h-8 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className={`fixed right-6 bottom-6 w-full max-w-[400px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col border border-brand-teal/10 ${isMinimized ? 'h-16' : 'h-[600px]'}`}
          >
            {/* Header */}
            <div className="bg-brand-teal p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-cyan rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm leading-none">MedYatra AI</h3>
                  <span className="text-[10px] opacity-70 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online now
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/10 rounded transition-colors">
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat Area */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-bg/30">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-brand-cyan text-white rounded-tr-none' : 'bg-white text-brand-teal shadow-sm border border-brand-teal/5 rounded-tl-none'}`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-brand-teal/5 flex gap-2 items-center">
                        <Loader2 className="w-4 h-4 animate-spin text-brand-cyan" />
                        <span className="text-xs text-slate-400 italic">MedYatra is thinking...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-brand-teal/5 bg-white">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 bg-brand-bg rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 border border-transparent focus:border-brand-cyan/30 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="bg-brand-cyan text-white p-2 rounded-xl hover:bg-brand-teal transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                  <p className="text-[10px] text-center mt-2 text-slate-400 italic">
                    AI can make mistakes. Verify information.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
