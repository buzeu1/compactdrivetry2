import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import { Upload, Trash2, LogOut, Calendar, Image as ImageIcon } from 'lucide-react';

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Verifică dacă utilizatorul este autentificat
  useEffect(() => {
    checkUser();
    fetchImages();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/admin-login');
    }
  };

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      // Creează un nume unic pentru fișier
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      // Upload imaginea în Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Obține URL-ul public
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(filePath);

      // Cere utilizatorului să introducă data
      const examDate = prompt('Introduceți data examenului (ex: 15 Noiembrie 2024):');
      if (!examDate) {
        alert('Data este obligatorie!');
        return;
      }

      // Salvează în baza de date
      const { error: dbError } = await supabase
        .from('gallery_images')
        .insert([
          {
            image_url: publicUrl,
            exam_date: examDate,
            file_path: filePath
          }
        ]);

      if (dbError) throw dbError;

      alert('Imaginea a fost încărcată cu succes!');
      fetchImages();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Eroare la încărcarea imaginii!');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (id, filePath) => {
    if (!confirm('Sigur vrei să ștergi această imagine?')) return;

    try {
      // Șterge din storage
      const { error: storageError } = await supabase.storage
        .from('gallery-images')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Șterge din baza de date
      const { error: dbError } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      alert('Imaginea a fost ștearsă!');
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Eroare la ștergerea imaginii!');
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
              <div className="text-xs text-gray-400">Panou Administrare Galerie</div>
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
        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
            <Upload className="text-red-600" size={32} />
            <span>Încarcă Imagine Nouă</span>
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-red-600 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex flex-col items-center"
            >
              <ImageIcon size={64} className="text-gray-400 mb-4" />
              <span className="text-xl font-semibold text-gray-700 mb-2">
                {uploading ? 'Se încarcă...' : 'Click pentru a selecta o imagine'}
              </span>
              <span className="text-sm text-gray-500">
                Imaginea va fi afișată pe site în galeria de promovați
              </span>
            </label>
          </div>
        </div>

        {/* Images Grid */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Imagini Existente ({images.length})
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-red-600"></div>
              <p className="text-gray-600 mt-4">Se încarcă...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600">Nu există imagini încărcate încă</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div key={image.id} className="group relative bg-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition">
                  <img
                    src={image.image_url}
                    alt={`Promovat ${image.exam_date}`}
                    className="w-full h-64 object-cover"
                  />
                  
                  {/* Data în colț */}
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
                    <Calendar size={16} />
                    <span className="font-semibold text-sm">{image.exam_date}</span>
                  </div>

                  {/* Butoane */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handleDelete(image.id, image.file_path)}
                      className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition transform hover:scale-110"
                    >
                      <Trash2 size={24} />
                    </button>
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

export default AdminGallery;