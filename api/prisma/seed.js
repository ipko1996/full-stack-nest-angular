const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: `$2b$10$GB8BIXM/rx.mjEWahy/HAO9hA3AYQghLmf.ENTDaZguRC/76j/hj.`, // password: admin
      role: 'ADMIN',
    },
  });
  console.log('user admin created: ', admin);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
