-- ============================================
-- COMPACT DRIVE - COMPLETE SUPABASE SETUP
-- ============================================
-- Copy și paste TOT acest fișier în Supabase SQL Editor
-- Rulează odată și e gata tot!
-- ============================================

-- 1. CREATE GALLERY TABLE
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  category VARCHAR(100),
  date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index for faster queries
CREATE INDEX idx_gallery_created_at ON gallery(created_at DESC);

-- Enable Row Level Security
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Public can read all gallery images
CREATE POLICY "Allow public read access to gallery" ON gallery
  FOR SELECT
  USING (true);

-- Authenticated users (admin) can manage gallery
CREATE POLICY "Allow authenticated users to manage gallery" ON gallery
  FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================

-- 2. CREATE PROMOTIONS TABLE
CREATE TABLE promotions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  discount_percentage INTEGER,
  old_price DECIMAL(10, 2),
  new_price DECIMAL(10, 2),
  start_date DATE,
  end_date DATE,
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexes for faster queries
CREATE INDEX idx_promotions_active ON promotions(active);
CREATE INDEX idx_promotions_dates ON promotions(start_date, end_date);
CREATE INDEX idx_promotions_created ON promotions(created_at DESC);

-- Enable Row Level Security
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

-- Public can read ONLY active promotions
CREATE POLICY "Allow public read access to active promotions" ON promotions
  FOR SELECT
  USING (active = true);

-- Authenticated users (admin) can do EVERYTHING with promotions
CREATE POLICY "Allow authenticated users to manage promotions" ON promotions
  FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================

-- 3. INSERT SAMPLE DATA

-- Sample Gallery Images (3 exemple)
INSERT INTO gallery (image_url, category, date) VALUES
  ('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop', 'Categoria B', '2024-11-15'),
  ('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop', 'Categoria A', '2024-11-10'),
  ('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', 'Categoria B', '2024-11-05');

-- Sample Promotions (2 exemple - ACTIVE)
INSERT INTO promotions (
  title, 
  description, 
  discount_percentage, 
  old_price, 
  new_price, 
  start_date, 
  end_date, 
  image_url, 
  active
) VALUES 
  (
    'Reducere 20% Categoria B',
    'Profită de oferta specială pentru categoria B! Cursul complet cu 20% reducere. Ofertă valabilă doar în această lună!',
    20,
    3190.00,
    2550.00,
    '2024-11-01',
    '2024-12-31',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop',
    true
  ),
  (
    'Pachet Special Moto A1',
    'Curs complet categoria A1 la preț promoțional! Instructori profesioniști și mașini noi. Începe acum și economisește!',
    15,
    2650.00,
    2250.00,
    '2024-11-15',
    '2024-12-15',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    true
  );

-- ============================================
-- SETUP COMPLETE! ✅
-- ============================================

-- NEXT STEPS:
-- 1. Creează Storage Bucket numit "images" (public)
-- 2. Creează user admin în Authentication
-- 3. Configurează .env cu credențialele Supabase
-- 4. Deploy site-ul!

-- ============================================
-- VERIFICARE: Rulează aceste query-uri
-- ============================================

-- Verifică gallery
SELECT COUNT(*) as total_gallery_images FROM gallery;

-- Verifică promotions
SELECT COUNT(*) as total_promotions FROM promotions;
SELECT COUNT(*) as active_promotions FROM promotions WHERE active = true;

-- ============================================
-- QUERIES UTILE PENTRU ADMIN
-- ============================================

-- Adaugă o promoție nouă manual:
-- INSERT INTO promotions (title, description, discount_percentage, old_price, new_price, active)
-- VALUES ('Titlu', 'Descriere', 15, 3000, 2550, true);

-- Activează/Dezactivează o promoție:
-- UPDATE promotions SET active = true WHERE id = 'promotion-id-here';
-- UPDATE promotions SET active = false WHERE id = 'promotion-id-here';

-- Șterge o promoție:
-- DELETE FROM promotions WHERE id = 'promotion-id-here';

-- Șterge o imagine din galerie:
-- DELETE FROM gallery WHERE id = 'image-id-here';

-- Vezi toate promoțiile (active și inactive):
-- SELECT * FROM promotions ORDER BY created_at DESC;

-- ============================================
