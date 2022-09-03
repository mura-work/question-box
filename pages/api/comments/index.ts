import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

type Comment = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  questionId: number;
}

async function createComment(req: NextApiRequest) {
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

async function deleteComment(req: NextApiRequest) {
  const { id } = req.body;
  return await prisma.comment.delete({
    where: { id: Number(id) },
  });
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req || !req.method) return;
  const key: string = req.method;
  if (req.method === "POST") {
    const result: Comment = await createComment(req);
    res.json(result);
  } else if (req.method === 'DELETE') {
    const result: Comment = await deleteComment(req);
    res.json(result);
  }
}
