const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const felicia = await prisma.aluno.upsert({
    where: {
      email: "felicia@email.com",
    },
    update: {},
    create: {
        nome: "Felicia",
        email: "felicia@email.com",
        cpf: "384.385.530-79"
    },
  });
  const marcos = await prisma.aluno.upsert({
    where: {
      email: "marcos@email.com",
    },
    update: {},
    create: {
        nome: "marcos",
        email: "marcos@email.com",
        cpf: "934.243.420-76"
    },
  });
  const leticia = await prisma.aluno.upsert({
    where: {
      email: "leticia@email.com",
    },
    update: {},
    create: {
        nome: "leticia",
        email: "leticia@email.com",
        cpf: "266.845.550-21"
    },
  });
  const alice = await prisma.aluno.upsert({
    where: {
      email: "alice@email.com",
    },
    update: {},
    create: {
        nome: "alice",
        email: "alice@email.com",
        cpf: "788.814.490-05"
    },
  });
  console.log({felicia, marcos, leticia, alice})
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
