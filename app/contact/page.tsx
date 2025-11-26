'use client';

import styles from './page.module.css';
import { motion } from 'framer-motion';
import { Send, Mail } from 'lucide-react';

export default function Contact() {
    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className={styles.title}>Contact Me</h1>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#ccc' }}>
                    Feel free to reach out via email or social media.
                </p>
                <motion.div
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.8rem 1.5rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}
                    whileHover={{ scale: 1.05, borderColor: 'rgba(118, 58, 245, 0.5)' }}
                >
                    <Mail size={20} color="#763AF5" />
                    <a href="mailto:ismatullohbakh2010@gmail.com" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>
                        ismatullohbakh2010@gmail.com
                    </a>
                </motion.div>
            </div>

            <form className={styles.form}>
                <div className={styles.group}>
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <input type="text" id="name" className={styles.input} placeholder="Your Name" />
                </div>
                <div className={styles.group}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input type="email" id="email" className={styles.input} placeholder="your@email.com" />
                </div>
                <div className={styles.group}>
                    <label htmlFor="message" className={styles.label}>Message</label>
                    <textarea id="message" className={styles.textarea} placeholder="How can I help you?"></textarea>
                </div>
                <motion.button
                    type="submit"
                    className={styles.button}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Send Message <Send size={18} />
                </motion.button>
            </form>
        </motion.div>
    );
}
