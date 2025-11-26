'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './blog.module.css';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariant = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 }
};

interface Post {
    id: number;
    title: string;
    slug: string;
    createdAt: string | Date;
    publishedAt: string | Date | null;
}

interface BlogContentProps {
    postsByYear: Record<number, Post[]>;
    years: number[];
}

export default function BlogContent({ postsByYear, years }: BlogContentProps) {
    return (
        <div className={styles.container}>
            <motion.h1
                className={styles.title}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Blog
            </motion.h1>
            <motion.p
                className={styles.subtitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Thoughts, tutorials, and insights on development and design.
            </motion.p>

            {years.length > 0 ? (
                years.map((year, yearIndex) => (
                    <motion.div
                        key={year}
                        className={styles.yearSection}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + yearIndex * 0.1 }}
                    >
                        <h2 className={styles.yearTitle}>{year}</h2>
                        <motion.ul
                            className={styles.postList}
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                        >
                            {postsByYear[year].map(post => (
                                <motion.li
                                    key={post.id}
                                    className={styles.postItem}
                                    variants={itemVariant}
                                    whileHover={{ scale: 1.01 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                                        <span className={styles.postDate}>
                                            {(post.publishedAt ? new Date(post.publishedAt) : new Date(post.createdAt)).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                        <span className={styles.postTitle}>{post.title}</span>
                                        <span className={styles.arrow}>→</span>
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                ))
            ) : (
                <motion.div
                    className={styles.emptyState}
                    {...fadeInUp}
                >
                    <p>No posts yet. Check back soon!</p>
                </motion.div>
            )}
        </div>
    );
}
