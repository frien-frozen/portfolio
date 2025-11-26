'use client';

import styles from './Footer.module.css';
import { Github, Twitter, Linkedin, Send, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Twitter, href: "https://x.com/ismatullohbakh2" },
        { icon: Github, href: "https://github.com/baxt1y0rov" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/ا%D9%90سْمَةُ-الله-بختيرو-32b661230/" },
        { icon: Send, href: "https://t.me/baxt1y0rov" }, // Telegram
        { icon: Instagram, href: "https://www.instagram.com/bakkhtiyoroff" }
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.socials}>
                {socialLinks.map((social, index) => (
                    <motion.a
                        key={index}
                        href={social.href}
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3, scale: 1.1, color: '#fff' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <social.icon size={20} />
                    </motion.a>
                ))}
            </div>
            <p className={styles.copyright}>&copy; {currentYear} Bakhtiyorov. All rights reserved.</p>
        </footer>
    );
}
