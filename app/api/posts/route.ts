import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '../../../lib/prisma';
import { authOptions } from '../../../lib/auth';

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                author: { select: { email: true } },
                tags: { include: { tag: true } },
                categories: { include: { category: true } },
            },
        });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, content, excerpt, published, publishedAt } = body;

        // Generate slug from title
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');

        // Create tags if they don't exist
        // This logic is simplified; usually you'd handle tag creation separately or here
        // For now, let's assume tags are just strings in the body, and we need to link them.
        // But Prisma schema has PostTag relation.
        // Let's keep it simple for now: create post without tags first, or handle tags if provided.

        const user = await prisma.user.findUnique({
            where: { email: session.user?.email! },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const postData: any = {
            title,
            slug,
            content,
            excerpt,
            published: published || false,
            publishedAt: publishedAt ? new Date(publishedAt) : (published ? new Date() : null),
            authorId: user.id,
        };

        const post = await prisma.post.create({
            data: postData,
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({
            error: 'Failed to create post',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
