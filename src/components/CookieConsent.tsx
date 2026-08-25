import { useEffect, useRef, useState } from "react";
import { Cookie, Check, Settings2, X } from "lucide-react";

type Lang = "es" | "en" | "fr";
type Prefs = { analytics: boolean; marketing: boolean };

const STORAGE_KEY = "ch-cookie-consent";

const copy: Record<Lang, {
  eyebrow: string; title: string; body: string;
  accept: string; reject: string; customize: string; save: string;
  necessary: string; necessaryDesc: string;
  analytics: string; analyticsDesc: string;
  marketing: string; marketingDesc: string;
  always: string; policy: string; reopen: string;
}> = {
  es: {
    eyebrow: "Un detalle de la casa",
    title: "Cookies, servidas con gusto",
    body: "Usamos cookies para que tu visita fluya y para entender qué proyectos te enamoran. Tú decides qué entra por la puerta.",
    accept: "Aceptar todo", reject: "Solo lo esencial", customize: "Personalizar", save: "Guardar preferencias",
    necessary: "Esenciales", necessaryDesc: "Hacen que el sitio funcione. Siempre activas.",
    analytics: "Analítica", analyticsDesc: "Nos dicen qué secciones gustan más.",
    marketing: "Marketing", marketingDesc: "Contenidos y anuncios más relevantes.",
    always: "Siempre", policy: "Política de privacidad", reopen: "Preferencias de cookies",
  },
  en: {
    eyebrow: "A house detail",
    title: "Cookies, served with taste",
    body: "We use cookies to keep your visit smooth and to learn which projects you love. You decide what comes through the door.",
    accept: "Accept all", reject: "Essentials only", customize: "Customize", save: "Save preferences",
    necessary: "Essential", necessaryDesc: "They make the site work. Always on.",
    analytics: "Analytics", analyticsDesc: "They tell us which sections you enjoy.",
    marketing: "Marketing", marketingDesc: "More relevant content and ads.",
    always: "Always", policy: "Privacy policy", reopen: "Cookie preferences",
  },
  fr: {
    eyebrow: "Un détail de la maison",
    title: "Des cookies, servis avec goût",
    body: "Nous utilisons des cookies pour fluidifier votre visite et comprendre quels projets vous séduisent. C'est vous qui ouvrez la porte.",
    accept: "Tout accepter", reject: "Essentiels uniquement", customize: "Personnaliser", save: "Enregistrer",
    necessary: "Essentiels", necessaryDesc: "Ils font fonctionner le site. Toujours actifs.",
    analytics: "Statistiques", analyticsDesc: "Elles nous disent quelles sections vous plaisent.",
    marketing: "Marketing", marketingDesc: "Des contenus et publicités plus pertinents.",
    always: "Toujours", policy: "Politique de confidentialité", reopen: "Préférences cookies",
  },
};

