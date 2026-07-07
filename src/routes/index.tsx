import { createFileRoute } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/clementine-homes-logo.png.asset.json";
import logoApiAsset from "@/assets/logo-api.jpg.asset.json";
import logoWowAsset from "@/assets/logo-wow.png.asset.json";
import hero from "@/assets/hero.jpg";
import portraitAsset from "@/assets/clementine-portrait-new.png.asset.json";
import ba1BeforeAsset from "@/assets/ba1-before.jpeg.asset.json";
import ba1AfterAsset from "@/assets/ba1-after.jpg.asset.json";
import ba2BeforeAsset from "@/assets/ba2-before.png.asset.json";
import ba2AfterAsset from "@/assets/ba2-after.jpg.asset.json";
import ba3BeforeAsset from "@/assets/ba3-before.png.asset.json";
import ba3AfterAsset from "@/assets/ba3-after.jpg.asset.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Instagram, Linkedin, Phone, Star, Sparkles, Camera, Home, MapPin, Mail,
  ArrowRight, Key, Building2, Handshake, TrendingUp,
  Globe, ChevronDown, Menu, MoveHorizontal,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const WA_PHONE = "34620533054";
const WA_MESSAGES: Record<"es" | "en" | "fr", string> = {
  es: "Hola Clémentine, le contacto desde la página web",
  en: "Hello Clémentine, I am contacting you from the website",
  fr: "Bonjour Clémentine, je vous contacte depuis le site internet",
};
const waUrl = (lang: "es" | "en" | "fr") =>
  `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_MESSAGES[lang])}`;

const logo = logoAsset.url;
const logoApi = logoApiAsset.url;
const logoWow = logoWowAsset.url;
const portrait = portraitAsset.url;
const beforeAfterPairs = [
  { before: ba1BeforeAsset.url, after: ba1AfterAsset.url, key: "livingKitchen" },
  { before: ba2BeforeAsset.url, after: ba2AfterAsset.url, key: "basement" },
  { before: ba3BeforeAsset.url, after: ba3AfterAsset.url, key: "loungeView" },
] as const;

/* ---------- i18n ---------- */
type Lang = "es" | "en" | "fr";

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

