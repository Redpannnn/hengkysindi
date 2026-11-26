// Media & data konstanta untuk undangan pernikahan Hengky & Sindi
// Tema: Vintage Peacock
// Semua aset (gambar & video) bersumber LOKAL dari folder /public
// agar tidak bergantung pada hosting eksternal.

export const MEDIA = {
  // Slide 1 — video cover (tampil sebelum tombol Open diklik)
  // Upload file ke /public/media/SLIDE 1.mp4
  coverVideo: "/media/SLIDE 1.mp4",
  // Slide 2 — video pembuka (ditampilkan setelah undangan dibuka)
  // Upload file ke /public/media/SLIDE 2.mp4
  openingVideo: "/media/SLIDE 2.mp4",
  // Slide Gift — background wallpaper (video slide 2, diputar ulang tanpa suara)
  giftVideo: "/media/SLIDE 2.mp4",
  // Poster/fallback bila video belum diupload (tekstur floral Vintage Peacock)
  giftPoster: "/poster-slide2.jpg",
  // Slide 3 — kutipan QS. Ar-Rum: 21
  slide3: "/images/slide3.jpg",
  // Slide 4 — profil mempelai
  slide4: "/images/slide4.jpg",
  // Slide 5 — Ngunduh Mantu & Save The Date (kotak countdown diisi overlay)
  slide5: "/images/slide5.jpg",
  // Slide 9 — penutup / terima kasih
  slide10: "/images/slide10.jpg",
  // Slide Gift & RSVP — wallpaper Vintage Peacock
  giftWallpaper: "/images/wallpaper.jpg",
  // Tombol lokasi (Google Maps) pada slide 5
  mapsUrl: "https://maps.app.goo.gl/WPZeMAkykexdaVWE6",
  // Latar dekoratif di luar kolom undangan (desktop)
  artBg: "/images/art-bg.webp",
} as const;

// Slide Gift — data amplop digital
export const GIFT = {
  bank: "Dana",
  accountNumber: "085709298968",
  accountName: "Hengky Kurniawan",
} as const;

// Slide 6 — Our Gallery (klik thumbnail untuk menampilkan di preview besar)
export const GALLERY_IMAGES = [
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-4.jpg",
] as const;

// Ngunduh Mantu: Senin, 21 Desember 2026 Pukul 09.00 WIB (sesuai gambar slide 5)
export const WEDDING_DATE_ISO = "2026-12-21T09:00:00+07:00";

export const BRAND_COLOR = "#39575e";
