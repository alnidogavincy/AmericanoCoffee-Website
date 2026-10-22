# Americano Coffee

Website portofolio satu halaman berdasarkan video referensi dan aset dari `cup_coffee_co_made_fresh_for_you.html`. Dibangun dengan Vite, JavaScript, GSAP/ScrollTrigger, dan Tailwind CSS yang dikompilasi saat build.

## Menjalankan

Gunakan Node.js 20.19+ atau 22.12+.

```sh
npm install
npm run dev
```

Buka alamat lokal yang dicetak Vite, biasanya `http://127.0.0.1:5173`.

```sh
npm run build
npm run preview
```

Hasil produksi tersedia di `dist/`. Jalankan melalui server HTTP; jangan membuka `index.html` langsung dengan `file://`.

## Pengalaman

- Intro cangkir sekitar tiga detik; bisa dilewati dengan tombol, klik cangkir, atau Escape. Tombol Intro pada desktop memutar ulang.
- Lima minuman: Americano, Latte, Mocha, Matcha, Caramel. Gunakan panah, indikator, keyboard kiri/kanan, atau swipe horizontal. Carousel menunggu transisi selesai sebelum menerima perpindahan berikutnya.
- Scroll vertikal menghubungkan menu, cerita petani, ajakan memesan, dan mural. Gerakan mengikuti progres scroll dan dapat diputar balik dengan scroll ke atas.
- Bahan minuman dapat dibuka untuk melihat detailnya.
- Keranjang menyimpan pilihan di `localStorage` dengan key `americano-coffee-cart-v1`. Pilihan susu/es berlaku pada produk yang ditambahkan setelah pilihan diubah. Jumlah dibatasi 99 per kombinasi produk.
- Checkout adalah simulasi. Tidak ada pembayaran, API pemesanan, backend, atau pesanan yang dikirim.
- Layout menyesuaikan desktop, tablet, dan ponsel. `prefers-reduced-motion` melewati intro dan menonaktifkan gerakan. Drawer mengunci fokus, mendukung Escape, dan mengembalikan fokus ke tombol pembuka.

## Struktur

| Lokasi | Isi |
| --- | --- |
| `index.html` | Struktur halaman, SVG cangkir, dedaunan, garis, dan drawer |
| `src/main.js` | Timeline GSAP, scroll, navigasi, carousel, serta keranjang |
| `src/drinks.js` | Produk, harga, bahan, palet, dan jalur garis carousel |
| `src/icons.js` | Ikon bahan minuman |
| `src/base.css` | Tailwind dan gaya dasar dari referensi |
| `src/style.css` | Komposisi final, responsivitas, dan aksesibilitas |
| `public/assets/` | Gambar lokal yang diekstrak dari HTML pengguna |

Font Anton, Inter, dan Caveat dibundel dari paket Fontsource. Halaman tidak memerlukan CDN font atau Tailwind saat dijalankan.

## Acuan dan batas kemiripan

Video menjadi acuan komposisi dan urutan animasi: intro → Americano → Latte → Mocha → cerita → ajakan memesan → mural. Pergantian minuman mengikuti input pengunjung, bukan autoplay berdasarkan waktu video. Dua minuman lain mengikuti dataset HTML.

Gambar tangan/gelas, petani, dan mural berasal dari HTML yang disertakan. Detail gambar tersebut berbeda dari video; identitas diganti menjadi Americano Coffee. Dedaunan dan cangkir intro menggunakan SVG. Karena video menampilkan layar laptop dari sudut miring, hasil merupakan rekonstruksi, bukan salinan piksel identik atau aset asli desain video.

## Pemeriksaan

Build: `npm run build`.

Untuk pemeriksaan browser, uji intro normal dan skip; kelima produk dan wraparound; klik cepat; panah keyboard dan swipe; buka/tutup bahan; tambah, ubah jumlah, hapus, dan reload keranjang; checkout kosong dan simulasi; fokus drawer; scroll maju/mundur; serta reduced motion. Periksa pada lebar 320, 390, 820, dan 1440 piksel, termasuk tidak adanya overflow horizontal dan error console.

Tidak ada konfigurasi publikasi hosting. Proyek disiapkan untuk penggunaan lokal sesuai permintaan.
