import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.png";
import bedroom from "@/assets/bedroom.png";
import kitchen1 from "@/assets/kitchen-1.png";
import kitchen2 from "@/assets/kitchen-2.png";
import pool from "@/assets/pool.png";
import { Instagram, Linkedin, Phone, Star, Sparkles, Camera, Home, MapPin, Mail, ArrowRight, Key, Building2, Handshake, TrendingUp, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP_URL = "https://wa.me/34620533054?text=Hola%20Cl%C3%A9mentine%2C%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n";

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>
    </svg>
  );
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

function Counter({ to, suffix = "", duration = 1600, decimals = 0 }: { to: number; suffix?: string; duration?: number; decimals?: number }) {
  const [val, setVal] = useState(0);
  const { ref, visible } = useReveal<HTMLSpanElement>();
  useEffect(() => {
    if (!visible) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, to, duration]);
  const display = decimals > 0 ? val.toFixed(decimals).replace(".", ",") : Math.round(val).toString();
  return <span ref={ref}>{display}{suffix}</span>;
}

const reviews = [
  {
    name: "Justine Grebaut",
    text: "Clémentine es, sin duda, una gran profesional muy implicada. Además de tomarse el tiempo para entender las expectativas y exigencias, con mucha paciencia, aporta una mirada nueva al sector inmobiliario gracias a su experiencia inigualable en home staging. Solo puedo recomendarla enormemente.",
    role: "Local Guide · 17 reseñas",
  },
  {
    name: "Verònica Rico",
    text: "Clémentine es una mujer realmente entregada e impecable. Su gusto excepcional por la decoración interior es una baza considerable para la venta de nuestras casas y la puesta en valor de su elegancia. Un verdadero placer trabajar con ella.",
    role: "Cliente",
  },
  {
    name: "Sophie Corvaisier",
    text: "Clémentine es una profesional increíblemente entregada que me ha sido de gran ayuda durante todo el proceso de venta. Tiene un talento excepcional para crear espacios cautivadores y demuestra una gran eficacia en su gestión. La recomiendo sin dudarlo.",
    role: "Kret Real Estate",
  },
];

const services = [
  { icon: Home, title: "Home Staging Completo", desc: "Transformamos cada estancia para destacar el potencial real de tu propiedad y atraer más compradores." },
  { icon: Sparkles, title: "Consultoría Express", desc: "Visita y diagnóstico con recomendaciones concretas para preparar tu vivienda antes de venderla o alquilarla." },
  { icon: Camera, title: "Reportaje Fotográfico", desc: "Fotografías profesionales que multiplican las visitas online de tu anuncio inmobiliario." },
  { icon: Key, title: "Venta y Alquiler", desc: "Como agente API colegiada, gestiono la venta y el alquiler de tu propiedad de principio a fin." },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-30 px-6 lg:px-12 py-4 flex items-center justify-between transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md shadow-[var(--shadow-soft)]" : "bg-transparent"}`}>
      <a href="#top" className="flex items-center gap-3">
        <img src={logo} alt="Clementine Homes" className={`h-11 w-auto rounded-md p-1.5 transition ${scrolled ? "bg-transparent" : "bg-background/90"}`} />
      </a>
      <div className={`hidden md:flex items-center gap-8 text-sm transition ${scrolled ? "text-foreground" : "text-background/90"}`}>
        <a href="#real-estate" className="hover:text-primary transition">Real Estate</a>
        <a href="#servicios" className="hover:text-primary transition">Servicios</a>
        <a href="#proyectos" className="hover:text-primary transition">Proyectos</a>
        <a href="#opiniones" className="hover:text-primary transition">Opiniones</a>
        <a href="#contacto" className="hover:text-primary transition">Contacto</a>
      </div>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center gap-2 text-sm bg-primary text-primary-foreground px-4 py-2 rounded-full hover:opacity-90 transition">
        <WhatsAppIcon className="w-4 h-4" /> WhatsApp
      </a>
    </nav>
  );
}

