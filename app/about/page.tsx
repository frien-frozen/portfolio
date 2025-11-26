'use client';

import Image from "next/image";
import Link from "next/link";
import styles from './page.module.css';
import { motion } from 'framer-motion';
import { Code2, Palette, Video, Figma, PenTool, Layers, Cpu, Monitor, Paperclip, Award } from 'lucide-react';
import ExperienceSection from "./ExperienceSection";

const technologies = [
    { name: 'React', icon: Code2 },
    { name: 'Mantine', icon: Layers },
    { name: 'Adobe Photoshop', icon: Palette },
    { name: 'Adobe Illustrator', icon: PenTool },
    { name: 'Adobe Premiere Pro', icon: Video },
    { name: 'Figma', icon: Figma }, // Lucide has Figma icon
    { name: 'Blender', icon: Cpu },
    { name: 'Adobe After Effects', icon: Monitor },
];

export default function About() {
    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className={styles.title}>About Me</h1>
            <div className={styles.content}>
                <div className={styles.bio}>
                    <p className={styles.text}>
                        Hello! I'm Ismatulloh, a passionate software engineer and digital artist based in Uzbekistan.
                        I enjoy creating things that live on the internet, whether that be websites, applications, or digital art.
                    </p>
                    <p className={styles.text}>
                        My journey in web development started back in 2023 when I decided to try editing custom Tumblr themes —
                        turns out hacking together HTML & CSS is pretty fun!
                    </p>
                    <p className={styles.text}>
                        Fast-forward to today, and I've had the privilege of working at an advertising agency, a start-up,
                        and a student-led design studio. My main focus these days is building accessible, inclusive products
                        and digital experiences for a variety of clients.
                    </p>
                </div>
        <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Technologies</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                padding: '1rem',
                                borderRadius: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.5rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                cursor: 'default'
                            }}
                        >
                            <tech.icon size={32} color="#763AF5" />
                            <span style={{ fontSize: '0.9rem', fontWeight: 500, textAlign: 'center' }}>{tech.name}</span>
                        </motion.div>
                    ))}
                </div>
                <ExperienceSection />

                <div className={styles.ctaSection}>
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.ctaButton} ${styles.primaryButton}`}
                    >
                        <Paperclip size={20} />
                        Check My Resume
                    </a>
                    <Link
                        href="/certificates"
                        className={`${styles.ctaButton} ${styles.secondaryButton}`}
                    >
                        <Award size={20} />
                        See Certificates
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
