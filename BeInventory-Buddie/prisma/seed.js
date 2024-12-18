// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// async function main() {
//   // Seeder untuk Category
//   const categories = await prisma.category.createMany({
//     data: [
//       { name: 'Makanan' },
//       { name: 'Minuman' },
//       { name: 'Alat Tulis' },
//     ],
//   });

//   console.log('Categories seeded:', categories);

//   // Seeder untuk Rack
//   const racks = await prisma.rack.createMany({
//     data: [
//       { location: 'Rak A1' },
//       { location: 'Rak B2' },
//       { location: 'Rak C3' },
//     ],
//   });

//   console.log('Racks seeded:', racks);
// }

// main()
//   .catch(e => {
//     console.error(e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });


const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Hash password untuk user admin
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Tambahkan data admin
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('Seeding selesai, admin user:', adminUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

