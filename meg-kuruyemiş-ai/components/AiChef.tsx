
import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { generateRecipeFromSelection } from '../services/geminiService';
import { Loader2, ChefHat, Sparkles } from 'lucide-react';

export const AiChef: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const toggleProduct = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    if (selectedIds.length === 0) return;
    setLoading(true);
    try {
      const selectedNames = PRODUCTS.filter(p => selectedIds.includes(p.id)).map(p => p.name);
      const res = await generateRecipeFromSelection(selectedNames);
      setRecipe(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-amber-900">AI Gurme Şef</h2>
        <p className="text-stone-600">Malzemeleri seçin, MEG AI size özel bir tarif yaratsın.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {PRODUCTS.map(p => (
          <button
            key={p.id}
            onClick={() => toggleProduct(p.id)}
            className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
              selectedIds.includes(p.id) 
              ? 'border-amber-600 bg-amber-50 text-amber-800 shadow-md' 
              : 'border-stone-200 bg-white text-stone-500 hover:border-amber-200'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleGenerate}
          disabled={loading || selectedIds.length === 0}
          className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 disabled:opacity-50 shadow-lg transform transition active:scale-95"
        >
          {loading ? <Loader2 className="animate-spin" /> : <ChefHat />}
          Tarif Oluştur
        </button>
      </div>

      {recipe && (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-amber-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 text-amber-600 mb-4">
            <Sparkles size={20} />
            <span className="font-bold uppercase tracking-wider text-sm">Özel Tarifiniz</span>
          </div>
          <h3 className="text-3xl font-bold text-amber-900 mb-6">{recipe.title}</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-stone-800 border-b pb-2">Malzemeler</h4>
              <ul className="list-disc list-inside space-y-1 text-stone-600">
                {recipe.ingredients.map((ing: string, i: number) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-stone-50 rounded-xl">
                <p className="text-sm font-semibold text-stone-700">Besin Değeri Notu:</p>
                <p className="text-sm text-stone-500 italic">{recipe.nutritionalValue}</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-stone-800 border-b pb-2">Hazırlanışı</h4>
              <ol className="list-decimal list-inside space-y-3 text-stone-600">
                {recipe.instructions.map((inst: string, i: number) => (
                  <li key={i} className="pl-2">{inst}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
