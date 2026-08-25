import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Globe } from "lucide-react";
import logoAsset from "@/assets/clementine-homes-logo.png.asset.json";

export const Route = createFileRoute("/politique-confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité · Clementine Homes" },
      {
        name: "description",
        content:
          "Política de privacidad de Clementine Homes. Información sobre el tratamiento de datos personales y tus derechos.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Politique de confidentialité · Clementine Homes" },
      {
        property: "og:description",
        content:
          "Política de privacidad de Clementine Homes y tus derechos sobre datos personales.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://clementinehomes.es/politique-confidentialite" }],
  }),
  component: PrivacyPage,
});

const logo = logoAsset.url;
type Lang = "es" | "en" | "fr";

const content: Record<Lang, { title: string; sections: { h: string; p: string[] }[] }> = {
  es: {
    title: "Política de Privacidad",
    sections: [
      {
        h: "Responsable del tratamiento",
        p: [
          "El responsable del tratamiento de los datos personales recabados a través de este sitio es Clémentine Lanchier (Clementine Homes), con email de contacto info@clementinehomes.es y teléfono +34 620 533 054.",
        ],
      },
      {
        h: "Datos que recabamos",
        p: [
          "Recogemos únicamente los datos que tú nos facilitas voluntariamente a través del formulario de contacto, por email, por WhatsApp o por teléfono: nombre, email, teléfono y la información sobre tu proyecto inmobiliario.",
          "No recabamos datos de menores de edad ni categorías especiales de datos sensibles.",
        ],
      },
      {
        h: "Finalidad del tratamiento",
        p: [
          "Tus datos se utilizan exclusivamente para responder a tus consultas, elaborar un diagnóstico o presupuesto de Home Staging o Real Estate, y gestionar la eventual relación comercial derivada de tu proyecto.",
          "No cedemos tus datos a terceros, salvo obligación legal o proveedores necesarios para la prestación del servicio (siempre bajo acuerdo de confidencialidad).",
        ],
      },
      {
        h: "Base jurídica",
        p: [
          "La base jurídica del tratamiento es tu consentimiento expreso al enviarnos tus datos y, en su caso, la ejecución del contrato o precontrato que se acuerde.",
        ],
      },
      {
        h: "Conservación de los datos",
        p: [
          "Conservamos tus datos durante el tiempo necesario para atender tu solicitud y, posteriormente, durante los plazos legalmente requeridos. Puedes solicitar su supresión en cualquier momento.",
        ],
      },
      {
        h: "Tus derechos",
        p: [
          "Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a info@clementinehomes.es.",
          "Asimismo, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) si consideras que tus derechos han sido vulnerados.",
        ],
      },
      {
        h: "Seguridad",
        p: [
          "Aplicamos medidas técnicas y organizativas apropiadas para proteger tus datos frente a acceso no autorizado, pérdida o alteración.",
        ],
      },
      {
        h: "Cookies",
        p: [
          "Utilizamos cookies esenciales, necesarias para el funcionamiento del sitio (idioma seleccionado y registro de tu consentimiento), que no requieren autorización previa.",
          "Con tu consentimiento, podemos utilizar cookies de analítica (para entender qué secciones interesan más) y de marketing (para mostrar contenidos y anuncios más relevantes).",
          "Puedes aceptar, rechazar o personalizar las cookies desde el banner que aparece en tu primera visita, y modificar tu elección en cualquier momento con el botón de cookies situado abajo a la izquierda de la pantalla. También puedes borrar las cookies desde la configuración de tu navegador.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    sections: [
      {
        h: "Data controller",
        p: [
          "The controller of the personal data collected through this site is Clémentine Lanchier (Clementine Homes), contact email info@clementinehomes.es, phone +34 620 533 054.",
        ],
      },
      {
        h: "Data we collect",
        p: [
          "We only collect the data you voluntarily provide through the contact form, by email, WhatsApp or phone: name, email, phone and information about your property project.",
          "We do not collect data from minors or special categories of sensitive data.",
        ],
      },
      {
        h: "Purpose of processing",
        p: [
          "Your data is used exclusively to answer your enquiries, prepare a Home Staging or Real Estate diagnosis or quote, and manage any commercial relationship arising from your project.",
          "We do not transfer your data to third parties, except where legally required or to necessary service providers (always under a confidentiality agreement).",
        ],
      },
      {
        h: "Legal basis",
        p: [
          "The legal basis for processing is your express consent when sending us your data and, where applicable, the execution of any contract or pre-contract agreed with you.",
        ],
      },
      {
        h: "Data retention",
        p: [
          "We keep your data for as long as necessary to handle your request and, subsequently, for the legally required periods. You may request deletion at any time.",
        ],
      },
      {
        h: "Your rights",
        p: [
          "You may exercise at any time your rights of access, rectification, deletion, objection, restriction of processing and portability by writing to info@clementinehomes.es.",
          "You may also lodge a complaint with the Spanish Data Protection Agency (AEPD) if you consider your rights have been breached.",
        ],
      },
      {
        h: "Security",
        p: [
          "We apply appropriate technical and organisational measures to protect your data against unauthorised access, loss or alteration.",
        ],
      },
      {
        h: "Cookies",
        p: [
          "We use essential cookies required for the site to work (selected language and record of your consent); these do not require prior authorisation.",
          "With your consent, we may use analytics cookies (to understand which sections are of most interest) and marketing cookies (to show more relevant content and ads).",
          "You can accept, reject or customise cookies from the banner shown on your first visit, and change your choice at any time via the cookie button at the bottom left of the screen. You can also delete cookies from your browser settings.",
        ],
      },
    ],
  },
  fr: {
    title: "Politique de confidentialité",
    sections: [
      {
        h: "Responsable du traitement",
        p: [
          "Le responsable du traitement des données personnelles collectées via ce site est Clémentine Lanchier (Clementine Homes), email de contact info@clementinehomes.es, téléphone +34 620 533 054.",
        ],
      },
      {
        h: "Données collectées",
        p: [
          "Nous ne collectons que les données que vous nous fournissez volontairement via le formulaire de contact, par email, WhatsApp ou téléphone : nom, email, téléphone et informations sur votre projet immobilier.",
          "Nous ne collectons pas de données de mineurs ni de catégories spéciales de données sensibles.",
        ],
      },
      {
        h: "Finalité du traitement",
        p: [
          "Vos données sont utilisées exclusivement pour répondre à vos demandes, élaborer un diagnostic ou devis de Home Staging ou Real Estate, et gérer la relation commerciale éventuelle découlant de votre projet.",
          "Nous ne transférons pas vos données à des tiers, sauf obligation légale ou prestataires nécessaires à la prestation du service (toujours sous accord de confidentialité).",
        ],
      },
      {
        h: "Base légale",
        p: [
          "La base légale du traitement est votre consentement exprès lors de l'envoi de vos données et, le cas échéant, l'exécution du contrat ou précontrat convenu avec vous.",
        ],
      },
      {
        h: "Conservation des données",
        p: [
          "Nous conservons vos données le temps nécessaire au traitement de votre demande puis, ensuite, pendant les délais légalement requis. Vous pouvez en demander la suppression à tout moment.",
        ],
      },
      {
        h: "Vos droits",
        p: [
          "Vous pouvez exercer à tout moment vos droits d'accès, rectification, suppression, opposition, limitation du traitement et portabilité en écrivant à info@clementinehomes.es.",
          "Vous pouvez également déposer une réclamation auprès de l'Agence Espagnole de Protection des Données (AEPD) si vous estimez que vos droits ont été bafoués.",
        ],
      },
      {
        h: "Sécurité",
        p: [
          "Nous appliquons des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou altération.",
        ],
      },
      {
        h: "Cookies",
        p: [
          "Nous utilisons des cookies essentiels, nécessaires au fonctionnement du site (langue choisie et enregistrement de votre consentement), qui ne requièrent pas d'autorisation préalable.",
          "Avec votre consentement, nous pouvons utiliser des cookies de statistiques (pour comprendre quelles sections vous intéressent) et de marketing (pour proposer des contenus et publicités plus pertinents).",
          "Vous pouvez accepter, refuser ou personnaliser les cookies depuis la bannière affichée lors de votre première visite, et modifier votre choix à tout moment via le bouton cookies situé en bas à gauche de l'écran. Vous pouvez également supprimer les cookies depuis les réglages de votre navigateur.",
        ],
      },
    ],
  },
};

function PrivacyPage() {
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
