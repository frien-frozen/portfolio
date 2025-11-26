'use client';

import styles from './Background.module.css';
import Spotlight from './Spotlight';

export default function Background({ opacity = 1 }: { opacity?: number }) {
    return (
        <div className={styles.background} style={{ opacity }}>
            <Spotlight />
            <div className={`${styles.blob} ${styles.blob1}`} />
            <div className={`${styles.blob} ${styles.blob2}`} />
            <div className={`${styles.blob} ${styles.blob3}`} />
            <div className={styles.grid} />
        </div>
    );
}
