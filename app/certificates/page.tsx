'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './certificates.module.css';

interface Certificate {
    id: number;
    title: string;
    date: string;
    imageUrl: string;
}

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function CertificatesPage() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
        fetch('/api/certificates', {
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then(res => res.json())
            .then(data => {
                console.log('Certificates loaded:', data);
                setCertificates(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading certificates:', err);
                setLoading(false);
            });
    }, []);

    const closePreview = useCallback(() => {
        setSelectedIndex(null);
    }, []);

    const goToPrevious = useCallback(() => {
        if (selectedIndex === null) return;
        setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + certificates.length) % certificates.length));
    }, [selectedIndex, certificates.length]);

    const goToNext = useCallback(() => {
        if (selectedIndex === null) return;
        setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % certificates.length));
    }, [selectedIndex, certificates.length]);

    // Handle body overflow
    useEffect(() => {
        if (selectedIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedIndex]);

    // Keyboard shortcuts
    useEffect(() => {
        if (selectedIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closePreview();
            } else if (e.key === 'ArrowLeft') {
                goToPrevious();
            } else if (e.key === 'ArrowRight') {
                goToNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, certificates.length, closePreview, goToPrevious, goToNext]);

    const openPreview = (index: number) => {
        setSelectedIndex(index);
    };

    const handleDownload = () => {
        if (selectedIndex === null) return;
        const cert = certificates[selectedIndex];
        const link = document.createElement('a');
        link.href = cert.imageUrl;
        link.download = `${cert.title}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const selectedCert = selectedIndex !== null ? certificates[selectedIndex] : null;
    const hasPrevious = selectedIndex !== null && selectedIndex > 0;
    const hasNext = selectedIndex !== null && selectedIndex < certificates.length - 1;

    if (loading) {
        return (
            <div className={styles.container}>
                <motion.div
                    className={styles.loading}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    Loading certificates...
                </motion.div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Link href="/about" className={styles.backButton}>
                ← Back
            </Link>

            <motion.h1
                className={styles.title}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Certificates
            </motion.h1>

            {certificates.length === 0 ? (
                <motion.div
                    className={styles.empty}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <p>No certificates found.</p>
                </motion.div>
            ) : (
                <motion.div
                    className={styles.gallery}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            className={styles.card}
                            variants={cardVariants}
                            onClick={() => openPreview(index)}
                        >
                            <div className={styles.imageWrapper}>
                                <img
                                    src={cert.imageUrl}
                                    alt={cert.title}
                                    className={styles.image}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{cert.title}</h3>
                                <p className={styles.cardDate}>{cert.date}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Preview Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        className={styles.previewOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closePreview}
                    >
                        <motion.div
                            className={styles.previewModal}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={styles.previewHeader}>
                                <button
                                    className={styles.closeButton}
                                    onClick={closePreview}
                                    aria-label="Close"
                                >
                                    <X size={20} />
                                </button>
                                <h2 className={styles.previewTitle}>{selectedCert.title}</h2>
                                <button
                                    className={styles.downloadButton}
                                    onClick={handleDownload}
                                >
                                    <Download size={18} />
                                    Download
                                </button>
                            </div>
                            <div className={styles.previewContent}>
                                {hasPrevious && (
                                    <button
                                        className={`${styles.navButton} ${styles.navButtonLeft}`}
                                        onClick={goToPrevious}
                                        aria-label="Previous certificate"
                                    >
                                        <ChevronLeft size={32} />
                                    </button>
                                )}
                                <img
                                    src={selectedCert.imageUrl}
                                    alt={selectedCert.title}
                                    className={styles.previewImage}
                                />
                                {hasNext && (
                                    <button
                                        className={`${styles.navButton} ${styles.navButtonRight}`}
                                        onClick={goToNext}
                                        aria-label="Next certificate"
                                    >
                                        <ChevronRight size={32} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
