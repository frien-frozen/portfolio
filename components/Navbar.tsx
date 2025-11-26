'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <div className={styles.navContainer}>
            <motion.nav
                className={styles.nav}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <Link href="/" className={styles.logo}>
                    <img src="/profile.png" alt="Profile" className={styles.logoImage} />
                </Link>
                <div className={styles.links}>
                    {['Home', 'About', 'Projects', 'Blog', 'Contact'].map((item) => {
                        const href = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                        const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href));

                        return (
                            <Link
                                key={item}
                                href={href}
                                className={`${styles.link} ${isActive ? styles.active : ''}`}
                            >
                                {item}
                            </Link>
                        );
                    })}
                </div>
            </motion.nav>
        </div>
    );
}
