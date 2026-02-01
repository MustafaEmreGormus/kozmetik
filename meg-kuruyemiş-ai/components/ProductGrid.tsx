
import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Product } from '../types';
import { ShoppingCart, Plus, Info, Heart } from 'lucide-react';

interface Props {
  onAddToCart: (p: Product) => void;
}

export const ProductGrid: React.FC<Props> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = activeCategory === 'Tümü' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-8 p-4">
      <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
              activeCategory === cat 
              ? 'bg-amber-800 text-white shadow-lg' 
              : 'bg-white text-stone-500 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(p => (
          <div key={p.id} className="group bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 relative">
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={p.image} 
                alt={p.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white/90 p-2 rounded-full text-stone-700 hover:text-red-500 transition-colors">
                  <Heart size={20} />
                </button>
                <button 
                  onClick={() => setSelectedProduct(p)}
                  className="bg-white/90 p-2 rounded-full text-stone-700 hover:text-amber-600 transition-colors"
                >
                  <Info size={20} />
                </button>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-stone-700 shadow-sm">
                  {p.unit}
                </span>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">{p.category}</p>
                <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">{p.name}</h3>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-stone-900">{p.price} <span className="text-sm font-medium">₺</span></span>
                </div>
                <button 
                  onClick={() => onAddToCart(p)}
                  className="bg-stone-900 hover:bg-amber-800 text-white p-3 rounded-2xl transition-all active:scale-90 shadow-md flex items-center gap-2 group/btn"
                >
                  <Plus size={20} />
                  <span className="hidden group-hover/btn:inline text-sm font-bold">Ekle</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 z-10 p-2 bg-stone-100 hover:bg-stone-200 rounded-full transition"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/2 aspect-square md:aspect-auto">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-stone-900 mb-2">{selectedProduct.name}</h3>
                  <p className="text-stone-500 text-sm mb-6 leading-relaxed">{selectedProduct.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-widest text-amber-700 mb-2">Faydaları</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.benefits.map((b, i) => (
                          <span key={i} className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-semibold">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 py-4 border-y border-stone-100">
                      <div className="text-center">
                        <p className="text-[10px] uppercase text-stone-400 font-bold">Kalori</p>
                        <p className="text-sm font-bold">{selectedProduct.nutrients.calories}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] uppercase text-stone-400 font-bold">Protein</p>
                        <p className="text-sm font-bold">{selectedProduct.nutrients.protein}g</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] uppercase text-stone-400 font-bold">Yağ</p>
                        <p className="text-sm font-bold">{selectedProduct.nutrients.fat}g</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-3xl font-black">{selectedProduct.price} ₺</span>
                  <button 
                    onClick={() => {
                      onAddToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-4 rounded-3xl font-bold shadow-xl flex items-center gap-2"
                  >
                    <ShoppingCart size={20} />
                    Sepete Ekle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const X = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
