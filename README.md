# MasakApa

Selamat datang di repo MasakApa
Proyek ini adalah aplikasi berbasis web yang menggunakan AI untuk membantu pengguna mencari resep makanan berdasarkan bahan yang dimilikidengan lebih optimal dan efektif.

## Persyaratan
- Node.js V16 atau lebih baru
- NPM

## Langkah Instalasi

1. **Clone repository ini**:
   ```bash
   git clone https://github.com/ninggen-ux/masak-apa.git
   cd masak-apa
2. **Instral depedensi untuk Frontend**:
   ```bash
   cd frontend
   npm install
3. **Instral depedensi untuk Backend**:
   ```bash
   cd ../backend
   npm install
4. **Konigurasi Enviroment**:
    Hubungi kami

## Struktur Proyek
    masak-apa/
    ├── api-contract/          # Dokumentasi API menggunakan Swagger
    │   ├── frontend-backend/  # Kontrak API antara frontend dan backend
    │   └── backend-ml/        # Kontrak API untuk backend machine learning
    ├── backend/               # Kode sumber backend
    │   ├── src/
    │   └── .env
    ├── frontend/              # Kode sumber frontend
    │   ├── src/
    │   └── public/
    └── README.md              # Dokumentasi proyek

## Cara Menjalankan
Menjalankan Backend
1. **Masuk ke folder backend**:
   ```bash
   cd backend
2. **Jalankan server**:
   ```bash
   npm start
Menjalankan Frontend
1. **Masuk ke folder frontend**:
   ```bash
   cd frontend
2. **Jalankan aplikasi**:
   ```bash
   npm run dev