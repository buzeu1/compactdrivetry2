# 🚗 COMPACT DRIVE - SITE COMPLET CU ADMIN PANELS

## 📦 TOATE FIȘIERELE (7 PAGINI):

### Pagini Publice:
1. **[index.jsx](computer:///mnt/user-data/outputs/index.jsx)** - Pagina Principală
2. **[autovehicule.jsx](computer:///mnt/user-data/outputs/autovehicule.jsx)** - Tarife & Servicii (doar cash)
3. **[informatii-utile.jsx](computer:///mnt/user-data/outputs/informatii-utile.jsx)** - Info & FAQ
4. **[inscriere.jsx](computer:///mnt/user-data/outputs/inscriere.jsx)** - Formular (fără serie buletin)
5. **[promotii.jsx](computer:///mnt/user-data/outputs/promotii.jsx)** - Promoții Dinamice

### Pagini Admin (Protected):
6. **[admin1.jsx](computer:///mnt/user-data/outputs/admin1.jsx)** - Admin Galerie (upload poze promovați)
7. **[admin2.jsx](computer:///mnt/user-data/outputs/admin2.jsx)** - Admin Promoții (CRUD promoții)

---

## 🎨 DESIGN FINAL:

### Culori:
- ⚫ **Negru**: #000000 - navbar, footer, butoane principale
- ⚪ **Alb**: #FFFFFF - backgrounds, text
- 🔴 **Roșu**: #DC2626 - CTA, accente, hover
- **Zero albastru** ❌

### Modificări Complete:
- ✅ Logo spațiu în navbar (placeholder "CD")
- ✅ Pagină Promoții cu Supabase
- ✅ 2 Pagini Admin cu autentificare
- ✅ Fără Piatra Neamț
- ✅ Fără buton card
- ✅ Fără serie buletin

---

## 🚀 SETUP COMPLET - PAS CU PAS:

### PASUL 1: Instalează dependențele

```bash
npm install lucide-react @supabase/supabase-js
```

### PASUL 2: Creează cont Supabase

1. Mergi la [supabase.com](https://supabase.com)
2. Creează cont gratuit
3. Creează un nou proiect
4. Așteaptă ~2 minute să se inițializeze

### PASUL 3: Configurează Database & Storage

Copiază și rulează acest SQL în Supabase SQL Editor (copy tot și paste):

```sql
-- ============================================
-- COMPACT DRIVE - COMPLETE SUPABASE SETUP
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

-- Public can read
CREATE POLICY "Allow public read access to gallery" ON gallery
  FOR SELECT
  USING (true);

-- Authenticated users can manage
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

-- Index for active promotions
CREATE INDEX idx_promotions_active ON promotions(active);
CREATE INDEX idx_promotions_dates ON promotions(start_date, end_date);

-- Enable Row Level Security
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

-- Public can read active promotions
CREATE POLICY "Allow public read access to active promotions" ON promotions
  FOR SELECT
  USING (active = true);

-- Authenticated users can manage all promotions
CREATE POLICY "Allow authenticated users to manage promotions" ON promotions
  FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================

-- 3. INSERT SAMPLE DATA

-- Sample Gallery Images
INSERT INTO gallery (image_url, category, date) VALUES
  ('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop', 'Categoria B', '2024-11-15'),
  ('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop', 'Categoria A', '2024-11-10'),
  ('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', 'Categoria B', '2024-11-05');

-- Sample Promotions
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
    'Curs complet categoria A1 la preț promoțional! Instructori profesioniști și mașini noi.',
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
```

### PASUL 4: Configurează Storage pentru imagini

1. În Supabase Dashboard, mergi la **Storage**
2. Click **New bucket**
3. Name: `images`
4. **Public bucket**: ✅ (bifează)
5. Click **Create bucket**

### PASUL 5: Creează User Admin

În Supabase Dashboard:
1. Mergi la **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Email: `admin@compact-drive.ro` (sau ce vrei tu)
4. Password: `ParolaTareAdmin123!` (alege parola ta)
5. ✅ **Auto Confirm User** (bifează)
6. Click **Create user**

**IMPORTANT**: Salvează aceste credențiale - le vei folosi pentru login în admin panels!

### PASUL 6: Configurează variabilele de mediu

Creează fișier `.env` în root:

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Unde găsești aceste valori:
- Supabase Dashboard → **Settings** → **API**
- **Project URL** → `REACT_APP_SUPABASE_URL`
- **anon/public key** → `REACT_APP_SUPABASE_ANON_KEY`

---

## 📋 STRUCTURA COMPLETĂ:

```
src/
  pages/
    index.jsx                 # Homepage
    autovehicule.jsx          # Tarife (doar cash)
    informatii-utile.jsx      # Info & FAQ
    inscriere.jsx             # Formular (fără serie)
    promotii.jsx              # Promoții publice
    admin1.jsx                # 🔒 Admin Galerie
    admin2.jsx                # 🔒 Admin Promoții
```

---

## 🔐 ADMIN PANELS - CUM FUNCȚIONEAZĂ:

### Admin1 - Galerie (/admin1)

**Funcționalități:**
- ✅ Login cu email/parolă
- ✅ Upload poze promovați
- ✅ Selectează categoria (A, A1, A2, B, C, CE)
- ✅ Setează data promovării (optional)
- ✅ Vizualizare galerie completă
- ✅ Șterge poze
- ✅ Storage Supabase pentru imagini

**Acces:**
```
https://your-site.com/admin1
```

**Login:**
- Email: `admin@compact-drive.ro`
- Password: `ParolaTareAdmin123!`

### Admin2 - Promoții (/admin2)

**Funcționalități:**
- ✅ Login cu email/parolă
- ✅ Adaugă promoții noi (CRUD complet)
- ✅ Editează promoții existente
- ✅ Șterge promoții
- ✅ Activează/Dezactivează promoții
- ✅ Setează: titlu, descriere, discount, prețuri, date, imagine
- ✅ Dashboard cu statistici

**Acces:**
```
https://your-site.com/admin2
```

**Login:**
- Același user: `admin@compact-drive.ro`

---

## 🗄️ SCHEMA BAZE DE DATE:

### Tabel: `gallery`

| Coloană | Tip | Descriere |
|---------|-----|-----------|
| `id` | UUID | ID unic (auto) |
| `image_url` | TEXT | URL imagine (Supabase Storage) |
| `category` | VARCHAR(100) | Categoria (A, B, C, etc) |
| `date` | DATE | Data promovării (optional) |
| `created_at` | TIMESTAMP | Data upload |

### Tabel: `promotions`

| Coloană | Tip | Descriere |
|---------|-----|-----------|
| `id` | UUID | ID unic (auto) |
| `title` | VARCHAR(255) | Titlul promoției |
| `description` | TEXT | Descriere completă |
| `discount_percentage` | INTEGER | % reducere (20, 15, etc) |
| `old_price` | DECIMAL | Prețul vechi |
| `new_price` | DECIMAL | Prețul nou |
| `start_date` | DATE | Data început |
| `end_date` | DATE | Data sfârșit |
| `image_url` | TEXT | URL imagine promoție |
| `active` | BOOLEAN | Activă/Inactivă |
| `created_at` | TIMESTAMP | Data creării |
| `updated_at` | TIMESTAMP | Data actualizării |

---

## 🎯 WORKFLOW ADMIN:

### Adaugă elevi promovați (Admin1):
1. Login la `/admin1`
2. Selectează imagine din calculator
3. (Optional) Alege categoria
4. (Optional) Setează data
5. Click "Încarcă fotografia"
6. Poza apare automat în galeria de pe homepage!

### Gestionează promoții (Admin2):
1. Login la `/admin2`
2. Click "Promoție nouă"
3. Completează: titlu, descriere, reducere, prețuri, date
4. Adaugă URL imagine (sau lasă gol)
5. ✅ Bifează "Promoție activă"
6. Click "Adaugă promoția"
7. Apare automat pe `/promotii`!

**Editare:**
- Click pe butonul Edit ✏️
- Modifică ce vrei
- Click "Actualizează"

**Activare/Dezactivare:**
- Click pe butonul galben/verde
- Promoția dispare/apare instant de pe site

**Ștergere:**
- Click pe butonul roșu 🗑️
- Confirmă ștergerea

---

## 🔒 SECURITATE:

### Row Level Security (RLS) Activat:

**Gallery:**
- ✅ Public: Poate vedea toate pozele
- ✅ Authenticated: Poate adăuga/șterge

**Promotions:**
- ✅ Public: Vede doar promoțiile active
- ✅ Authenticated: CRUD complet pe toate

**Storage:**
- ✅ Public: Poate vedea imaginile
- ✅ Authenticated: Poate upload/delete

### Protecție Login:
- Email/Password cu Supabase Auth
- Session management automat
- Logout securizat

---

## 📱 ROUTING COMPLET:

```javascript
// Public routes
/                    → index.jsx
/autovehicule        → autovehicule.jsx
/informatii-utile    → informatii-utile.jsx
/inscriere           → inscriere.jsx
/promotii            → promotii.jsx

// Protected admin routes
/admin1              → admin1.jsx (Galerie)
/admin2              → admin2.jsx (Promoții)
```

În React Router:

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/index';
import Autovehicule from './pages/autovehicule';
import InformatiiUtile from './pages/informatii-utile';
import Inscriere from './pages/inscriere';
import Promotii from './pages/promotii';
import Admin1 from './pages/admin1';
import Admin2 from './pages/admin2';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/autovehicule" element={<Autovehicule />} />
        <Route path="/informatii-utile" element={<InformatiiUtile />} />
        <Route path="/inscriere" element={<Inscriere />} />
        <Route path="/promotii" element={<Promotii />} />
        <Route path="/admin1" element={<Admin1 />} />
        <Route path="/admin2" element={<Admin2 />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 🚀 DEPLOY:

### Vercel (Recomandat):

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod

# 4. Setează environment variables în Vercel Dashboard:
#    Settings → Environment Variables
#    - REACT_APP_SUPABASE_URL
#    - REACT_APP_SUPABASE_ANON_KEY
```

### Important după deploy:
1. Test toate paginile publice
2. Test login admin (`/admin1` și `/admin2`)
3. Test upload imagine în Admin1
4. Test adăugare promoție în Admin2
5. Verifică că apar pe site

---

## 🎨 ÎNLOCUIEȘTE LOGO-UL:

În toate fișierele `.jsx`, găsește:

```jsx
<div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
  <span className="text-red-600 font-bold text-xl">CD</span>
</div>
```

Înlocuiește cu:

```jsx
<img 
  src="/logo-compact-drive.png" 
  alt="Compact Drive" 
  className="w-12 h-12 object-contain"
/>
```

---

## 📊 FEATURES PREMIUM:

### Pagini Publice:
✅ Design premium negru/alb/roșu
✅ Animații smooth (IntersectionObserver)
✅ Responsive 100%
✅ Loading states
✅ Error handling
✅ Empty states elegante
✅ SEO optimized

### Admin Panels:
✅ Login securizat cu Supabase Auth
✅ Upload imagini cu preview
✅ CRUD complet promoții
✅ Dashboard cu statistici
✅ Activare/Dezactivare instant
✅ Validare formulare
✅ Success/Error messages
✅ Responsive admin UI

---

## 🔧 GESTIONARE CONȚINUT:

### Cum adaug o poză nouă în galerie:
1. Login la `/admin1`
2. Selectează poza
3. Alege categoria (ex: "Categoria B")
4. Setează data (ex: 20.11.2024)
5. Upload → Gata! Apare pe homepage

### Cum adaug o promoție:
1. Login la `/admin2`
2. Click "Promoție nouă"
3. Completează toate câmpurile
4. Bifează "Activă"
5. Salvează → Apare pe `/promotii`

### Cum editez o promoție:
1. Login la `/admin2`
2. Click pe ✏️ Edit la promoția dorită
3. Modifică ce vrei
4. Salvează

### Cum dezactivez o promoție (fără să o șterg):
1. Login la `/admin2`
2. Click pe butonul galben "Dezactivează"
3. Dispare de pe site, dar rămâne în baza de date

---

## 💾 BACKUP & RECOVERY:

### Export date din Supabase:
```sql
-- Export gallery
COPY (SELECT * FROM gallery) TO '/tmp/gallery_backup.csv' CSV HEADER;

-- Export promotions
COPY (SELECT * FROM promotions) TO '/tmp/promotions_backup.csv' CSV HEADER;
```

### Import înapoi:
```sql
-- Import gallery
COPY gallery FROM '/tmp/gallery_backup.csv' CSV HEADER;

-- Import promotions
COPY promotions FROM '/tmp/promotions_backup.csv' CSV HEADER;
```

---

## 🐛 TROUBLESHOOTING:

### "No promotions found" pe pagina promoții:
- Verifică că ai promoții cu `active = true` în DB
- Check în Admin2 dacă sunt promoții active

### Nu pot face upload imagini în Admin1:
- Verifică că bucket-ul `images` există în Supabase Storage
- Verifică că bucket-ul e public
- Check permisiunile RLS

### Nu pot face login în admin:
- Verifică că user-ul există în Authentication
- Verifică că ai confirmat user-ul (Auto Confirm)
- Check email/password corect

### Imaginile nu se încarcă:
- Verifică URL-urile în baza de date
- Check că Supabase Storage e configurat corect
- Verifică că bucket-ul `images` e public

---

## 📞 INFO FINAL:

**Contact Site:**
- Sediu: Pietonal Ștefan cel Mare, Roman 611038
- Telefon: +40 770 935 065
- Email: contact@compact-drive.ro
- Program: L-V: 08:30-18:30, Sâmbătă: 09:00-14:00

**Admin Access:**
- Admin Galerie: `/admin1`
- Admin Promoții: `/admin2`
- Email: `admin@compact-drive.ro`
- Password: (cel setat de tine în Supabase)

---

## ✅ CHECKLIST FINAL:

- [ ] Instalat dependențe (`npm install`)
- [ ] Creat cont Supabase
- [ ] Rulat SQL setup complet
- [ ] Creat bucket Storage `images` (public)
- [ ] Creat user admin în Authentication
- [ ] Configurat `.env` cu credențiale Supabase
- [ ] Testat login admin1
- [ ] Testat login admin2
- [ ] Upload test imagine în galerie
- [ ] Adăugat promoție test
- [ ] Verificat că apar pe site public
- [ ] Deploy pe Vercel/Netlify
- [ ] Înlocuit logo placeholder cu logo real

---

**SITE-UL E 100% GATA CU ADMIN PANELS! 🎉🔥**

- 5 pagini publice premium
- 2 pagini admin complete
- Database Supabase configurată
- Storage pentru imagini
- Autentificare securizată
- CRUD complet pe tot

**READY TO LAUNCH! 🚀**

**MULT SUCCES CU COMPACT DRIVE! 🚗💨**
