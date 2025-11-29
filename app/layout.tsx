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
    default: 'Ismatulloh Bakhtiyorov - Software Engineer & Digital Artist',
    template: '%s | Ismatulloh Bakhtiyorov',
  },
  description: 'Personal portfolio and blog of Ismatulloh Bakhtiyorov. Software Engineer specializing in web development, digital art, and building exceptional digital experiences.',
  keywords: [
    'Ismatulloh Bakhtiyorov',
    'Bakhtiyorov',
    'Software Engineer',
    'Web Developer',
    'Digital Artist',
    'Portfolio',
    'Next.js',
    'React',
    'TypeScript',
    'Full Stack Developer',
  ],
  authors: [{ name: 'Ismatulloh Bakhtiyorov' }],
  creator: 'Ismatulloh Bakhtiyorov',
  publisher: 'Ismatulloh Bakhtiyorov',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://baxtiyorov.uz',
    title: 'Ismatulloh Bakhtiyorov - Software Engineer & Digital Artist',
    description: 'Personal portfolio and blog of Ismatulloh Bakhtiyorov. Software Engineer specializing in web development, digital art, and building exceptional digital experiences.',
    siteName: 'Ismatulloh Bakhtiyorov',
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
    title: 'Ismatulloh Bakhtiyorov - Software Engineer & Digital Artist',
    description: 'Personal portfolio and blog of Ismatulloh Bakhtiyorov. Software Engineer specializing in web development, digital art, and building exceptional digital experiences.',
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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
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
