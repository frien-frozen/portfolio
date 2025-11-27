import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        const body = await request.json();
        const { title, date, imageUrl } = body;

        const certificate = await prisma.certificate.update({
            where: { id },
            data: {
                title,
                date,
                imageUrl,
            },
        });

        return NextResponse.json(certificate);
    } catch (error) {
        console.error('Error updating certificate:', error);
        return NextResponse.json({ error: 'Error updating certificate' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id: idStr } = await params;
        const id = parseInt(idStr);
        await prisma.certificate.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting certificate:', error);
        return NextResponse.json({ error: 'Error deleting certificate' }, { status: 500 });
    }
}
