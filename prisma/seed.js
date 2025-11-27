const bcrypt = require('bcryptjs');

async function main() {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

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

    await prisma.$disconnect();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
