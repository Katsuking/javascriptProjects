const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const user = prisma.user.findUnique({
  where: { id: 5 },
});

console.log({ user });
