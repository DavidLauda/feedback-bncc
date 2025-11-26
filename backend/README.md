# BNCC Feedback System - Backend API

Ini adalah layanan Backend untuk sistem feedback event internal BNCC. Dibangun menggunakan **Express.js** dan menggunakan **File System (JSON)** sebagai database sederhana untuk persistensi data.

## 📋 Prasyarat (Prerequisites)

Pastikan di komputer Anda sudah terinstall:

- [Node.js](https://nodejs.org/) (versi LTS disarankan)

## 🚀 Cara Menjalankan (Run Locally)

Pastikan terminal Anda sudah berada di dalam folder `backend` sebelum menjalankan perintah berikut:

### 1. Install Dependencies

Download semua library yang dibutuhkan (Express, CORS, Body-Parser, UUID):

```bash
npm install
```

### 2. Jalankan Server

Nyalakan server backend:

```bash
node index.js
```

Jika berhasil, terminal akan menampilkan:

> Server running on http://localhost:3000
> Data will be stored in 'feedbacks.json'

_(Catatan: File `feedbacks.json` akan otomatis dibuat oleh sistem saat server dijalankan pertama kali)._

---

## API Documentation

Berikut adalah daftar endpoint yang dapat digunakan oleh Frontend Developer:

### 1. Get All Feedbacks (READ)

Mengambil daftar semua feedback. Mendukung filter sederhana.

- **URL:** `/api/feedback`
- **Method:** `GET`
- **Query Params (Opsional):**
  - `status`: Filter status (`open`, `in-review`, `resolved`)
  - `eventName`: Cari berdasarkan nama event
- **Contoh:** `http://localhost:3000/api/feedback?status=open`

### 2. Submit Feedback (CREATE)

Menambahkan data feedback baru dari form publik.

- **URL:** `/api/feedback`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Body Example:**

```json
{
  "name": "Budi Santoso",
  "email": "budi@binus.ac.id",
  "eventName": "React Workshop",
  "division": "RnD",
  "rating": 5,
  "comment": "Materi sangat bagus!",
  "suggestion": "Perbanyak live coding"
}
```

### 3. Update Feedback (UPDATE)

Mengubah data (misal: update status oleh Admin).

- **URL:** `/api/feedback/:id`
- **Method:** `PUT`
- **Body Example:** (Kirim field yang mau diubah saja)

```json
{
  "status": "in-review",
  "eventName": "React Workshop (Updated)"
}
```

### 4. Delete Feedback (DELETE)

Menghapus satu data feedback.

- **URL:** `/api/feedback/:id`
- **Method:** `DELETE`

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** JSON File (via `fs` module)
