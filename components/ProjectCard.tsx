'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    imageUrl?: string | null;
    link?: string | null;
}

function CardContent({ title, description, tags, imageUrl }: { title: string, description: string, tags: string[], imageUrl?: string | null }) {
    return (
        <div
            style={{
                transform: "translateZ(75px)",
                transformStyle: "preserve-3d",
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div className={styles.imageContainer}>
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0
                        }}
                    />
                ) : (
                    <>
                        <div className={styles.overlay} />
                        <span style={{ fontSize: '3rem', fontWeight: 800, color: 'rgba(255,255,255,0.1)' }}>
                            {title.charAt(0)}
                        </span>
                    </>
                )}
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <div className={styles.tags}>
                    {tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function ProjectCard({ title, description, tags, imageUrl, link }: ProjectCardProps) {
    // Simplified for debugging
    if (link) {
        return (
            <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <div className={styles.card}>
                    <CardContent title={title} description={description} tags={tags} imageUrl={imageUrl} />
                </div>
            </a>
        );
    }

    return (
        <div className={styles.card}>
            <CardContent title={title} description={description} tags={tags} imageUrl={imageUrl} />
        </div>
    );
}
