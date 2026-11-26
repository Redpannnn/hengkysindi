"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { MEDIA, WEDDING_DATE_ISO } from "./media";
import Reveal from "./Reveal";

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  passed: boolean;
}

function getRemaining(targetMs: number): Remaining {
  const diff = Math.max(0, targetMs - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
    passed: diff <= 0,
  };
}

const INITIAL: Remaining = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  passed: false,
};

/*
 * Posisi kotak countdown diukur langsung dari gambar HENGSIN SLIDE 5 (965x1135):
 *   vertikal : 85.374% - 94.802%
 *   kotak 1  : left 28.083%  width 8.186%
 *   kotak 2  : left 40.000%  width 8.083%
 *   kotak 3  : left 51.813%  width 8.187%
 *   kotak 4  : left 63.731%  width 8.186%
 * Label Hari/Jam/Menit/Detik sudah tercetak di gambar (bagian bawah kotak),
 * sehingga angka countdown ditempatkan di 60% bagian atas tiap kotak.
 */
const BOXES = [
  { label: "Hari", left: 28.083, width: 8.186 },
  { label: "Jam", left: 40.0, width: 8.083 },
  { label: "Menit", left: 51.813, width: 8.187 },
  { label: "Detik", left: 63.731, width: 8.186 },
];

export default function CountdownSection() {
  const targetMs = useMemo(() => new Date(WEDDING_DATE_ISO).getTime(), []);
  // Mulai dari 0 agar SSR & client render identik (bebas hydration mismatch)
  const [time, setTime] = useState<Remaining>(INITIAL);

  useEffect(() => {
    const update = () => setTime(getRemaining(targetMs));
    // Update pertama lewat rAF (bukan sinkron di body effect) + interval tiap detik
    const raf = requestAnimationFrame(update);
    const timer = setInterval(update, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(timer);
    };
  }, [targetMs]);

  const values = [time.days, time.hours, time.minutes, time.seconds];

  return (
    <section
      id="slide-5"
      className="relative w-full bg-[#39575e]"
      aria-label="Ngunduh mantu, lokasi, dan save the date"
    >
      <div className="relative w-full">
        {/* Gambar berisi Ngunduh Mantu, alamat, dan kotak Save The Date */}
        <img
          src={MEDIA.slide5}
          alt="Ngunduh Mantu — Senin, 21 Desember 2026, Pukul 09.00 s.d. selesai, Bertempat di Desa Purwosari Kec. Batang Hari Nuban, Lampung Timur"
          className="block w-full"
          loading="lazy"
        />

        {/* Angka countdown yang pas di atas kotak kosong pada gambar */}
        <Reveal className="absolute inset-0">
          {BOXES.map((box, i) => (
            <div
              key={box.label}
              aria-label={`${values[i]} ${box.label}`}
              className="absolute"
              style={{
                left: `${box.left}%`,
                width: `${box.width}%`,
                top: "85.374%",
                height: "9.428%",
              }}
            >
              {/* Angka di 60% bagian atas kotak — label sudah tercetak di gambar */}
              <div className="absolute inset-x-0 top-0 flex h-[60%] items-center justify-center">
                <span className="font-display text-[clamp(15px,4.9vw,21px)] font-semibold leading-none tabular-nums text-white [text-shadow:0_1px_6px_rgba(57,87,94,0.55)]">
                  {String(values[i]).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </Reveal>

        {/* Tombol Google Maps — tepat di bawah alamat pada gambar */}
        <Reveal
          delay={0.15}
          className="absolute inset-x-0 top-[54%] z-10 flex justify-center"
        >
          <a
            href={MEDIA.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buka lokasi acara di Google Maps"
            className="group flex origin-center scale-[0.6] items-center gap-2 rounded-full bg-[#39575e]/90 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_6px_18px_rgba(57,87,94,0.35)] ring-1 ring-white/40 backdrop-blur-sm transition-all duration-300 hover:scale-[0.66] hover:bg-[#2e4a51] active:scale-[0.55]"
          >
            <MapPin
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
            Lihat Lokasi
          </a>
        </Reveal>
      </div>

      {time.passed && (
        <p className="pb-6 pt-3 text-center font-display text-sm italic text-white/85">
          Hari bahagia telah tiba, terima kasih atas doa restunya.
        </p>
      )}
    </section>
  );
}
