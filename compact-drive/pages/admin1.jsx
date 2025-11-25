import React, { useState, useEffect } from 'react';
import { Upload, X, Calendar, Tag, Image as ImageIcon, LogOut, Trash2, Edit } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

const Admin1Gallery = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [gallery, setGallery] = useState([]);
  const [uploading, setUploading] = useState(false);
  
  // Form data
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchGallery();
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

  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGallery(data || []);
    } catch (err) {
      console.error('Error fetching gallery:', err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setError('Te rog selectează o imagine');
      return;
    }

    setUploading(true);
    setError('');

    try {
      // Upload image to Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      // Insert into database
      const { error: dbError } = await supabase
        .from('gallery')
        .insert([
          {
            image_url: publicUrl,
            category: category || null,
            date: date || null,
          }
        ]);

      if (dbError) throw dbError;

      // Reset form
      setImageFile(null);
      setImagePreview('');
      setCategory('');
      setDate('');
      
      // Refresh gallery
      fetchGallery();
      
      alert('Imaginea a fost încărcată cu succes!');
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id, imageUrl) => {
    if (!confirm('Sigur vrei să ștergi această imagine?')) return;

    try {
      // Extract file path from URL
      const urlParts = imageUrl.split('/');
      const filePath = `gallery/${urlParts[urlParts.length - 1]}`;

      // Delete from storage
      await supabase.storage
        .from('images')
        .remove([filePath]);

      // Delete from database
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchGallery();
      alert('Imaginea a fost ștearsă!');
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
              <ImageIcon size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Galerie</h1>
            <p className="text-gray-600">Gestionează fotografiile elevilor promovați</p>
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
              <span className="text-red-600">ADMIN</span> GALERIE
            </h1>
            <p className="text-gray-400 mt-1">Gestionează fotografiile elevilor promovați</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition inline-flex items-center space-x-2"
          >
            <LogOut size={18} />
            <span>Deconectare</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Upload Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Încarcă fotografie nouă</h2>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleUpload} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Imagine <span className="text-red-600">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-600 transition">
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview('');
                        }}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-2">Click pentru a selecta imaginea</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="imageUpload"
                      />
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-lg inline-block"
                      >
                        Selectează imagine
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Tag size={16} className="inline mr-2" />
                  Categoria (opțional)
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                >
                  <option value="">Selectează categoria</option>
                  <option value="Categoria A">Categoria A - Moto</option>
                  <option value="Categoria A1">Categoria A1 - Moto Incepator</option>
                  <option value="Categoria A2">Categoria A2 - Moto Pro</option>
                  <option value="Categoria B">Categoria B - Auto</option>
                  <option value="Categoria C">Categoria C - Camion</option>
                  <option value="Categoria CE">Categoria CE - Camion + Remorca</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar size={16} className="inline mr-2" />
                  Data promovării (opțional)
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold text-lg transition disabled:opacity-50 inline-flex items-center justify-center space-x-2"
              >
                <Upload size={20} />
                <span>{uploading ? 'Se încarcă...' : 'Încarcă fotografia'}</span>
              </button>
            </form>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl shadow-xl p-8">
              <h3 className="text-lg font-semibold mb-2 opacity-90">Total fotografii</h3>
              <p className="text-5xl font-bold">{gallery.length}</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl shadow-xl p-8">
              <h3 className="text-lg font-semibold mb-4">Instrucțiuni</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Imaginile vor apărea în galeria de pe pagina principală</li>
                <li>• Categoria și data sunt opționale</li>
                <li>• Formatul recomandat: JPG sau PNG</li>
                <li>• Dimensiune maximă: 5MB</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Galerie actuală ({gallery.length} {gallery.length === 1 ? 'fotografie' : 'fotografii'})
          </h2>

          {gallery.length === 0 ? (
            <div className="text-center py-20">
              <ImageIcon size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Nu există fotografii în galerie</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {gallery.map((item) => (
                <div key={item.id} className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden hover:shadow-lg transition group">
                  <div className="relative h-48">
                    <img 
                      src={item.image_url} 
                      alt="Gallery" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-center justify-center">
                      <button
                        onClick={() => handleDelete(item.id, item.image_url)}
                        className="opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    {item.category && (
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Tag size={14} className="mr-2" />
                        {item.category}
                      </div>
                    )}
                    {item.date && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={14} className="mr-2" />
                        {new Date(item.date).toLocaleDateString('ro-RO')}
                      </div>
                    )}
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

export default Admin1Gallery;
