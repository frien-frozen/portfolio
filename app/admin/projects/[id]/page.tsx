import { prisma } from '../../../../lib/prisma';
import ProjectEditor from '../ProjectEditor';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await prisma.project.findUnique({
        where: { id: parseInt(id) },
    });

    if (!project) {
        notFound();
    }

    return <ProjectEditor initialData={project} />;
}
