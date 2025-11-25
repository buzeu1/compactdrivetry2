# 🚀 QUICK START - COMPACT DRIVE

## TOT CE AI NEVOIE ÎN 5 MINUTE! ⚡

---

## 📦 FIȘIERELE TALE:

### 🌐 Pagini Publice (5):
1. **index.jsx** - Homepage cu galerie
2. **autovehicule.jsx** - Tarife (doar cash, fără card)
3. **informatii-utile.jsx** - Info + FAQ
4. **inscriere.jsx** - Formular (fără serie buletin)
5. **promotii.jsx** - Promoții dinamice

### 🔒 Admin Panels (2):
6. **admin1.jsx** - Gestionare Galerie (upload poze)
7. **admin2.jsx** - Gestionare Promoții (CRUD)

### 📚 Documentație:
- **SETUP-FINAL.md** - Ghid complet (16KB)
- **supabase-setup.sql** - SQL ready to paste (5KB)

---

## ⚡ SETUP ÎN 5 PAȘI:

### 1️⃣ INSTALEAZĂ (1 min)
```bash
npm install lucide-react @supabase/supabase-js
```

### 2️⃣ SUPABASE (2 min)
1. [supabase.com](https://supabase.com) → New Project
2. SQL Editor → Copy/Paste `supabase-setup.sql`
3. Run! ✅

### 3️⃣ STORAGE (30 sec)
1. Storage → New Bucket
2. Name: `images`
3. ✅ Public
4. Create!

### 4️⃣ ADMIN USER (30 sec)
1. Authentication → Add User
2. Email: `admin@compact-drive.ro`
3. Password: `AdminParola123!`
4. ✅ Auto Confirm
5. Create!

### 5️⃣ ENV (1 min)
Creează `.env`:
```env
REACT_APP_SUPABASE_URL=https://xxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGc...
```
(Din Settings → API în Supabase)

---

## 🎯 TEST RAPID:

### Test Public Pages:
- `/` → Homepage ✅
- `/promotii` → Vezi promoțiile sample ✅

### Test Admin:
- `/admin1` → Login cu credențiale
- Upload o poză test ✅
- `/admin2` → Login
- Adaugă o promoție test ✅

---

## 🚀 DEPLOY:

```bash
vercel --prod
```

Sau:
```bash
netlify deploy --prod
```

Setează ENV vars în dashboard!

---

## 🎨 FINALIZARE:

### Înlocuiește Logo:
În toate `.jsx`, găsește:
```jsx
<div className="w-12 h-12 bg-white...">
  <span className="text-red-600">CD</span>
</div>
```

Înlocuiește cu:
```jsx
<img src="/logo.png" alt="Logo" className="w-12 h-12" />
```

---

## 📱 ACCES ADMIN:

- **Galerie**: `your-site.com/admin1`
- **Promoții**: `your-site.com/admin2`
- **Login**: `admin@compact-drive.ro` / parola ta

---

## 🎉 GATA!

Site-ul e LIVE cu:
- ✅ 5 pagini publice premium
- ✅ 2 admin panels complete
- ✅ Culori negru/alb/roșu
- ✅ Supabase backend
- ✅ CRUD complet
- ✅ Upload imagini
- ✅ 100% responsive

**NEED HELP?** → Vezi **SETUP-FINAL.md** pentru detalii complete!

---

**MULT SUCCES! 🚗💨**