const dict = {
  es: {
    nav: { realEstate: "Real Estate", services: "Servicios", projects: "Proyectos", about: "Sobre mí", reviews: "Opiniones", faq: "FAQ", contact: "Contacto" },
    hero: {
      eyebrow: "Home Staging · Real Estate · Garraf",
      slogan: "Making Homes Bloom",
      sub: "Estudio de Home Staging integral y Real Estate en el Garraf - Barcelona. Transformamos tu propiedad para maximizar su valor y asegurar su venta. Preparamos tu casa para enamorar a los compradores y nos encargamos de todo el proceso, de principio a fin.",
      whatsapp: "Hablar por WhatsApp",
      visit: "Visita gratuita",
      seeProjects: "Ver proyectos",
    },
    stats: [
      { l: "Valoración Google" }, { l: "Reseñas verificadas" },
      { l: "Más rápido en venderse" }, { l: "Atención personalizada" },
    ],
    about: {
      eyebrow: "Sobre mí",
      title: "¿Quieres saber más?",
      memberOf: "Miembro de:",
      body: [
        "Cuando tuve la oportunidad de entrar en el mundo de la moda en París, con el que siempre había soñado desde pequeña, no solo me enamoré de las tendencias y la Alta Costura, sino también del poder del diseño y la decoración. Para mí, el vínculo entre la moda y los interiores siempre ha sido evidente.",
        "Así evolucioné durante más de 20 años como experta en la creación y organización de eventos, stands para ferias, convenciones, desfiles y shootings de catálogos para diferentes marcas a nivel internacional, logrando fusionar siempre la moda con el estilismo de espacios.",
        "Hoy, fusiono esa visión estética con el rigor del sector inmobiliario. Soy home stager profesional titulada por The Home Staging School y Agente Inmobiliaria Certificada en Cataluña (AICAT), miembro de API. De esta forma, pongo toda mi capacidad de creación, estrategia y organización al servicio de mis clientes, garantizando un proceso seguro, legal y brillante.",
        "Mi objetivo es ofrecer un servicio inmobiliario integral y a medida en el Garraf:",
        "Como Home Stager y Vendedora: cuando entro en una casa, me apasiona descubrir sus puntos fuertes y transformar los espacios para que transmitan bienestar. Sé exactamente cómo hacer una propiedad irresistible para el mercado y cómo gestionar su venta con éxito y tranquilidad.",
        "Como Personal Shopper Inmobiliario (Personal Buyer): me pongo al lado del comprador. Utilizo mi ojo clínico para el diseño y mi experiencia en el mercado local para encontrar, filtrar y negociar la vivienda ideal, asegurándome de que mis clientes hagan una inversión inteligente y sin sorpresas.",
        "Soy una persona muy atenta a los detalles y busco constantemente la armonización. Al final, ya sea preparando una casa para la venta o buscando el hogar ideal para un comprador, mi mayor logro es el mismo: conseguir que las personas se enamoren de una vivienda a primera vista.",
      ],
    },
    company: {
      eyebrow: "Un estudio con sensibilidad estética y estratégica",
      title: "Transformamos, vendemos y encontramos tu hogar.",
      p1: "Soy Clémentine, Agente Inmobiliaria (Certificada API AICAT) y especialista en Home Staging. En mi estudio fusionamos el rigor legal y la estrategia de venta con una sensibilidad única para el estilismo inmobiliario.",
      p2: "Mi trabajo es hacer florecer el potencial de tu propiedad para que destaque en el mercado y conecte emocionalmente con los compradores, o guiarte como Personal Buyer para encontrar tu inversión ideal.",
      location: "Sector Garraf – Barcelona",
    },
    realEstate: {
      eyebrow: "Real Estate · Agente API",
      title: "Tu Estudio de confianza en el Garraf.",
      sub: "Mucho más que Home Staging: gestiono la venta y el alquiler de tu propiedad con el respaldo de estar colegiada (AICAT/API). Tendrás una sola interlocutora para toda la operación: desde la preparación estética y el marketing de impacto, hasta la negociación y el cierre legal. Un servicio integral, fluido y sin intermediarios.",
      cta: "Valorar mi propiedad",
      pillars: [
        { title: "Venta de propiedades", desc: "Valoración realista, marketing visual de alto impacto y red de compradores cualificados." },
        { title: "Alquiler de larga estancia", desc: "Selección de inquilinos, contratos y gestión sin complicaciones para propietarios." },
        { title: "Personal Buyer", desc: "Acompañamiento en la búsqueda, negociación y firma con total seguridad jurídica." },
        { title: "Estrategia de marketing", desc: "Estudio del mercado local del Garraf para vender al mejor precio en el menor tiempo." },
      ],
    },
    services: {
      eyebrow: "Servicios",
      title: "Todo lo que tu propiedad necesita.",
      sub: "De la consultoría inicial a la firma ante notario, te acompañamos en cada paso.",
      items: [
        { title: "Home Staging Completo", desc: "Transformamos cada estancia para destacar el potencial real de tu propiedad y atraer más compradores." },
        { title: "Consultoría Express", desc: "Visita y diagnóstico con recomendaciones concretas para preparar tu vivienda antes de venderla o alquilarla." },
        { title: "Reportaje Fotográfico", desc: "Fotografías profesionales que multiplican las visitas online de tu anuncio inmobiliario." },
        { title: "Venta y Alquiler", desc: "Como agencia API colegiada, gestionamos la venta y el alquiler de tu propiedad de principio a fin." },
      ],
    },
    beforeAfter: {
      eyebrow: "Antes / Después",
      title: "Desliza para descubrir la magia.",
      sub: "Arrastra la barra central para comparar el antes y el después de una de nuestras transformaciones.",
      before: "Antes",
      after: "Después",
    },
    projects: {
      eyebrow: "Proyectos",
      title: "Espacios transformados.",
      sub: "Una selección de propiedades preparadas para encontrar nuevos propietarios. Haz clic en cualquier imagen para ampliarla.",
    },
    reviews: { title: "5,0 en Google", sub: "Lo que dicen quienes ya han confiado en Clementine." },
    reviewsList: [
      { name: "Justine Grebaut", text: "Clémentine es, sin duda, una gran profesional muy implicada. Además de tomarse el tiempo para entender las expectativas y exigencias, con mucha paciencia, aporta una mirada nueva al sector inmobiliario gracias a su experiencia inigualable en home staging. Solo puedo recomendarla enormemente.", role: "Clienta Home Staging y Fotografía" },
      { name: "Verònica Rico", text: "Clémentine es una mujer realmente entregada e impecable. Su gusto excepcional por la decoración interior es una baza considerable para la venta de nuestras casas y la puesta en valor de su elegancia.", role: "Agente inmobiliaria" },
      { name: "Sophie Corvaisier", text: "Clémentine es una profesional increíblemente entregada que me ha sido de gran ayuda durante todo el proceso de venta. Tiene un talento excepcional para crear espacios cautivadores y demuestra una gran eficacia en su gestión. La recomiendo sin dudarlo.", role: "Kretz Real Estate" },
    ],
    beforeAfterLabels: {
      livingKitchen: "Salón con cocina abierta",
      basement: "Sótano transformado",
      loungeView: "Salón con vistas",
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Resolvemos tus dudas.",
      items: [
        { q: "¿Qué es exactamente el home staging?", a: "El home staging es una técnica de marketing inmobiliario que prepara y embellece una vivienda para venderla o alquilarla más rápido y al mejor precio, despersonalizando y resaltando sus puntos fuertes." },
        { q: "¿Cuánto cuesta un servicio de home staging?", a: "El presupuesto se adapta a cada proyecto: superficie, estado de la vivienda y objetivo comercial. Ofrecemos una primera visita y valoración totalmente gratuita y sin compromiso." },
        { q: "¿En qué zona trabajáis?", a: "Operamos principalmente en el Sector Garraf – Barcelona. Para proyectos especiales, podemos desplazarnos a otras zonas de Cataluña." },
        { q: "¿Cuánto tiempo tarda una intervención?", a: "Una consultoría express se realiza en una sola visita. Una puesta en escena completa suele estar lista entre 3 y 7 días, según el alcance de la transformación." },
        { q: "¿Sois también agentes inmobiliarios?", a: "Sí, somos agencia API colegiada y podemos gestionar la venta o el alquiler de tu propiedad de principio a fin, integrando home staging, fotografía y comercialización." },
      ],
    },
    contact: {
      eyebrow: "Contacto",
      title: "¿Listo para transformar y vender tu propiedad?",
      sub: "Cuéntame tu proyecto. La primera visita y el diagnóstico inicial son completamente gratuitos.",
      hsLabel: "Home Staging",
      reLabel: "Real Estate",
    },
    footer: "Home Staging & Real Estate",
  },
  en: {
    nav: { realEstate: "Real Estate", services: "Services", projects: "Projects", about: "About me", reviews: "Reviews", faq: "FAQ", contact: "Contact" },
    hero: {
      eyebrow: "Home Staging · Real Estate · Garraf",
      slogan: "Making Homes Bloom",
      sub: "Comprehensive Home Staging and Real Estate studio in the Garraf - Barcelona. We transform your property to maximise its value and secure its sale. We prepare your home to make buyers fall in love and take care of the whole process, from start to finish.",
      whatsapp: "Chat on WhatsApp",
      visit: "Free visit",
      seeProjects: "See projects",
    },
    stats: [
      { l: "Google rating" }, { l: "Verified reviews" },
      { l: "Faster to sell" }, { l: "Personal attention" },
    ],
    about: {
      eyebrow: "About me",
      title: "Want to know more?",
      memberOf: "Member of:",
      body: [
        "When I had the chance to step into the Paris fashion world I had dreamed of since I was a little girl, I fell in love not only with the trends and Haute Couture, but also with the power of design and decoration. For me, the link between fashion and interiors has always been obvious.",
        "I evolved for over 20 years as an expert in the creation and organisation of events, trade-fair stands, conventions, fashion shows and catalogue shootings for international brands, always managing to blend fashion with the styling of spaces.",
        "Today I fuse that aesthetic vision with the rigour of the real estate sector. I am a professional home stager certified by The Home Staging School and a Certified Real Estate Agent in Catalonia (AICAT), member of API. This way, I put all my creativity, strategy and organisation at my clients' service, guaranteeing a safe, legal and brilliant process.",
        "My goal is to offer a comprehensive, tailor-made real estate service in the Garraf:",
        "As Home Stager and Seller: when I walk into a home, I love discovering its strengths and transforming the spaces so they convey wellbeing. I know exactly how to make a property irresistible to the market and how to manage its sale successfully and calmly.",
        "As Personal Property Shopper (Personal Buyer): I stand by the buyer's side. I use my designer's eye and my experience in the local market to find, filter and negotiate the ideal home, making sure my clients make a smart investment with no surprises.",
        "I am very attentive to detail and constantly look for harmony. In the end, whether preparing a home for sale or finding the ideal one for a buyer, my greatest reward is the same: getting people to fall in love with a home at first sight.",
      ],
    },
    company: {
      eyebrow: "A studio with aesthetic and strategic sensibility",
      title: "We transform, sell and find your home.",
      p1: "I am Clémentine, Real Estate Agent (API AICAT Certified) and Home Staging specialist. In my studio we blend legal rigour and sales strategy with a unique sensibility for real estate styling.",
      p2: "My job is to make your property's potential bloom so it stands out in the market and connects emotionally with buyers, or to guide you as a Personal Buyer to find your ideal investment.",
      location: "Garraf area – Barcelona",
    },
    realEstate: {
      eyebrow: "Real Estate · API Agent",
      title: "Your trusted Studio in the Garraf.",
      sub: "Much more than Home Staging: I manage the sale and rental of your property backed by my official licence (AICAT/API). You will have a single point of contact for the entire operation: from aesthetic prep and impactful marketing, to negotiation and legal closing. A comprehensive, smooth, no-middlemen service.",
      cta: "Value my property",
      pillars: [
        { title: "Property sales", desc: "Realistic valuation, high-impact visual marketing and a network of qualified buyers." },
        { title: "Long-term rentals", desc: "Tenant selection, contracts and hassle-free management for owners." },
        { title: "Personal Buyer", desc: "Support throughout the search, negotiation and signing with full legal security." },
        { title: "Marketing strategy", desc: "Local Garraf market study to sell at the best price in the shortest time." },
      ],
    },
    services: {
      eyebrow: "Services",
      title: "Everything your property needs.",
      sub: "From the initial consultation to signing at the notary, we're with you at every step.",
      items: [
        { title: "Full Home Staging", desc: "We transform each room to highlight your property's real potential and attract more buyers." },
        { title: "Express Consulting", desc: "Visit and diagnosis with concrete recommendations to prepare your home before selling or renting." },
        { title: "Photo Reportage", desc: "Professional photography that multiplies online views of your listing." },
        { title: "Sale & Rental", desc: "As a licensed API agency, we manage the sale and rental of your property from start to finish." },
      ],
    },
    beforeAfter: {
      eyebrow: "Before / After",
      title: "Slide to discover the magic.",
      sub: "Drag the centre bar to compare the before and after of one of our transformations.",
      before: "Before",
      after: "After",
    },
    projects: {
      eyebrow: "Projects",
      title: "Transformed spaces.",
      sub: "A selection of properties prepared to find new owners. Click any image to enlarge.",
    },
    reviews: { title: "5.0 on Google", sub: "What those who already trusted Clementine say." },
    reviewsList: [
      { name: "Justine Grebaut", text: "Clémentine is undoubtedly a great, highly committed professional. Beyond taking the time to understand expectations and requirements, with great patience, she brings a fresh perspective to the real estate sector thanks to her unparalleled experience in home staging. I can only recommend her wholeheartedly.", role: "Home Staging & Photography Client" },
      { name: "Verònica Rico", text: "Clémentine is a truly dedicated and impeccable woman. Her exceptional taste in interior design is a considerable asset for selling our homes and showcasing their elegance.", role: "Real estate agent" },
      { name: "Sophie Corvaisier", text: "Clémentine is an incredibly dedicated professional who has been of invaluable help throughout the sale process. She has an exceptional talent for creating captivating spaces and demonstrates great efficiency in her management. I recommend her without hesitation.", role: "Kretz Real Estate" },
    ],
    beforeAfterLabels: {
      livingKitchen: "Open-plan living & kitchen",
      basement: "Reimagined basement",
      loungeView: "Lounge with a view",
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "Your questions answered.",
      items: [
        { q: "What exactly is home staging?", a: "Home staging is a real-estate marketing technique that prepares and beautifies a home to sell or rent it faster and at the best price, by depersonalising it and highlighting its strengths." },
        { q: "How much does a home staging service cost?", a: "The budget is tailored to each project: size, condition and commercial goal. We offer a free, no-commitment first visit and valuation." },
        { q: "What area do you cover?", a: "We work mainly across the Garraf area – Barcelona. For special projects, we can travel to other parts of Catalonia." },
        { q: "How long does an intervention take?", a: "An express consultancy is done in a single visit. A full styling is usually ready in 3 to 7 days, depending on the scope of the transformation." },
        { q: "Are you also real estate agents?", a: "Yes — we are a licensed API agency and can handle the sale or rental of your property end-to-end, combining home staging, photography and marketing." },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Ready to transform and sell your property?",
      sub: "Tell me about your project. The first visit and initial diagnosis are completely free.",
      hsLabel: "Home Staging",
      reLabel: "Real Estate",
    },
    footer: "Home Staging & Real Estate",
  },
  fr: {
    nav: { realEstate: "Real Estate", services: "Services", projects: "Projets", about: "À propos", reviews: "Avis", faq: "FAQ", contact: "Contact" },
    hero: {
      eyebrow: "Home Staging · Real Estate · Garraf",
      slogan: "Making Homes Bloom",
      sub: "Studio de Home Staging intégral et Real Estate dans le Garraf - Barcelone. Nous transformons votre bien pour maximiser sa valeur et assurer sa vente. Nous préparons votre maison pour séduire les acheteurs et nous occupons de tout le processus, du début à la fin.",
      whatsapp: "Discuter sur WhatsApp",
      visit: "Visite gratuite",
      seeProjects: "Voir les projets",
    },
    stats: [
      { l: "Note Google" }, { l: "Avis vérifiés" },
      { l: "Plus rapide à vendre" }, { l: "Attention personnalisée" },
    ],
    about: {
      eyebrow: "À propos",
      title: "Envie d'en savoir plus ?",
      memberOf: "Membre de :",
      body: [
        "Quand j'ai eu la chance d'entrer dans le monde de la mode à Paris, dont je rêvais depuis toute petite, je ne suis pas seulement tombée amoureuse des tendances et de la Haute Couture, mais aussi du pouvoir du design et de la décoration. Pour moi, le lien entre la mode et les intérieurs a toujours été évident.",
        "J'ai ainsi évolué pendant plus de 20 ans comme experte dans la création et l'organisation d'événements, stands pour salons, conventions, défilés et shootings catalogues pour différentes marques à l'international, en parvenant toujours à fusionner la mode avec le stylisme des espaces.",
        "Aujourd'hui, je fusionne cette vision esthétique avec la rigueur du secteur immobilier. Je suis home stager professionnelle diplômée de The Home Staging School et Agent Immobilier Certifiée en Catalogne (AICAT), membre de l'API. Ainsi, je mets toute ma capacité de création, de stratégie et d'organisation au service de mes clients, en garantissant un processus sûr, légal et brillant.",
        "Mon objectif est d'offrir un service immobilier intégral et sur mesure dans le Garraf :",
        "En tant que Home Stager et Vendeuse : quand j'entre dans une maison, je me passionne pour découvrir ses points forts et transformer les espaces pour qu'ils transmettent du bien-être. Je sais exactement comment rendre un bien irrésistible sur le marché et comment gérer sa vente avec succès et sérénité.",
        "En tant que Personal Shopper Immobilier (Personal Buyer) : je me place aux côtés de l'acheteur. J'utilise mon œil clinique pour le design et mon expérience du marché local pour trouver, filtrer et négocier le bien idéal, en m'assurant que mes clients fassent un investissement intelligent et sans surprises.",
        "Je suis une personne très attentive aux détails et je recherche constamment l'harmonisation. Au final, qu'il s'agisse de préparer une maison à la vente ou de chercher le foyer idéal pour un acheteur, ma plus grande réussite est la même : faire en sorte que les gens tombent amoureux d'un bien au premier regard.",
      ],
    },
    company: {
      eyebrow: "Un studio à la sensibilité esthétique et stratégique",
      title: "Nous transformons, vendons et trouvons votre foyer.",
      p1: "Je suis Clémentine, Agent Immobilier (Certifiée API AICAT) et spécialiste en Home Staging. Dans mon studio, nous allions la rigueur juridique et la stratégie de vente à une sensibilité unique pour le stylisme immobilier.",
      p2: "Mon travail est de faire éclore le potentiel de votre bien pour qu'il se démarque sur le marché et touche les acheteurs, ou de vous guider en tant que Personal Buyer pour trouver votre investissement idéal.",
      location: "Secteur Garraf – Barcelone",
    },
    realEstate: {
      eyebrow: "Real Estate · Agent API",
      title: "Votre Studio de confiance dans le Garraf.",
      sub: "Bien plus que du Home Staging : je gère la vente et la location de votre bien avec la garantie d'être agréée (AICAT/API). Vous aurez une seule interlocutrice pour toute l'opération : de la préparation esthétique et du marketing d'impact, à la négociation et à la signature légale. Un service intégral, fluide et sans intermédiaires.",
      cta: "Estimer mon bien",
      pillars: [
        { title: "Vente de biens", desc: "Estimation réaliste, marketing visuel à fort impact et réseau d'acheteurs qualifiés." },
        { title: "Location longue durée", desc: "Sélection des locataires, contrats et gestion sans soucis pour les propriétaires." },
        { title: "Personal Buyer", desc: "Accompagnement dans la recherche, la négociation et la signature en toute sécurité juridique." },
        { title: "Stratégie marketing", desc: "Étude du marché local du Garraf pour vendre au meilleur prix dans les meilleurs délais." },
      ],
    },
    services: {
      eyebrow: "Services",
      title: "Tout ce dont votre bien a besoin.",
      sub: "De la première consultation à la signature chez le notaire, nous vous accompagnons à chaque étape.",
      items: [
        { title: "Home Staging complet", desc: "Nous transformons chaque pièce pour révéler le potentiel réel de votre bien et séduire plus d'acheteurs." },
        { title: "Consulting express", desc: "Visite et diagnostic avec des recommandations concrètes pour préparer votre logement avant de le vendre ou de le louer." },
        { title: "Reportage photo", desc: "Des photos professionnelles qui multiplient les visites en ligne de votre annonce." },
        { title: "Vente et location", desc: "En tant qu'agence API agréée, nous gérons la vente et la location de votre bien du début à la fin." },
      ],
    },
    beforeAfter: {
      eyebrow: "Avant / Après",
      title: "Faites glisser pour découvrir la magie.",
      sub: "Faites glisser la barre centrale pour comparer l'avant et l'après d'une de nos transformations.",
      before: "Avant",
      after: "Après",
    },
    projects: {
      eyebrow: "Projets",
      title: "Espaces transformés.",
      sub: "Une sélection de biens préparés pour trouver de nouveaux propriétaires. Cliquez sur une image pour l'agrandir.",
    },
    reviews: { title: "5,0 sur Google", sub: "Ce que disent celles et ceux qui ont déjà fait confiance à Clementine." },
    reviewsList: [
      { name: "Justine Grebaut", text: "Clémentine est sans aucun doute une grande professionnelle très impliquée. En plus de prendre le temps de comprendre les attentes et les exigences, avec beaucoup de patience, elle apporte un regard neuf au secteur immobilier grâce à son expérience inégalée en home staging. Je ne peux que la recommander chaleureusement.", role: "Cliente Home Staging et Photographie" },
      { name: "Verònica Rico", text: "Clémentine est une femme réellement dévouée et impeccable. Son goût exceptionnel pour la décoration d'intérieur est un atout considérable pour la vente de nos maisons et la mise en valeur de leur élégance.", role: "Agent immobilier" },
      { name: "Sophie Corvaisier", text: "Clémentine est une professionnelle incroyablement dévouée qui m'a été d'une aide précieuse tout au long du processus de vente. Elle possède un talent exceptionnel pour créer des espaces captivants et fait preuve d'une grande efficacité dans sa gestion. Je la recommande sans hésiter.", role: "Kretz Real Estate" },
    ],
    beforeAfterLabels: {
      livingKitchen: "Salon avec cuisine ouverte",
      basement: "Sous-sol transformé",
      loungeView: "Salon avec vue",
    },
    faq: {
      eyebrow: "Questions fréquentes",
      title: "Vos questions, nos réponses.",
      items: [
        { q: "Qu'est-ce que le home staging exactement ?", a: "Le home staging est une technique de marketing immobilier qui prépare et embellit un logement pour le vendre ou le louer plus rapidement et au meilleur prix, en le dépersonnalisant et en mettant en valeur ses atouts." },
        { q: "Combien coûte un service de home staging ?", a: "Le budget est adapté à chaque projet : surface, état du logement et objectif commercial. Nous offrons une première visite et estimation totalement gratuites et sans engagement." },
        { q: "Dans quelle zone intervenez-vous ?", a: "Nous travaillons principalement dans le Secteur Garraf – Barcelone. Pour des projets spéciaux, nous pouvons nous déplacer ailleurs en Catalogne." },
        { q: "Combien de temps dure une intervention ?", a: "Une consultation express se fait en une seule visite. Une mise en scène complète est généralement prête en 3 à 7 jours, selon l'ampleur de la transformation." },
        { q: "Êtes-vous aussi agents immobiliers ?", a: "Oui, nous sommes une agence API agréée et pouvons gérer la vente ou la location de votre bien de A à Z, en intégrant home staging, photographie et commercialisation." },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Prêt à transformer et vendre votre bien ?",
      sub: "Parlez-moi de votre projet. La première visite et le diagnostic initial sont entièrement gratuits.",
      hsLabel: "Home Staging",
      reLabel: "Real Estate",
    },
    footer: "Home Staging & Real Estate",
  },
} as const;

type Dict = (typeof dict)[Lang];
const I18nCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "es",
  setLang: () => {},
  t: dict.es,
});
const useT = () => useContext(I18nCtx);

