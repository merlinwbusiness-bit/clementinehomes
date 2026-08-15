import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Globe } from "lucide-react";
import logoAsset from "@/assets/clementine-homes-logo.png.asset.json";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales · Clementine Homes" },
      {
        name: "description",
        content:
          "Mentions légales de Clementine Homes — Home Staging & Real Estate en el Garraf (Barcelona). Titular, contacto y datos del agente API.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Mentions légales · Clementine Homes" },
      {
        property: "og:description",
        content:
          "Mentions légales de Clementine Homes, Home Staging & Real Estate en el Garraf (Barcelona).",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://clementinehomes.es/mentions-legales" }],
  }),
  component: LegalMentionsPage,
});

const logo = logoAsset.url;
type Lang = "es" | "en" | "fr";

const content: Record<Lang, {
  title: string;
  sections: { h: string; p: string[] }[];
}> = {
  es: {
    title: "Aviso Legal",
    sections: [
      {
        h: "Titular del sitio",
        p: [
          "El presente sitio web es propiedad de Clémentine Lanchier, en adelante « Clementine Homes », dedicada a la actividad de Home Staging y Real Estate (agente inmobiliaria API) en la zona del Garraf, Barcelona.",
          "Email de contacto: info@clementinehomes.es · Teléfono / WhatsApp: +34 620 533 054.",
        ],
      },
      {
        h: "Datos profesionales",
        p: [
          "Clémentine Lanchier ejerce como agente inmobiliaria colegiada (API) en Cataluña, España, con domicilio profesional en Vilanova i la Geltrú, Garraf (Barcelona).",
          "Zona de actividad principal: Vilanova i la Geltrú, Sitges, Canyelles, Cubelles, Sant Pere de Ribes y resto del Garraf.",
        ],
      },
      {
        h: "Propiedad intelectual",
        p: [
          "Todos los contenidos de este sitio (textos, fotografías, logotipos, imágenes, diseño y código) son propiedad de Clementine Homes o de sus colaboradores y están protegidos por la legislación sobre propiedad intelectual.",
          "Queda prohibida la reproducción, distribución o comunicación pública total o parcial sin autorización expresa por escrito.",
        ],
      },
      {
        h: "Responsabilidad",
        p: [
          "Clementine Homes se esfuerza por mantener la información del sitio actualizada y exacta, pero no garantiza la ausencia de errores ni la disponibilidad permanente del servicio.",
          "El uso de la información publicada es responsabilidad del usuario.",
        ],
      },
      {
        h: "Enlaces externos",
        p: [
          "Este sitio puede contener enlaces a sitios de terceros. Clementine Homes no se responsabiliza del contenido ni del funcionamiento de dichas páginas.",
        ],
      },
      {
        h: "Legislación aplicable",
        p: [
          "El presente aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de Barcelona.",
        ],
      },
    ],
  },
  en: {
    title: "Legal Notice",
    sections: [
      {
        h: "Site owner",
        p: [
          "This website is owned by Clémentine Lanchier, hereafter « Clementine Homes », operating in Home Staging and Real Estate (API real estate agent) in the Garraf area, Barcelona.",
          "Contact email: info@clementinehomes.es · Phone / WhatsApp: +34 620 533 054.",
        ],
      },
      {
        h: "Professional information",
        p: [
          "Clémentine Lanchier is a registered real estate agent (API) in Catalonia, Spain, with a professional address in Vilanova i la Geltrú, Garraf (Barcelona).",
          "Main area of activity: Vilanova i la Geltrú, Sitges, Canyelles, Cubelles, Sant Pere de Ribes and the rest of the Garraf.",
        ],
      },
      {
        h: "Intellectual property",
        p: [
          "All content on this site (text, photographs, logos, images, design and code) is the property of Clementine Homes or its collaborators and is protected by intellectual property law.",
          "Total or partial reproduction, distribution or public communication is prohibited without express written authorisation.",
        ],
      },
      {
        h: "Liability",
        p: [
          "Clementine Homes strives to keep the information on the site accurate and up to date, but does not guarantee the absence of errors or continuous availability of the service.",
          "Use of the published information is the responsibility of the user.",
        ],
      },
      {
        h: "External links",
        p: [
          "This site may contain links to third-party websites. Clementine Homes is not responsible for the content or operation of those pages.",
        ],
      },
      {
        h: "Applicable law",
        p: [
          "This legal notice is governed by Spanish law. In the event of any dispute, the parties submit to the courts of Barcelona.",
        ],
      },
    ],
  },
  fr: {
    title: "Mentions légales",
    sections: [
      {
        h: "Titulaire du site",
        p: [
          "Le présent site internet est la propriété de Clémentine Lanchier, ci-après « Clementine Homes », exerçant l'activité de Home Staging et Real Estate (agent immobilier API) dans la zone du Garraf, Barcelone.",
          "Email de contact : info@clementinehomes.es · Téléphone / WhatsApp : +34 620 533 054.",
        ],
      },
      {
        h: "Données professionnelles",
        p: [
          "Clémentine Lanchier exerce en tant qu'agent immobilier agréé (API) en Catalogne, Espagne, avec adresse professionnelle à Vilanova i la Geltrú, Garraf (Barcelone).",
          "Zone d'activité principale : Vilanova i la Geltrú, Sitges, Canyelles, Cubelles, Sant Pere de Ribes et le reste du Garraf.",
        ],
      },
      {
        h: "Propriété intellectuelle",
        p: [
          "L'ensemble des contenus de ce site (textes, photographies, logos, images, design et code) est la propriété de Clementine Homes ou de ses collaborateurs et est protégé par la législation sur la propriété intellectuelle.",
          "Toute reproduction, diffusion ou communication publique totale ou partielle est interdite sans autorisation écrite expresse.",
        ],
      },
      {
        h: "Responsabilité",
        p: [
          "Clementine Homes s'efforce de maintenir l'information du site à jour et exacte, mais ne garantit pas l'absence d'erreurs ni la disponibilité permanente du service.",
          "L'utilisation des informations publiées est sous la responsabilité de l'utilisateur.",
        ],
      },
      {
        h: "Liens externes",
        p: [
          "Ce site peut contenir des liens vers des sites tiers. Clementine Homes décline toute responsabilité quant au contenu ou au fonctionnement de ces pages.",
        ],
      },
      {
        h: "Droit applicable",
        p: [
          "Le présent avis légal est régi par la législation espagnole. En cas de litige, les parties se soumettent aux tribunaux de Barcelone.",
        ],
      },
    ],
  },
};

