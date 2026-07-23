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
  title: 'DoctorLife — Your body, finally understood',
  description:
    'Weight and hormonal care led by doctors, designed around your body — not a one-size-fits-all protocol.',
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
      lang="en-GB"
      className={`${hanken.variable} ${sora.variable} ${instrument.variable} ${geistMono.variable} bg-paper`}
    >
      <body className="bg-paper text-ink font-sans antialiased">
        {/* Preconnect to third-party origins: speeds up deferred script
            startup and improves LCP/INP. React 19 hoists these to <head>. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://widget.trustpilot.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://invitejs.trustpilot.com" />
        {/* Brand entity + sitelinks search box (global) */}
        <JsonLd data={[organizationSchema, websiteSchema]} />
        {/* Google Ads (gtag.js) — conversions */}
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
        {/* Trustpilot — review invitation / registration (global) */}
        <Script id="trustpilot-invite" strategy="afterInteractive">
          {`
            (function(w,d,s,r,n){w.TrustpilotObject=n;w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)};
              a=d.createElement(s);a.async=1;a.src=r;a.type='text/java'+s;f=d.getElementsByTagName(s)[0];
              f.parentNode.insertBefore(a,f)})(window,document,'script','https://invitejs.trustpilot.com/tp.min.js','tp');
            tp('register', 'wUdA9FYxfifhoMPy');
          `}
        </Script>
        {/* Trustpilot TrustBox — widget engine (global: hero, blogs, footer, etc.) */}
        <Script
          id="trustpilot-widget-bootstrap"
          strategy="afterInteractive"
          src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        />
        {children}
        <PublicWhatsAppBubble />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
