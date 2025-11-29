import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import styles from './blog-post.module.css';
import { Metadata } from 'next';
import BlogPostContent from './BlogPostContent';
import ScrollToTopButton from '../../../components/ScrollToTopButton';
import { generateArticleSchema } from '../../../lib/structured-data';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await prisma.post.findUnique({
        where: { slug },
        include: {
            tags: { include: { tag: true } },
        },
    });

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    const keywords = post.tags.map(t => t.tag.name);

    return {
        title: post.title,
        description: post.excerpt || post.title,
        keywords,
        authors: [{ name: 'Ismatulloh Bakhtiyorov' }],
        openGraph: {
            title: post.title,
            description: post.excerpt || post.title,
            type: 'article',
            publishedTime: post.publishedAt?.toISOString(),
            modifiedTime: post.updatedAt.toISOString(),
            authors: ['Ismatulloh Bakhtiyorov'],
            tags: keywords,
            url: `https://baxtiyorov.uz/blog/${slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt || post.title,
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await prisma.post.findUnique({
        where: { slug },
        include: {
            author: { select: { email: true } },
            tags: { include: { tag: true } },
        },
    });

    if (!post || !post.published) {
        notFound();
    }

    // Fetch previous and next posts based on publishedAt
    const allPosts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { publishedAt: 'desc' },
        select: { slug: true, title: true, publishedAt: true },
    });

    const currentIndex = allPosts.findIndex(p => p.slug === slug);
    const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

    // Generate Article schema
    const articleSchema = generateArticleSchema({
        headline: post.title,
        description: post.excerpt || post.title,
        author: {
            name: 'Ismatulloh Bakhtiyorov',
            jobTitle: 'Software Engineer & Digital Artist',
            url: 'https://baxtiyorov.uz',
            sameAs: [
                'https://github.com/baxt1y0rov',
                'https://x.com/ismatullohbakh2',
                'https://www.linkedin.com/in/baxtiyorov',
            ],
        },
        datePublished: (post.publishedAt || post.createdAt).toISOString(),
        dateModified: post.updatedAt.toISOString(),
        url: `https://baxtiyorov.uz/blog/${slug}`,
        keywords: post.tags.map(t => t.tag.name),
    });

    return (
        <div className={styles.container}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <Link href="/blog" className={styles.backLink}>
                ← Back to Blog
            </Link>

            <article className={styles.article}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{post.title}</h1>
                    <div className={styles.meta}>
                        {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                            : new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                        }
                    </div>
                </header>

                <BlogPostContent content={post.content} />
            </article>

            <nav className={styles.navigation}>
                {prevPost ? (
                    <Link href={`/blog/${prevPost.slug}`} className={`${styles.navLink} ${styles.prev}`}>
                        <span className={styles.navLabel}>← Previous</span>
                        <span className={styles.navTitle}>{prevPost.title}</span>
                    </Link>
                ) : (
                    <div />
                )}
                {nextPost && (
                    <Link href={`/blog/${nextPost.slug}`} className={`${styles.navLink} ${styles.next}`}>
                        <span className={styles.navLabel}>Next →</span>
                        <span className={styles.navTitle}>{nextPost.title}</span>
                    </Link>
                )}
            </nav>
            <ScrollToTopButton />
        </div>
    );
}