function LegalMentionsPage() {
  const [lang, setLang] = useState<Lang>("fr");
  const c = content[lang];
  return (
    <div className="min-h-screen bg-[#f7f1ea] text-[#2b2620]">
      <header className="sticky top-0 z-30 bg-[#2b2620] text-[#f7f1ea]">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-5 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Clementine Homes" className="h-12 w-auto bg-[#f7f1ea] rounded p-1" />
          </Link>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 opacity-70" />
            {(["fr", "es", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide transition ${
                  lang === l ? "bg-[#c98a5a] text-white" : "text-[#f7f1ea]/70 hover:text-[#f7f1ea]"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#c98a5a] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Clementine Homes
        </Link>

        <h1 className="font-[family-name:'Playfair_Display'] text-4xl md:text-5xl font-semibold mb-10">
          {c.title}
        </h1>

        <div className="space-y-8">
          {c.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-[family-name:'Playfair_Display'] text-xl font-semibold mb-2 text-[#2b2620]">
                {s.h}
              </h2>
              {s.p.map((para, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-[#5c544a] mb-1.5">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>
      </main>

      <footer className="bg-[#2b2620] text-[#f7f1ea]/60 py-8 px-5 text-center text-xs">
        © {new Date().getFullYear()} Clementine Homes · Home Staging & Real Estate · Garraf – Barcelone
        <div className="mt-1 text-[#f7f1ea]/40">Designed by Merlin Wiart</div>
      </footer>
    </div>
  );
}
