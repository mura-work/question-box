import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { Genre, Question } from "../../../lib/prisma";

interface handerTypes {
  [key: string]: Function;
}

const methodHandler: handerTypes = {
  GET: findQuestions,
  POST: createQuestion,
  DELETE: deleteQuestion,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req || !req.method) return;
  const key: string = req.method;
  const result = await methodHandler[key](req);
  res.json(result);
}

async function findQuestions() {
  return await prisma.question.findMany({
    include: { genres: true, comments: true },
    orderBy: { id: "desc" },
  });
}

async function createQuestion(req: NextApiRequest) {
  const { title, content } = req.body;
  return await prisma.question.create({
    data: {
      title,
      content,
      genres: {
        connect: req.body.genres.map((g: Genre) => ({ id: g.id })),
      },
    },
  });
}

async function deleteQuestion(req: NextApiRequest) {
  const { id } = req.body;
  return await prisma.question.delete({
    where: { id: Number(id) },
  });
}