function Toggle({ on, onChange, disabled }: { on: boolean; onChange?: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange?.(!on)}
      aria-pressed={on}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
        on ? "bg-[#c98a5a]" : "bg-[#2b2620]/20"
      } ${disabled ? "opacity-60" : "hover:opacity-90"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
          on ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [decided, setDecided] = useState(true);
  const [lang, setLang] = useState<Lang>("es");
  const [prefs, setPrefs] = useState<Prefs>({ analytics: true, marketing: false });
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
    timer.current = window.setTimeout(() => setOpen(true), 900);
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
    window.setTimeout(() => setDecided(true), 500);
  };

  const t = copy[lang];

  const reopen = () => {
    setExpanded(true);
    setDecided(false);
    window.setTimeout(() => setOpen(true), 30);
  };

  if (decided) {
    return (
      <button
        onClick={reopen}
        aria-label={t.reopen}
        title={t.reopen}
        className="fixed bottom-5 left-5 z-40 grid h-10 w-10 place-items-center rounded-full border border-[#2b2620]/10 bg-[#f7f1ea]/90 text-[#c98a5a] shadow-lg backdrop-blur transition hover:scale-110 hover:rotate-12"
      >
        <Cookie className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 flex justify-start p-4 sm:p-6 transition-all duration-700 ${
        open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      role="dialog"
      aria-live="polite"
      aria-label={t.title}
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-[#2b2620]/10 bg-[#f7f1ea]/95 shadow-[0_24px_60px_-20px_rgba(43,38,32,0.45)] backdrop-blur-xl">
        {/* petal decor */}
        <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[#c98a5a]/15 blur-2xl" />
        <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-[#8a9a6b]/15 blur-2xl" />
        <div className="h-1 w-full bg-gradient-to-r from-[#c98a5a] via-[#e0b48c] to-transparent" />

        <div className="relative p-6">
          <button
            onClick={() => persist({ analytics: false, marketing: false })}
            aria-label={t.reject}
            className="absolute right-4 top-4 rounded-full p-1.5 text-[#2b2620]/40 transition hover:bg-[#2b2620]/5 hover:text-[#2b2620]"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#c98a5a]/12 text-[#c98a5a]">
              <Cookie className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c98a5a]">
                {t.eyebrow}
              </p>
              <h2 className="font-[family-name:'Playfair_Display'] text-lg font-semibold text-[#2b2620]">
                {t.title}
              </h2>
            </div>
          </div>

          <p className="mt-3 text-[13.5px] leading-relaxed text-[#5c544a]">{t.body}</p>

          <div
            className={`grid transition-all duration-500 ${
              expanded ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="space-y-3 rounded-2xl border border-[#2b2620]/8 bg-white/60 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-[#2b2620]">{t.necessary}</p>
                    <p className="text-xs text-[#5c544a]">{t.necessaryDesc}</p>
                  </div>
                  <span className="mt-1 rounded-full bg-[#8a9a6b]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#6d7d50]">
                    {t.always}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 border-t border-[#2b2620]/8 pt-3">
                  <div>
                    <p className="text-sm font-medium text-[#2b2620]">{t.analytics}</p>
                    <p className="text-xs text-[#5c544a]">{t.analyticsDesc}</p>
                  </div>
                  <Toggle on={prefs.analytics} onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))} />
                </div>
                <div className="flex items-start justify-between gap-4 border-t border-[#2b2620]/8 pt-3">
                  <div>
                    <p className="text-sm font-medium text-[#2b2620]">{t.marketing}</p>
                    <p className="text-xs text-[#5c544a]">{t.marketingDesc}</p>
                  </div>
                  <Toggle on={prefs.marketing} onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {expanded ? (
              <button
                onClick={() => persist(prefs)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#2b2620] px-5 py-2.5 text-sm font-medium text-[#f7f1ea] transition hover:scale-[1.02]"
              >
                <Check className="h-4 w-4" /> {t.save}
              </button>
            ) : (
              <button
                onClick={() => persist({ analytics: true, marketing: true })}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#c98a5a] px-5 py-2.5 text-sm font-medium text-white transition hover:scale-[1.02]"
              >
                <Check className="h-4 w-4" /> {t.accept}
              </button>
            )}
            <button
              onClick={() => persist({ analytics: false, marketing: false })}
              className="rounded-full border border-[#2b2620]/15 px-4 py-2.5 text-sm text-[#2b2620] transition hover:bg-[#2b2620]/5"
            >
              {t.reject}
            </button>
            {!expanded && (
              <button
                onClick={() => setExpanded(true)}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2.5 text-sm text-[#c98a5a] transition hover:underline"
              >
                <Settings2 className="h-4 w-4" /> {t.customize}
              </button>
            )}
          </div>

          <a
            href="/politique-confidentialite"
            className="mt-3 inline-block text-[11px] uppercase tracking-wide text-[#5c544a]/70 underline-offset-2 hover:text-[#c98a5a] hover:underline"
          >
            {t.policy}
          </a>
        </div>
      </div>
    </div>
  );
}
