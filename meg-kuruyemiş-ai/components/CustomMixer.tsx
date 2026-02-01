
import React, { useState } from 'react';
import { generateVisualPlatter } from '../services/geminiService';
import { Sparkles, Wand2, Loader2, Download } from 'lucide-react';

export const CustomMixer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const url = await generateVisualPlatter(prompt);
      setImage(url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-bold text-amber-900">Hediye Paketini Tasarla</h2>
        <p className="text-stone-600 text-lg">Hangi kuruyemişleri bir arada görmek istersin? Yaz, MEG AI senin için görselleştirsin.</p>
      </div>

      <div className="bg-white p-8 rounded-[40px] shadow-xl border border-amber-50 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-400 uppercase tracking-widest">Tabağında Neler Olsun?</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Örn: Antep fıstığı, kaju ve gün kurusu kayısı ile dolu şık bir ahşap sunum tabağı..."
              className="w-full h-32 bg-stone-50 border-2 border-stone-100 rounded-3xl p-6 text-stone-800 focus:outline-none focus:border-amber-300 transition-all resize-none"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="w-full bg-gradient-to-r from-amber-700 to-amber-900 text-white py-5 rounded-3xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl hover:shadow-amber-900/20 transform transition active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Wand2 />}
            AI Görseli Oluştur
          </button>
        </div>

        <div className="w-full md:w-1/2 aspect-square rounded-[30px] bg-stone-100 border-4 border-white shadow-inner overflow-hidden relative group">
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-stone-50/50 backdrop-blur-sm">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-amber-200 border-t-amber-800 rounded-full animate-spin"></div>
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-800" size={32} />
              </div>
              <p className="text-amber-900 font-bold animate-pulse">Hayalindeki tabak hazırlanıyor...</p>
            </div>
          ) : image ? (
            <>
              <img src={image} alt="Generated Mix" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <a href={image} download="meg-ozel-tabak.png" className="bg-white p-4 rounded-full text-stone-900 hover:scale-110 transition">
                  <Download size={24} />
                </a>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-300">
              <Sparkles size={64} className="mb-4 opacity-50" />
              <p className="font-bold">Henüz bir tasarım yok</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: <Sparkles className="text-amber-600" />, title: "Sana Özel", text: "Yapay zeka ile kişiselleştirilmiş görselleştirme." },
          { icon: <Wand2 className="text-amber-600" />, title: "Gerçekçi", text: "En üst düzey görüntü oluşturma modelleri." },
          { icon: <Download className="text-amber-600" />, title: "Paylaşılabilir", text: "Tasarımını indir ve sipariş için bize ilet." }
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-stone-50 shadow-sm flex items-start gap-4">
            <div className="bg-amber-50 p-3 rounded-2xl">{item.icon}</div>
            <div>
              <h4 className="font-bold text-stone-900">{item.title}</h4>
              <p className="text-sm text-stone-500">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
