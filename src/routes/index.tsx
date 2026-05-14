import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import bedroom from "@/assets/bedroom.png";
import kitchen1 from "@/assets/kitchen-1.png";
import kitchen2 from "@/assets/kitchen-2.png";
import pool from "@/assets/pool.png";
import { Instagram, Linkedin, Phone, Star, Sparkles, Camera, Home, MapPin, Mail, ArrowRight, Key } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

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
  { icon: Key, title: "Venta y Alquiler", desc: "Como agente API, gestiono la venta y el alquiler de tu propiedad de principio a fin, con total profesionalidad." },
];

function Nav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-6 lg:px-12 py-6 flex items-center justify-between">
      <a href="#" className="flex items-center gap-3">
        <img src={logo} alt="Clementine Homes" className="h-12 w-auto bg-background/90 rounded-md p-1.5" />
      </a>
      <div className="hidden md:flex items-center gap-8 text-sm text-background/90">
        <a href="#servicios" className="hover:text-background transition">Servicios</a>
        <a href="#proyectos" className="hover:text-background transition">Proyectos</a>
        <a href="#opiniones" className="hover:text-background transition">Opiniones</a>
        <a href="#contacto" className="hover:text-background transition">Contacto</a>
      </div>
      <a href="tel:+34620533054" className="hidden md:inline-flex items-center gap-2 text-sm bg-background/95 text-foreground px-4 py-2 rounded-full hover:bg-background transition">
        <Phone className="w-4 h-4" /> 620 53 30 54
      </a>
    </nav>
  );
}

function Hero() {
  return (
    <header className="relative min-h-screen flex items-end overflow-hidden">
      <img src={pool} alt="Villa con piscina al atardecer" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-foreground/80" />
      <Nav />
      <div className="relative z-10 px-6 lg:px-12 pb-20 lg:pb-28 max-w-5xl">
        <span className="inline-flex items-center gap-2 text-background/90 text-xs uppercase tracking-[0.25em] mb-6">
          <span className="h-px w-10 bg-background/60" /> Vilanova · Sitges · Canyelles
        </span>
        <h1 className="font-display text-background text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6">
          Tu hogar,<br/>vendido más rápido.
        </h1>
        <p className="text-background/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Servicio profesional de home staging y real estate en la costa del Garraf. Realzamos cada rincón para que tu propiedad enamore desde la primera visita.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#contacto" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-full font-medium hover:opacity-90 transition shadow-[var(--shadow-soft)]">
            Solicitar visita gratuita <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#proyectos" className="inline-flex items-center gap-2 text-background border border-background/40 px-7 py-4 rounded-full font-medium hover:bg-background/10 transition">
            Ver proyectos
          </a>
        </div>
      </div>
    </header>
  );
}

