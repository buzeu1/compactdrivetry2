import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X, Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Inscriere = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const [formData, setFormData] = useState({
    nume: '',
    prenume: '',
    telefon: '',
    email: '',
    adresa: '',
    dataNasterii: '',
    categorie: '',
    acceptaGDPR: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Inițializează EmailJS cu Public Key
    emailjs.init('u1hQuhjSFBFKaDwrV');
    
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // PROTECȚIE ANTI-SPAM: Verifică dacă a mai trimis recent
    const lastSubmit = localStorage.getItem('lastFormSubmit');
    const now = Date.now();
    const waitTime = 5 * 60 * 1000; // 5 minute
    
    if (lastSubmit && (now - parseInt(lastSubmit)) < waitTime) {
      const minutesLeft = Math.ceil((waitTime - (now - parseInt(lastSubmit))) / 60000);
      alert(`Ai trimis deja o înscriere! Te rugăm să aștepți ${minutesLeft} minute înainte de a trimite din nou.`);
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Trimite email prin EmailJS
      await emailjs.send(
        'service_n8kqcao',
        'template_361gctc',
        {
          nume: formData.nume,
          prenume: formData.prenume,
          telefon: formData.telefon,
          email: formData.email,
          adresa: formData.adresa,
          dataNasterii: formData.dataNasterii,
          categorie: formData.categorie
        }
      );

      // Salvează timestamp-ul când a trimis
      localStorage.setItem('lastFormSubmit', now.toString());

      console.log('Form submitted:', formData);
      setFormSubmitted(true);
      
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          nume: '',
          prenume: '',
          telefon: '',
          email: '',
          adresa: '',
          dataNasterii: '',
          categorie: '',
          acceptaGDPR: false
        });
      }, 3000);

    } catch (error) {
      console.error('Eroare la trimitere:', error);
      alert('A apărut o eroare la trimiterea formularului. Te rugăm să încerci din nou.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const categories = [
    'Categoria B - Cutie Manuală',
    'Categoria B - Cutie Automată',
    'Categoria C - Camion',
    'Categoria CE - Camion + Remorca'
  ];

  const infoCards = [
    {
      icon: <MapPin size={32} />,
      title: "Sediu",
      content: [
        "Pietonal Ștefan cel Mare, Roman 611038"
      ]
    },
    {
      icon: <Clock size={32} />,
      title: "Program",
      content: [
        "Luni - Vineri: 08:30 - 18:30",
        "Sâmbătă: 09:00 - 14:00",
        "Duminică: Închis"
      ]
    },
    {
      icon: <Phone size={32} />,
      title: "Telefon",
      content: [
        "+40 768 211 211"
      ]
    },
    {
      icon: <Mail size={32} />,
      title: "Email",
      content: [
        "contact@compact-drive.ro"
      ]
    }
  ];

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
            <a href="/promotii" className="hover:text-red-500 transition">Promoții</a>
            <a href="/informatii-utile" className="hover:text-red-500 transition">Info utile</a>
            <a href="/#contact" className="hover:text-red-500 transition">Contact</a>
          </div>

          <a href="tel:+40770935065" className="hidden md:block bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition">
            Contactează-ne
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
            <a href="/promotii" className="block hover:text-red-500 transition">Promoții</a>
            <a href="/informatii-utile" className="block hover:text-red-500 transition">Info utile</a>
            <a href="/#contact" className="block hover:text-red-500 transition">Contact</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-black text-white pt-32 pb-16 px-6">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\"60\\" height=\\"60\\" viewBox=\\"0 0 60 60\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cg fill=\\"none\\" fill-rule=\\"evenodd\\"%3E%3Cg fill=\\"%23ffffff\\" fill-opacity=\\"1\\"%3E%3Cpath d=\\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div 
            data-section="hero"
            className={`transition-all duration-1000 ${
              visibleSections['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Înscrie-te rapid și simplu!
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info Cards */}
            <div 
              data-section="info-cards"
              className={`transition-all duration-1000 ${
                visibleSections['info-cards'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="grid grid-cols-2 gap-6">
                {infoCards.map((card, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="text-red-600 mb-4">
                      {card.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-3 text-gray-900">{card.title}</h3>
                    {card.content.map((line, i) => (
                      <p key={i} className="text-gray-600 text-sm leading-relaxed">{line}</p>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">De ce Compact Drive?</h3>
                <ul className="space-y-3">
                  {[
                    'Instructori profesioniști și răbdători',
                    'Mașini noi și bine întreținute',
                    'Program flexibil adaptat nevoilor tale',
                    '96% rată de promovabilitate',
                    'Prețuri competitive și transparente',
                    'Suport complet până la obținerea permisului'
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-200">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div 
              data-section="form"
              className={`transition-all duration-1000 ${
                visibleSections['form'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Formular de înscriere</h2>
                
                {formSubmitted ? (
                  <div className="text-center py-12 animate-fadeIn">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                      <CheckCircle size={48} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Mulțumim!</h3>
                    <p className="text-gray-600">Formularul a fost trimis cu succes. Te vom contacta în cel mai scurt timp!</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nume: <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="nume"
                          value={formData.nume}
                          onChange={handleChange}
                          placeholder="numele de familie"
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Prenume: <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="prenume"
                          value={formData.prenume}
                          onChange={handleChange}
                          placeholder="prenumele tău"
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nr. Telefon: <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="tel"
                          name="telefon"
                          value={formData.telefon}
                          onChange={handleChange}
                          placeholder="nr tău de telefon"
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email: <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="adresa ta de email"
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Adresă: <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="adresa"
                        value={formData.adresa}
                        onChange={handleChange}
                        placeholder="adresa ta"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Data Nașterii: <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="date"
                        name="dataNasterii"
                        value={formData.dataNasterii}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Categorie permis: <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="categorie"
                        value={formData.categorie}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition bg-white"
                      >
                        <option value="">Alege categoria de permis dorită</option>
                        {categories.map((cat, index) => (
                          <option key={index} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* GDPR Checkbox */}
                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                      <input
                        type="checkbox"
                        name="acceptaGDPR"
                        id="acceptaGDPR"
                        checked={formData.acceptaGDPR}
                        onChange={(e) => setFormData({
                          ...formData,
                          acceptaGDPR: e.target.checked
                        })}
                        required
                        className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                      />
                      <label htmlFor="acceptaGDPR" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                        Sunt de acord cu <a href="/politica-confidentialitate" target="_blank" className="text-red-600 hover:underline font-semibold">prelucrarea datelor personale</a> în conformitate cu GDPR și politica de confidențialitate a școlii Compact Drive. <span className="text-red-600">*</span>
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.acceptaGDPR}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{isSubmitting ? 'Se trimite...' : 'Trimite Înscrierea!'}</span>
                      {!isSubmitting && <ChevronRight size={24} />}
                    </button>
                  </form>
                )}
              </div>
            </div>
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
                <span>+40 768 211 211</span>
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
              <a href="/promotii" className="block text-gray-400 hover:text-white transition">Promoții</a>
              <a href="/informatii-utile" className="block text-gray-400 hover:text-white transition">Info utile</a>
              <a href="/inscriere" className="block text-red-500">Înscriere</a>
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
          <p>&copy; 2025 G.Y.A. COMPACT STAR SRL. Toate drepturile rezervate.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
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

export default Inscriere;
