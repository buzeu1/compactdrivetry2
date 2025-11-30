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
            <a href="/inscriere" className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold w-full block text-center mt-4">
              Înscriere Rapidă
            </a>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-16">
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
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-semibold text-lg transition transform hover:scale-105 flex items-center justify-center space-x-2"
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
        <div className="max-w-7xl mx-auto px-6">
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
            <p className="text-gray-400 leading-relaxed mb-6">
              Formăm șoferi responsabili, pentru un trafic bazat pe respect și siguranță.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/compact.drive" target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 p-2 rounded transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@compactdrive" target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 p-2 rounded transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/drivecompact/" target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 p-2 rounded transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">Pietonal Ștefan cel Mare, Roman 611038</div>
                  <div className="text-gray-400 text-sm">Sediul principal</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-red-600" />
                <span>+40 768 211 211</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-red-600" />
                <span>compactdrivee@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock size={20} className="text-red-600" />
                <span>08:30 AM - 18:30 PM</span>
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
              <a href="/#contact" className="block text-gray-400 hover:text-white transition">Contact</a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">Localizare</h4>
            <div className="rounded-lg overflow-hidden h-48">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2731.8962558364446!2d26.922446315577983!3d46.92042997914603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b4f5a1a1a1a1a1%3A0x1a1a1a1a1a1a1a1a!2sPietonal%20%C8%98tefan%20cel%20Mare%2C%20Roman%20611038!5e0!3m2!1sen!2sro!4v1234567890123!5m2!1sen!2sro"
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <a 
              href="https://maps.app.goo.gl/YfF6PCd47k7gQGSF9"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition block text-center"
            >
              Afișați harta
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2025 G.Y.A. COMPACT STAR SRL. Toate drepturile rezervate.</p>
        </div>
      </footer>
    </div>
  );
};

export default Promotii;
