'use client';

import styles from './blog-post.module.css';

export default function BlogPostContent({ content }: { content: string }) {
    return (
        <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: content }}
            style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#ddd',
            }}
        />
    );
}
