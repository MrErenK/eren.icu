import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PROFILE } from "@/lib/content";
import { CursorLight } from "@/components/cursor-light";
import { PresenceEggsProvider } from "@/components/presence-eggs";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

const inter = localFont({
  src: [
    { path: "./fonts/Inter-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Inter-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Inter-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const interDisplay = localFont({
  src: [
    {
      path: "./fonts/InterDisplay-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-inter-display",
  display: "swap",
});

const sourceCodePro = localFont({
  src: [
    {
      path: "./fonts/SourceCodePro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SourceCodePro-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-source-code",
  display: "swap",
});

const domainTitle = `${PROFILE.handle}${PROFILE.tld}`;
const siteDescription = `${PROFILE.name}, a student and developer building web tools, Android ROM utilities, and game mods.`;

export const metadata: Metadata = {
  metadataBase: new URL(`https://${domainTitle}`),
  title: {
    default: domainTitle,
    template: `%s | ${domainTitle}`,
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: domainTitle,
    title: domainTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: domainTitle,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${interDisplay.variable} ${sourceCodePro.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-paper text-zinc-950 transition-colors duration-200 dark:text-zinc-50">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-50 dark:focus:bg-zinc-100 dark:focus:text-zinc-950"
        >
          Skip to content
        </a>

        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 -z-20 h-[70vh] bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(255,255,255,0.85),transparent_72%)] dark:bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(255,255,255,0.045),transparent_72%)]"
        />
        <div
          aria-hidden="true"
          className="bg-dot-grid pointer-events-none fixed inset-0 -z-10 [mask-image:radial-gradient(ellipse_90%_60%_at_50%_0%,black_0%,rgba(0,0,0,0.35)_55%,transparent_100%)]"
        />
        <CursorLight />
        <ScrollProgress />

        <ThemeProvider>
          <PresenceEggsProvider>
            <SiteHeader />
            <main
              id="main-content"
              tabIndex={-1}
              className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 focus:outline-none sm:px-8 sm:py-14"
            >
              {children}
            </main>
            <SiteFooter />
          </PresenceEggsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
