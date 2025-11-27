import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '../../../../lib/prisma';
import { authOptions } from '../../../../lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const post = await prisma.post.findUnique({
            where: { id: Number(id) },
            include: {
                tags: { include: { tag: true } },
                categories: { include: { category: true } },
            },
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { title, slug, content, excerpt, published, publishedAt, tags } = await request.json();

        // Update post and tags in a transaction
        const post = await prisma.$transaction(async (tx) => {
            // Update post details
            const updatedPost = await tx.post.update({
                where: { id: Number(id) },
                data: {
                    title,
                    slug,
                    content,
                    excerpt,
                    published,
                    publishedAt: publishedAt ? new Date(publishedAt) : null,
                },
            });

            // Update tags if provided
            if (tags && Array.isArray(tags)) {
                // Remove existing tags
                await tx.postTag.deleteMany({ where: { postId: Number(id) } });

                // Add new tags
                for (const tagName of tags) {
                    let tag = await tx.tag.findUnique({ where: { name: tagName } });
                    if (!tag) {
                        tag = await tx.tag.create({ data: { name: tagName } });
                    }
                    await tx.postTag.create({
                        data: {
                            postId: Number(id),
                            tagId: tag.id,
                        },
                    });
                }
            }

            return updatedPost;
        });

        revalidatePath('/');
        revalidatePath('/blog');
        revalidatePath('/admin/posts');
        revalidatePath(`/blog/${post.slug}`);

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json({
            error: 'Failed to update post',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Delete post and related records in a transaction
        await prisma.$transaction(async (tx) => {
            // Delete related tags
            await tx.postTag.deleteMany({
                where: { postId: parseInt(id) }
            });

            // Delete related categories
            await tx.postCategory.deleteMany({
                where: { postId: parseInt(id) }
            });

            // Delete the post
            await tx.post.delete({
                where: { id: parseInt(id) },
            });
        });

        revalidatePath('/');
        revalidatePath('/blog');
        revalidatePath('/admin/posts');

        return NextResponse.json({ message: 'Post deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
