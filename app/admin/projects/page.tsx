'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import styles from '../admin.module.css';

interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    techStack: string;
    visible: boolean;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [draggedItem, setDraggedItem] = useState<Project | null>(null);

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
        } catch {
            alert('Error deleting project');
        }
    };

    const toggleVisibility = async (id: number, currentVisibility: boolean) => {
        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ visible: !currentVisibility }),
            });
            if (res.ok) {
                setProjects(projects.map(p =>
                    p.id === id ? { ...p, visible: !currentVisibility } : p
                ));
            }
        } catch {
            alert('Error updating visibility');
        }
    };

    const onDragStartItem = (e: React.DragEvent, index: number) => {
        setDraggedItem(projects[index]);
        e.dataTransfer.effectAllowed = 'move';
        // Optional: Set custom drag image
    };

    const onDragOverItem = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        const draggedOverItem = projects[index];

        if (draggedItem === draggedOverItem) return;

        const items = projects.filter(item => item !== draggedItem);
        items.splice(index, 0, draggedItem!);
        setProjects(items);
    };

    const onDragEndItem = async () => {
        setDraggedItem(null);

        try {
            const itemsWithOrder = projects.map((item, index) => ({
                id: item.id,
                order: index
            }));

            await fetch('/api/projects/reorder', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: itemsWithOrder }),
            });
        } catch (error) {
            console.error('Error saving order:', error);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className={styles.title}>Projects</h1>
                <Link href="/admin/projects/new" className={styles.newButton}>
                    <Plus size={20} />
                    New Project
                </Link>
            </div>

            <div className={styles.list}>
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className={styles.item}
                        draggable
                        onDragStart={(e) => onDragStartItem(e, index)}
                        onDragOver={(e) => onDragOverItem(e, index)}
                        onDragEnd={onDragEndItem}
                        style={{ cursor: 'move', opacity: draggedItem === project ? 0.5 : 1 }}
                    >
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flex: 1 }}>
                            <div style={{ color: '#9ca3af', cursor: 'grab' }} title="Drag to reorder">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg>
                            </div>
                            <div style={{ width: '80px', height: '60px', borderRadius: '4px', overflow: 'hidden', background: '#f3f4f6' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div className={styles.info}>
                                <h2 className={styles.itemTitle}>{project.title}</h2>
                                <p className={styles.itemMeta}>{project.techStack}</p>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <button
                                onClick={() => toggleVisibility(project.id, project.visible)}
                                className={styles.actionButton}
                                title={project.visible ? 'Hide project' : 'Show project'}
                            >
                                {project.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
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
