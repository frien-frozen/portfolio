'use client';

import styles from './Background.module.css';
import Spotlight from './Spotlight';

export default function Background() {
    return (
        <div className={styles.background}>
            <Spotlight />
            <div className={`${styles.blob} ${styles.blob1}`} />
            <div className={`${styles.blob} ${styles.blob2}`} />
            <div className={`${styles.blob} ${styles.blob3}`} />
            <div className={styles.grid} />
        </div>
    );
}
