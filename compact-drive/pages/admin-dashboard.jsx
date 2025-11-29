import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import { Image, Tag, LogOut, ChevronRight } from 'lucide-react';

const AdminDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/admin-login');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin-login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-black text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/logo.jpg" 
              alt="Compact Drive" 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="text-2xl font-bold">
                <span className="text-red-600">COMPACT</span> DRIVE
              </div>
              <div className="text-xs text-gray-400">Panou Administrare</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            <LogOut size={20} />
            <span>Deconectare</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Panou de Administrare
          </h1>
          <p className="text-xl text-gray-600">
            Alege ce dorești să administrezi
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Gallery Card */}
          <a
            href="/admin-gallery"
            className="group bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Image size={48} className="text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Galerie Promovaț i
              </h2>
              
              <p className="text-gray-600 mb-6">
                Gestionează fotografiile elevilor promovaț i recent
              </p>

              <div className="flex items-center space-x-2 text-blue-600 font-semibold group-hover:translate-x-2 transition">
                <span>Accesează Galeria</span>
                <ChevronRight size={20} />
              </div>
            </div>
          </a>

          {/* Promotions Card */}
          <a
            href="/admin-promotii"
            className="group bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Tag size={48} className="text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Promoț ii
              </h2>
              
              <p className="text-gray-600 mb-6">
                Creează și administrează promoț iile și ofertele speciale
              </p>

              <div className="flex items-center space-x-2 text-red-600 font-semibold group-hover:translate-x-2 transition">
                <span>Accesează Promoț ii</span>
                <ChevronRight size={20} />
              </div>
            </div>
          </a>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Acces Rapid
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="/admin-gallery"
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
              >
                <div className="flex items-center space-x-3">
                  <Image size={24} className="text-blue-600" />
                  <span className="font-semibold text-gray-900">Galerie</span>
                </div>
                <ChevronRight size={20} className="text-blue-600" />
              </a>
              
              <a
                href="/admin-promotii"
                className="flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100 transition"
              >
                <div className="flex items-center space-x-3">
                  <Tag size={24} className="text-red-600" />
                  <span className="font-semibold text-gray-900">Promoț ii</span>
                </div>
                <ChevronRight size={20} className="text-red-600" />
              </a>
            </div>
          </div>
        </div>

        {/* Back to Site */}
        <div className="text-center mt-12">
          <a
            href="/"
            className="text-gray-600 hover:text-gray-900 transition inline-flex items-center space-x-2"
          >
            <span>← Înapoi la site</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;