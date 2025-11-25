import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X, Phone, Mail, MapPin, Clock, Tag, Calendar, Percent } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// IMPORTANT: Replace these with your actual Supabase credentials
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

const Promotii = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-section]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Fetch promotions from Supabase
  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('promotions')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setPromotions(data || []);
    } catch (err) {
      console.error('Error fetching promotions:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-black text-white py-4 px-6 fixed w-full top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center space-x-4">
            {/* Logo Space */}
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <span className="text-red-600 font-bold text-xl">CD</span>
            </div>
            
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
            <a href="/#categorii" className="hover:text-red-500 transition">Categorii permise</a>
            <a href="/autovehicule" className="hover:text-red-500 transition">Tarife</a>
            <a href="/promotii" className="text-red-500">Promoții</a>
            <a href="/informatii-utile" className="hover:text-red-500 transition">Info utile</a>
            <a href="/inscriere" className="hover:text-red-500 transition">Înscriere</a>
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
            <a href="/#categorii" className="block hover:text-red-500 transition">Categorii permise</a>
            <a href="/autovehicule" className="block hover:text-red-500 transition">Tarife</a>
            <a href="/promotii" className="block text-red-500">Promoții</a>
            <a href="/informatii-utile" className="block hover:text-red-500 transition">Info utile</a>
            <a href="/inscriere" className="block hover:text-red-500 transition">Înscriere</a>
            <a href="/#contact" className="block hover:text-red-500 transition">Contact</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 to-red-700 text-white pt-32 pb-16 px-6">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\"60\\" height=\\"60\\" viewBox=\\"0 0 60 60\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cg fill=\\"none\\" fill-rule=\\"evenodd\\"%3E%3Cg fill=\\"%23ffffff\\" fill-opacity=\\"1\\"%3E%3Cpath d=\\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div 
            data-section="promo-hero"
            className={`transition-all duration-1000 ${
              visibleSections['promo-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <Percent size={40} />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Promoții Speciale
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Profită de ofertele noastre speciale și economisește la cursurile de conducere!
            </p>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
              <p className="mt-4 text-gray-600">Se încarcă promoțiile...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                <X size={40} className="text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Eroare la încărcare</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button 
                onClick={fetchPromotions}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Încearcă din nou
              </button>
            </div>
          ) : promotions.length === 0 ? (
            <>
              <div 
                data-section="promotions-header"
                className={`text-center mb-12 transition-all duration-1000 ${
                  visibleSections['promotions-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <h2 className="text-red-600 text-sm font-semibold tracking-wider uppercase mb-2">
                  PROMOȚII DISPONIBILE ÎN CURÂND
                </h2>
                <h3 className="text-4xl font-bold text-gray-900 mb-4">
                  Pregătim oferte speciale pentru tine!
                </h3>
                <p className="text-gray-600 text-lg">
                  Revino în curând pentru a descoperi reducerile noastre exclusive.
                </p>
              </div>

              {/* Placeholder Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    data-section={`placeholder-${index}`}
                    className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-dashed border-gray-300 transition-all duration-700 ${
                      visibleSections[`placeholder-${index}`] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <Tag size={64} className="text-gray-300" />
                    </div>

                    <div className="p-6">
                      <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      </div>
                      <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <a 
                  href="/autovehicule"
                  className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105 inline-flex items-center space-x-2"
                >
                  <span>Vezi tarifele standard</span>
                  <ChevronRight size={20} />
                </a>
              </div>
            </>
          ) : (
            <>
              <div 
                data-section="promotions-header"
                className={`text-center mb-12 transition-all duration-1000 ${
                  visibleSections['promotions-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <h2 className="text-red-600 text-sm font-semibold tracking-wider uppercase mb-2">
                  OFERTE ACTIVE
                </h2>
                <h3 className="text-4xl font-bold text-gray-900">
                  Profită acum de reduceri!
                </h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {promotions.map((promo, index) => (
                  <div
                    key={promo.id}
                    data-section={`promo-${index}`}
                    className={`bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 ${
                      visibleSections[`promo-${index}`] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {promo.image_url && (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={promo.image_url} 
                          alt={promo.title}
                          className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
                        />
                        {promo.discount_percentage && (
                          <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg animate-pulse">
                            -{promo.discount_percentage}%
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <Tag size={20} className="text-red-600" />
                        <span className="text-sm font-semibold text-red-600 uppercase">Promoție</span>
                      </div>

                      <h4 className="text-2xl font-bold text-gray-900 mb-3">{promo.title}</h4>
                      
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {promo.description}
                      </p>

                      {(promo.start_date || promo.end_date) && (
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                          <Calendar size={16} />
                          <span>
                            {promo.start_date && `De la ${formatDate(promo.start_date)}`}
                            {promo.start_date && promo.end_date && ' - '}
                            {promo.end_date && `Până la ${formatDate(promo.end_date)}`}
                          </span>
                        </div>
                      )}

                      {promo.new_price && (
                        <div className="mb-6 pb-6 border-b">
                          <div className="flex items-baseline space-x-3">
                            {promo.old_price && (
                              <span className="text-gray-400 line-through text-xl">{promo.old_price} RON</span>
                            )}
                            <span className="text-3xl font-bold text-red-600">{promo.new_price} RON</span>
                          </div>
                        </div>
                      )}

                      <a 
                        href="/inscriere"
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-lg font-semibold transition transform hover:scale-105 inline-flex items-center justify-center space-x-2"
                      >
                        <span>Profită acum</span>
                        <ChevronRight size={18} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-gray-900 to-black text-white">
        <div 
          data-section="cta"
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            visibleSections['cta'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ai întrebări despre promoții?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Contactează-ne pentru mai multe detalii despre ofertele noastre speciale!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="tel:+40770935065"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105 inline-flex items-center justify-center space-x-2"
            >
              <Phone size={20} />
              <span>Sună acum</span>
            </a>
            <a 
              href="/inscriere"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105 inline-flex items-center justify-center space-x-2"
            >
              <span>Înscrie-te acum</span>
              <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="text-3xl font-bold mb-4">
              <span className="text-red-600">COMPACT</span> DRIVE
            </div>
            <p className="text-gray-400 leading-relaxed">
              Promovăm respectul reciproc în trafic și conduita corectă la volan.
            </p>
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
                <span>+40 770 935 065</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-red-600" />
                <span>contact@compact-drive.ro</span>
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
              <a href="/#categorii" className="block text-gray-400 hover:text-white transition">Categorii permise</a>
              <a href="/autovehicule" className="block text-gray-400 hover:text-white transition">Tarife</a>
              <a href="/promotii" className="block text-red-500">Promoții</a>
              <a href="/informatii-utile" className="block text-gray-400 hover:text-white transition">Info utile</a>
              <a href="/inscriere" className="block text-gray-400 hover:text-white transition">Înscriere</a>
              <a href="/#contact" className="block text-gray-400 hover:text-white transition">Contact</a>
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

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .7;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: #111827;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #dc2626;
        }
      `}</style>
    </div>
  );
};

export default Promotii;
