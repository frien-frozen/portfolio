'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './page.module.css';
import { ArrowRight } from 'lucide-react';

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string;
    imageUrl?: string | null;
    link?: string | null;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    createdAt: Date;
}

export default function HomeContent({ projects, posts }: { projects: Project[], posts: Post[] }) {
    return (
        <>
            <motion.section
                className={styles.section}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <h2 className={styles.sectionTitle}>Featured Projects</h2>
                <div className={styles.grid}>
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <motion.div key={project.id} className={styles.card} whileHover={{ y: -10 }}>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {project.techStack.split(',').map((tech, i) => (
                                        <span key={i} style={{
                                            padding: '0.25rem 0.75rem',
                                            background: 'rgba(118, 58, 245, 0.1)',
                                            borderRadius: '12px',
                                            fontSize: '0.85rem',
                                            color: '#d2bdffff'
                                        }}>
                                            {tech.trim()}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div className={styles.card} whileHover={{ y: -10 }}>
                            <h3>Coming Soon</h3>
                            <p>Projects will appear here once published.</p>
                        </motion.div>
                    )}
                </div>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link href="/projects" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#d2bdffff',
                        textDecoration: 'none',
                        fontWeight: 600
                    }}>
                        View All Projects <ArrowRight size={20} />
                    </Link>
                </div>
            </motion.section>

            <motion.section
                className={styles.section}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <h2 className={styles.sectionTitle}>Latest Posts</h2>
                <div className={styles.grid}>
                    {posts.length > 0 ? (
                        posts.map((post) => {
                            // Strip HTML and truncate to 50 words
                            const plainText = post.content ? post.content.replace(/<[^>]+>/g, '') : '';
                            const words = plainText.split(/\s+/);
                            const truncated = words.length > 50 ? words.slice(0, 50).join(' ') + '...' : plainText;

                            return (
                                <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                                    <motion.div className={styles.card} whileHover={{ y: -10 }}>
                                        <h3>{post.title}</h3>
                                        <p style={{
                                            wordBreak: 'break-word',
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            lineHeight: '1.5',
                                            maxHeight: '4.5em' // Fallback
                                        }}>{truncated || 'Read more...'}</p>
                                        <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#888' }}>
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </div>
                                    </motion.div>
                                </Link>
                            );
                        })
                    ) : (
                        <motion.div className={styles.card} whileHover={{ y: -10 }}>
                            <h3>Coming Soon</h3>
                            <p>Stay tuned for updates and tutorials.</p>
                        </motion.div>
                    )}
                </div>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link href="/blog" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#d2bdffff',
                        textDecoration: 'none',
                        fontWeight: 600
                    }}>
                        View All Posts <ArrowRight size={20} />
                    </Link>
                </div>
            </motion.section>
        </>
    );
}
