import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Hash the password
    const hashedPassword = await bcrypt.hash('Zeboxon1986**', 10);

    // Create or update admin user
    await prisma.user.upsert({
        where: { email: 'admin' },
        update: {
            password: hashedPassword,
        },
        create: {
            email: 'admin',
            password: hashedPassword,
            role: 'admin',
        },
    });

    console.log('Admin user created/updated successfully');
    console.log('Username: admin');
    console.log('Password: Zeboxon1986**');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
