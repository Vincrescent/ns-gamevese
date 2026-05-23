# NS GameVerse 🎮

Aplikasi web daftar game online seperti Steam/Epic Games, dibangun dengan **React + Vite + Tailwind CSS** dan data dari **RAWG.io API**.

## 🚀 Cara Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev

# 3. Build untuk production
npm run build
```

## ✅ Fitur

### React Logic & State Management (useState, useEffect, Conditional Rendering)
- `useState` → theme toggle (dark/light), wishlist, loading state, search query, filter params, lightbox index, banner slide index
- `useEffect` → fetch data dari API saat komponen mount dan saat params berubah, auto-rotate banner setiap 6 detik, simpan wishlist ke localStorage
- **Conditional Rendering** → tampilkan skeleton loading saat data dimuat, empty state saat wishlist kosong / tidak ada hasil, error state, lightbox screenshot

### Data Integration dengan Axios
- Mengambil data dari **RAWG.io Public API** (https://api.rawg.io)
- Menampilkan **loading indicator** (skeleton card + spinner) saat data diambil
- Fetch minimal **10+ item** di setiap section (20 per halaman di Browse)
- Hook kustom `useGames` untuk fetching dengan pagination

### Fitur Tambahan (Steam-like)
- 🎨 **Dark / Light Theme Toggle** - simpan preferensi di localStorage
- ❤️ **Wishlist** - tambah/hapus game, simpan ke localStorage
- 🔍 **Search** - cari game berdasarkan judul
- 🔃 **Sort By** - urutkan berdasarkan rating, popularitas, tanggal rilis, dll
- 🎯 **Filter** - filter berdasarkan genre dan platform
- 🖼️ **Hero Banner** - slider otomatis game unggulan (Steam-style)
- 📸 **Lightbox Screenshot** - lihat screenshot dalam tampilan fullscreen
- 📄 **Detail Page** - info lengkap game, rating breakdown, platform, tag
- 📱 **Responsive** - mobile-friendly dengan hamburger menu

## 🗂️ Struktur Project

```
src/
├── components/
│   ├── Navbar.jsx          # Navigasi + search + theme toggle
│   ├── HeroBanner.jsx      # Steam-like hero slider
│   ├── GameCard.jsx        # Kartu game dengan wishlist button
│   ├── SortFilterBar.jsx   # Sort + filter controls
│   ├── Footer.jsx
│   └── SkeletonCard.jsx    # Loading placeholders
├── context/
│   ├── ThemeContext.jsx    # Dark/light mode state
│   └── WishlistContext.jsx # Wishlist state global
├── hooks/
│   └── useGames.js        # Custom hook untuk fetch games
├── pages/
│   ├── HomePage.jsx        # Home dengan hero + section per kategori
│   ├── BrowsePage.jsx      # Browse dengan search/sort/filter/pagination
│   ├── GameDetailPage.jsx  # Detail game + screenshots + info
│   └── WishlistPage.jsx    # Daftar wishlist
└── utils/
    └── api.js             # Axios instance + fungsi API
```

## 🔑 API

Menggunakan [RAWG.io API](https://rawg.io/apidocs)

Endpoint yang digunakan:
- `GET /games` - daftar game (dengan berbagai filter/sort)
- `GET /games/{slug}` - detail game
- `GET /games/{slug}/screenshots` - screenshot game

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - build tool
- **Tailwind CSS 3** - styling
- **React Router v6** - routing
- **Axios** - HTTP client
- **Lucide React** - icons
- **RAWG.io API** - data game
