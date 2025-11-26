import Link from 'next/link';
import { prisma } from '../../../lib/prisma';
import PostList from './PostList';
import styles from '../admin.module.css';
import { Plus } from 'lucide-react';

export default async function PostsPage() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className={styles.title}>Blog Posts</h1>
                <Link href="/admin/posts/new" className={styles.newButton}>
                    <Plus size={20} />
                    New Post
                </Link>
            </div>
            <PostList posts={posts} />
        </div>
    );
}
