import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Clementine Homes · Home Staging y Real Estate en el Garraf (Barcelona)" },
      { name: "description", content: "Estudio de Home Staging integral y Real Estate en el Garraf – Barcelona. Agente inmobiliaria API/AICAT en Vilanova i la Geltrú, Sitges, Canyelles y Cubelles. Vende tu propiedad más rápido y al mejor precio." },
      { name: "keywords", content: "home staging Barcelona, home staging Garraf, home staging Sitges, home staging Vilanova i la Geltrú, agente inmobiliario Garraf, API AICAT, Personal Buyer Barcelona, fotografía inmobiliaria, Clementine Homes" },
      { name: "author", content: "Clementine Homes" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "theme-color", content: "#c98a5a" },
      { name: "geo.region", content: "ES-CT" },
      { name: "geo.placename", content: "Vilanova i la Geltrú, Garraf, Barcelona" },
      { property: "og:locale", content: "es_ES" },
      { property: "og:locale:alternate", content: "en_GB" },
      { property: "og:locale:alternate", content: "fr_FR" },
      { property: "og:site_name", content: "Clementine Homes" },
      { property: "og:url", content: "https://clementinehomes.es/" },
      { property: "og:title", content: "Clementine Homes · Home Staging y Real Estate en el Garraf" },
      { property: "og:description", content: "Estudio de Home Staging integral y Real Estate en el Garraf – Barcelona. Agente API/AICAT en Sitges, Vilanova i la Geltrú, Canyelles y Cubelles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Clementine Homes · Home Staging y Real Estate en el Garraf" },
      { name: "twitter:description", content: "Estudio de Home Staging integral y Real Estate en el Garraf – Barcelona." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/VxMZwLrg0GOLYA7I5YfmgxFNy7F2/social-images/social-1783427249531-Captura_de_pantalla_2026-07-07_142703.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/VxMZwLrg0GOLYA7I5YfmgxFNy7F2/social-images/social-1783427249531-Captura_de_pantalla_2026-07-07_142703.webp" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "canonical", href: "https://clementinehomes.es/" },
      { rel: "alternate", hrefLang: "es", href: "https://clementinehomes.es/" },
      { rel: "alternate", hrefLang: "en", href: "https://clementinehomes.es/" },
      { rel: "alternate", hrefLang: "fr", href: "https://clementinehomes.es/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://clementinehomes.es/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["LocalBusiness", "RealEstateAgent"],
              "@id": "https://clementinehomes.es/#business",
              name: "Clementine Homes",
              image: "https://storage.googleapis.com/gpt-engineer-file-uploads/VxMZwLrg0GOLYA7I5YfmgxFNy7F2/social-images/social-1783427249531-Captura_de_pantalla_2026-07-07_142703.webp",
              url: "https://clementinehomes.es/",
              telephone: "+34620533054",
              email: "info@clementinehomes.es",
              priceRange: "€€",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Vilanova i la Geltrú",
                addressRegion: "Barcelona",
                addressCountry: "ES",
              },
              areaServed: [
                "Vilanova i la Geltrú", "Sitges", "Canyelles", "Cubelles",
                "Sant Pere de Ribes", "Garraf", "Barcelona",
              ],
              sameAs: [
                "https://www.instagram.com/clementinehomes.es/",
                "https://www.linkedin.com/in/clementinelanchier",
                "https://es.pinterest.com/clementinehomestaging/",
              ],
              founder: { "@type": "Person", name: "Clémentine Lanchier", jobTitle: "Home Stager & Agente Inmobiliaria API/AICAT" },
              aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "10", bestRating: "5" },
            },
            {
              "@type": "WebSite",
              "@id": "https://clementinehomes.es/#website",
              url: "https://clementinehomes.es/",
              name: "Clementine Homes",
              inLanguage: ["es", "en", "fr"],
              publisher: { "@id": "https://clementinehomes.es/#business" },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
