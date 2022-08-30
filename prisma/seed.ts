import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const questionData = [
  {
    title: "人生相談",
    content: "人生に対してやる気がありません。どうすればよろしいでしょうか。",
  },
  {
    title: "仕事について",
    content: "定職につけません。どうすればよろしいでしょうか。",
  },
  {
    title: "家族について",
    content: "両親共に認知症で介護が厳しいです。どうすればよろしいでしょうか。",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const q of questionData) {
    const question = await prisma.question.create({
      data: q,
    });
  }
  console.log(`Seeding finished`);
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
