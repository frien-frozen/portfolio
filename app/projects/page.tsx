import styles from './page.module.css';
import { prisma } from '../../lib/prisma';
import ProjectsContent from './ProjectsContent';

export const metadata = {
    title: 'Projects | Bakhtiyorov',
    description: 'A collection of my work and projects.',
};

export default async function Projects() {
    const projects = await prisma.project.findMany({
        orderBy: [
            { order: 'asc' },
            { createdAt: 'desc' }
        ],
    });

    return (
        <div className={styles.container}>
            <ProjectsContent projects={projects} />
        </div>
    );
}
