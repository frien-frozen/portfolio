import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ConditionalLayout from "../components/ConditionalLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://baxtiyorov.uz'),
  title: {
    default: 'Ismatulloh Bakhtiyorov | Bakhtiyorov | Software Engineer',
    template: '%s | Bakhtiyorov',
  },
  description: 'Ismatulloh Bakhtiyorov (Bakhtiyorov) - Software Engineer & Digital Artist. Portfolio, projects, and blog by Ismatulloh.',
  keywords: [
    'Ismatulloh',
    'Bakhtiyorov',
    'Ismatulloh Bakhtiyorov',
    'Baxtiyorov',
    'Ismatulloh Baxtiyorov',
    'Software Engineer',
    'Web Developer',
    'Digital Artist',
    'Portfolio',
    'Next.js Developer',
    'React Developer',
    'TypeScript Developer',
    'Full Stack Developer',
    'Uzbekistan Developer',
  ],
  authors: [
    { name: 'Ismatulloh Bakhtiyorov' },
    { name: 'Bakhtiyorov' },
    { name: 'Ismatulloh' },
  ],
  creator: 'Ismatulloh Bakhtiyorov',
  publisher: 'Bakhtiyorov',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://baxtiyorov.uz',
    title: 'Ismatulloh Bakhtiyorov | Bakhtiyorov - Software Engineer',
    description: 'Portfolio and blog by Ismatulloh Bakhtiyorov. Software Engineer specializing in web development, digital art, and building exceptional digital experiences.',
    siteName: 'Bakhtiyorov',
    images: [
      {
        url: '/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Ismatulloh Bakhtiyorov',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ismatulloh Bakhtiyorov | Bakhtiyorov',
    description: 'Software Engineer & Digital Artist. Portfolio and blog by Ismatulloh.',
    creator: '@ismatullohbakh2',
    images: ['/profile.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  verification: {
    // Add your verification codes here when you set up Google Search Console
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
