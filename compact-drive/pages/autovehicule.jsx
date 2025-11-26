import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X, Phone, Mail, MapPin, Clock, Car, DollarSign, Plus, Minus } from 'lucide-react';

const Autovehicule = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedService, setExpandedService] = useState(null);
  const [visibleSections, setVisibleSections] = useState({});

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

  const vehicles = [
    {
      category: "MOTO INCEPATOR A1",
      title: "CURS COMPLET Categoria A1",
      subtitle: "Minim 70KM Conducere",
      price: "2190",
      priceVat: "2650 cu TVA",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      details: ["Honda CB 125F 2023", "Motorizare 125cmc", "Stanciu Mihai"],
      badge: null
    },
    {
      category: "MOTO EXPERT A",
      title: "CURS COMPLET Categoria A",
      subtitle: "Minim 80KM Conducere",
      price: "2107",
      priceVat: "2550 cu TVA",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      details: ["Yamaha MT-07", "Motorizare 689cmc", "Stanciu Mihai"],
      badge: null
    },
    {
      category: "MOTO PRO A2",
      title: "CURS COMPLET Categoria A2",
      subtitle: "Minim 60KM Conducere",
      price: "2107",
      priceVat: "2550 cu TVA",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      details: ["Yamaha MT-03 2025", "Motorizare 300cmc", "Stanciu Mihai"],
      badge: null
    },
    {
      category: "AUTO PREMIUM B",
      title: "CURS COMPLET Categoria B",
      subtitle: "Minim 300KM Conducere",
      price: "2966",
      priceVat: "3590 cu TVA",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
      details: ["Mercedes CLA 2025", "Motorizare 1400cmc", "Adriel John"],
      badge: "NOU"
    },
    {
      category: "AUTO PREMIUM B",
      title: "CURS COMPLET Categoria B",
      subtitle: "Minim 300KM Conducere",
      price: "2801",
      priceVat: "3390 cu TVA",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
      details: ["Volkswagen Polo 2023", "Motorizare 1000cmc", "Popovici Catalin"],
      badge: null
    },
    {
      category: "AUTO PREMIUM B",
      title: "CURS COMPLET Categoria B",
      subtitle: "Minim 300KM Conducere",
      price: "2801",
      priceVat: "3390 cu TVA",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
      details: ["Volkswagen Polo 2023", "Motorizare 1000cmc", "Cozma Irina"],
      badge: null
    },
    {
      category: "AUTO PREMIUM AUTOMAT B",
      title: "CURS COMPLET Categoria B",
      subtitle: "Minim 300KM Conducere",
      price: "2801",
      priceVat: "3390 cu TVA",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
      details: ["Toyota Yaris 2024", "Motorizare 1500cmc", "Transmisie Automată"],
      badge: "AUTOMAT"
    },
    {
      category: "AUTO B",
      title: "CURS COMPLET Categoria B",
      subtitle: "Minim 300KM Conducere",
      price: "2636",
      priceVat: "3190 cu TVA",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
      details: ["Renault Clio 2023", "Motorizare 1200cmc", "Instructor Dedicat"],
      badge: "NOU"
    },
    {
      category: "CAMION C",
      title: "CURS COMPLET Categoria C",
      subtitle: "Minim 200KM Conducere",
      price: "1850",
      priceVat: "2250 cu TVA",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop",
      details: ["MAN TGM 2020", "Capacitate 10T", "Instructor Profesionist"],
      badge: null
    },
    {
      category: "CAMION CE",
      title: "CURS COMPLET Categoria CE",
      subtitle: "Minim 250KM Conducere",
      price: "1950",
      priceVat: "2350 cu TVA",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop",
      details: ["MAN TGM + Remorcă", "Capacitate 10T", "Training Complet"],
      badge: null
    }
  ];

  const services = [
    {
      title: "SEDINTE SUPLIMENTARE",
      description: "Ore suplimentare de condus pentru elevii care au nevoie de mai multă practică.",
      price: "80 RON/oră",
      details: [
        "Ore suplimentare de condus cu instructorul",
        "Flexibilitate în programare",
        "Mașina echipată cu dublă comandă",
        "Carburant inclus"
      ]
    },
    {
      title: "PACHET +10",
      description: "Pachet de 10 ore suplimentare de condus la un preț avantajos.",
      price: "750 RON",
      pricePerHour: "(75 RON/oră)",
      details: [
        "10 ore suplimentare de condus",
        "Discount de 5% față de prețul standard",
        "Valabilitate 3 luni",
        "Carburant inclus"
      ]
    },
    {
      title: "PACHET +5",
      description: "Pachet de 5 ore suplimentare de condus pentru practică intensivă.",
      price: "390 RON",
      pricePerHour: "(78 RON/oră)",
      details: [
        "5 ore suplimentare de condus",
        "Discount de 2.5% față de prețul standard",
        "Valabilitate 2 luni",
        "Carburant inclus"
      ]
    },
    {
      title: "PACHET REPEAT",
      description: "Pachet special pentru reluarea examenului de conducere.",
      price: "450 RON",
      details: [
        "3 ore de pregătire intensivă",
        "Simulare traseu examen",
        "Însoțire la examen cu instructorul",
        "Taxe administrative incluse"
      ]
    },
    {
      title: "EXAMEN",
      description: "Servicii complete pentru susținerea examenului de conducere.",
      price: "350 RON",
      details: [
        "Însoțire la examen",
        "Mașină pentru examen",
        "Carburant",
        "Asistență instructor"
      ]
    },
    {
      title: "REDOBANDIRE",
      description: "Program complet pentru redobândirea permisului de conducere.",
      price: "De la 1500 RON",
      details: [
        "Evaluare inițială",
        "Ore de condus personalizate",
        "Pregătire pentru examen",
        "Toate formalitățile administrative",
        "Asistență completă până la obținerea permisului"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-black text-white py-4 px-6 fixed w-full top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center space-x-4">
            {/* Logo Space */}
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
            <a href="/autovehicule" className="text-red-500">Tarife</a>
            <a href="/promotii" className="hover:text-red-500 transition">Promoții</a>
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
            <a href="/autovehicule" className="block text-red-500">Tarife</a>
            <a href="/promotii" className="block hover:text-red-500 transition">Promoții</a>
            <a href="/informatii-utile" className="block hover:text-red-500 transition">Info utile</a>
            <a href="/#contact" className="block hover:text-red-500 transition">Contact</a>
            <a href="/inscriere" className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold w-full block text-center">
              Înscriere Rapidă
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-black text-white pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div 
            data-section="vehicles-hero"
            className={`transition-all duration-1000 ${
              visibleSections['vehicles-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-sm font-semibold tracking-wider uppercase mb-4 opacity-90">
              ALEGE CATEGORIA DORITĂ
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Tarife Școală de Șoferi
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              În funcție de Categorie, Pachetele de preț conțin <strong>CURSUL COMPLET</strong>. 
              Curs legislație rutieră, ore de conducere, simulări teoretice și practice, carburant, suport pentru pregătirea dosarului.
            </p>
          </div>
        </div>
      </section>

      {/* Vehicles Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div 
            data-section="vehicles-title"
            className={`text-center mb-12 transition-all duration-1000 ${
              visibleSections['vehicles-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-red-600 text-sm font-semibold tracking-wider uppercase mb-2">
              COSTURI GENERALE PENTRU
            </h2>
            <h3 className="text-4xl font-bold text-gray-900">
              Școala de șoferi
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle, index) => (
              <div
                key={index}
                data-section={`vehicle-${index}`}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 ${
                  visibleSections[`vehicle-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  {vehicle.badge && (
                    <div className={`absolute top-4 left-4 ${
                      vehicle.badge === 'NOU' ? 'bg-red-600' : 'bg-gray-900'
                    } text-white px-4 py-1 rounded-full text-sm font-bold z-10 animate-pulse`}>
                      {vehicle.badge}
                    </div>
                  )}
                  <img 
                    src={vehicle.image}
                    alt={vehicle.category}
                    className="w-full h-48 object-cover transform hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{vehicle.category}</h4>
                  <p className="text-sm text-gray-600 mb-2">{vehicle.title}</p>
                  <p className="text-xs text-gray-500 mb-4">{vehicle.subtitle}</p>

                  <div className="text-center mb-6 pb-6 border-b">
                    <div className="text-4xl font-bold text-red-600">
                      RON {vehicle.price}
                      <span className="text-sm text-gray-500 block mt-1">{vehicle.priceVat}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {vehicle.details.map((detail, dIndex) => (
                      <div key={dIndex} className="flex items-center space-x-2 text-gray-700">
                        {dIndex === 0 && <Car size={16} className="text-red-600 flex-shrink-0" />}
                        {dIndex === 1 && <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/></svg>}
                        {dIndex === 2 && <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>}
                        <span className="text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition transform hover:scale-105 inline-flex items-center justify-center space-x-2">
                    <DollarSign size={18} />
                    <span>Plată cash</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicii Suplimentare Section */}
      <section id="servicii" className="py-16 px-6 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div 
            data-section="services-header"
            className={`text-center mb-12 transition-all duration-1000 ${
              visibleSections['services-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-sm font-semibold tracking-wider uppercase mb-4 text-gray-300">
              PENTRU ORICE SITUAȚIE, AVEM
            </p>
            <h2 className="text-5xl font-bold text-white mb-6">
              Servicii Suplimentare
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Prețurile pentru serviciile suplimentare <strong>NU CONȚIN TVA</strong> și pot suporta modificări în funcție de oferte.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {services.map((service, index) => (
              <div
                key={index}
                data-section={`service-${index}`}
                className={`bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2 ${
                  visibleSections[`service-${index}`] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-br from-gray-900 to-black text-white p-6">
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <div className="text-3xl font-bold text-red-600">
                    {service.price}
                    {service.pricePerHour && (
                      <span className="text-sm text-gray-300 block mt-1">{service.pricePerHour}</span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <button
                    onClick={() => setExpandedService(expandedService === index ? null : index)}
                    className="w-full flex items-center justify-between text-gray-900 font-semibold mb-4 hover:text-gray-700 transition"
                  >
                    <span>Detalii serviciu</span>
                    {expandedService === index ? <Minus size={20} /> : <Plus size={20} />}
                  </button>

                  {expandedService === index && (
                    <div className="space-y-3 mb-6 animate-slideDown">
                      {service.details.map((detail, dIndex) => (
                        <div key={dIndex} className="flex items-start space-x-2">
                          <ChevronRight size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <a 
                    href="/inscriere"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition transform hover:scale-105 inline-flex items-center justify-center space-x-2"
                  >
                    <span>Solicită ofertă</span>
                    <ChevronRight size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div 
          data-section="cta"
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            visibleSections['cta'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ai nevoie de informații suplimentare?
          </h2>
          <p className="text-xl text-red-100 mb-8 leading-relaxed">
            Contactează-ne pentru a discuta despre nevoile tale specifice și pentru a primi o ofertă personalizată.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="tel:+40770935065"
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105 inline-flex items-center justify-center space-x-2"
            >
              <Phone size={20} />
              <span>Sună acum</span>
            </a>
            <a 
              href="/inscriere"
              className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105 inline-flex items-center justify-center space-x-2"
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
            <p className="text-gray-400 leading-relaxed mb-6">
              Promovăm respectul reciproc în trafic și conduita corectă la volan.
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
              <a href="/autovehicule" className="block text-red-500">Tarife</a>
              <a href="/promotii" className="block text-gray-400 hover:text-white transition">Promoții</a>
              <a href="/informatii-utile" className="block text-gray-400 hover:text-white transition">Info utile</a>
              <a href="/inscriere" className="block text-gray-400 hover:text-white transition">Înscriere</a>
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

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

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

export default Autovehicule;
