import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Hanken_Grotesk, Instrument_Serif, Sora } from 'next/font/google'
import { PublicWhatsAppBubble } from '@/components/public-whatsapp-bubble'
import { JsonLd } from '@/components/seo/json-ld'
import { organizationSchema, websiteSchema } from '@/lib/seo'
import './globals.css'

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hanken',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-sora',
  display: 'swap',
})

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://doctorlife.io'),
  title: 'DoctorLife — Tu cuerpo, por fin entendido',
  description:
    'Cuidado del peso y hormonal dirigido por médicos, diseñado en torno a tu cuerpo — no a un protocolo único.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${hanken.variable} ${sora.variable} ${instrument.variable} ${geistMono.variable} bg-paper`}
    >
      <body className="bg-paper text-ink font-sans antialiased">
        {/* Entidad de marca + buscador de sitelinks (global) */}
        <JsonLd data={[organizationSchema, websiteSchema]} />
        {/* Google Ads (gtag.js) — conversiones */}
        <Script
          id="gtag-src"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18265536787"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18265536787');
          `}
        </Script>
        {children}
        <PublicWhatsAppBubble />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
