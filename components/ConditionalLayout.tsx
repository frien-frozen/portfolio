'use client';

import { usePathname } from 'next/navigation';
import Background from './Background';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/auth');

    // For admin/auth routes, don't show navbar, footer, or background
    if (isAdminRoute) {
        return <>{children}</>;
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
