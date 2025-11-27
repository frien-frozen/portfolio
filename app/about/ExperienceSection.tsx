import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';

const experiences = [
    {
        id: 'travel-n',
        company: 'Travel-N',
        role: 'Software Engineer Co-op',
        date: 'July 2024 - Present',
        link: 'https://beta-travel-n.vercel.app/',
        description: 'Designed and Build the web page of the School from 0 individually. Drew graphical elements for the web site.'
    },
    {
        id: 'dovuchcha',
        company: 'Dovuchcha',
        role: 'Developer, UI/UX Designer',
        date: 'May 2024 - Present',
        link: 'https://www.dovuchcha.uz/',
        description: 'In this project I should design thumbnails and graphical details for the YouTube channel, videos and for the web-site. I should update web site often make changes on it make it better. Nowadays I am manager of the project.'
    },
    {
        id: 'psvc',
        company: 'PSVC',
        role: 'Graphic Designer',
        date: 'Mart 2024 - Present',
        link: 'https://t.me/PSV_Community/',
        description: "I'll design graphical details & pictures"
    },
    {
        id: 'jizzakh-ps',
        company: 'Jizzakh PS',
        role: 'Developer, Graphic Designer',
        date: 'Autumn 2023 - 2027',
        link: 'https://www.jizzakhps.uz/',
        description: 'Designed and Build the web page of the School from 0 with my collaborator. Drew graphical elements for the web site.'
    },
    {
        id: 'the-dawn',
        company: 'The Dawn',
        role: 'Photographer & Layout Artist',
        date: 'September 2023 - Present',
        link: 'https://t.me/the_dawn_journal',
        description: 'At The Dawn Magazine, I will combine artistic vision with technical expertise, shaping the magazine’s visual narrative through meticulous layout design and evocative photography. As a Layout Artist, I will craft engaging and harmonious page designs that captivate readers and enhance the storytelling experience. My role as a Photographer, I will capture moments with a unique perspective, collect pictures for the magazine content to give better experience for the magazine’s audience. Whether through striking portraits, dynamic scenes, or artfully composed stiles.'
    }
];

export default function ExperienceSection() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section className={styles.experienceSection}>
            <motion.h2
                className={styles.sectionTitle}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                Where I&apos;ve Worked
            </motion.h2>

            <div className={styles.tabsContainer}>
                <div className={styles.tabList}>
                    {experiences.map((exp, index) => (
                        <button
                            key={exp.id}
                            className={`${styles.tabButton} ${activeTab === index ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab(index)}
                        >
                            {exp.company}
                        </button>
                    ))}
                </div>

                <div className={styles.tabContent}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className={styles.role}>
                                {experiences[activeTab].role} <span className={styles.companyName}>@ <a href={experiences[activeTab].link} target="_blank" rel="noopener noreferrer">{experiences[activeTab].company}</a></span>
                            </h3>
                            <p className={styles.date}>{experiences[activeTab].date}</p>
                            <div className={styles.description}>
                                {experiences[activeTab].description}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
