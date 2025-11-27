'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';

interface PostEditorProps {
    initialData?: {
        id: number;
        title: string;
        slug: string;
        content: string;
        excerpt?: string | null;
        published: boolean;
        publishedAt?: Date | string | null;
        tags?: { tag: { name: string } }[];
    };
}

export default function PostEditor({ initialData }: PostEditorProps) {
    const router = useRouter();
    const [title, setTitle] = useState(initialData?.title || '');
    const [slug, setSlug] = useState(initialData?.slug || '');
    const [tags, setTags] = useState(initialData?.tags?.map((t: any) => t.tag.name).join(', ') || '');
    const [published, setPublished] = useState(initialData?.published || false);
    const [publishedAt, setPublishedAt] = useState<string>(
        initialData?.publishedAt
            ? new Date(initialData.publishedAt).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
    );
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Image,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-500 underline',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            TextStyle,
            Color,
        ],
        content: initialData?.content || '',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-4 border rounded-md',
            },
        },
    });

    const setLink = () => {
        const previousUrl = editor?.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

            if (!res.ok) {
                throw new Error(data.error || 'Upload failed');
            }

            if (data.url) {
                editor?.chain().focus().setImage({ src: data.url }).run();
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert(error instanceof Error ? error.message : 'Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const data = {
            title,
            slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
            content: editor?.getHTML() || '',
            published,
            publishedAt,
            tags: tags.split(',').map(t => t.trim()).filter(t => t),
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
                    onChange={(e) => {
                        setTitle(e.target.value);
                        if (!initialData) {
                            setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                        }
                    }}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
                    required
                />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Tags (comma separated)</label>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="tech, life, coding"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
                />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Content</label>

                {/* Gmail-like Toolbar */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.25rem',
                    padding: '0.5rem',
                    background: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderBottom: 'none',
                    borderTopLeftRadius: '6px',
                    borderTopRightRadius: '6px',
                    alignItems: 'center'
                }}>
                    {/* History */}
                    <div style={{ display: 'flex', gap: '2px', marginRight: '8px' }}>
                        <button type="button" onClick={() => editor?.chain().focus().undo().run()} disabled={!editor?.can().undo()} style={{ padding: '4px 8px', borderRadius: '4px', background: 'transparent', opacity: !editor?.can().undo() ? 0.3 : 1 }}>↩</button>
                        <button type="button" onClick={() => editor?.chain().focus().redo().run()} disabled={!editor?.can().redo()} style={{ padding: '4px 8px', borderRadius: '4px', background: 'transparent', opacity: !editor?.can().redo() ? 0.3 : 1 }}>↪</button>
                    </div>

                    <div style={{ width: '1px', height: '20px', background: '#d1d5db', margin: '0 4px' }}></div>

                    {/* Text Style */}
                    <select
                        onChange={(e) => {
                            const level = parseInt(e.target.value);
                            if (level === 0) editor?.chain().focus().setParagraph().run();
                            else editor?.chain().focus().toggleHeading({ level: level as any }).run();
                        }}
                        style={{ padding: '4px', borderRadius: '4px', border: '1px solid #d1d5db', background: 'white', fontSize: '14px' }}
                    >
                        <option value="0">Normal</option>
                        <option value="1">Heading 1</option>
                        <option value="2">Heading 2</option>
                        <option value="3">Heading 3</option>
                    </select>

                    <div style={{ width: '1px', height: '20px', background: '#d1d5db', margin: '0 4px' }}></div>

                    {/* Formatting */}
                    <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} style={{ fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', background: editor?.isActive('bold') ? '#e5e7eb' : 'transparent' }}>B</button>
                    <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} style={{ fontStyle: 'italic', padding: '4px 8px', borderRadius: '4px', background: editor?.isActive('italic') ? '#e5e7eb' : 'transparent' }}>I</button>
                    <button type="button" onClick={() => editor?.chain().focus().toggleUnderline().run()} style={{ textDecoration: 'underline', padding: '4px 8px', borderRadius: '4px', background: editor?.isActive('underline') ? '#e5e7eb' : 'transparent' }}>U</button>
                    <button type="button" onClick={() => editor?.chain().focus().toggleStrike().run()} style={{ textDecoration: 'line-through', padding: '4px 8px', borderRadius: '4px', background: editor?.isActive('strike') ? '#e5e7eb' : 'transparent' }}>S</button>

                    <div style={{ width: '1px', height: '20px', background: '#d1d5db', margin: '0 4px' }}></div>

                    {/* Colors */}
                    <input
                        type="color"
                        onInput={event => editor?.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
                        value={editor?.getAttributes('textStyle').color || '#000000'}
                        style={{ width: '30px', height: '30px', padding: '0', border: 'none', background: 'transparent', cursor: 'pointer' }}
                        title="Text Color"
                    />

                    <div style={{ width: '1px', height: '20px', background: '#d1d5db', margin: '0 4px' }}></div>

                    {/* Alignment */}
                    <button type="button" onClick={() => editor?.chain().focus().setTextAlign('left').run()} style={{ padding: '4px 8px', borderRadius: '4px', background: editor?.isActive({ textAlign: 'left' }) ? '#e5e7eb' : 'transparent' }}>⇤</button>
                    <button type="button" onClick={() => editor?.chain().focus().setTextAlign('center').run()} style={{ padding: '4px 8px', borderRadius: '4px', background: editor?.isActive({ textAlign: 'center' }) ? '#e5e7eb' : 'transparent' }}>↔</button>
                    <button type="button" onClick={() => editor?.chain().focus().setTextAlign('right').run()} style={{ padding: '4px 8px', borderRadius: '4px', background: editor?.isActive({ textAlign: 'right' }) ? '#e5e7eb' : 'transparent' }}>⇥</button>

                    <div style={{ width: '1px', height: '20px', background: '#d1d5db', margin: '0 4px' }}></div>

                    {/* Lists & Indent */}
                    <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} style={{ padding: '4px 8px', borderRadius: '4px', background: editor?.isActive('bulletList') ? '#e5e7eb' : 'transparent' }}>• List</button>
                    <button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()} style={{ padding: '4px 8px', borderRadius: '4px', background: editor?.isActive('orderedList') ? '#e5e7eb' : 'transparent' }}>1. List</button>

                    <div style={{ width: '1px', height: '20px', background: '#d1d5db', margin: '0 4px' }}></div>

                    {/* Insert */}
                    <button type="button" onClick={setLink} style={{ padding: '4px 8px', borderRadius: '4px', background: editor?.isActive('link') ? '#e5e7eb' : 'transparent' }}>🔗</button>
                    <button type="button" onClick={() => editor?.chain().focus().toggleBlockquote().run()} style={{ padding: '4px 8px', borderRadius: '4px', background: editor?.isActive('blockquote') ? '#e5e7eb' : 'transparent' }}>""</button>
                    <button type="button" onClick={() => editor?.chain().focus().toggleCodeBlock().run()} style={{ padding: '4px 8px', borderRadius: '4px', background: editor?.isActive('codeBlock') ? '#e5e7eb' : 'transparent' }}>&lt;/&gt;</button>
                    <button
                        type="button"
                        onClick={() => !uploading && fileInputRef.current?.click()}
                        disabled={uploading}
                        style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            background: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: uploading ? 'wait' : 'pointer',
                            opacity: uploading ? 0.5 : 1
                        }}
                        title={uploading ? "Uploading..." : "Insert Image"}
                    >
                        {uploading ? (
                            <>
                                <div style={{
                                    width: '14px',
                                    height: '14px',
                                    border: '2px solid #374151',
                                    borderTopColor: 'transparent',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }}></div>
                                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                            </>
                        ) : (
                            <span>🖼️</span>
                        )}
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
        </form >
    );
}
