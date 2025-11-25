import React, { useState, useEffect } from 'react';
import { Plus, X, Edit, Trash2, LogOut, Tag, DollarSign, Calendar, Percent, Image as ImageIcon } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

const Admin2Promotions = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [promotions, setPromotions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount_percentage: '',
    old_price: '',
    new_price: '',
    start_date: '',
    end_date: '',
    image_url: '',
    active: true
  });

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchPromotions();
    }
  }, [user]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      setUser(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const fetchPromotions = async () => {
    try {
      const { data, error } = await supabase
        .from('promotions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPromotions(data || []);
    } catch (err) {
      console.error('Error fetching promotions:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      discount_percentage: '',
      old_price: '',
      new_price: '',
      start_date: '',
      end_date: '',
      image_url: '',
      active: true
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (promo) => {
    setFormData({
      title: promo.title || '',
      description: promo.description || '',
      discount_percentage: promo.discount_percentage || '',
      old_price: promo.old_price || '',
      new_price: promo.new_price || '',
      start_date: promo.start_date || '',
      end_date: promo.end_date || '',
      image_url: promo.image_url || '',
      active: promo.active
    });
    setEditingId(promo.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const dataToSubmit = {
        ...formData,
        discount_percentage: formData.discount_percentage ? parseInt(formData.discount_percentage) : null,
        old_price: formData.old_price ? parseFloat(formData.old_price) : null,
        new_price: formData.new_price ? parseFloat(formData.new_price) : null,
      };

      if (editingId) {
        // Update
        const { error } = await supabase
          .from('promotions')
          .update(dataToSubmit)
          .eq('id', editingId);

        if (error) throw error;
        alert('Promoția a fost actualizată!');
      } else {
        // Create
        const { error } = await supabase
          .from('promotions')
          .insert([dataToSubmit]);

        if (error) throw error;
        alert('Promoția a fost adăugată!');
      }

      resetForm();
      fetchPromotions();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Sigur vrei să ștergi această promoție?')) return;

    try {
      const { error } = await supabase
        .from('promotions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      fetchPromotions();
      alert('Promoția a fost ștearsă!');
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('promotions')
        .update({ active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      fetchPromotions();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
              <Percent size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Promoții</h1>
            <p className="text-gray-600">Gestionează ofertele speciale</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@compact-drive.ro"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Parolă
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? 'Se conectează...' : 'Autentificare'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white py-6 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              <span className="text-red-600">ADMIN</span> PROMOȚII
            </h1>
            <p className="text-gray-400 mt-1">Gestionează ofertele speciale ale școlii de șoferi</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition inline-flex items-center space-x-2"
            >
              <Plus size={18} />
              <span>Promoție nouă</span>
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-lg font-semibold transition inline-flex items-center space-x-2"
            >
              <LogOut size={18} />
              <span>Deconectare</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2 opacity-90">Total promoții</h3>
            <p className="text-4xl font-bold">{promotions.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2 opacity-90">Active</h3>
            <p className="text-4xl font-bold">{promotions.filter(p => p.active).length}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2 opacity-90">Inactive</h3>
            <p className="text-4xl font-bold">{promotions.filter(p => !p.active).length}</p>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-8 py-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingId ? 'Editează promoția' : 'Adaugă promoție nouă'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-600 p-4">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Tag size={16} className="inline mr-2" />
                    Titlu <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Ex: Reducere 20% Categoria B"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descriere
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Descrierea detaliată a promoției..."
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                  />
                </div>

                {/* Discount Percentage */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Percent size={16} className="inline mr-2" />
                    Procentaj reducere (%)
                  </label>
                  <input
                    type="number"
                    value={formData.discount_percentage}
                    onChange={(e) => setFormData({...formData, discount_percentage: e.target.value})}
                    placeholder="20"
                    min="0"
                    max="100"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                  />
                </div>

                {/* Prices */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <DollarSign size={16} className="inline mr-2" />
                      Preț vechi (RON)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.old_price}
                      onChange={(e) => setFormData({...formData, old_price: e.target.value})}
                      placeholder="3190"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <DollarSign size={16} className="inline mr-2" />
                      Preț nou (RON)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.new_price}
                      onChange={(e) => setFormData({...formData, new_price: e.target.value})}
                      placeholder="2550"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar size={16} className="inline mr-2" />
                      Data început
                    </label>
                    <input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar size={16} className="inline mr-2" />
                      Data sfârșit
                    </label>
                    <input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <ImageIcon size={16} className="inline mr-2" />
                    URL imagine
                  </label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                  />
                  {formData.image_url && (
                    <img src={formData.image_url} alt="Preview" className="mt-4 max-h-48 rounded-lg" />
                  )}
                </div>

                {/* Active Toggle */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData({...formData, active: e.target.checked})}
                    className="w-5 h-5 text-red-600 rounded focus:ring-red-600"
                  />
                  <label htmlFor="active" className="text-sm font-semibold text-gray-700">
                    Promoție activă (vizibilă pe site)
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex items-center space-x-4 pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition disabled:opacity-50"
                  >
                    {loading ? 'Se salvează...' : editingId ? 'Actualizează promoția' : 'Adaugă promoția'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    Anulează
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Promotions List */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Toate promoțiile ({promotions.length})
            </h2>

            {promotions.length === 0 ? (
              <div className="text-center py-20">
                <Percent size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">Nu există promoții create</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Adaugă prima promoție
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {promotions.map((promo) => (
                  <div
                    key={promo.id}
                    className={`border-2 rounded-xl p-6 transition ${
                      promo.active ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{promo.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            promo.active ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                          }`}>
                            {promo.active ? 'Activă' : 'Inactivă'}
                          </span>
                          {promo.discount_percentage && (
                            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                              -{promo.discount_percentage}%
                            </span>
                          )}
                        </div>

                        {promo.description && (
                          <p className="text-gray-600 mb-3">{promo.description}</p>
                        )}

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          {promo.old_price && promo.new_price && (
                            <div>
                              <span className="line-through">{promo.old_price} RON</span>
                              <span className="ml-2 font-bold text-red-600">{promo.new_price} RON</span>
                            </div>
                          )}
                          {(promo.start_date || promo.end_date) && (
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-2" />
                              {promo.start_date && new Date(promo.start_date).toLocaleDateString('ro-RO')}
                              {promo.start_date && promo.end_date && ' - '}
                              {promo.end_date && new Date(promo.end_date).toLocaleDateString('ro-RO')}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => toggleActive(promo.id, promo.active)}
                          className={`px-4 py-2 rounded-lg font-semibold transition ${
                            promo.active
                              ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                              : 'bg-green-500 hover:bg-green-600 text-white'
                          }`}
                        >
                          {promo.active ? 'Dezactivează' : 'Activează'}
                        </button>
                        <button
                          onClick={() => handleEdit(promo)}
                          className="p-3 bg-gray-900 hover:bg-black text-white rounded-lg transition"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(promo.id)}
                          className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {promo.image_url && (
                      <div className="mt-4">
                        <img src={promo.image_url} alt={promo.title} className="max-h-48 rounded-lg" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin2Promotions;
