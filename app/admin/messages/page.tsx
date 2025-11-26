'use client';

import { useState, useEffect } from 'react';
import { Trash2, Mail, Calendar, User, MessageSquare } from 'lucide-react';
import styles from '../admin.module.css';

interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

export default function AdminMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch('/api/messages');
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            const res = await fetch(`/api/messages/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setMessages(messages.filter(m => m.id !== id));
            } else {
                alert('Failed to delete message');
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

    return (
        <div>
            <h1 className={styles.title} style={{ marginBottom: '2rem' }}>Messages</h1>

            {messages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <MessageSquare size={48} style={{ marginBottom: '1rem', color: '#d1d5db' }} />
                    <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>No messages yet.</p>
                </div>
            ) : (
                <div className={styles.list}>
                    {messages.map((msg) => (
                        <div key={msg.id} className={styles.item} style={{ display: 'block' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div className={styles.info}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <User size={16} color="#4b5563" />
                                        <h3 className={styles.itemTitle}>{msg.name}</h3>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.9rem' }}>
                                        <Mail size={14} />
                                        <a href={`mailto:${msg.email}`} style={{ color: '#6b7280', textDecoration: 'none' }}>{msg.email}</a>
                                        <span style={{ margin: '0 0.5rem' }}>•</span>
                                        <Calendar size={14} />
                                        <span>{new Date(msg.createdAt).toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className={styles.actions}>
                                    <button
                                        onClick={() => handleDelete(msg.id)}
                                        className={`${styles.actionButton} ${styles.deleteButton}`}
                                        title="Delete Message"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '6px', color: '#374151', lineHeight: '1.6', whiteSpace: 'pre-wrap', border: '1px solid #f3f4f6' }}>
                                {msg.message}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