/* ---------- WhatsApp icon ---------- */
function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>
    </svg>
  );
}

/* ---------- Reveal ---------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
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
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
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

/* ---------- Marquee banderole ---------- */
function Marquee({ items, variant = "primary" }: { items: string[]; variant?: "primary" | "outline" }) {
  const loop = [...items, ...items, ...items];
  const bg = variant === "primary"
    ? "bg-primary text-primary-foreground"
    : "bg-background text-foreground border-y border-border";
  return (
    <div className={`relative overflow-hidden ${bg} py-4 -my-px`}>
      <div className="flex whitespace-nowrap animate-[marquee_35s_linear_infinite] gap-12">
        {loop.map((it, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-sm md:text-base font-medium uppercase tracking-[0.25em]">
            <span className="opacity-70">✦</span> {it}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }`}</style>
    </div>
  );
}

/* ---------- Language switcher ---------- */
function LangSwitcher({ scrolled }: { scrolled: boolean }) {
  const { lang, setLang } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  const current = LANGS.find((l) => l.code === lang)!;
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm border transition ${
          scrolled ? "border-border text-foreground hover:bg-secondary" : "border-background/40 text-background hover:bg-background/10"
        }`}
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{current.flag}</span>
        <span className="uppercase text-xs tracking-wider font-medium">{current.code}</span>
        <ChevronDown className={`w-3 h-3 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-card border border-border rounded-xl shadow-[var(--shadow-soft)] overflow-hidden animate-[fadeIn_.15s_ease-out] z-50">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-secondary transition ${
                lang === l.code ? "bg-secondary text-primary font-medium" : "text-foreground"
              }`}
            >
              <span className="text-base">{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const { t, lang } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#real-estate", label: t.nav.realEstate },
    { href: "#sobre-mi", label: t.nav.about },
    { href: "#servicios", label: t.nav.services },
    { href: "#antes-despues", label: t.beforeAfter.eyebrow },
    { href: "#faq", label: t.nav.faq },
    { href: "#contacto", label: t.nav.contact },
  ];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 px-6 lg:px-12 py-4 flex items-center justify-between transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md shadow-[var(--shadow-soft)]" : "bg-transparent"}`}>
      <a href="#top" className="flex items-center gap-3">
        <img src={logo} alt="Clementine Homes" className={`h-24 md:h-32 w-auto rounded-md p-1.5 transition ${scrolled ? "bg-transparent" : "bg-background/95"}`} />
      </a>
      <div className={`hidden lg:flex items-center gap-7 text-sm transition ${scrolled ? "text-foreground" : "text-background/90"}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} className="hover:text-primary transition">{l.label}</a>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <LangSwitcher scrolled={scrolled} />
        <a href={waUrl(lang)} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center gap-2 text-sm bg-primary text-primary-foreground px-4 py-2 rounded-full hover:opacity-90 transition">
          <WhatsAppIcon className="w-4 h-4" /> WhatsApp
        </a>
        <button onClick={() => setMobileOpen((o) => !o)} className={`lg:hidden p-2 rounded-md transition ${scrolled ? "text-foreground hover:bg-secondary" : "text-background hover:bg-background/10"}`} aria-label="Menu">
          <Menu className="w-5 h-5" />
        </button>
      </div>
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-t border-border shadow-[var(--shadow-soft)] lg:hidden">
          <div className="flex flex-col py-2">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="px-6 py-3 text-sm text-foreground hover:bg-secondary">{l.label}</a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ---------- ScrollProgress ---------- */
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

/* ---------- Hero ---------- */
function Hero() {
  const { t, lang } = useT();
  return (
    <header id="top" className="relative min-h-screen flex items-end overflow-hidden">
      <img src={hero} alt="Interior elegante" className="absolute inset-0 w-full h-full object-cover scale-105 animate-[heroZoom_18s_ease-out_forwards]" />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/15 to-foreground/85" />
      <Nav />
      <div className="relative z-10 px-6 lg:px-12 pb-20 lg:pb-28 max-w-5xl">
        <span className="inline-flex items-center gap-2 text-background/90 text-xs uppercase tracking-[0.25em] mb-6 opacity-0 animate-[fadeUp_0.8s_0.1s_ease-out_forwards]">
          <span className="h-px w-10 bg-background/60" /> {t.hero.eyebrow}
        </span>
        <h1 className="font-display text-background text-5xl md:text-7xl lg:text-[8rem] leading-[1.02] mb-6 opacity-0 animate-[fadeUp_0.9s_0.25s_ease-out_forwards]">
          {t.hero.slogan}
        </h1>
        <p className="text-background/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed opacity-0 animate-[fadeUp_0.9s_0.55s_ease-out_forwards]">
          {t.hero.sub}
        </p>
        <div className="flex flex-wrap gap-4 opacity-0 animate-[fadeUp_0.9s_0.75s_ease-out_forwards]">
          <a href={waUrl(lang)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-4 rounded-full font-medium hover:scale-[1.03] active:scale-100 transition shadow-[var(--shadow-soft)]">
            <WhatsAppIcon className="w-5 h-5" /> {t.hero.whatsapp}
          </a>
          <a href="#contacto" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-full font-medium hover:scale-[1.03] active:scale-100 transition shadow-[var(--shadow-soft)]">
            {t.hero.visit} <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#antes-despues" className="inline-flex items-center gap-2 text-background border border-background/40 px-7 py-4 rounded-full font-medium hover:bg-background/10 transition">
            {t.hero.seeProjects}
          </a>
        </div>
      </div>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes heroZoom { from { transform: scale(1.15); } to { transform: scale(1.02); } }
        @keyframes pulseRing { 0% { box-shadow: 0 0 0 0 rgba(37,211,102,.55); } 70% { box-shadow: 0 0 0 18px rgba(37,211,102,0); } 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); } }
      `}</style>
    </header>
  );
}

/* ---------- Stats ---------- */
function Stats() {
  const { t } = useT();
  const values = [
    { v: 5, suffix: "", decimals: 1 },
    { v: 10, suffix: "+", decimals: 0 },
    { v: 3, suffix: "x", decimals: 0 },
    { v: 100, suffix: "%", decimals: 0 },
  ];
  return (
    <section className="bg-background py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {values.map((s, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="font-display text-4xl md:text-5xl text-primary mb-2">
              <Counter to={s.v} suffix={s.suffix} decimals={s.decimals} />
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">{t.stats[i].l}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- About founder ---------- */
function AboutFounder() {
  const { t } = useT();
  return (
    <section id="sobre-mi" className="py-24 px-6 lg:px-12 bg-background">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-[var(--shadow-soft)] relative" style={{ background: "var(--gradient-warm)" }}>
              <img src={portrait} alt="Clémentine Lanchier" className="absolute inset-0 w-full h-full object-contain object-bottom" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/55 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-background">
                <div className="text-xs uppercase tracking-[0.25em] opacity-80 mb-1">Clémentine Lanchier</div>
                <div className="font-display text-2xl">Home Stager & Agente API</div>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-primary/15 blur-2xl -z-0" />
          </div>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-7">
          <span className="text-xs uppercase tracking-[0.25em] text-primary mb-4 block">{t.about.eyebrow}</span>
          <h2 className="text-4xl md:text-5xl mb-6 font-display">{t.about.title}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {t.about.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="mt-10 pt-8 border-t border-border">
            <div className="text-xs uppercase tracking-[0.25em] text-primary mb-5">{t.about.memberOf}</div>
            <div className="flex flex-wrap items-center gap-8">
              <img src={logoApi} alt="API · Agent Immobiliari" className="h-12 md:h-14 w-auto object-contain" />
              <img src={logoWow} alt="Stagers WOW · Miembro VIP" className="h-16 md:h-20 w-auto object-contain" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Company short ---------- */
function Company() {
  const { t } = useT();
  return (
    <section className="py-24 px-6 lg:px-12 bg-secondary">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative group">
            <img src={hero} alt="Interior" className="rounded-2xl shadow-[var(--shadow-soft)] w-full transition duration-700 group-hover:scale-[1.02]" />
            <div className="absolute -bottom-6 -right-6 bg-background p-6 rounded-2xl shadow-[var(--shadow-soft)] hidden md:block">
              <div className="flex items-center gap-1 text-primary mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <div className="text-xs text-muted-foreground">5,0 · Google</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-primary mb-4 block">{t.company.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl mb-6">{t.company.title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t.company.p1}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{t.company.p2}</p>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <MapPin className="w-4 h-4 text-primary" /> {t.company.location}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Real estate ---------- */
function RealEstate() {
  const { t, lang } = useT();
  const icons = [Building2, Key, Handshake, TrendingUp];
  return (
    <section id="real-estate" className="py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-primary mb-4 block">{t.realEstate.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl mb-4">{t.realEstate.title}</h2>
            <p className="text-muted-foreground text-lg">{t.realEstate.sub}</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.realEstate.pillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={p.title} delay={i * 80}>
                <div className="h-full bg-card p-8 rounded-2xl border border-border hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl mb-3">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={200}>
          <div className="mt-12 flex flex-wrap gap-4">
            <a href={waUrl(lang)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-4 rounded-full font-medium hover:scale-[1.03] transition">
              <WhatsAppIcon className="w-5 h-5" /> {t.realEstate.cta}
            </a>
            <a href="mailto:info@clementinehomes.es" className="inline-flex items-center gap-2 border border-border px-7 py-4 rounded-full font-medium hover:bg-secondary transition">
              <Mail className="w-4 h-4" /> info@clementinehomes.es
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
function Services() {
  const { t } = useT();
  const icons = [Home, Sparkles, Camera, Key];
  return (
    <section id="servicios" className="py-24 px-6 lg:px-12 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-primary mb-4 block">{t.services.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl mb-4">{t.services.title}</h2>
            <p className="text-muted-foreground text-lg">{t.services.sub}</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.services.items.map((s, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={s.title} delay={i * 80}>
                <div className="h-full bg-card p-8 rounded-2xl border border-border hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Before / After slider ---------- */
function BASlider({ before, after, beforeLabel, afterLabel }: { before: string; after: string; beforeLabel: string; afterLabel: string }) {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const cx = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      updateFromClientX(cx);
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-[var(--shadow-soft)] select-none cursor-ew-resize bg-secondary"
      onMouseDown={(e) => { dragging.current = true; updateFromClientX(e.clientX); }}
      onTouchStart={(e) => { dragging.current = true; updateFromClientX(e.touches[0].clientX); }}
    >
      <img src={before} alt={beforeLabel} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute top-4 left-4 bg-foreground/70 text-background text-xs uppercase tracking-[0.25em] px-3 py-1.5 rounded-full backdrop-blur">
        {beforeLabel}
      </div>
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <img src={after} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.25em] px-3 py-1.5 rounded-full">
          {afterLabel}
        </div>
      </div>
      <div className="absolute top-0 bottom-0 w-px bg-background pointer-events-none" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg pointer-events-auto">
          <MoveHorizontal className="w-5 h-5 text-primary" />
        </div>
      </div>
    </div>
  );
}

function BeforeAfter() {
  const { t } = useT();
  return (
    <section id="antes-despues" className="py-24 px-6 lg:px-12 bg-background">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-primary mb-4 block">{t.beforeAfter.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl mb-4">{t.beforeAfter.title}</h2>
            <p className="text-muted-foreground text-lg">{t.beforeAfter.sub}</p>
          </div>
        </Reveal>
        <div className="space-y-10">
          {beforeAfterPairs.map((p, i) => (
            <Reveal key={p.key} delay={i * 80}>
              <div className="mb-3 flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.25em] text-primary">0{i + 1}</span>
                <span className="h-px flex-1 bg-border" />
                <span className="font-display text-lg md:text-xl">{t.beforeAfterLabels[p.key]}</span>
              </div>
              <BASlider before={p.before} after={p.after} beforeLabel={t.beforeAfter.before} afterLabel={t.beforeAfter.after} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Reviews ---------- */
function Reviews() {
  const { t } = useT();
  const reviewsList = t.reviewsList;
  return (
    <section id="opiniones" className="py-24 px-6 lg:px-12 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-1 text-primary mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <h2 className="text-4xl md:text-5xl mb-3">{t.reviews.title}</h2>
            <p className="text-muted-foreground">{t.reviews.sub}</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {reviewsList.map((r, i) => (
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

/* ---------- FAQ ---------- */
function FAQ() {
  const { t } = useT();
  return (
    <section id="faq" className="py-24 px-6 lg:px-12 bg-background">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-primary mb-4 block">{t.faq.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl">{t.faq.title}</h2>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <Accordion type="single" collapsible className="w-full">
            {t.faq.items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
                <AccordionTrigger className="text-left text-lg font-display py-6 hover:no-underline hover:text-primary transition">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const { t, lang } = useT();
  return (
    <section id="contacto" className="relative py-24 px-6 lg:px-12 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-warm)" }} />
      <div className="relative max-w-4xl mx-auto text-center text-primary-foreground">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.25em] mb-6 block opacity-90">{t.contact.eyebrow}</span>
          <h2 className="text-4xl md:text-6xl mb-6">{t.contact.title}</h2>
          <p className="text-lg opacity-90 mb-12 max-w-2xl mx-auto">{t.contact.sub}</p>
        </Reveal>
        <Reveal delay={120}>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a href={waUrl(lang)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-4 rounded-full font-medium hover:scale-[1.03] transition">
              <WhatsAppIcon className="w-5 h-5" /> WhatsApp
            </a>
            <a href="tel:+34620533054" className="inline-flex items-center gap-2 bg-background text-foreground px-7 py-4 rounded-full font-medium hover:scale-[1.03] transition">
              <Phone className="w-4 h-4" /> +34 620 53 30 54
            </a>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="max-w-md mx-auto mb-12 text-left">
            <a href="mailto:info@clementinehomes.es" className="flex items-center gap-3 bg-background/10 hover:bg-background/20 backdrop-blur border border-background/30 px-5 py-4 rounded-2xl transition">
              <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center"><Mail className="w-4 h-4" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider opacity-80">Email</div>
                <div className="text-sm font-medium break-all">info@clementinehomes.es</div>
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

/* ---------- Footer ---------- */
function Footer() {
  const { t } = useT();
  return (
    <footer className="bg-foreground text-background/70 py-10 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Clementine" className="h-16 w-auto bg-background rounded p-1" />
          <span>© {new Date().getFullYear()} Clementine Homes · {t.footer}</span>
        </div>
        <div>Secteur Garraf – Barcelone</div>
      </div>
      <div className="max-w-6xl mx-auto mt-6 text-center text-xs text-background/50">
        Designed by Merlin Wiart
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  const { lang } = useT();
  return (
    <a href={waUrl(lang)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 transition"
      style={{ animation: "pulseRing 2.4s infinite" }}>
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  );
}

/* ---------- Root ---------- */
function Index() {
  const [lang, setLang] = useState<Lang>("es");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (saved && (saved === "es" || saved === "en" || saved === "fr")) setLang(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("lang", lang);
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  return (
    <I18nCtx.Provider value={{ lang, setLang, t: dict[lang] }}>
      <main className="bg-background text-foreground scroll-smooth">
        <ScrollProgress />
        <Hero />
        <Stats />
        <Marquee variant="primary" items={[
          dict[lang].marquee.a,
          dict[lang].marquee.b,
          dict[lang].marquee.c,
          dict[lang].marquee.d,
        ]} />
        <AboutFounder />
        <Company />
        <RealEstate />
        <Services />
        <BeforeAfter />
        <Marquee variant="outline" items={[
          "Vilanova i la Geltrú",
          "Sitges",
          "Canyelles",
          "Cubelles",
          "Sant Pere de Ribes",
          "Garraf · Barcelona",
        ]} />
        <Reviews />
        <FAQ />
        <Contact />
        <Footer />
        <FloatingWhatsApp />
      </main>
    </I18nCtx.Provider>
  );
}
