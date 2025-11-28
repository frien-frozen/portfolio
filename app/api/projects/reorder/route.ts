import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { items } = await req.json();

        if (!Array.isArray(items)) {
            return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
        }

        // Update all items in a transaction
        await prisma.$transaction(
            items.map((item: { id: number; order: number }) =>
                prisma.project.update({
                    where: { id: item.id },
                    data: { order: item.order },
                })
            )
        );

        revalidatePath('/projects');
        return NextResponse.json({ message: 'Order updated successfully' });
    } catch (error) {
        console.error('Error reordering projects:', error);
        return NextResponse.json({ error: 'Failed to reorder projects' }, { status: 500 });
    }
}
