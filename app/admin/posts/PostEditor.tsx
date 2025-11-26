'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';

interface PostEditorProps {
    initialData?: {
        id: number;
        title: string;
        slug: string;
        content: string;
        excerpt?: string | null;
        published: boolean;
        publishedAt?: Date | string | null;
    };
}

export default function PostEditor({ initialData }: PostEditorProps) {
    const router = useRouter();
    const [title, setTitle] = useState(initialData?.title || '');
    const [slug, setSlug] = useState(initialData?.slug || '');
    const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
    const [published, setPublished] = useState(initialData?.published || false);
    const [publishedAt, setPublishedAt] = useState<string>(
        initialData?.publishedAt
            ? new Date(initialData.publishedAt).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
    );
    const [saving, setSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Image,
        ],
        content: initialData?.content || '',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4 border rounded-md',
            },
        },
    });

    const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            if (data.url) {
                editor?.chain().focus().setImage({ src: data.url }).run();
            }
        } catch (error) {
            alert('Failed to upload image');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const data = {
            title,
            slug,
            excerpt,
            content: editor?.getHTML() || '',
            published,
            publishedAt,
        };

        try {
            const res = await fetch(initialData ? `/api/posts/${initialData.id}` : '/api/posts', {
                method: initialData ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error('Save failed:', errorData);
                throw new Error(errorData.error || 'Failed to save post');
            }

            router.push('/admin/posts');
            router.refresh();
        } catch (error) {
            console.error('Error saving post:', error);
            alert('Error saving post: ' + (error instanceof Error ? error.message : 'Unknown error'));
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
                    required
                />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Slug</label>
                <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
                    required
                />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Excerpt</label>
                <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', minHeight: '100px', fontSize: '1rem', fontFamily: 'inherit' }}
                />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Content</label>

                {/* Editor Toolbar */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    padding: '0.5rem',
                    background: '#f9fafb',
                    border: '1px solid #d1d5db',
                    borderBottom: 'none',
                    borderTopLeftRadius: '6px',
                    borderTopRightRadius: '6px'
                }}>
                    <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} style={{ fontWeight: 'bold', padding: '0.25rem 0.5rem', borderRadius: '4px', background: editor?.isActive('bold') ? '#e5e7eb' : 'transparent' }}>B</button>
                    <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} style={{ fontStyle: 'italic', padding: '0.25rem 0.5rem', borderRadius: '4px', background: editor?.isActive('italic') ? '#e5e7eb' : 'transparent' }}>I</button>
                    <button type="button" onClick={() => editor?.chain().focus().toggleStrike().run()} style={{ textDecoration: 'line-through', padding: '0.25rem 0.5rem', borderRadius: '4px', background: editor?.isActive('strike') ? '#e5e7eb' : 'transparent' }}>S</button>
                    <div style={{ width: '1px', background: '#d1d5db', margin: '0 0.25rem' }}></div>
                    <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', background: editor?.isActive('heading', { level: 2 }) ? '#e5e7eb' : 'transparent' }}>H2</button>
                    <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', background: editor?.isActive('heading', { level: 3 }) ? '#e5e7eb' : 'transparent' }}>H3</button>
                    <div style={{ width: '1px', background: '#d1d5db', margin: '0 0.25rem' }}></div>
                    <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', background: editor?.isActive('bulletList') ? '#e5e7eb' : 'transparent' }}>• List</button>
                    <button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()} style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', background: editor?.isActive('orderedList') ? '#e5e7eb' : 'transparent' }}>1. List</button>
                    <div style={{ width: '1px', background: '#d1d5db', margin: '0 0.25rem' }}></div>
                    <button type="button" onClick={() => editor?.chain().focus().toggleBlockquote().run()} style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', background: editor?.isActive('blockquote') ? '#e5e7eb' : 'transparent' }}>""</button>
                    <button type="button" onClick={() => editor?.chain().focus().toggleCodeBlock().run()} style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', background: editor?.isActive('codeBlock') ? '#e5e7eb' : 'transparent' }}>&lt;/&gt;</button>
                    <div style={{ width: '1px', background: '#d1d5db', margin: '0 0.25rem' }}></div>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', background: 'transparent', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                        <span>🖼️ Image</span>
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={addImage}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                </div>

                <div style={{ border: '1px solid #d1d5db', borderTop: 'none', borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px', background: 'white', minHeight: '400px' }}>
                    <EditorContent editor={editor} />
                </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        style={{ width: '1.25rem', height: '1.25rem' }}
                    />
                    <span style={{ fontWeight: 600, color: '#374151' }}>Published</span>
                </label>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Published Date</label>
                <input
                    type="date"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
                />
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
                    {saving ? 'Saving...' : 'Save Post'}
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
        </form>
    );
}
