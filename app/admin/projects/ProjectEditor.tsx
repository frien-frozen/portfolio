'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ImageIcon } from 'lucide-react';
import styles from '../posts/PostEditor.module.css'; // Reusing styles

interface ProjectEditorProps {
    initialData?: {
        id: number;
        title: string;
        description: string;
        imageUrl: string;
        link: string;
        techStack: string;
    };
}

export default function ProjectEditor({ initialData }: ProjectEditorProps) {
    const router = useRouter();
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
    const [link, setLink] = useState(initialData?.link || '');
    const [techStack, setTechStack] = useState(initialData?.techStack || '');
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                setImageUrl(data.url);
            }
        } catch (error) {
            alert('Error uploading image');
        } finally {
            setUploading(false);
        }
    };

    // ... (handleSubmit remains same)

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            {/* ... (Title input remains same) */}
            
            {/* ... (Description, Tech Stack, Link inputs remain same - skipping to Image section) */}
            
                <div style={{ width: '300px' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Project Image</label>
                        <div
                            style={{
                                width: '100%',
                                height: '200px',
                                border: '2px dashed #d1d5db',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: uploading ? 'wait' : 'pointer',
                                overflow: 'hidden',
                                position: 'relative',
                                background: imageUrl ? `url(${imageUrl}) center/cover no-repeat` : '#f9fafb',
                                transition: 'all 0.2s',
                                opacity: uploading ? 0.7 : 1
                            }}
                            onClick={() => !uploading && fileInputRef.current?.click()}
                        >
                            {uploading ? (
                                <div style={{ textAlign: 'center', color: '#6b7280' }}>
                                    <div style={{ 
                                        width: '24px', 
                                        height: '24px', 
                                        border: '3px solid #e5e7eb', 
                                        borderTopColor: '#3b82f6', 
                                        borderRadius: '50%', 
                                        animation: 'spin 1s linear infinite',
                                        margin: '0 auto 0.5rem'
                                    }}></div>
                                    <p style={{ fontSize: '0.9rem' }}>Uploading...</p>
                                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                                </div>
                            ) : !imageUrl && (
                                <div style={{ textAlign: 'center', color: '#6b7280' }}>
                                    <ImageIcon size={32} style={{ marginBottom: '0.5rem' }} />
                                    <p style={{ fontSize: '0.9rem' }}>Click to upload</p>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                <button
                    type="submit"
                    disabled={saving}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: '#111827',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: saving ? 'not-allowed' : 'pointer',
                        opacity: saving ? 0.7 : 1,
                        fontSize: '1rem',
                        fontWeight: 500
                    }}
                >
                    {saving ? 'Saving...' : 'Save Project'}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: 'white',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#374151'
                    }}
                >
                    Cancel
                </button>
            </div>
        </form >
    );
}
