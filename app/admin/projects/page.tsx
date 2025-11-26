'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import styles from '../admin.module.css';

interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    techStack: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setProjects(projects.filter((p) => p.id !== id));
            }
        } catch (error) {
            alert('Error deleting project');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className={styles.title}>Projects</h1>
                <Link href="/admin/projects/new" className={styles.newButton}>
                    <Plus size={20} />
                    New Project
                </Link>
            </div>

            <div className={styles.list}>
                {projects.map((project) => (
                    <div key={project.id} className={styles.item}>
                        <div className={styles.info}>
                            <h2 className={styles.itemTitle}>{project.title}</h2>
                            <p className={styles.itemMeta}>{project.techStack}</p>
                        </div>
                        <div className={styles.actions}>
                            <Link href={`/admin/projects/${project.id}`} className={styles.actionButton}>
                                <Edit size={18} />
                            </Link>
                            <button
                                onClick={() => handleDelete(project.id)}
                                className={`${styles.actionButton} ${styles.deleteButton}`}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
