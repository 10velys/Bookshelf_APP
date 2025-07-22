# 📚 Bookshelf App

Bookshelf App adalah aplikasi web sederhana yang memungkinkan pengguna untuk **menambahkan**, **mengelola**, **mencari**, dan **menghapus** buku dari rak buku digital. Buku dapat dikategorikan sebagai **"Selesai dibaca"** atau **"Belum selesai dibaca"**, serta disimpan secara lokal menggunakan **localStorage** pada browser.

## ✨ Fitur Utama

- ✅ Menambahkan buku baru (judul, penulis, tahun, status selesai dibaca)
- 🔄 Memindahkan buku antar rak: dari selesai ke belum, atau sebaliknya
- 🔍 Mencari buku berdasarkan judul
- 📝 Mengedit data buku
- ❌ Menghapus buku dari rak
- 💾 Menyimpan data buku di `localStorage` (bertahan meskipun halaman di-reload)

## 🛠 Teknologi yang Digunakan

- HTML5
- CSS3 (responsive design)
- JavaScript (DOM manipulation, event handling, localStorage)

## 📁 Struktur File

```

📦 Bookshelf-App
├── index.html         # Struktur halaman utama
├── style.css          # Tampilan dan layout halaman
└── main.js            # Logika utama aplikasi

````

## 🚀 Cara Menjalankan

1. Clone atau download repository ini.
2. Buka file `index.html` menggunakan browser modern (seperti Chrome, Firefox, Edge).
3. Aplikasi siap digunakan tanpa backend/server tambahan.

## 📸 Tampilan Aplikasi

Beberapa fitur antarmuka pengguna:
- Form tambah buku baru
- Form pencarian buku berdasarkan judul
- Dua rak buku: 
  - **Belum selesai dibaca**
  - **Selesai dibaca**
- Tombol aksi di tiap buku: 
  - Edit Buku
  - Hapus Buku
  - Pindahkan Rak

## ⚙️ Catatan Teknis

- Data buku disimpan dalam array objek di `localStorage` dengan struktur:
  ```javascript
  {
    id: <number>,
    title: <string>,
    author: <string>,
    year: <number>,
    isComplete: <boolean>
  }
````

* ID buku dihasilkan menggunakan timestamp: `Number(new Date())`.
* Data diperbarui secara langsung di DOM dan `localStorage` saat user berinteraksi.