type GalleryItem = { img: string; alt: string; tag: string; title: string; desc: string };

function Lightbox({ items, index, onClose, onPrev, onNext }: { items: GalleryItem[]; index: number | null; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, onClose, onPrev, onNext]);

  if (index === null) return null;
  const item = items[index];
  return (
    <div className="fixed inset-0 z-[60] bg-foreground/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-[fadeIn_.25s_ease-out]">
      <button onClick={onClose} aria-label="Cerrar" className="absolute top-5 right-5 w-11 h-11 rounded-full bg-background/10 text-background hover:bg-background/20 flex items-center justify-center transition">
        <X className="w-5 h-5" />
      </button>
      <button onClick={onPrev} aria-label="Anterior" className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/10 text-background hover:bg-background/20 flex items-center justify-center transition">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={onNext} aria-label="Siguiente" className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/10 text-background hover:bg-background/20 flex items-center justify-center transition">
        <ChevronRight className="w-6 h-6" />
      </button>
      <div className="max-w-6xl w-full max-h-full flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <img key={item.img + index} src={item.img} alt={item.alt} className="max-h-[78vh] w-auto max-w-full rounded-xl shadow-2xl object-contain animate-[fadeIn_.4s_ease-out]" />
        <div className="text-center text-background max-w-2xl">
          <div className="text-xs uppercase tracking-[0.25em] opacity-70 mb-2">{item.tag}</div>
          <div className="font-display text-2xl md:text-3xl mb-2">{item.title}</div>
          <p className="text-background/75 text-sm">{item.desc}</p>
          <div className="text-xs opacity-60 mt-4">{index + 1} / {items.length}</div>
        </div>
      </div>
      <button className="absolute inset-0 -z-10" aria-label="Cerrar fondo" onClick={onClose} />
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(.98); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setP(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[55] h-[3px] bg-transparent pointer-events-none">
      <div className="h-full bg-gradient-to-r from-primary via-[oklch(0.78_0.12_60)] to-primary transition-[width] duration-100" style={{ width: `${p}%` }} />
    </div>
  );
}

