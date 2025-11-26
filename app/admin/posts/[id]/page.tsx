import { prisma } from '../../../../lib/prisma';
import PostEditor from '../PostEditor';
import { notFound } from 'next/navigation';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await prisma.post.findUnique({
        where: { id: parseInt(id) },
    });

    if (!post) {
        notFound();
    }

    return <PostEditor initialData={post} />;
}
