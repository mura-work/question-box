import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const methodHandler = {
  POST: createComment,
  DELETE: deleteComment,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await methodHandler[req.method](req);
  res.json(result);
}

async function createComment(req) {
  const { content, questionId } = req.body;
  return await prisma.comment.create({
    data: {
      content,
      question: {
        connect: {
          id: questionId,
        },
      },
    },
  });
}

async function deleteComment(req) {
  const { id } = req.body;
  return await prisma.comment.delete({
    where: { id: Number(id) },
  });
}
