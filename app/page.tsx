import AnimatedHero from '../components/AnimatedHero';
import HomeContent from './HomeContent';
import styles from './page.module.css';
import { prisma } from '../lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch published projects and posts
  const projects = await prisma.project.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  const posts = await prisma.post.findMany({
    where: { published: true },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className={styles.container}>
      <AnimatedHero />
      <HomeContent projects={projects} posts={posts} />
    </div>
  );
}
