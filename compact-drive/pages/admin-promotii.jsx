import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import { Plus, Trash2, LogOut, Calendar, Tag, Edit2, Save, X } from 'lucide-react';

const AdminPromotii = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount: '',
    valid_until: '',
    is_active: true
  });

  const router = useRouter();

  useEffect(() => {
    checkUser();
    fetchPromotions();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/admin-login');
    }
  };

  const fetchPromotions = async () => {
    try {
      const { data, error } = await supabase
        .from('promotions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPromotions(data || []);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      discount: '',
      valid_until: '',
      is_active: true
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Update existing promotion
        const { error } = await supabase
          .from('promotions')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
        alert('Promoția a fost actualizată!');
      } else {
        // Add new promotion
        const { error } = await supabase
          .from('promotions')
          .insert([formData]);

        if (error) throw error;
        alert('Promoția a fost adăugată!');
      }

      resetForm();
      fetchPromotions();
    } catch (error) {
      console.error('Error saving promotion:', error);
      alert('Eroare la salvarea promoției!');
    }
  };

  const handleEdit = (promotion) => {
    setFormData({
      title: promotion.title,
      description: promotion.description,
      discount: promotion.discount || '',
      valid_until: promotion.valid_until || '',
      is_active: promotion.is_active
    });
    setEditingId(promotion.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Sigur vrei să ștergi această promoție?')) return;

    try {
      const { error } = await supabase
        .from('promotions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      alert('Promoția a fost ștearsă!');
      fetchPromotions();
    } catch (error) {
      console.error('Error deleting promotion:', error);
      alert('Eroare la ștergerea promoției!');
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('promotions')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      fetchPromotions();
    } catch (error) {
      console.error('Error toggling active status:', error);
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
              <div className="text-xs text-gray-400">Panou Administrare Promoții</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="/admin-gallery"
              className="hidden md:block text-gray-400 hover:text-white transition"
            >
              Galerie →
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
            >
              <LogOut size={20} />
              <span>Deconectare</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Add Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition inline-flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Adaugă Promoție Nouă</span>
          </button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {editingId ? 'Editează Promoția' : 'Promoție Nouă'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Titlu Promoție *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Reducere de Vară!"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Descriere *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrie promoția în detaliu..."
                  required
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Reducere (opțional)
                  </label>
                  <input
                    type="text"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    placeholder="Ex: 200 LEI"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Valabilă până la (opțional)
                  </label>
                  <input
                    type="text"
                    value={formData.valid_until}
                    onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                    placeholder="Ex: 31 Decembrie 2024"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                />
                <label htmlFor="is_active" className="text-gray-700 font-semibold">
                  Promoție activă (va fi afișată pe site)
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition inline-flex items-center space-x-2"
                >
                  <Save size={20} />
                  <span>{editingId ? 'Actualizează' : 'Salvează'} Promoția</span>
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold transition"
                >
                  Anulează
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Promotions List */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Promoții Existente ({promotions.length})
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-red-600"></div>
              <p className="text-gray-600 mt-4">Se încarcă...</p>
            </div>
          ) : promotions.length === 0 ? (
            <div className="text-center py-12">
              <Tag size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600">Nu există promoții adăugate încă</p>
            </div>
          ) : (
            <div className="space-y-4">
              {promotions.map((promo) => (
                <div
                  key={promo.id}
                  className={`border-2 rounded-xl p-6 transition ${
                    promo.is_active
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {promo.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            promo.is_active
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-400 text-white'
                          }`}
                        >
                          {promo.is_active ? 'ACTIV' : 'INACTIV'}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {promo.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm">
                        {promo.discount && (
                          <div className="flex items-center space-x-2 text-red-600 font-semibold">
                            <Tag size={16} />
                            <span>{promo.discount}</span>
                          </div>
                        )}
                        {promo.valid_until && (
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Calendar size={16} />
                            <span>Valabil până: {promo.valid_until}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <button
                        onClick={() => handleEdit(promo)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
                        title="Editează"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => toggleActive(promo.id, promo.is_active)}
                        className={`${
                          promo.is_active
                            ? 'bg-yellow-600 hover:bg-yellow-700'
                            : 'bg-green-600 hover:bg-green-700'
                        } text-white p-2 rounded-lg transition`}
                        title={promo.is_active ? 'Dezactivează' : 'Activează'}
                      >
                        {promo.is_active ? '👁️‍🗨️' : '👁️'}
                      </button>
                      <button
                        onClick={() => handleDelete(promo.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                        title="Șterge"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPromotii;