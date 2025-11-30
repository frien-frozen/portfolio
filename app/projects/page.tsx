import styles from './page.module.css';
import { prisma } from '../../lib/prisma';
import ProjectsContent from './ProjectsContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Explore my portfolio of web development projects. From modern web applications to creative digital experiences, see what I&apos;ve built using Next.js, React, TypeScript, and more.',
    openGraph: {
        title: 'Projects by Ismatulloh Bakhtiyorov',
        description: 'Explore my portfolio of web development projects and creative digital experiences.',
        url: 'https://baxtiyorov.uz/projects',
        type: 'website',
    },
};

export default async function Projects() {
    const projects = await prisma.project.findMany({
        where: { visible: true },
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
