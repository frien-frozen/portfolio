import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

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

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const body = await request.json();

        // Toggle visibility
        if (body.visible !== undefined) {
            const certificate = await prisma.certificate.update({
                where: { id: parseInt(id) },
                data: { visible: body.visible },
            });

            revalidatePath('/certificates');

            return NextResponse.json(certificate);
        }

        return NextResponse.json({ error: 'No update data provided' }, { status: 400 });
    } catch {
        return NextResponse.json({ error: 'Failed to update certificate' }, { status: 500 });
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
