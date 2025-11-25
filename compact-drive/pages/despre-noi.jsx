import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X, Phone, Mail, MapPin, Clock, CheckCircle, Award, Users, Target, Heart } from 'lucide-react';

const DespreNoi = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const values = [
    {
      icon: <Award size={48} />,
      title: "Profesionalism",
      description: "Instructori certificați cu experiență vastă în domeniu, dedicați succesului fiecărui elev."
    },
    {
      icon: <Heart size={48} />,
      title: "Răbdare și Empatie",
      description: "Înțelegem că fiecare elev învață în ritmul său. Suntem alături de tine la fiecare pas."
    },
    {
      icon: <Target size={48} />,
      title: "Rezultate Dovedite",
      description: "96% rată de promovabilitate la legislație și pregătire completă pentru examenul practic."
    },
    {
      icon: <Users size={48} />,
      title: "Comunitate",
      description: "Peste 5000 de elevi promovați în ultimii 15 ani. Fă și tu parte din familia Compact Drive!"
    }
  ];

  const stats = [
    { value: "15+", label: "Ani de Experiență" },
    { value: "5000+", label: "Elevi Promovați" },
    { value: "96%", label: "Rată Promovabilitate" },
    { value: "10+", label: "Instructori Profesioniști" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-black text-white py-4 px-6 fixed w-full top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center space-x-4">
            <img 
                src="/logo.png" 
                alt="Compact Drive" 
                className="w-16 h-16 object-contain"
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
            <a href="/despre-noi" className="text-red-500">Despre Noi</a>
            <a href="/#categorii" className="hover:text-red-500 transition">Categorii permise</a>
            <a href="/autovehicule" className="hover:text-red-500 transition">Tarife</a>
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
            <a href="/despre-noi" className="block text-red-500">Despre Noi</a>
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
        <div className="max-w-7xl mx-auto text-center">
          <div 
            data-section="hero"
            className={`transition-all duration-1000 ${
              visibleSections['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Despre <span className="text-red-600">COMPACT DRIVE</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Școala de șoferi care transformă vise în realitate de peste 15 ani
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div 
              data-section="mission-text"
              className={`transition-all duration-1000 ${
                visibleSections['mission-text'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h2 className="text-red-600 text-sm font-semibold tracking-wider uppercase mb-2">
                MISIUNEA NOASTRĂ
              </h2>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Conducem către un viitor mai sigur
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                La Compact Drive, misiunea noastră este simplă dar profundă: să pregătim șoferi responsabili, competenți și încrezători care contribuie la siguranța rutieră din România.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                De peste 15 ani, dedicăm fiecare zi pentru a oferi cea mai bună experiență de învățare, combinând tehnici moderne de predare cu răbdarea și profesionalismul instructorilor noștri certificați.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Nu suntem doar o școală de șoferi - suntem partenerul tău de încredere în călătoria către independență și libertate pe drumurile României.
              </p>
            </div>

            <div 
              data-section="mission-image"
              className={`transition-all duration-1000 ${
                visibleSections['mission-image'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <img 
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop"
                alt="Compact Drive Mission"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div 
            data-section="values-header"
            className={`text-center mb-12 transition-all duration-1000 ${
              visibleSections['values-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-red-600 text-sm font-semibold tracking-wider uppercase mb-2">
              VALORILE NOASTRE
            </h2>
            <h3 className="text-4xl font-bold text-gray-900">
              Ce ne face diferiți
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                data-section={`value-${index}`}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-700 transform hover:-translate-y-2 ${
                  visibleSections[`value-${index}`] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-red-600 mb-6">
                  {value.icon}
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto">
          <div 
            data-section="stats-header"
            className={`text-center mb-12 transition-all duration-1000 ${
              visibleSections['stats-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold mb-4">
              Rezultatele noastre vorbesc de la sine
            </h2>
            <p className="text-xl text-red-100">
              Cifre care demonstrează dedicarea și profesionalismul echipei Compact Drive
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                data-section={`stat-${index}`}
                className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center transition-all duration-1000 ${
                  visibleSections[`stat-${index}`] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl font-bold mb-3">{stat.value}</div>
                <div className="text-red-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div 
            data-section="why-header"
            className={`text-center mb-12 transition-all duration-1000 ${
              visibleSections['why-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-red-600 text-sm font-semibold tracking-wider uppercase mb-2">
              DE CE COMPACT DRIVE?
            </h2>
            <h3 className="text-4xl font-bold text-gray-900">
              Avantajele tale când alegi să înveți cu noi
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Instructori certificați și cu experiență vastă",
              "Mașini noi și bine întreținute (Mercedes, VW, Toyota)",
              "Program flexibil adaptat nevoilor tale",
              "Rată de promovabilitate 96% la legislație",
              "Suport complet până la obținerea permisului",
              "Prețuri competitive și transparente",
              "Sedii moderne în Roman",
              "Pregătire intensivă pentru examen",
              "Atmosferă prietenoasă și încurajatoare"
            ].map((benefit, index) => (
              <div
                key={index}
                data-section={`benefit-${index}`}
                className={`flex items-start space-x-4 transition-all duration-1000 ${
                  visibleSections[`benefit-${index}`] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <CheckCircle size={24} className="text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700 text-lg">{benefit}</span>
              </div>
            ))}
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
            Alătură-te celor peste 5000 de elevi care au obținut permisul cu Compact Drive!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/inscriere"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105 inline-flex items-center justify-center space-x-2"
            >
              <span>Înscrie-te acum</span>
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
              <a href="/despre-noi" className="block text-red-500">Despre Noi</a>
              <a href="/#categorii" className="block text-gray-400 hover:text-white transition">Categorii permise</a>
              <a href="/autovehicule" className="block text-gray-400 hover:text-white transition">Tarife</a>
              <a href="/promotii" className="block text-gray-400 hover:text-white transition">Promoții</a>
              <a href="/informatii-utile" className="block text-gray-400 hover:text-white transition">Info utile</a>
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

export default DespreNoi;

