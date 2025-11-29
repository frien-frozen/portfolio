import { prisma } from '../../lib/prisma';
import BlogContent from './BlogContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Thoughts, tutorials, and insights on web development, software engineering, design, and technology by Ismatulloh Bakhtiyorov.',
    openGraph: {
        title: 'Blog - Ismatulloh Bakhtiyorov',
        description: 'Thoughts, tutorials, and insights on web development, software engineering, design, and technology.',
        url: 'https://bakhtiyorov.com/blog',
        type: 'website',
    },
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
    });

    // Group posts by year
    const postsByYear: Record<number, typeof posts> = {};
    posts.forEach(post => {
        const date = post.publishedAt ? new Date(post.publishedAt) : new Date(post.createdAt);
        const year = date.getFullYear();
        if (!postsByYear[year]) {
            postsByYear[year] = [];
        }
        postsByYear[year].push(post);
    });

    const years = Object.keys(postsByYear).map(Number).sort((a, b) => b - a);

    return <BlogContent postsByYear={postsByYear} years={years} />;
}
