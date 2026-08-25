import { useEffect, useRef, useState } from "react";
import { Cookie } from "lucide-react";

type Lang = "es" | "en" | "fr";
type Prefs = { analytics: boolean; marketing: boolean };

const STORAGE_KEY = "ch-cookie-consent";

const copy: Record<Lang, {
  msg: string; accept: string; reject: string; policy: string; reopen: string;
}> = {
  es: {
    msg: "Usamos cookies para mejorar tu experiencia.",
    accept: "Aceptar", reject: "Rechazar", policy: "Más info", reopen: "Preferencias de cookies",
  },
  en: {
    msg: "We use cookies to improve your experience.",
    accept: "Accept", reject: "Decline", policy: "More info", reopen: "Cookie preferences",
  },
  fr: {
    msg: "Nous utilisons des cookies pour améliorer votre expérience.",
    accept: "Accepter", reject: "Refuser", policy: "Plus d'infos", reopen: "Préférences cookies",
  },
};

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [decided, setDecided] = useState(true);
  const [lang, setLang] = useState<Lang>("es");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && ["es", "en", "fr"].includes(saved)) setLang(saved);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setDecided(true);
      return;
    }
    setDecided(false);
    timer.current = window.setTimeout(() => setOpen(true), 800);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const persist = (p: Prefs) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...p, necessary: true, date: new Date().toISOString() }),
    );
    setOpen(false);
    window.setTimeout(() => setDecided(true), 400);
  };

  const t = copy[lang];

  const reopen = () => {
    setDecided(false);
    window.setTimeout(() => setOpen(true), 30);
  };

  if (decided) {
    return (
      <button
        onClick={reopen}
        aria-label={t.reopen}
        title={t.reopen}
        className="fixed bottom-5 left-5 z-40 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md transition hover:scale-110"
      >
        <Cookie className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-live="polite"
      aria-label="cookie consent"
    >
      <div
        className="absolute inset-0 bg-[#2b2620]/25 backdrop-blur-sm"
        onClick={() => persist({ analytics: false, marketing: false })}
      />

      <div
        className={`relative w-full max-w-sm transition-transform duration-300 ${
          open ? "scale-100" : "scale-95"
        }`}
      >
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/25 bg-white/10 px-6 py-7 text-center shadow-[0_8px_40px_-12px_rgba(43,38,32,0.45)] backdrop-blur-2xl">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white">
            <Cookie className="h-4 w-4" />
          </span>

          <p className="text-[13px] leading-relaxed text-white/90">{t.msg}</p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => persist({ analytics: true, marketing: true })}
              className="rounded-full bg-white px-6 py-2 text-[13px] font-medium text-[#2b2620] transition hover:bg-white/90"
            >
              {t.accept}
            </button>
            <button
              onClick={() => persist({ analytics: false, marketing: false })}
              className="rounded-full border border-white/30 px-5 py-2 text-[13px] text-white/90 transition hover:bg-white/10"
            >
              {t.reject}
            </button>
          </div>

          <a
            href="/politique-confidentialite"
            className="text-[11px] text-white/60 underline-offset-2 transition hover:text-white hover:underline"
          >
            {t.policy}
          </a>
        </div>
      </div>
    </div>
  );
}
