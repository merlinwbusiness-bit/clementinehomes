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
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-live="polite"
      aria-label={t.title}
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-[#2b2620]/30 backdrop-blur-sm"
        onClick={() => persist({ analytics: false, marketing: false })}
      />

      <div
        className={`relative w-full max-w-sm scale-95 transition-transform duration-500 ${
          open ? "scale-100" : "scale-95"
        }`}
      >
        <div className="rounded-3xl border border-white/30 bg-white/15 p-7 text-center shadow-[0_8px_40px_-12px_rgba(43,38,32,0.4)] backdrop-blur-2xl">
          <button
            onClick={() => persist({ analytics: false, marketing: false })}
            aria-label={t.reject}
            className="absolute right-4 top-4 rounded-full p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md">
            <Cookie className="h-5 w-5" />
          </span>

          <h2 className="mt-4 font-[family-name:'Playfair_Display'] text-xl font-semibold text-white">
            {t.title}
          </h2>

          <p className="mt-2 text-[13px] leading-relaxed text-white/75">{t.body}</p>

          <div
            className={`grid transition-all duration-400 ${
              expanded ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="space-y-2.5 rounded-2xl border border-white/15 bg-white/5 p-4 text-left backdrop-blur-md">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[13px] font-medium text-white">{t.necessary}</p>
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white/80">
                    {t.always}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-2.5">
                  <p className="text-[13px] text-white/90">{t.analytics}</p>
                  <Toggle on={prefs.analytics} onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))} />
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-2.5">
                  <p className="text-[13px] text-white/90">{t.marketing}</p>
                  <Toggle on={prefs.marketing} onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            {expanded ? (
              <button
                onClick={() => persist(prefs)}
                className="w-full rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#2b2620] transition hover:bg-white/90"
              >
                {t.save}
              </button>
            ) : (
              <button
                onClick={() => persist({ analytics: true, marketing: true })}
                className="w-full rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#2b2620] transition hover:bg-white/90"
              >
                {t.accept}
              </button>
            )}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => persist({ analytics: false, marketing: false })}
                className="text-xs text-white/70 underline-offset-2 transition hover:text-white hover:underline"
              >
                {t.reject}
              </button>
              {!expanded && (
                <button
                  onClick={() => setExpanded(true)}
                  className="inline-flex items-center gap-1 text-xs text-white/70 underline-offset-2 transition hover:text-white hover:underline"
                >
                  <Settings2 className="h-3 w-3" /> {t.customize}
                </button>
              )}
              <a
                href="/politique-confidentialite"
                className="text-xs text-white/70 underline-offset-2 transition hover:text-white hover:underline"
              >
                {t.policy}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
