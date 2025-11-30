import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X, Phone, Mail, MapPin, Clock, Tag, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Promotii = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const { data, error } = await supabase
        .from('promotions')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPromotions(data || []);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-black text-white py-4 px-6 fixed w-full top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center space-x-4">
             <img 
            src="/logo.jpg" 
            alt="Compact Drive" 
            className="w-16 h-16 rounded-full object-cover"
            />
            
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">
                <span className="text-red-600">COMPACT</span>
                <span className="ml-1">DRIVE</span>
              </div>
              <div className="text-xs text-gray-400 hidden sm:block">ȘCOALA DE ȘOFERI</div>
            </div>
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="hover:text-red-500 transition">Acasă</a>
            <a href="/despre-noi" className="hover:text-red-500 transition">Despre Noi</a>
            <a href="/#categorii" className="hover:text-red-500 transition">Categorii permise</a>
            <a href="/autovehicule" className="hover:text-red-500 transition">Tarife</a>
            <a href="/promotii" className="text-red-500">Promoții</a>
            <a href="/informatii-utile" className="hover:text-red-500 transition">Info utile</a>
            <a href="/#contact" className="hover:text-red-500 transition">Contact</a>
          </div>

          <a href="/inscriere" className="hidden md:block bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition">
            Înscriere Rapidă
          </a>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <a href="/" className="block hover:text-red-500 transition">Acasă</a>
            <a href="/despre-noi" className="block hover:text-red-500 transition">Despre Noi</a>
            <a href="/#categorii" className="block hover:text-red-500 transition">Categorii permise</a>
            <a href="/autovehicule" className="block hover:text-red-500 transition">Tarife</a>
            <a href="/promotii" className="block text-red-500">Promoții</a>
            <a href="/informatii-utile" className="block hover:text-red-500 transition">Info utile</a>
            <a href="/#contact" className="block hover:text-red-500 transition">Contact</a>
            <a href="/inscriere" className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold w-full block text-center">
              Înscriere Rapidă
            </a>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-24">
        {/* Title Section */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white py-16 px-6 mb-16">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Promoții
            </h1>
            <p className="text-xl text-red-100">
              Descoperă ofertele noastre speciale
            </p>
          </div>
        </div>

        {/* Promotions Display */}
        <div className="max-w-7xl mx-auto px-6 mb-16">
          {loading ? (
            <div className="min-h-[400px] bg-white rounded-2xl shadow-xl p-8 md:p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-red-600 mb-4"></div>
                <p className="text-gray-600 text-lg">Se încarcă promoțiile...</p>
              </div>
            </div>
          ) : promotions.length === 0 ? (
            <div className="min-h-[400px] bg-white rounded-2xl shadow-xl p-8 md:p-12 flex items-center justify-center">
              <div className="text-center">
                <svg className="mx-auto h-24 w-24 text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  Nicio promoție activă momentan
                </h3>
                <p className="text-gray-600 text-lg mb-2">
                  Revino curând pentru oferte speciale!
                </p>
                <p className="text-gray-500 text-sm">
                  Urmărește-ne pe rețelele sociale pentru a fi la curent cu reducerile
                </p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {promotions.map((promo) => (
                <div
                  key={promo.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
                >
                  <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {promo.title}
                    </h3>
                    {promo.discount && (
                      <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                        <Tag size={20} className="text-white" />
                        <span className="text-2xl font-bold text-white">
                          {promo.discount}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-8">
                    <p className="text-gray-700 text-lg leading-relaxed mb-6 whitespace-pre-line">
                      {promo.description}
                    </p>

                    {promo.valid_until && (
                      <div className="flex items-center space-x-2 text-gray-600 mb-6 bg-gray-100 px-4 py-3 rounded-lg">
                        <Calendar size={20} className="text-red-600" />
                        <span className="font-semibold">
                          Valabil până la: {promo.valid_until}
                        </span>
                      </div>
                    )}

                    
                      href="/inscriere"
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-semibold text-lg transition transform hover:scale-105 inline-flex items-center justify-center space-x-2"
                    >
                      <span>Profită Acum!</span>
                      <ChevronRight size={20} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explorează ofertele noastre
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Descoperă toate autovehiculele și serviciile disponibile
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/autovehicule"
                className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-lg font-semibold text-lg transition transform hover:scale-105 inline-flex items-center justify-center space-x-2"
              >
                <span>Vezi toate autovehiculele</span>
                <ChevronRight size={20} />
              </a>
              <a 
                href="/autovehicule#servicii"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition transform hover:scale-105 inline-flex items-center justify-center space-x-2"
              >
                <span>Vezi servicii suplimentare</span>
                <ChevronRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="text-3xl font-bold mb-4">
              <span className="text-red-600">COMPACT</span> DRIVE
            </div>
            <p className="text-gray-400 leading-relaxed">
             Formăm șoferi responsabili, pentru un trafic bazat pe respect și siguranță.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">Pietonal Ștefan cel Mare</div>
                  <div className="text-gray-400 text-sm">Roman 611038</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-red-600" />
                <span>+40 770 935 065</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-red-600" />
                <span>contact@compact-drive.ro</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock size={20} className="text-red-600" />
                <span>L-V: 08:30 - 18:30</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">Link-uri rapide</h4>
            <div className="space-y-3">
              <a href="/" className="block text-gray-400 hover:text-white transition">Acasă</a>
              <a href="/despre-noi" className="block text-gray-400 hover:text-white transition">Despre Noi</a>
              <a href="/#categorii" className="block text-gray-400 hover:text-white transition">Categorii</a>
              <a href="/autovehicule" className="block text-gray-400 hover:text-white transition">Tarife</a>
              <a href="/promotii" className="block text-red-500">Promoții</a>
              <a href="/informatii-utile" className="block text-gray-400 hover:text-white transition">Info utile</a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">Program</h4>
            <div className="space-y-3 text-gray-400">
              <p>Luni - Vineri: 08:30 - 18:30</p>
              <p>Sâmbătă: 09:00 - 14:00</p>
              <p>Duminică: Închis</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Compact Drive. Toate drepturile rezervate.</p>
        </div>
      </footer>
    </div>
  );
};

export default Promotii;
