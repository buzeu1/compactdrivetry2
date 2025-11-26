import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Phone, Mail, MapPin, Clock, CheckCircle, Menu, X, Book } from 'lucide-react';

const CompactDrive = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});

  // Intersection Observer for scroll animations
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

  // Gallery images
  const galleryImages = [
    "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
  ];

  const enrollmentSteps = [
    {
      number: "01",
      title: "Te înscrii",
      description: "Ne vizitezi la sediul școlii de șoferi, unde completezi fișa de înscriere, apoi urmezi pașii necesari pentru a obține toate documentele obligatorii.",
      icon: <Book size={64} />,
      color: "from-gray-900 to-gray-800"
    },
    {
      number: "02",
      title: "Începi cursurile",
      description: "După completarea dosarului vei începe cursurile teoretice și practice, finalizate cu o simulare de examen",
      icon: <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>,
      color: "from-red-600 to-red-700"
    },
    {
      number: "03",
      title: "Susții examenul",
      description: "După finalizarea etapelor necesare, îți vei programa examenul teoretic și cel practic în funcție de disponibilitatea și preferințele tale.",
      icon: <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>,
      color: "from-gray-800 to-gray-700"
    }
  ];

  const testimonials = [
    {
      name: "Maria Ionescu",
      category: "Elev Categoria B",
      text: "Instructori profesioniști și răbdători! Am luat permisul din prima încercare datorită pregătirii excelente. Mașinile sunt noi și foarte bine întreținute. Recomand cu încredere!",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
      name: "Andrei Popescu",
      category: "Elev Categoria A",
      text: "Cea mai bună școală de șoferi din Roman! Instructorii sunt dedicați, programul este flexibil și atmosfera este prietenoasă. M-am simțit în siguranță de la prima lecție.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
      name: "Elena Dobre",
      category: "Elev Categoria B",
      text: "Mulțumesc echipei Compact Drive pentru profesionalism și răbdare! Am depășit frica de condus și acum mă simt încrezătoare la volan. Vă recomand cu drag!",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=9"
    },
    {
      name: "Ion Munteanu",
      category: "Elev Categoria C",
      text: "Am obținut categoria C pentru camion și sunt foarte mulțumit de experiența la Compact Drive. Instructorii au multă experiență în transporturi și mi-au explicat totul foarte clar, de la manevră până la conducere defensivă. Recomand cu încredere!",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=33"
    },
    {
      name: "Gheorghe Stanciu",
      category: "Elev Categoria CE",
      text: "Pregătirea pentru categoria CE a fost excelentă! Am învățat să manevrezi remorca cu mare atenție și să fac cuplarea corect. Instructorii sunt foarte răbdători și profesioniști. Am promovat din prima!",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=15"
    },
    {
      name: "Mihai Vasile",
      category: "Elev Categoria C",
      text: "Instructorii de la Compact Drive m-au pregătit foarte bine pentru categoria C. Am învățat toate aspectele condusului defensiv și de siguranță pentru transportul de mărfuri. Mașinile sunt moderne și bine întreținute.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=52"
    },
    {
      name: "Alexandra Radu",
      category: "Elev Categoria B",
      text: "Experiență minunată! De la primul curs teoretic până la ultimul curs practic, totul a fost organizat perfect. Instructorii sunt foarte dedicați și îți oferă încrederea de care ai nevoie la volan.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=20"
    },
    {
      name: "Constantin Pavel",
      category: "Elev Categoria CE",
      text: "Am făcut categoria CE aici și pot spune că are cei mai buni instructori pentru transport greu din Roman. M-au învățat tot ce trebuie să știu despre siguranța rutieră cu remorcă și cum să planific traseele eficient.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=56"
    },
    {
      name: "Cristina Nicolescu",
      category: "Elev Categoria B",
      text: "Compact Drive m-a ajutat să-mi depășesc teama de condus. Instructorii sunt foarte profesioniști și empatici. Programul este flexibil și se adaptează nevoilor tale. Mulțumesc pentru tot!",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=31"
    },
    {
      name: "Daniel Marin",
      category: "Elev Categoria C",
      text: "Pregătirea pentru categoria C a fost foarte completă. Am învățat nu doar să conduc camionul, ci și aspecte importante despre întreținere și verificări zilnice. Instructorii sunt foarte experimentați în domeniu.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=68"
    }
  ];

  const categories = [
    {
      title: "AUTO",
      subtitle: "pentru permis de conducere categoria",
      code: "B",
      price: "2107",
      vat: "2550 cu TVA",
      vehicles: [
        "A1 - Honda CB 125F 2023",
        "A2 - Honda CI 500 2025",
        "A - Yamaha MT-07 2020"
      ],
      color: "bg-gradient-to-br from-gray-900 to-gray-800"
    },
    {
      title: "CAMION",
      subtitle: "pentru permis de conducere categoria",
      code: "B",
      price: "2636",
      vat: "3190 cu TVA",
      vehicles: [
        "Mercedes CLA 2025",
        "VW POLO 2023",
        "Toyota Yaris Hibryd 2020"
      ],
      color: "bg-gradient-to-br from-red-600 to-red-700"
    },
    {
      title: "CAMION + REMORCĂ",
      subtitle: "pentru permis de conducere categoria",
      code: "CE, C+CE",
      price: "1850",
      vat: "2250 cu TVA",
      vehicles: [
        "MAN TGM 2020",
        "Remorca camion 10T"
      ],
      color: "bg-gradient-to-br from-gray-800 to-gray-700"
    }
  ];

  const stats = [
    { value: "96%", label: "Promovabilitate legislație" },
    { value: "78%", label: "Promovabilitate traseu" },
    { value: "99%", label: "Promovabilitate preselectie" },
    { value: "97%", label: "Pregătire instructori auto" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(testimonialTimer);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-black text-white py-4 px-6 fixed w-full top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
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
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="hover:text-red-500 transition">Acasă</a>
            <a href="/despre-noi" className="hover:text-red-500 transition">Despre Noi</a>
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
            <a href="/despre-noi" className="block hover:text-red-500 transition">Despre Noi</a>
            <a href="/#categorii" className="block hover:text-red-500 transition">Categorii permise</a>
            <a href="/autovehicule" className="block hover:text-red-500 transition">Tarife</a>
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
      <section id="acasa" className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\"60\\" height=\\"60\\" viewBox=\\"0 0 60 60\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cg fill=\\"none\\" fill-rule=\\"evenodd\\"%3E%3Cg fill=\\"%23ffffff\\" fill-opacity=\\"1\\"%3E%3Cpath d=\\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div 
            data-section="hero-left"
            className={`space-y-6 transition-all duration-1000 ${
              visibleSections['hero-left'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Visezi să conduci?<br />
              <span className="text-red-600">IA-ȚI PERMISUL!</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
Școala de șoferi Compact Drive este recunoscută ca una dintre cele mai bune și mai apreciate școli de șoferi din municipiul Roman, unde seriozitatea și profesionalismul te pregătesc pentru succes.Începe drumul către permisul tău astăzi!
            </p>
            <a href="/#categorii" className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg font-semibold text-lg transition transform hover:scale-105 inline-flex items-center space-x-2">
              <span>Vezi categoriile</span>
              <ChevronRight size={20} />
            </a>
          </div>

          <div 
            data-section="hero-right"
            className={`relative transition-all duration-1000 delay-300 ${
              visibleSections['hero-right'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <img 
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop" 
                alt="Școală de șoferi Compact Drive"
                className="rounded-lg shadow-2xl w-full"
              />
              <div className="mt-6 bg-gray-900 rounded-lg p-6">
                <div className="text-4xl font-bold text-center text-red-600">5+</div>
                <div className="text-center text-gray-300 mt-2">ANI DE EXPERIENȚĂ</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div 
            data-section="gallery-header"
            className={`text-center mb-12 transition-all duration-1000 ${
              visibleSections['gallery-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-red-600 text-sm font-semibold tracking-wider uppercase mb-2">
              ULTIMELE REZULTATE
            </h2>
            <h3 className="text-4xl font-bold text-gray-900">
              Elevii noștri promovați recent
            </h3>
          </div>

          <div 
            data-section="gallery-content"
            className={`relative group transition-all duration-1000 ${
              visibleSections['gallery-content'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={galleryImages[currentImageIndex]} 
                alt="Elevi promovați"
                className="w-full h-[500px] object-cover transition-transform duration-700"
              />
            </div>

            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={24} className="text-gray-900" />
            </button>

            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={24} className="text-gray-900" />
            </button>

            <div className="flex justify-center mt-6 space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    index === currentImageIndex ? 'bg-red-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Steps Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div 
            data-section="enrollment-header"
            className={`text-center mb-12 transition-all duration-1000 ${
              visibleSections['enrollment-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-red-600 text-sm font-semibold tracking-wider uppercase mb-2">
              PAȘII PE CARE ÎI PARCURGI LA
            </h2>
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Școala de Șoferi Compact Drive
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Informații complete despre procesul de înscriere și obținere a permisului de conducere
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {enrollmentSteps.map((step, index) => (
              <div
                key={index}
                data-section={`enrollment-step-${index}`}
                className={`relative transition-all duration-1000 delay-${index * 100} ${
                  visibleSections[`enrollment-step-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className={`bg-gradient-to-br ${step.color} text-white rounded-2xl p-8 h-full shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2`}>
                  <div className="absolute -top-6 left-8 bg-white text-gray-900 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                  <div className="mt-12">
                    <div className="mb-6 flex justify-center opacity-90">
                      {step.icon}
                    </div>
                    <h4 className="text-3xl font-bold mb-4 text-center">{step.title}</h4>
                    <p className="text-gray-100 leading-relaxed text-center text-lg">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/informatii-utile" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105 inline-flex items-center space-x-2">
              <span>Află toate detaliile</span>
              <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Categories Overview - 3 Simple Cards */}
      <section id="categorii" className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div 
            data-section="categories-header"
            className={`text-center mb-12 transition-all duration-1000 ${
              visibleSections['categories-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-red-600 text-sm font-semibold tracking-wider uppercase mb-2">
              COSTURI GENERALE PENTRU
            </h2>
            <h3 className="text-4xl font-bold text-gray-900">
              Școala de șoferi
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div 
                key={index}
                data-section={`category-${index}`}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 duration-1000 ${
                  visibleSections[`category-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="p-8">
                  <div className="text-center mb-6">
                    <img 
                      src={index === 0 
                        ? "/moto.jpg"
                        : index === 1
                        ? "/camion.jpg"
                        : "/camion-remorca.jpg"
                      }
                      alt={category.title}
                      className="w-full h-48 object-cover rounded-lg mb-6"
                    />
                    <h4 className="text-3xl font-bold text-gray-900 mb-2">{category.title}</h4>
                    <p className="text-gray-600 text-sm mb-1">{category.subtitle}</p>
                    <p className="text-gray-800 font-semibold">{category.code}</p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-red-600">
                      de la {category.price}
                      <span className="text-sm text-gray-500 block mt-1">{category.vat}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {category.vehicles.map((vehicle, vIndex) => (
                      <div key={vIndex} className="flex items-start space-x-2">
                        <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{vehicle}</span>
                      </div>
                    ))}
                  </div>

                  <a href="/autovehicule" className={`w-full ${category.color} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition block text-center`}>
                    Mergi la categoria {category.title}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
            <a href="/autovehicule" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105 inline-flex items-center justify-center space-x-2">
              <span>Vezi toate autovehiculele</span>
              <ChevronRight size={20} />
            </a>
            <a href="/autovehicule#servicii" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105 inline-flex items-center justify-center space-x-2">
              <span>Vezi servicii suplimentare</span>
              <ChevronRight size={20} />
            </a>
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
            <h2 className="text-sm font-semibold tracking-wider uppercase mb-2 opacity-90">
              NE MÂNDRIM CU
            </h2>
            <h3 className="text-4xl font-bold">
              Performanțele școlii de șoferi Compact Drive
            </h3>
            <p className="mt-4 text-xl text-red-100">
             Încă din primii ani, efortul și dedicarea noastră s-au reflectat în rezultatele obținute de elevi și instructori, iar fiecare succes ne motivează să fim tot mai buni.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                data-section={`stat-${index}`}
                className={`${index % 2 === 0 ? 'bg-gray-900' : 'bg-white text-gray-900'} rounded-2xl p-8 text-center shadow-xl transition-all duration-1000 delay-${index * 100} ${
                  visibleSections[`stat-${index}`] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
              >
                <div className="text-5xl font-bold mb-3">{stat.value}</div>
                <div className={`${index % 2 === 0 ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div 
            data-section="testimonials-header"
            className={`text-center mb-12 transition-all duration-1000 ${
              visibleSections['testimonials-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-red-600 text-sm font-semibold tracking-wider uppercase mb-2">
              IATĂ CE SPUN ELEVII DESPRE
            </h2>
            <h3 className="text-4xl font-bold text-gray-900">
              Școala de șoferi COMPACT DRIVE
            </h3>
          </div>

          <div 
            data-section="testimonials-content"
            className={`max-w-4xl mx-auto relative transition-all duration-1000 ${
              visibleSections['testimonials-content'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-xl transition-all duration-500">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={24} />
                ))}
              </div>

              <p className="text-gray-700 text-lg leading-relaxed text-center mb-8 italic min-h-[120px] flex items-center justify-center">
                "{testimonials[currentTestimonial].text}"
              </p>

              <div className="flex items-center justify-center space-x-4">
                <img 
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover shadow-lg"
                />
                <div>
                  <div className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-600 text-sm">{testimonials[currentTestimonial].category}</div>
                </div>
              </div>
            </div>

            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition"
            >
              <ChevronLeft size={24} className="text-gray-900" />
            </button>

            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition"
            >
              <ChevronRight size={24} className="text-gray-900" />
            </button>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-red-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Recenzie ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="text-center mt-4 text-gray-500 text-sm">
              {currentTestimonial + 1} din {testimonials.length} recenzii
            </div>
          </div>

          <div 
            data-section="testimonials-buttons"
            className={`mt-12 flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 delay-300 ${
              visibleSections['testimonials-buttons'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <a 
              href="https://www.google.com/search?sca_esv=ef6e102d6c74609c&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E-FsVYJ4ro_JHWWIFscg-xGQVPScETggdIZu9OopOQULTfKZGEGcfFX8NCh9xbIXHqkliPnecRL9XVerCVtipq9Hpm48KLqEldU32M7dJxhDcAAmkQ%3D%3D&q=Compact+Drive+Roman+Recenzii&sa=X&ved=2ahUKEwiHs9K3jJCRAxXNywIHHUTyCRoQ0bkNegQIIRAD&cshid=1764169792640398&biw=1536&bih=730&dpr=1.25#lrd=0x40caa3eed6e33e05:0x121539b93879e5d4,3,,,,"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition inline-flex items-center justify-center space-x-2"
            >
              <span>Lasă o recenzie pe GOOGLE</span>
            </a>
            <a 
              href="https://www.facebook.com/compact.drive"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition inline-flex items-center justify-center space-x-2"
            >
              <span>Lasă o recenzie pe FACEBOOK</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact/Footer Section */}
      <footer id="contact" className="bg-black text-white py-16 px-6">
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
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        .delay-100 {
          transition-delay: 100ms;
        }

        .delay-200 {
          transition-delay: 200ms;
        }

        .delay-300 {
          transition-delay: 300ms;
        }

        .delay-400 {
          transition-delay: 400ms;
        }

        .delay-500 {
          transition-delay: 500ms;
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

export default CompactDrive;
