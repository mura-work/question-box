import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

const methodHandler = {
  GET: findQuestions,
  POST: createQuestions,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await methodHandler[req.method](req);
  res.json(result);
}

async function findQuestions() {
  return await prisma.question.findMany({
    include: { genres: true },
  });
}

async function createQuestions(req) {
  const { title, content } = req.body;
  return await prisma.question.create({
    data: {
      title,
      content,
      genres: {
        connect: req.body.genres.map((g) => ({ id: g.id })),
      },
    },
  });
}
