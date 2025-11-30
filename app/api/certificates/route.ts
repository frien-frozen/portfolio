import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        const certificates = await prisma.certificate.findMany({
            where: { visible: true },
            orderBy: [
                { order: 'asc' },
                { date: 'desc' },
            ],
        });
        return NextResponse.json(certificates);
    } catch (error) {
        console.error('Detailed error fetching certificates:', error);
        return NextResponse.json({ error: 'Error fetching certificates' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, date, imageUrl } = body;

        const certificate = await prisma.certificate.create({
            data: {
                title,
                date,
                imageUrl,
            },
        });

        return NextResponse.json(certificate);
    } catch {
        return NextResponse.json({ error: 'Error creating certificate' }, { status: 500 });
    }
}
