'use client';

import { usePathname } from 'next/navigation';
import Background from './Background';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/auth');

    // Check if it's an admin/auth route OR a single blog post page (but not the main blog list) OR certificates page
    const isBlogPostOrCertificates = (pathname?.startsWith('/blog/') && pathname !== '/blog') || pathname === '/certificates';

    // For admin/auth routes, don't show anything
    if (isAdminRoute) {
        return <>{children}</>;
    }

    // For blog posts and certificates, show Background (with lower opacity handled in CSS/prop) but hide Navbar/Footer
    if (isBlogPostOrCertificates) {
        return (
            <>
                <Background opacity={0.3} />
                <main style={{ minHeight: "100vh", position: 'relative', zIndex: 1 }}>
                    {children}
                </main>
                <Footer />
            </>
        );
    }

    // For public routes, show full layout
    return (
        <>
            <Background />
            <Navbar />
            <main style={{ minHeight: "80vh", position: 'relative', zIndex: 1 }}>
                {children}
            </main>
            <Footer />
        </>
    );
}
