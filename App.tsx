
import React, { useState } from 'react';
import { Product, CartItem, AppSection } from './types';
import { ProductGrid } from './components/ProductGrid';
import { AiChat } from './components/AiChat';
import { AiChef } from './components/AiChef';
import { CustomMixer } from './components/CustomMixer';
import { ShoppingBag, ChevronRight, Menu, X, ArrowRight, Instagram, Twitter, Facebook } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fdfaf5] selection:bg-amber-200 selection:text-amber-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setActiveSection(AppSection.HOME)}
              className="text-2xl font-black text-amber-900 tracking-tighter"
            >
              MEG<span className="text-amber-600">.</span>
            </button>
            <div className="hidden md:flex items-center gap-6">
              {[
                { id: AppSection.HOME, label: 'Anasayfa' },
                { id: AppSection.SHOP, label: 'Mağaza' },
                { id: AppSection.AI_CHEF, label: 'AI Şef' },
                { id: AppSection.CUSTOM_MIX, label: 'Tasarım Yap' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`text-sm font-bold transition-all hover:text-amber-700 ${
                    activeSection === item.id ? 'text-amber-800' : 'text-stone-500'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-stone-700 hover:text-amber-800 transition"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-800 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2 text-stone-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-6 text-center">
            {[
              { id: AppSection.HOME, label: 'Anasayfa' },
              { id: AppSection.SHOP, label: 'Mağaza' },
              { id: AppSection.AI_CHEF, label: 'AI Şef' },
              { id: AppSection.CUSTOM_MIX, label: 'Tasarım Yap' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMenuOpen(false);
                }}
                className={`text-2xl font-bold ${
                  activeSection === item.id ? 'text-amber-800' : 'text-stone-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-24 pb-12">
        {activeSection === AppSection.HOME && (
          <div className="space-y-24">
            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
                <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                  <span className="flex h-2 w-2 rounded-full bg-amber-600 animate-pulse"></span>
                  Yeni Nesil Kuruyemiş Deneyimi
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-amber-900 leading-[1.1]">
                  Doğanın <br /> En Taze <br /> <span className="text-amber-600">Hali.</span>
                </h1>
                <p className="text-stone-500 text-lg md:text-xl max-w-lg leading-relaxed">
                  MEG Kuruyemiş, yapay zeka desteğiyle size en uygun atıştırmalıkları önerir, tarifler geliştirir ve gurme paketler tasarlar.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                    onClick={() => setActiveSection(AppSection.SHOP)}
                    className="bg-amber-800 hover:bg-amber-900 text-white px-10 py-5 rounded-[2rem] font-bold text-lg flex items-center gap-2 shadow-2xl shadow-amber-900/20 transform transition hover:-translate-y-1 active:scale-95"
                  >
                    Şimdi Alışverişe Başla
                    <ArrowRight size={20} />
                  </button>
                  <button 
                    onClick={() => setActiveSection(AppSection.AI_CHEF)}
                    className="bg-white border-2 border-stone-200 hover:border-amber-300 px-10 py-5 rounded-[2rem] font-bold text-lg text-stone-700 transition-all"
                  >
                    AI Şef'i Dene
                  </button>
                </div>
              </div>
              <div className="relative animate-in fade-in zoom-in duration-1000">
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-stone-200/50 rounded-full blur-3xl"></div>
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                  <img 
                    src="https://picsum.photos/seed/nutshero/1000/1200" 
                    alt="MEG Nuts" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                    <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Özel Seçki</p>
                    <h2 className="text-3xl font-black">Lüks Karışımlar</h2>
                  </div>
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="bg-stone-900 text-white py-24">
              <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-16 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-amber-800 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
                    <ChevronRight className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold">Hızlı Teslimat</h3>
                  <p className="text-stone-400">Siparişleriniz aynı gün kargoya verilir, tazeliğini korur.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-stone-800 rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-3">
                    <ShoppingBag className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold">Doğal ve Taze</h3>
                  <p className="text-stone-400">Üreticiden doğrudan sofranıza, hiçbir katkı maddesi içermez.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-6">
                    <X className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold">AI Destekli</h3>
                  <p className="text-stone-400">Sizin için en doğru kuruyemişleri ve tarifleri yapay zekamız seçer.</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeSection === AppSection.SHOP && (
          <div className="max-w-7xl mx-auto px-4">
            <header className="mb-12">
              <h2 className="text-5xl font-black text-amber-900 mb-4">Ürünlerimiz</h2>
              <p className="text-stone-500">Doğanın kalbinden gelen taze lezzetleri keşfedin.</p>
            </header>
            <ProductGrid onAddToCart={addToCart} />
          </div>
        )}

        {activeSection === AppSection.AI_CHEF && <AiChef />}
        {activeSection === AppSection.CUSTOM_MIX && <CustomMixer />}
      </main>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">Sepetim ({cartCount})</h3>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-stone-100 rounded-full">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-stone-400 gap-4">
                  <ShoppingBag size={64} className="opacity-20" />
                  <p className="font-bold">Sepetiniz şu an boş.</p>
                  <button 
                    onClick={() => { setIsCartOpen(false); setActiveSection(AppSection.SHOP); }}
                    className="text-amber-800 font-bold underline"
                  >
                    Alışverişe Başla
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 bg-stone-50 rounded-2xl group">
                    <img src={item.image} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h4 className="font-bold text-stone-900">{item.name}</h4>
                      <p className="text-xs text-stone-500">{item.unit} x {item.quantity}</p>
                      <div className="flex justify-between items-end mt-2">
                        <span className="font-bold text-amber-800">{item.price * item.quantity} ₺</span>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-[10px] font-black uppercase text-stone-400 hover:text-red-500 tracking-widest"
                        >
                          Kaldır
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t bg-stone-50 space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-medium text-stone-600">Toplam</span>
                  <span className="text-3xl font-black text-amber-900">{cartTotal} ₺</span>
                </div>
                <button className="w-full bg-amber-800 hover:bg-amber-900 text-white py-5 rounded-[2rem] font-bold text-lg shadow-xl shadow-amber-900/20 transform transition active:scale-95">
                  Ödemeye Geç
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Chat Floating Button */}
      <AiChat />

      {/* Footer */}
      <footer className="bg-white border-t border-stone-100 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-black text-amber-900">MEG<span className="text-amber-600">.</span></h3>
            <p className="text-stone-500 text-sm leading-relaxed">
              En taze kuruyemişleri yapay zeka dokunuşuyla evinize getiriyoruz. Sağlıklı ve gurme bir deneyim için MEG Kuruyemiş.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-stone-50 rounded-lg text-stone-400 hover:text-amber-800 transition"><Instagram size={20} /></a>
              <a href="#" className="p-2 bg-stone-50 rounded-lg text-stone-400 hover:text-amber-800 transition"><Twitter size={20} /></a>
              <a href="#" className="p-2 bg-stone-50 rounded-lg text-stone-400 hover:text-amber-800 transition"><Facebook size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-stone-900 mb-6">Hızlı Linkler</h4>
            <ul className="space-y-4 text-sm text-stone-500">
              <li><button onClick={() => setActiveSection(AppSection.SHOP)} className="hover:text-amber-800 transition">Ürünlerimiz</button></li>
              <li><button onClick={() => setActiveSection(AppSection.AI_CHEF)} className="hover:text-amber-800 transition">AI Şef</button></li>
              <li><button onClick={() => setActiveSection(AppSection.CUSTOM_MIX)} className="hover:text-amber-800 transition">Özel Paket Tasarla</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-stone-900 mb-6">Kurumsal</h4>
            <ul className="space-y-4 text-sm text-stone-500">
              <li><a href="#" className="hover:text-amber-800 transition">Hakkımızda</a></li>
              <li><a href="#" className="hover:text-amber-800 transition">Sıkça Sorulan Sorular</a></li>
              <li><a href="#" className="hover:text-amber-800 transition">İletişim</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-stone-900 mb-6">Bültenimize Katıl</h4>
            <div className="space-y-4">
              <p className="text-xs text-stone-400">Kampanyalardan ve yeni AI özelliklerinden haberdar olun.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="E-posta adresiniz" 
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-amber-300"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-amber-800 text-white px-4 rounded-xl text-xs font-bold">
                  Katıl
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
          <p>© 2024 MEG Kuruyemiş AI. Tüm hakları saklıdır.</p>
          <div className="flex gap-8">
            <a href="#">Gizlilik Politikası</a>
            <a href="#">Kullanım Koşulları</a>
            <a href="#">KVKK</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
