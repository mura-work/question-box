import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

const methodHandler = {
  GET: findQuestions,
  POST: createQuestion,
  DELETE: deleteQuestion,
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
    include: { genres: true, comments: true },
    orderBy: { id: "desc" },
  });
}

async function createQuestion(req) {
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

async function deleteQuestion(req) {
  const { id } = req.body;
  return await prisma.question.delete({
    where: { id: Number(id) },
  });
}
