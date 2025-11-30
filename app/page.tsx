import AnimatedHero from '../components/AnimatedHero';
import HomeContent from './HomeContent';
import styles from './page.module.css';
import { prisma } from '../lib/prisma';
import { generatePersonSchema, generateWebSiteSchema } from '../lib/structured-data';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Ismatulloh Bakhtiyorov | Bakhtiyorov',
  description: 'Ismatulloh Bakhtiyorov (Bakhtiyorov) - Software Engineer & Digital Artist. Portfolio showcasing web development projects, blog posts, and digital art by Ismatulloh.',
  keywords: ['Ismatulloh', 'Bakhtiyorov', 'Ismatulloh Bakhtiyorov', 'Software Engineer', 'Web Developer', 'Portfolio'],
  openGraph: {
    title: 'Ismatulloh Bakhtiyorov | Bakhtiyorov',
    description: 'Software Engineer & Digital Artist. Portfolio and projects by Ismatulloh.',
    url: 'https://baxtiyorov.uz',
    type: 'website',
  },
};

export default async function Home() {
  // Fetch published projects and posts
  const projects = await prisma.project.findMany({
    where: { visible: true },
    take: 3,
    orderBy: [
      { order: 'asc' },
      { createdAt: 'desc' }
    ],
  });

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      visible: true,
    },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  // Generate structured data
  const personSchema = generatePersonSchema({
    name: 'Ismatulloh Bakhtiyorov',
    jobTitle: 'Software Engineer & Digital Artist',
    url: 'https://baxtiyorov.uz',
    email: 'ismatullohbakh2010@gmail.com',
    image: 'https://baxtiyorov.uz/profile.jpg',
    sameAs: [
      'https://github.com/baxt1y0rov',
      'https://x.com/ismatullohbakh2',
      'https://www.linkedin.com/in/baxtiyorov',
    ],
  });

  const websiteSchema = generateWebSiteSchema(
    'https://baxtiyorov.uz',
    'Ismatulloh Bakhtiyorov'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <div className={styles.container}>
        <AnimatedHero />
        <HomeContent projects={projects} posts={posts} />
      </div>
    </>
  );
}
