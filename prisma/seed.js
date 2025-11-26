const bcrypt = require('bcryptjs');

async function main() {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    const adminEmail = 'admin@example.com';
    const adminPassword = 'tempPassword123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!existing) {
        await prisma.user.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
            },
        });
        console.log('Admin user created.');
    } else {
        console.log('Admin user already exists.');
    }

    await prisma.$disconnect();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
