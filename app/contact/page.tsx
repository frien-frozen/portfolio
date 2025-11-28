'use client';

import styles from './page.module.css';
import { motion } from 'framer-motion';
import { Send, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

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
                    <a href="mailto:contact@baxtiyorov.uz" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>
                        contact@baxtiyorov.uz
                    </a>
                </motion.div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <input type="text" id="name" name="name" className={styles.input} placeholder="Your Name" required />
                </div>
                <div className={styles.group}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input type="email" id="email" name="email" className={styles.input} placeholder="your@email.com" required />
                </div>
                <div className={styles.group}>
                    <label htmlFor="message" className={styles.label}>Message</label>
                    <textarea id="message" name="message" className={styles.textarea} placeholder="How can I help you?" required></textarea>
                </div>
                <motion.button
                    type="submit"
                    className={styles.button}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === 'loading'}
                    style={{ opacity: status === 'loading' ? 0.7 : 1 }}
                >
                    {status === 'loading' ? 'Sending...' : 'Send Message'} <Send size={18} />
                </motion.button>
                {status === 'success' && <p style={{ color: '#4ade80', marginTop: '1rem', textAlign: 'center' }}>Message sent successfully!</p>}
                {status === 'error' && <p style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center' }}>Failed to send message. Please try again.</p>}
            </form>
        </motion.div>
    );
}
