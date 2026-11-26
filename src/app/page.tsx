"use client";

import { useEffect, useState } from "react";
import CoverOverlay from "@/components/wedding/CoverOverlay";
import OpeningVideo from "@/components/wedding/OpeningVideo";
import CountdownSection from "@/components/wedding/CountdownSection";
import GallerySection from "@/components/wedding/GallerySection";
import GiftSection from "@/components/wedding/GiftSection";
import RsvpSection from "@/components/wedding/RsvpSection";
import GuestManager from "@/components/wedding/GuestManager";
import MusicPlayer from "@/components/wedding/MusicPlayer";
import Reveal from "@/components/wedding/Reveal";
import { MEDIA } from "@/components/wedding/media";

export default function WeddingInvitation() {
  const [opened, setOpened] = useState(false);

  // ?manage → halaman admin kelola tamu (bukan undangan).
  const [isManage, setIsManage] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsManage(new URLSearchParams(window.location.search).has("manage"));
  }, []);

  // Mulai selalu dari atas halaman & matikan scroll restoration browser
  useEffect(() => {
    if (isManage) return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [isManage]);

  // Setelah Open diklik, pastikan mulai dari slide 2 (paling atas)
  useEffect(() => {
    if (opened) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [opened]);

  // Kunci scroll selama cover (slide 1) tampil, buka setelah Open diklik.
  // Di halaman /?manage scroll dibiarin normal (biar list tamu bisa discroll).
  useEffect(() => {
    if (isManage) return;
    document.documentElement.style.overflow = opened ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [opened, isManage]);

  // Halaman admin — kelola daftar tamu via /?manage
  if (isManage) {
    return <GuestManager />;
  }

  return (
    <div className="relative min-h-screen bg-[#39575e]">
      {/* Latar belakang dekoratif untuk area di luar kolom undangan (desktop) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 opacity-40"
        style={{
          backgroundImage: `url(${MEDIA.artBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Slide 1 — Cover video (hilang permanen setelah Open diklik) */}
      {!opened && <CoverOverlay onOpen={() => setOpened(true)} />}

      {/* Lagu latar — otomatis diputar saat slide 2 tampil, dengan tombol musik melayang */}
      <MusicPlayer active={opened} />

      {/* Konten undangan — slide 2 sampai 9, discroll smooth ke bawah */}
      <main
        aria-hidden={!opened}
        className="relative mx-auto w-full max-w-[430px] bg-[#f1f1ee] shadow-[0_0_60px_rgba(0,0,0,0.35)]"
      >
        {/* Slide 2 — Video pembuka (berhenti di detik akhir, tidak loop) */}
        <OpeningVideo active={opened} />

        {/* Slide 3 — Kutipan QS. Ar-Rum: 21 */}
        <section
          id="slide-3"
          className="w-full bg-[#39575e]"
          aria-label="Kutipan QS Ar-Rum ayat 21"
        >
          <Reveal>
            <img
              src={MEDIA.slide3}
              alt="Kutipan QS. Ar-Rum ayat 21 tentang tanda kebesaran Allah menciptakan pasangan"
              className="block w-full"
              loading="lazy"
            />
          </Reveal>
        </section>

        {/* Slide 4 — Mempelai: Hengky & Sindi */}
        <section
          id="slide-4"
          className="w-full bg-[#eceee3]"
          aria-label="Mempelai Hengky dan Sindi"
        >
          <Reveal>
            <img
              src={MEDIA.slide4}
              alt="Profil mempelai Hengky & Sindi"
              className="block w-full"
              loading="lazy"
            />
          </Reveal>
        </section>

        {/* Slide 5 — Ngunduh Mantu, lokasi & countdown Save The Date */}
        <CountdownSection />

        {/* Slide 6 — Our Gallery */}
        <GallerySection />

        {/* Slide 7 — Gift Pernikahan (Amplop Digital) */}
        <GiftSection />

        {/* Slide 8 — RSVP & Ucapan */}
        <RsvpSection />

        {/* Slide 9 — Penutup */}
        <section
          id="slide-9"
          className="w-full bg-[#eceee3]"
          aria-label="Penutup undangan"
        >
          <Reveal>
            <img
              src={MEDIA.slide10}
              alt="Penutup undangan — ucapan terima kasih dari Hengky & Sindi"
              className="block w-full"
              loading="lazy"
            />
          </Reveal>
        </section>
      </main>
    </div>
  );
}
