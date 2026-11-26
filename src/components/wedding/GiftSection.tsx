"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Gift, Wallet } from "lucide-react";
import { toast } from "sonner";
import { GIFT, MEDIA } from "./media";
import Reveal from "./Reveal";

/*
 * Slide 7 — Gift Pernikahan (Amplop Digital)
 * Background: video slide 2 (sumber lokal /media/slide-2.mp4) yang diputar ulang
 * tanpa suara. Covercard berbentuk capsule memanjang ke atas ke bawah dengan
 * wallpaper Vintage Peacock, berisi tombol "Hadiah" yang membuka kartu e-wallet.
 */
export default function GiftSection() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyNumber = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(GIFT.accountNumber);
      } else {
        throw new Error("Clipboard API tidak tersedia");
      }
      setCopied(true);
      toast.success(`Nomor ${GIFT.bank} berhasil disalin`);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback untuk browser/iframe yang memblokir Clipboard API
      try {
        const ta = document.createElement("textarea");
        ta.value = GIFT.accountNumber;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        if (!ok) throw new Error("execCommand gagal");
        setCopied(true);
        toast.success(`Nomor ${GIFT.bank} berhasil disalin`);
        window.setTimeout(() => setCopied(false), 2200);
      } catch {
        toast.info(`Salin manual: ${GIFT.bank} ${GIFT.accountNumber}`);
      }
    }
  };

  return (
    <section
      id="slide-7"
      className="relative w-full overflow-hidden bg-[#39575e] px-6 py-14"
      aria-label="Gift pernikahan — amplop digital"
    >
      {/* Lapisan fallback: tekstur floral (tampil bila video belum diupload) */}
      <img
        src={MEDIA.giftPoster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />

      {/* Background video slide 2 — diputar ulang tanpa suara */}
      <video
        src={MEDIA.giftVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Lapisan gelap agar konten terbaca */}
      <div className="absolute inset-0 bg-[#39575e]/55" aria-hidden="true" />

      <div className="relative">
        <Reveal>
          <h2 className="text-center font-display text-[32px] font-semibold text-white">
            Gift Pernikahan
          </h2>
          <div
            className="mx-auto mt-3 h-px w-24 bg-white/50"
            aria-hidden="true"
          />
        </Reveal>

        {/* Covercard capsule memanjang ke atas ke bawah */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-8 w-full max-w-[300px] overflow-hidden rounded-full shadow-[0_18px_50px_rgba(0,0,0,0.4)] ring-1 ring-white/70">
            {/* Wallpaper Vintage Peacock */}
            <img
              src={MEDIA.giftWallpaper}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0 bg-white/40"
              aria-hidden="true"
            />

            <div className="relative flex flex-col items-center gap-4 px-8 pb-16 pt-16 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-[#39575e]/10 ring-1 ring-[#39575e]/25">
                <Gift className="size-5 text-[#39575e]" aria-hidden="true" />
              </span>

              <h3 className="font-display text-[27px] font-semibold text-[#39575e]">
                Amplop Digital
              </h3>

              <p className="text-[13px] leading-relaxed text-[#4b5e62]">
                Doa restu anda merupakan karunia yang sangat berarti bagi kami,
                dan jika memberi adalah tanda kasih, anda dapat memberikan
                kado secara online.
              </p>

              {/* Tombol hadiah — membuka kartu e-wallet DANA */}
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="gift-ewallet"
                className={`mt-1 flex items-center gap-2 rounded-full bg-[#39575e] px-7 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-md ring-1 ring-white/30 transition-all duration-300 hover:scale-105 hover:bg-[#2e4a51] active:scale-95 ${
                  open ? "" : "animate-soft-pulse-ring"
                }`}
              >
                <Gift className="size-4" aria-hidden="true" />
                {open ? "Tutup" : "Hadiah"}
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id="gift-ewallet"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full overflow-hidden"
                  >
                    <div className="mt-2 rounded-3xl bg-white/85 p-4 shadow-sm ring-1 ring-[#39575e]/15 backdrop-blur-sm">
                      <div className="flex items-center justify-center gap-2">
                        <Wallet
                          className="size-4 text-[#39575e]"
                          aria-hidden="true"
                        />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#39575e]">
                          E-Wallet {GIFT.bank}
                        </span>
                      </div>
                      <p className="mt-2.5 font-display text-[21px] font-semibold tabular-nums tracking-[0.04em] text-[#31474c]">
                        {GIFT.accountNumber}
                      </p>
                      <p className="mt-1 text-[12.5px] text-[#4b5e62]">
                        a.n {GIFT.accountName}
                      </p>
                      <button
                        type="button"
                        onClick={copyNumber}
                        className="mt-3.5 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#39575e] text-[12.5px] font-semibold tracking-wide text-white shadow-md transition-all duration-300 hover:bg-[#2e4a51] hover:shadow-lg active:scale-[0.98]"
                      >
                        {copied ? (
                            <>
                              <Gift className="size-4" aria-hidden="true" />
                              Disalin!
                            </>
                          ) : (
                            <>
                              <Copy className="size-4" aria-hidden="true" />
                              Salin Nomor
                            </>
                          )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
