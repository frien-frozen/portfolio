'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import styles from './admin.module.css';
import { LayoutDashboard, FileText, FolderGit2, Settings, LogOut } from 'lucide-react';

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                <Link href="/admin" className={`${styles.link} ${pathname === '/admin' ? styles.active : ''}`}>
                    <LayoutDashboard size={20} />
                    Dashboard
                </Link>
                <Link href="/admin/posts" className={`${styles.link} ${pathname?.startsWith('/admin/posts') ? styles.active : ''}`}>
                    <FileText size={20} />
                    Posts
                </Link>
                <Link href="/admin/projects" className={`${styles.link} ${pathname?.startsWith('/admin/projects') ? styles.active : ''}`}>
                    <FolderGit2 size={20} />
                    Projects
                </Link>
                <Link href="/admin/settings" className={`${styles.link} ${pathname?.startsWith('/admin/settings') ? styles.active : ''}`}>
                    <Settings size={20} />
                    Settings
                </Link>
                <button onClick={() => signOut({ callbackUrl: '/' })} className={styles.logout}>
                    <LogOut size={20} />
                    Logout
                </button>
            </nav>
        </aside>
    );
}