function Stats() {
  return (
    <section className="bg-background py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { n: "5,0", l: "Valoración Google" },
          { n: "10+", l: "Reseñas verificadas" },
          { n: "3x", l: "Más rápido en venderse" },
          { n: "100%", l: "Atención personalizada" },
        ].map((s) => (
          <div key={s.l}>
            <div className="font-display text-4xl md:text-5xl text-primary mb-2">{s.n}</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-secondary">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img src={bedroom} alt="Dormitorio luminoso con vista a terraza" className="rounded-2xl shadow-[var(--shadow-soft)] w-full" />
          <div className="absolute -bottom-6 -right-6 bg-background p-6 rounded-2xl shadow-[var(--shadow-soft)] hidden md:block">
            <div className="flex items-center gap-1 text-primary mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <div className="text-xs text-muted-foreground">5,0 en Google · 10 reseñas</div>
          </div>
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-primary mb-4 block">Sobre Clementine</span>
          <h2 className="text-4xl md:text-5xl mb-6">Mirada nueva, hogares que enamoran.</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Soy Clémentine y combino mi pasión por el interiorismo con un profundo conocimiento del mercado inmobiliario entre Vilanova i la Geltrú, Sitges y Canyelles.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Cada propiedad tiene una historia. Mi trabajo es revelarla: con luz, color, mobiliario y composiciones que conectan emocionalmente con los compradores y aceleran la venta.
          </p>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <MapPin className="w-4 h-4 text-primary" /> Vilanova i la Geltrú · Sitges · Canyelles
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-primary mb-4 block">Servicios</span>
          <h2 className="text-4xl md:text-5xl mb-4">Todo lo que tu propiedad necesita.</h2>
          <p className="text-muted-foreground text-lg">De la consultoría inicial al reportaje fotográfico final, te acompaño en cada paso.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-card p-8 rounded-2xl border border-border hover:shadow-[var(--shadow-soft)] transition group">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                <s.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="proyectos" className="py-24 px-6 lg:px-12 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-primary mb-4 block">Proyectos</span>
            <h2 className="text-4xl md:text-5xl">Espacios transformados.</h2>
          </div>
          <p className="text-muted-foreground max-w-md">Una selección de propiedades preparadas para encontrar nuevos propietarios.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:row-span-2 relative rounded-2xl overflow-hidden group">
            <img src={kitchen1} alt="Cocina mediterránea con isla" className="w-full h-full object-cover min-h-[500px] group-hover:scale-105 transition duration-700" />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent text-background">
              <div className="text-xs uppercase tracking-wider opacity-80 mb-1">Casa rural · Canyelles</div>
              <div className="font-display text-2xl">Cocina abierta con alma</div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden group">
            <img src={kitchen2} alt="Cocina moderna minimalista" className="w-full h-72 object-cover group-hover:scale-105 transition duration-700" />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent text-background">
              <div className="text-xs uppercase tracking-wider opacity-80 mb-1">Apartamento · Vilanova</div>
              <div className="font-display text-2xl">Líneas limpias, luz natural</div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden group">
            <img src={bedroom} alt="Dormitorio con terraza" className="w-full h-72 object-cover group-hover:scale-105 transition duration-700" />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent text-background">
              <div className="text-xs uppercase tracking-wider opacity-80 mb-1">Ático · Sitges</div>
              <div className="font-display text-2xl">Serenidad mediterránea</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="opiniones" className="py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-1 text-primary mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
          </div>
          <h2 className="text-4xl md:text-5xl mb-3">5,0 en Google</h2>
          <p className="text-muted-foreground">Lo que dicen quienes ya han confiado en Clementine.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <article key={r.name} className="bg-card p-8 rounded-2xl border border-border">
              <div className="flex gap-1 text-primary mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-foreground/80 leading-relaxed mb-6 text-sm">"{r.text}"</p>
              <div className="border-t border-border pt-4">
                <div className="font-medium">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.role}</div>
              </div>
            </article>
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
        <span className="text-xs uppercase tracking-[0.25em] mb-6 block opacity-90">Contacto</span>
        <h2 className="text-4xl md:text-6xl mb-6">¿Listo para vender tu propiedad?</h2>
        <p className="text-lg opacity-90 mb-12 max-w-2xl mx-auto">
          Cuéntame tu proyecto. La primera visita y diagnóstico son completamente gratuitos.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a href="tel:+34620533054" className="inline-flex items-center gap-2 bg-background text-foreground px-7 py-4 rounded-full font-medium hover:opacity-90 transition">
            <Phone className="w-4 h-4" /> 620 53 30 54
          </a>
          <a href="mailto:clementinehomestaging@gmail.com" className="inline-flex items-center gap-2 border border-background/50 text-background px-7 py-4 rounded-full font-medium hover:bg-background/10 transition">
            <Mail className="w-4 h-4" /> Home Staging
          </a>
          <a href="mailto:realestate@clementinehomes.es" className="inline-flex items-center gap-2 border border-background/50 text-background px-7 py-4 rounded-full font-medium hover:bg-background/10 transition">
            <Mail className="w-4 h-4" /> Real Estate
          </a>
        </div>
        <div className="flex justify-center gap-4">
          <a href="https://www.instagram.com/clementinehomes.es/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-11 h-11 rounded-full border border-background/40 flex items-center justify-center hover:bg-background hover:text-primary transition">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/clementinelanchier" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-11 h-11 rounded-full border border-background/40 flex items-center justify-center hover:bg-background hover:text-primary transition">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="https://es.pinterest.com/clementinehomestaging/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="w-11 h-11 rounded-full border border-background/40 flex items-center justify-center hover:bg-background hover:text-primary transition text-sm font-bold">
            P
          </a>
        </div>
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
          <span>© {new Date().getFullYear()} Clementine Homes</span>
        </div>
        <div>Vilanova i la Geltrú · Sitges · Canyelles</div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Hero />
      <Stats />
      <About />
      <Services />
      <Projects />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