function Hero() {
  return (
    <header id="top" className="relative min-h-screen flex items-end overflow-hidden">
      <img src={pool} alt="Villa con piscina al atardecer" className="absolute inset-0 w-full h-full object-cover scale-105 animate-[heroZoom_18s_ease-out_forwards]" />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/20 to-foreground/85" />
      <Nav />
      <div className="relative z-10 px-6 lg:px-12 pb-20 lg:pb-28 max-w-5xl">
        <span className="inline-flex items-center gap-2 text-background/90 text-xs uppercase tracking-[0.25em] mb-6 opacity-0 animate-[fadeUp_0.8s_0.1s_ease-out_forwards]">
          <span className="h-px w-10 bg-background/60" /> Home Staging · Real Estate · Garraf
        </span>
        <h1 className="font-display text-background text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6">
          <span className="block opacity-0 animate-[fadeUp_0.9s_0.25s_ease-out_forwards]">Vendemos, alquilamos</span>
          <span className="block opacity-0 animate-[fadeUp_0.9s_0.45s_ease-out_forwards]">y realzamos tu hogar.</span>
        </h1>
        <p className="text-background/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed opacity-0 animate-[fadeUp_0.9s_0.65s_ease-out_forwards]">
          Agencia inmobiliaria y servicio de home staging entre Vilanova i la Geltrú, Sitges y Canyelles. Te acompañamos en cada etapa: valoración, preparación, fotografía y venta.
        </p>
        <div className="flex flex-wrap gap-4 opacity-0 animate-[fadeUp_0.9s_0.85s_ease-out_forwards]">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-4 rounded-full font-medium hover:scale-[1.03] active:scale-100 transition shadow-[var(--shadow-soft)]">
            <WhatsAppIcon className="w-5 h-5" /> Hablar por WhatsApp
          </a>
          <a href="#contacto" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-full font-medium hover:scale-[1.03] active:scale-100 transition shadow-[var(--shadow-soft)]">
            Visita gratuita <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#proyectos" className="inline-flex items-center gap-2 text-background border border-background/40 px-7 py-4 rounded-full font-medium hover:bg-background/10 transition">
            Ver proyectos
          </a>
        </div>
      </div>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroZoom { from { transform: scale(1.15); } to { transform: scale(1.02); } }
        @keyframes pulseRing { 0% { box-shadow: 0 0 0 0 rgba(37,211,102,.55); } 70% { box-shadow: 0 0 0 18px rgba(37,211,102,0); } 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); } }
      `}</style>
    </header>
  );
}

function Stats() {
  const stats = [
    { v: 5, suffix: "", l: "Valoración Google", decimals: 1 },
    { v: 10, suffix: "+", l: "Reseñas verificadas", decimals: 0 },
    { v: 3, suffix: "x", l: "Más rápido en venderse", decimals: 0 },
    { v: 100, suffix: "%", l: "Atención personalizada", decimals: 0 },
  ];
  return (
    <section className="bg-background py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 80}>
            <div className="font-display text-4xl md:text-5xl text-primary mb-2">
              <Counter to={s.v} suffix={s.suffix} decimals={s.decimals} />
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">{s.l}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-secondary">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative group">
            <img src={bedroom} alt="Dormitorio luminoso con vista a terraza" className="rounded-2xl shadow-[var(--shadow-soft)] w-full transition duration-700 group-hover:scale-[1.02]" />
            <div className="absolute -bottom-6 -right-6 bg-background p-6 rounded-2xl shadow-[var(--shadow-soft)] hidden md:block">
              <div className="flex items-center gap-1 text-primary mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <div className="text-xs text-muted-foreground">5,0 en Google · 10 reseñas</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-primary mb-4 block">Sobre Clementine</span>
            <h2 className="text-4xl md:text-5xl mb-6">Una agencia con mirada de interiorista.</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Soy Clémentine, agente inmobiliaria API y especialista en home staging. Combino el rigor de la intermediación profesional con una sensibilidad única para realzar cada propiedad entre Vilanova i la Geltrú, Sitges y Canyelles.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Cada propiedad tiene una historia. Mi trabajo es revelarla y venderla: con luz, color, mobiliario y una estrategia comercial que conecta emocionalmente con los compradores.
            </p>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <MapPin className="w-4 h-4 text-primary" /> Vilanova i la Geltrú · Sitges · Canyelles
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function RealEstate() {
  const pillars = [
    { icon: Building2, title: "Venta de propiedades", desc: "Valoración realista, marketing visual de alto impacto y red de compradores cualificados." },
    { icon: Key, title: "Alquiler de larga estancia", desc: "Selección de inquilinos, contratos y gestión sin complicaciones para propietarios." },
    { icon: Handshake, title: "Asesoramiento al comprador", desc: "Te acompañamos en la búsqueda, negociación y firma, sobre todo si es tu primera compra." },
    { icon: TrendingUp, title: "Estrategia de precio", desc: "Estudio del mercado local del Garraf para vender al mejor precio en el menor tiempo." },
  ];
  return (
    <section id="real-estate" className="py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-primary mb-4 block">Real Estate · Agente API</span>
            <h2 className="text-4xl md:text-5xl mb-4">Tu agencia inmobiliaria de confianza en el Garraf.</h2>
            <p className="text-muted-foreground text-lg">
              Más allá del home staging, gestiono la venta y el alquiler de tu propiedad como agente colegiada. Una sola interlocutora para toda la operación: preparación, marketing y cierre.
            </p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="h-full bg-card p-8 rounded-2xl border border-border hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] transition-all duration-300 group">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl mb-3">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="mt-12 flex flex-wrap gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-4 rounded-full font-medium hover:scale-[1.03] transition">
              <WhatsAppIcon className="w-5 h-5" /> Valorar mi propiedad
            </a>
            <a href="mailto:realestate@clementinehomes.es" className="inline-flex items-center gap-2 border border-border px-7 py-4 rounded-full font-medium hover:bg-secondary transition">
              <Mail className="w-4 h-4" /> realestate@clementinehomes.es
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="py-24 px-6 lg:px-12 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-primary mb-4 block">Servicios</span>
            <h2 className="text-4xl md:text-5xl mb-4">Todo lo que tu propiedad necesita.</h2>
            <p className="text-muted-foreground text-lg">De la consultoría inicial a la firma ante notario, te acompaño en cada paso.</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="h-full bg-card p-8 rounded-2xl border border-border hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] transition-all duration-300 group">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const items: GalleryItem[] = [
    { img: kitchen1, alt: "Cocina mediterránea con isla", tag: "Casa rural · Canyelles", title: "Cocina abierta con alma", desc: "Una isla central que convierte la cocina en el corazón social de la casa. Materiales cálidos y luz natural para acercar al comprador a su nueva vida." },
    { img: kitchen2, alt: "Cocina moderna minimalista", tag: "Apartamento · Vilanova", title: "Líneas limpias, luz natural", desc: "Paleta neutra y mobiliario depurado para potenciar amplitud y luminosidad. Resultado: visitas multiplicadas en pocos días." },
    { img: bedroom, alt: "Dormitorio con terraza", tag: "Ático · Sitges", title: "Serenidad mediterránea", desc: "Textiles naturales y una paleta serena que invitan al descanso. La terraza se integra como una extensión del dormitorio." },
    { img: pool, alt: "Villa con piscina al atardecer", tag: "Villa · Garraf", title: "Atardecer junto al mar", desc: "Puesta en escena exterior pensada para fotografía: mobiliario, iluminación y composición que enamoran a primera vista." },
    { img: kitchen1, alt: "Detalle cocina", tag: "Detalle · Canyelles", title: "El detalle marca la venta", desc: "Pequeños gestos —vajilla, plantas, textiles— que humanizan el espacio y conectan emocionalmente." },
    { img: bedroom, alt: "Suite principal", tag: "Suite · Sitges", title: "Suite lista para enamorar", desc: "Una propuesta editorial: cama vestida, mesilla curada y luces cálidas para una foto principal irresistible." },
  ];
  const [open, setOpen] = useState<number | null>(null);
  const layout = [
    "md:col-span-2 md:row-span-2",
    "md:col-span-2",
    "",
    "",
    "md:col-span-2",
    "",
  ];
  return (
    <section id="proyectos" className="py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-primary mb-4 block">Proyectos</span>
              <h2 className="text-4xl md:text-5xl">Espacios transformados.</h2>
            </div>
            <p className="text-muted-foreground max-w-md">Una selección de propiedades preparadas para encontrar nuevos propietarios. Haz clic en cualquier imagen para ampliarla.</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[220px] md:auto-rows-[240px] gap-4">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 70} className={layout[i] ?? ""}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="block relative rounded-2xl overflow-hidden group h-full w-full text-left focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <img
                  src={it.img}
                  alt={it.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-[1200ms] ease-out"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition duration-500" />
                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition duration-300">
                  <ZoomIn className="w-4 h-4" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/90 to-transparent text-background translate-y-2 group-hover:translate-y-0 transition duration-500">
                  <div className="text-[10px] uppercase tracking-wider opacity-80 mb-1">{it.tag}</div>
                  <div className="font-display text-xl flex items-center gap-2">
                    {it.title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition duration-500" />
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        <Lightbox
          items={items}
          index={open}
          onClose={() => setOpen(null)}
          onPrev={() => setOpen((i) => (i === null ? null : (i - 1 + items.length) % items.length))}
          onNext={() => setOpen((i) => (i === null ? null : (i + 1) % items.length))}
        />
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="opiniones" className="py-24 px-6 lg:px-12 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-1 text-primary mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <h2 className="text-4xl md:text-5xl mb-3">5,0 en Google</h2>
            <p className="text-muted-foreground">Lo que dicen quienes ya han confiado en Clementine.</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 100}>
              <article className="h-full bg-card p-8 rounded-2xl border border-border hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] transition-all duration-300">
                <div className="flex gap-1 text-primary mb-4">
                  {[...Array(5)].map((_, k) => <Star key={k} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-foreground/80 leading-relaxed mb-6 text-sm">"{r.text}"</p>
                <div className="border-t border-border pt-4">
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="relative py-24 px-6 lg:px-12 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-warm)" }} />
      <div className="relative max-w-4xl mx-auto text-center text-primary-foreground">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.25em] mb-6 block opacity-90">Contacto</span>
          <h2 className="text-4xl md:text-6xl mb-6">¿Listo para vender o alquilar?</h2>
          <p className="text-lg opacity-90 mb-12 max-w-2xl mx-auto">
            Cuéntame tu proyecto. La primera visita y diagnóstico son completamente gratuitos.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-4 rounded-full font-medium hover:scale-[1.03] transition">
              <WhatsAppIcon className="w-5 h-5" /> WhatsApp
            </a>
            <a href="tel:+34620533054" className="inline-flex items-center gap-2 bg-background text-foreground px-7 py-4 rounded-full font-medium hover:scale-[1.03] transition">
              <Phone className="w-4 h-4" /> 620 53 30 54
            </a>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12 text-left">
            <a href="mailto:clementinehomestaging@gmail.com" className="flex items-center gap-3 bg-background/10 hover:bg-background/20 backdrop-blur border border-background/30 px-5 py-4 rounded-2xl transition">
              <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center"><Mail className="w-4 h-4" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider opacity-80">Home Staging</div>
                <div className="text-sm font-medium break-all">clementinehomestaging@gmail.com</div>
              </div>
            </a>
            <a href="mailto:realestate@clementinehomes.es" className="flex items-center gap-3 bg-background/10 hover:bg-background/20 backdrop-blur border border-background/30 px-5 py-4 rounded-2xl transition">
              <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center"><Building2 className="w-4 h-4" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider opacity-80">Real Estate</div>
                <div className="text-sm font-medium break-all">realestate@clementinehomes.es</div>
              </div>
            </a>
          </div>
        </Reveal>
        <Reveal delay={280}>
          <div className="flex justify-center gap-4">
            <a href="https://www.instagram.com/clementinehomes.es/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-11 h-11 rounded-full border border-background/40 flex items-center justify-center hover:bg-background hover:text-primary hover:scale-110 transition">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/clementinelanchier" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-11 h-11 rounded-full border border-background/40 flex items-center justify-center hover:bg-background hover:text-primary hover:scale-110 transition">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://es.pinterest.com/clementinehomestaging/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="w-11 h-11 rounded-full border border-background/40 flex items-center justify-center hover:bg-background hover:text-primary hover:scale-110 transition text-sm font-bold">
              P
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background/70 py-10 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Clementine" className="h-10 w-auto bg-background rounded p-1" />
          <span>© {new Date().getFullYear()} Clementine Homes · Home Staging & Real Estate</span>
        </div>
        <div>Vilanova i la Geltrú · Sitges · Canyelles</div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 transition"
      style={{ animation: "pulseRing 2.4s infinite" }}
    >
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  );
}

function Index() {
  return (
    <main className="bg-background text-foreground scroll-smooth">
      <ScrollProgress />
      <Hero />
      <Stats />
      <About />
      <RealEstate />
      <Services />
      <Projects />
      <Reviews />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
