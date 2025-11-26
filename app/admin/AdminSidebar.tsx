'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import styles from './admin.module.css';
import { FileText, FolderGit2, LogOut, Mail } from 'lucide-react';

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                <Link href="/admin/posts" className={`${styles.link} ${pathname?.startsWith('/admin/posts') ? styles.active : ''}`}>
                    <FileText size={20} />
                    Posts
                </Link>
                <Link href="/admin/projects" className={`${styles.link} ${pathname?.startsWith('/admin/projects') ? styles.active : ''}`}>
                    <FolderGit2 size={20} />
                    Projects
                </Link>
                <Link href="/admin/certificates" className={`${styles.link} ${pathname?.startsWith('/admin/certificates') ? styles.active : ''}`}>
                    <FileText size={20} />
                    Certificates
                </Link>
                <Link href="/admin/messages" className={`${styles.link} ${pathname?.startsWith('/admin/messages') ? styles.active : ''}`}>
                    <Mail size={20} />
                    Messages
                </Link>
                <button onClick={() => signOut({ callbackUrl: '/' })} className={styles.logout}>
                    <LogOut size={20} />
                    Logout
                </button>
            </nav>
        </aside>
    );
}
