import { PrismaClient, Prisma } from "@prisma/client";
import { QuestionDummy } from "./dummy/questions.dummy";
import { GenresDummy } from "./dummy/genres.dummy";

const prisma = new PrismaClient();

async function main() {
  console.log("ジャンルのインサート");
  for (const g of GenresDummy) {
    await prisma.genre.create({
      data: g,
    });
  }
  console.log(`質問のインサート`);
  for (const q of QuestionDummy) {
    await prisma.question.create({
      data: {
        title: q.title,
        content: q.content,
        genres: {
          connect: q.genres,
        },
        comments: {
          create: q.comments,
        },
      },
    });
  }
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
