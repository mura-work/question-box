import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.id) return;
  const id = req.query.id;
  const result = await prisma.question.findUnique({
    where: { id: Array.isArray(id) ? Number(id[0]) : Number(id) },
		include: { genres: true, comments: true },
  });
  res.json(result);
}
