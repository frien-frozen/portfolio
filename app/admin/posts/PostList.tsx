'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PostList({ posts }: { posts: any[] }) {
    const router = useRouter();

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            console.log('Deleting post:', id);
            const res = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            });

            console.log('Delete response:', res.status, res.ok);

            if (res.ok) {
                router.refresh();
            } else {
                const error = await res.json();
                console.error('Delete failed:', error);
                alert('Failed to delete post: ' + (error.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Error deleting post: ' + error);
        }
    };

    return (
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
            <thead style={{ background: '#f9fafb' }}>
                <tr>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</th>
                    <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post) => (
                    <tr key={post.id} style={{ transition: 'background 0.2s' }}>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6', color: '#111827', fontWeight: 500 }}>{post.title}</td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6' }}>
                            <span style={{
                                padding: '0.25rem 0.75rem',
                                borderRadius: '9999px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                background: post.published ? '#ecfdf5' : '#fef2f2',
                                color: post.published ? '#059669' : '#dc2626',
                                border: `1px solid ${post.published ? '#a7f3d0' : '#fecaca'}`
                            }}>
                                {post.published ? 'Published' : 'Draft'}
                            </span>
                        </td>
                        <td style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6', color: '#6b7280', fontSize: '0.9rem' }}>
                            {post.published && post.publishedAt
                                ? new Date(post.publishedAt).toLocaleDateString()
                                : new Date(post.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #f3f4f6' }}>
                            <Link href={`/admin/posts/${post.id}`} style={{ marginRight: '1rem', color: '#2563eb', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>
                                Edit
                            </Link>
                            <button onClick={() => handleDelete(post.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 500, fontSize: '0.9rem' }}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                {posts.length === 0 && (
                    <tr>
                        <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>No posts found. Create your first post!</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
