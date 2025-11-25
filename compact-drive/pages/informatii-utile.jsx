import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X, Phone, Mail, MapPin, Clock, Book, FileText, Building } from 'lucide-react';

const InformatiiUtile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
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

  const steps = [
    {
      number: "01",
      title: "Te înscrii",
      description: "Prin formularul de înscriere on-line sau la unul din sediile școlii de șoferi Compact Drive. E suficient să vii doar cu buletinul.",
      icon: <Book size={64} />,
      color: "from-gray-900 to-gray-800"
    },
    {
      number: "02",
      title: "Fisa Medicala",
      description: "Obții fișa medicală de la orice Clinică Medicală competentă din localitatea ta.",
      icon: <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>,
      color: "from-red-600 to-red-700"
    },
    {
      number: "03",
      title: "Cazier Judiciar",
      description: "Îl poți obține de la Inspectoratul General al Poliției Române din localitatea de care aparții sau de pe ghiseul.ro.",
      icon: <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>,
      color: "from-gray-800 to-gray-700"
    },
    {
      number: "04",
      title: "Aviz Psihologic",
      description: "Obții acest aviz de la orice Clinică Medicală dotată cu un Cabinet Psihologic.",
      icon: <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>,
      color: "from-gray-800 to-gray-700"
    },
    {
      number: "05",
      title: "Taxa pentru Permis",
      description: "Această taxă o achiti la CEC Bank, terminale de plată, ghiseul.ro, și are o valoare de 89 RON.",
      icon: <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>,
      color: "from-red-600 to-red-700"
    },
    {
      number: "06",
      title: "Cerere Examen",
      description: "Această cerere tip o gasești la sediile noastre și o vom completa împreună.",
      icon: <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>,
      color: "from-gray-900 to-gray-800"
    }
  ];

  const usefulLinks = [
    {
      title: "Chestionare Online",
      content: "Testează-ți cunoștințele și exersează pentru examenul teoretic. Platformele online oferă chestionare actualizate conform legislației în vigoare, cu explicații detaliate pentru fiecare întrebare. Începe acum!",
      icon: <FileText size={24} />
    },
    {
      title: "Codul Rutier",
      content: "Codul rutier actualizat 2024 - toate normele și regulamentele de circulație. Consultă legislația rutieră oficială pentru a te pregăti optim pentru examen.",
      icon: <Book size={24} />
    },
    {
      title: "ARR - Autoritatea Rutieră Română",
      content: "Autoritatea Rutieră Română - informații oficiale despre permise de conducere, proceduri de obținere, taxe și toate documentele necesare pentru înscrierea la școala de șoferi.",
      icon: <Building size={24} />
    }
  ];

  const faqItems = [
    {
      question: "Când și cum mă înscriu?",
      answer: "Înscrierea la școala de șoferi Compact Drive se poate face oricând în 3 luni de la împlinirea vârstei legale pentru obținerea permisului de conducere, la sediile noastre sau prin formularul de înscriere online."
    },
    {
      question: "De ce acte am nevoie?",
      answer: "Ai nevoie de carte de identitate, certificat de naștere, certificat medical, aviz psihologic, cazier judiciar și dovada achitării taxei de înscriere. Echipa noastră te va ghida pas cu pas în întregul proces."
    },
    {
      question: "Cât costă școala de șoferi?",
      answer: "Prețurile variază în funcție de categoria de permis dorită. Oferim pachete complete care includ toate cursurile teoretice și practice necesare. Pentru detalii exacte despre tarife, vizitează secțiunea Tarife."
    },
    {
      question: "Cât durează cursurile?",
      answer: "Durata cursurilor variază în funcție de categorie și ritmul de învățare. În medie, pentru categoria B, cursurile durează între 2-3 luni, incluzând atât partea teoretică cât și cea practică."
    },
    {
      question: "Pot să îmi aleg instructorul?",
      answer: "Da, la Compact Drive îți oferim posibilitatea de a alege instructorul cu care te simți cel mai confortabil. Avem o echipă de instructori profesioniști și răbdători."
    },
    {
      question: "Ce se întâmplă dacă pic examenul?",
      answer: "Nu este o problemă! Oferim ore suplimentare de pregătire și pachete speciale pentru reluarea examenului. Echipa noastră te va susține până obții permisul."
    }
  ];

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
            <a href="/promotii" className="hover:text-red-500 transition">Promoții</a>
            <a href="/informatii-utile" className="text-red-500">Info utile</a>
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
            <a href="/promotii" className="block hover:text-red-500 transition">Promoții</a>
            <a href="/informatii-utile" className="block text-red-500">Info utile</a>
            <a href="/inscriere" className="block hover:text-red-500 transition">Înscriere</a>
            <a href="/#contact" className="block hover:text-red-500 transition">Contact</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-black text-white pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div 
            data-section="info-hero"
            className={`transition-all duration-1000 ${
              visibleSections['info-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-sm font-semibold tracking-wider uppercase mb-4 opacity-90">
              INFORMAȚII COMPLETE
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Te înscrii simplu!
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Pașii detaliați pentru obținerea permisului de conducere la Compact Drive
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                data-section={`step-${index}`}
                className={`relative transition-all duration-1000 ${
                  visibleSections[`step-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`bg-gradient-to-br ${step.color} text-white rounded-2xl p-6 h-full shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}>
                  <div className="absolute -top-6 left-6 bg-white text-gray-900 rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold shadow-lg">
                    {step.number}
                  </div>
                  <div className="mt-10">
                    <div className="mb-4 flex justify-center opacity-90">
                      {step.icon}
                    </div>
                    <h4 className="text-2xl font-bold mb-3 text-center">{step.title}</h4>
                    <p className="text-gray-100 leading-relaxed text-center">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Useful Links Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div 
            data-section="links-header"
            className={`text-center mb-12 transition-all duration-1000 ${
              visibleSections['links-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-red-600 text-sm font-semibold tracking-wider uppercase mb-2">
              ACCES RAPID SPRE
            </h2>
            <h3 className="text-4xl font-bold text-gray-900">
              LINKURI UTILE
            </h3>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {usefulLinks.map((item, index) => (
              <div
                key={index}
                data-section={`link-${index}`}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 ${
                  visibleSections[`link-${index}`] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <button
                  onClick={() => setActiveAccordion(activeAccordion === `link-${index}` ? null : `link-${index}`)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-red-600">
                      {item.icon}
                    </div>
                    <span className="font-bold text-gray-900 text-xl">{item.title}</span>
                  </div>
                  <ChevronRight 
                    className={`transform transition-transform duration-300 ${activeAccordion === `link-${index}` ? 'rotate-90' : ''} text-gray-400`}
                    size={24}
                  />
                </button>
                {activeAccordion === `link-${index}` && (
                  <div className="px-8 py-6 bg-gray-50 border-t animate-slideDown">
                    <p className="text-gray-600 leading-relaxed">
                      {item.content}
                    </p>
                    <a 
                      href="#"
                      className="mt-4 inline-flex items-center space-x-2 text-red-600 hover:text-red-700 font-semibold"
                    >
                      <span>Accesează acum</span>
                      <ChevronRight size={16} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div 
            data-section="faq-header"
            className={`text-center mb-12 transition-all duration-1000 ${
              visibleSections['faq-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-red-600 text-sm font-semibold tracking-wider uppercase mb-2">
              INFORMAȚII UTILE
            </h2>
            <h3 className="text-4xl font-bold text-gray-900">
              Întrebări frecvente
            </h3>
            <p className="mt-4 text-gray-600 text-lg">
              Răspunsuri la cele mai comune întrebări despre școala de șoferi
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                data-section={`faq-${index}`}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-700 ${
                  visibleSections[`faq-${index}`] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <span className="font-bold text-gray-900 text-lg pr-4">
                    {index + 1}. {item.question}
                  </span>
                  <ChevronRight 
                    className={`transform transition-transform duration-300 flex-shrink-0 ${activeAccordion === index ? 'rotate-90' : ''} text-red-600`}
                    size={24}
                  />
                </button>
                {activeAccordion === index && (
                  <div className="px-8 py-6 bg-gray-50 border-t animate-slideDown">
                    <p className="text-gray-700 leading-relaxed text-lg">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div 
            data-section="faq-button"
            className={`text-center mt-12 transition-all duration-1000 delay-600 ${
              visibleSections['faq-button'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <a href="/inscriere" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105 inline-flex items-center space-x-2">
              <span>Vreau să mă înscriu</span>
              <ChevronRight size={20} />
            </a>
          </div>
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
            Pregătit să începi?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Înscrie-te astăzi și începe drumul către obținerea permisului de conducere!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/inscriere"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105 inline-flex items-center justify-center space-x-2"
            >
              <span>Înscrie-te online</span>
              <ChevronRight size={20} />
            </a>
            <a 
              href="tel:+40770935065"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105 inline-flex items-center justify-center space-x-2"
            >
              <Phone size={20} />
              <span>Sună-ne acum</span>
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
              <a href="/promotii" className="block text-gray-400 hover:text-white transition">Promoții</a>
              <a href="/informatii-utile" className="block text-red-500">Info utile</a>
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
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            max-height: 500px;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
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

export default InformatiiUtile;
