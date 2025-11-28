'use client';

import styles from './page.module.css';
import { motion } from 'framer-motion';
import ProjectCard from '../../components/ProjectCard';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string;
    imageUrl: string;
    link: string;
}

export default function ProjectsContent({ projects }: { projects: Project[] }) {
    return (
        <>
            <motion.h1
                className={styles.title}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                My Projects
            </motion.h1>
            <motion.div
                className={styles.grid}
                variants={container}
            // initial="hidden"
            // animate="show"
            >
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <motion.div key={project.id} style={{ height: '100%' }}>
                            <ProjectCard
                                title={project.title}
                                description={project.description}
                                tags={project.techStack.split(',').map(t => t.trim())}
                                imageUrl={project.imageUrl}
                                link={project.link}
                            />
                        </motion.div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', color: '#666', gridColumn: '1 / -1' }}>
                        No projects yet. Check back soon!
                    </p>
                )}
            </motion.div>
        </>
    );
}
