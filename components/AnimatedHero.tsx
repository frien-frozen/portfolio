'use client';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react';
import styles from '../app/page.module.css';
import TextScramble from './TextScramble';

// Simple coding animation JSON (placeholder)
const codingAnimation = {
    v: "5.5.7",
    fr: 60,
    ip: 0,
    op: 60,
    w: 100,
    h: 100,
    nm: "Coding",
    ddd: 0,
    assets: [],
    layers: [
        {
            ddd: 0,
            ind: 1,
            ty: 4,
            nm: "Brackets",
            sr: 1,
            ks: {
                o: { a: 1, k: [{ i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] }, { t: 30, s: [100] }] },
                r: { a: 0, k: 0, ix: 2 },
                p: { a: 0, k: [50, 50, 0], ix: 2 },
                a: { a: 0, k: [0, 0, 0], ix: 1 },
                s: { a: 1, k: [{ i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 0, s: [0, 0, 100] }, { t: 30, s: [100, 100, 100] }] }
            },
            ao: 0,
            shapes: [
                {
                    ty: "gr",
                    it: [
                        {
                            d: 1,
                            ty: "el",
                            s: { a: 0, k: [80, 80], ix: 2 },
                            p: { a: 0, k: [0, 0], ix: 3 },
                            nm: "Circle",
                            mn: "ADBE Vector Shape - Ellipse",
                            hd: false
                        },
                        {
                            ty: "st",
                            c: { a: 0, k: [0.2, 0.2, 0.2, 1], ix: 3 },
                            o: { a: 0, k: 100, ix: 4 },
                            w: { a: 0, k: 4, ix: 5 },
                            lc: 1,
                            lj: 1,
                            ml: 4,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke",
                            hd: false
                        }
                    ],
                    nm: "Group 1",
                    np: 2,
                    cix: 2,
                    bm: 0,
                    ix: 1,
                    mn: "ADBE Vector Group",
                    hd: false
                }
            ],
            ip: 0,
            op: 60,
            st: 0,
            bm: 0
        }
    ]
};

export default function AnimatedHero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <section className={styles.hero} style={{ position: 'relative', overflow: 'hidden', minHeight: '90vh', marginTop: '-80px' }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ zIndex: 2, position: 'relative', maxWidth: '800px' }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        background: 'rgba(118, 58, 245, 0.1)',
                        border: '1px solid rgba(118, 58, 245, 0.2)',
                        borderRadius: '50px',
                        color: '#763AF5',
                        marginBottom: '1.5rem',
                        fontWeight: 500
                    }}
                >
                    Available for hire
                </motion.div>

                <h1 className={styles.title} style={{ fontSize: '5rem', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                    Ismatulloh <br />
                    <span style={{
                        color: 'rgba(255, 255, 255, 0.05)',
                        WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',
                        textShadow: '0 0 30px rgba(118, 58, 245, 0.5)',
                        display: 'inline-block',
                        position: 'relative',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                    }}>
                        <span style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'blur(2px)',
                            zIndex: -1
                        }}>
                            <TextScramble text="Bakhtiyorov" />
                        </span>
                        <TextScramble text="Bakhtiyorov" />
                    </span>
                </h1>

                <p className={styles.subtitle} style={{ fontSize: '1.2rem', color: '#ddd', marginBottom: '2.5rem' }}>
                    Engineer & Digital Artist. Specializing in building exceptional digital experiences.
                </p>

                <div className={styles.cta} style={{ gap: '1.5rem', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/projects" className={`${styles.button} ${styles.primary}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            View Projects <ArrowRight size={18} />
                        </Link>
                    </motion.div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {[
                            { icon: Github, href: 'https://github.com/baxt1y0rov' },
                            { icon: Twitter, href: 'https://x.com/ismatullohbakh2' },
                            { icon: Linkedin, href: 'https://www.linkedin.com/in/ا%D9%90سْمَةُ-الله-بختيرو-32b661230/' },
                            { icon: Mail, href: 'mailto:ismatullohbakh2010@gmail.com' }
                        ].map((item, i) => (
                            <motion.a
                                key={i}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -3, color: '#fff' }}
                                style={{ color: '#ccc', transition: 'color 0.2s' }}
                            >
                                <item.icon size={24} />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '-10%',
                    transform: 'translateY(-50%)',
                    width: '600px',
                    height: '600px',
                    zIndex: 1,
                    pointerEvents: 'none',
                    filter: 'blur(40px)'
                }}
            >
                <Lottie animationData={codingAnimation} loop={true} />
            </motion.div>
        </section>
    );
}
