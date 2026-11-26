"use client";

import { useEffect, useRef, useState } from "react";
import { MailOpen } from "lucide-react";
import { MEDIA } from "./media";

interface CoverOverlayProps {
  onOpen: () => void;
}

export default function CoverOverlay({ onOpen }: CoverOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [leaving, setLeaving] = useState(false);
  const [ready, setReady] = useState(false);

  // Nama tamu — di-resolve dari URL ?to=<code|nama>:
  //   • ?to=budi      → lookup DB → "Budi Santoso" (jika code terdaftar)
  //   • ?to=Budi+Sapo → tidak terdaftar → tampil "Budi Sapo" literal
  //   • (tanpa ?to=)  → fallback "Tamu Undangan"
  const [guestName, setGuestName] = useState("Tamu Undangan");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("to");
    if (!raw) return;
    const decoded = decodeURIComponent(raw.replace(/\+/g, " ")).trim();
    if (!decoded) return;

    // Cek di database dulu — kalau code terdaftar, pakai nama lengkapnya.
    fetch(`/api/guests/lookup?code=${encodeURIComponent(decoded)}`)
      .then((r) => r.json())
      .then((data) => {
        setGuestName(data?.name ?? decoded);
      })
      .catch(() => {
        setGuestName(decoded);
      });
  }, []);

  // Tombol Open muncul halus sesaat setelah cover tampil,
  // dan tetap tampil walau video gagal dimuat agar tamu tidak terjebak di cover.
  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    if (leaving) return;
    setLeaving(true);
    // Tunggu animasi fade-out selesai lalu unmount (slide 1 tidak muncul lagi)
    window.setTimeout(onOpen, 750);
  };

  return (
    <div
      aria-hidden={leaving}
      className={`fixed inset-0 z-[60] bg-[#eceee3] transition-opacity duration-700 ease-out ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-label="Undangan pernikahan Hengky & Sindi"
    >
      {/* Kolom undangan (mirroring layout konten) */}
      <div className="absolute inset-0 mx-auto w-full max-w-[430px]">
        {/* Kotak video dengan rasio asli 964:1772 — menjaga posisi nama mempelai
            pada video selalu konsisten di semua ukuran layar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative aspect-[964/1772] h-full max-w-full">
            {/* Fallback bila video slide 1 belum diupload di /public/media —
                video ditumpuk di atasnya, sehingga bila video gagal dimuat
                wallpaper tetap tampil tanpa perlu JavaScript */}
            <img
              src={MEDIA.giftWallpaper}
              alt="Wallpaper Vintage Peacock"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <video
              ref={videoRef}
              src={MEDIA.coverVideo}
              autoPlay
              muted
              playsInline
              preload="auto"
              onError={() => setReady(true)}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Tombol Open kecil — tepat di bawah nama mempelai pada video
                (teks nama mempelai berakhir di ~67% tinggi video) */}
            <div
              className={`absolute inset-x-0 top-[69%] z-10 flex justify-center transition-opacity duration-700 ${
                ready && !leaving ? "opacity-100" : "opacity-0"
              }`}
            >
              <button
                type="button"
                onClick={handleOpen}
                className="animate-soft-pulse-ring group flex items-center gap-1.5 rounded-full bg-[#39575e] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-lg ring-1 ring-white/40 transition-all duration-300 hover:scale-105 hover:bg-[#2e4a51] active:scale-95"
              >
                <MailOpen
                  className="size-3.5 transition-transform duration-300 group-hover:-rotate-6"
                  aria-hidden="true"
                />
                Open
              </button>
            </div>

            {/* Blok nama tamu — murni tipografi elegan tanpa kartu berwarna.
                Legibility dijaga pakai glow krem lembut (match wallpaper),
                bukan kotak solid. */}
            <div
              className={`absolute inset-x-0 top-[75.5%] z-10 flex justify-center px-8 transition-all duration-700 ${
                ready && !leaving
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
            >
              <div className="flex max-w-full flex-col items-center text-center">
                <div className="flex items-center gap-2.5" aria-hidden="true">
                  <span className="h-px w-8 bg-[#39575e]/45" />
                  <span className="size-[5px] rotate-45 bg-[#39575e]/60" />
                  <p className="font-display text-[8.5px] uppercase tracking-[0.32em] text-[#39575e] [text-shadow:0_0_10px_rgba(244,241,234,0.95)]">
                    Kepada Yth.
                  </p>
                  <span className="size-[5px] rotate-45 bg-[#39575e]/60" />
                  <span className="h-px w-8 bg-[#39575e]/45" />
                </div>
                <p className="mt-1.5 font-display text-[9.5px] uppercase tracking-[0.2em] text-[#39575e]/80 [text-shadow:0_0_10px_rgba(244,241,234,0.95)]">
                  Bapak/Ibu/Saudara/i
                </p>
                <p className="mt-1.5 font-script text-[27px] leading-tight text-[#39575e] [text-shadow:0_0_14px_rgba(244,241,234,1),0_1px_12px_rgba(244,241,234,0.9)]">
                  {guestName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
