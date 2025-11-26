import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching projects' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { title, description, imageUrl, link, techStack } = await req.json();
        const project = await prisma.project.create({
            data: {
                title,
                description,
                imageUrl,
                link,
                techStack,
            },
        });
        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating project' }, { status: 500 });
    }
}
