import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { put } from '@vercel/blob';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Try Vercel Blob first if token exists
        if (process.env.BLOB_READ_WRITE_TOKEN) {
            try {
                const blob = await put(file.name, file, {
                    access: 'public',
                    addRandomSuffix: true,
                });
                return NextResponse.json({ url: blob.url });
            } catch (blobError) {
                console.error('Vercel Blob upload failed:', blobError);
                return NextResponse.json({
                    error: `Vercel Blob upload failed: ${blobError instanceof Error ? blobError.message : 'Unknown error'}`
                }, { status: 500 });
            }
        }

        // Check if running in production (Vercel)
        if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
            console.error('BLOB_READ_WRITE_TOKEN is missing in production environment');
            return NextResponse.json({
                error: 'Server configuration error: BLOB_READ_WRITE_TOKEN is missing. Please add this environment variable in Vercel settings.'
            }, { status: 500 });
        }

        // Fallback to local storage (Development only)
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const uploadDir = join(process.cwd(), 'public', 'uploads');

        // Ensure directory exists
        await mkdir(uploadDir, { recursive: true });

        const filepath = join(uploadDir, filename);
        await writeFile(filepath, buffer);

        return NextResponse.json({ url: `/uploads/${filename}` });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}
