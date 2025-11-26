'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <div className={styles.navContainer}>
            <motion.nav
                className={styles.nav}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <Link href="/" className={styles.logo}>
                    IB
                </Link>
                <div className={styles.links}>
                    {['Home', 'About', 'Projects', 'Blog', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                            className={styles.link}
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </motion.nav>
        </div>
    );
}
