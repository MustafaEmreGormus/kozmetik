
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAssistant } from '../services/geminiService';
import { MessageCircle, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';

export const AiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatWithAssistant(messages, input);
      setMessages(prev => [...prev, { role: 'model', text: response || 'Üzgünüm, bir hata oluştu.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: 'Bir bağlantı hatası yaşadım.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white w-[380px] h-[500px] rounded-3xl shadow-2xl flex flex-col border border-stone-100 overflow-hidden animate-in fade-in zoom-in duration-300">
          <div className="bg-amber-800 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <div>
                <h3 className="font-bold leading-none">MEG Asistan</h3>
                <span className="text-[10px] opacity-75">Şimdi Çevrimiçi</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-amber-700 rounded-full transition">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-stone-50" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="text-center py-10 space-y-3">
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-amber-800">
                  <Bot size={28} />
                </div>
                <p className="text-stone-500 text-sm px-8">Merhaba! Ben MEG Asistan. Kuruyemişler hakkında merak ettiğin her şeyi bana sorabilirsin.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl flex gap-3 ${
                  m.role === 'user' 
                  ? 'bg-amber-700 text-white rounded-tr-none' 
                  : 'bg-white text-stone-800 shadow-sm border border-stone-200 rounded-tl-none'
                }`}>
                  {m.role === 'model' && <Bot size={16} className="shrink-0 mt-1 opacity-50" />}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl flex items-center gap-2 shadow-sm border border-stone-200">
                  <Loader2 className="animate-spin text-amber-700" size={16} />
                  <span className="text-sm text-stone-400">Yazıyor...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Mesajınızı yazın..."
              className="flex-1 bg-stone-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-amber-800 text-white p-2 rounded-full hover:bg-amber-900 transition disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-amber-800 text-white p-4 rounded-full shadow-2xl hover:bg-amber-900 transition-all hover:scale-110 active:scale-95 group relative"
        >
          <MessageCircle size={32} />
          <span className="absolute -top-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
          <div className="absolute right-full mr-4 bg-white text-amber-900 px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Sana nasıl yardımcı olabilirim?
          </div>
        </button>
      )}
    </div>
  );
};
