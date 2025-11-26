'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, ImageIcon, Calendar, Type } from 'lucide-react';
import styles from '../admin.module.css';

interface Certificate {
    id: number;
    title: string;
    date: string;
    imageUrl: string;
}

export default function AdminCertificates() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form state
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        try {
            const res = await fetch('/api/certificates');
            const data = await res.json();
            setCertificates(data);
        } catch (error) {
            console.error('Error fetching certificates:', error);
        } finally {
            setLoading(false);
        }
    };

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
            } else {
                alert('Upload failed: No URL returned');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!imageUrl) {
            alert('Please upload an image for the certificate');
            return;
        }

        if (!title || !date) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            const res = await fetch('/api/certificates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, date, imageUrl }),
            });

            if (res.ok) {
                // Reset form
                setTitle('');
                setDate('');
                setImageUrl('');
                if (fileInputRef.current) fileInputRef.current.value = '';
                fetchCertificates();
            } else {
                alert('Failed to create certificate');
            }
        } catch (error) {
            console.error('Error creating certificate:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this certificate?')) return;

        try {
            const res = await fetch(`/api/certificates/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setCertificates(certificates.filter(c => c.id !== id));
            } else {
                alert('Failed to delete certificate');
            }
        } catch (error) {
            console.error('Error deleting certificate:', error);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

    return (
        <div>
            <h1 className={styles.title} style={{ marginBottom: '2rem' }}>Manage Certificates</h1>

            {/* Add Certificate Form */}
            <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '3rem', maxWidth: '800px' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600, color: '#111827' }}>Add New Certificate</h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
                    <div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Title</label>
                            <div style={{ position: 'relative' }}>
                                <Type size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
                                    placeholder="Certificate Title"
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Date (Year)</label>
                            <div style={{ position: 'relative' }}>
                                <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                <input
                                    type="text"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
                                    placeholder="e.g. 2024"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Certificate Image</label>
                        <div
                            style={{
                                width: '100%',
                                height: '200px',
                                border: '2px dashed #d1d5db',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                position: 'relative',
                                background: imageUrl ? `url(${imageUrl}) center/cover no-repeat` : '#f9fafb',
                                transition: 'all 0.2s'
                            }}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {!imageUrl && (
                                <div style={{ textAlign: 'center', color: '#6b7280' }}>
                                    <ImageIcon size={32} style={{ marginBottom: '0.5rem' }} />
                                    <p style={{ fontSize: '0.9rem' }}>Click to upload</p>
                                </div>
                            )}
                            {uploading && (
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151', fontWeight: 500 }}>
                                    Uploading...
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

                <button
                    type="submit"
                    disabled={uploading}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: '#111827',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: uploading ? 'not-allowed' : 'pointer',
                        fontWeight: 500,
                        fontSize: '1rem',
                        marginTop: '1rem',
                        opacity: uploading ? 0.7 : 1
                    }}
                >
                    {uploading ? 'Uploading...' : 'Add Certificate'}
                </button>
            </form>

            {/* Certificates List */}
            <div className={styles.list}>
                {certificates.map((cert) => (
                    <div key={cert.id} className={styles.item}>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ width: '80px', height: '60px', borderRadius: '4px', overflow: 'hidden', background: '#f3f4f6' }}>
                                <img src={cert.imageUrl} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div className={styles.info}>
                                <h3 className={styles.itemTitle}>{cert.title}</h3>
                                <p className={styles.itemMeta}>{cert.date}</p>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <button
                                onClick={() => handleDelete(cert.id)}
                                className={`${styles.actionButton} ${styles.deleteButton}`}
                                title="Delete Certificate"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
                {certificates.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280', background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                        <p>No certificates found. Add one above!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
