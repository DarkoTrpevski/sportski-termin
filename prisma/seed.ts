// prisma/seed.ts

import { PrismaClient, UserRole } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

const theCompanyId = 1;
const userId = 1;

async function main() {
  const theCompany = await prisma.company.upsert({
    where: { id: theCompanyId },
    update: {},
    create: {
      id: theCompanyId,
      companyName: 'David-Ifko-Darko',
    },
  });
  // create two dummy articles
  const masterUser = await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      userRole: UserRole.ADMIN,
      id: userId,
      email: 'trpevski.testing@gmail.com',
      hashPassword: 'testing123',
      firstName: 'Testing',
      lastName: 'More-Testing',
      companyId: theCompany.id,
    },
  });

  console.log({ theCompany, masterUser });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
