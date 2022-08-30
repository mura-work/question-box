import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email: string = req.query.email as string;
  const result = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  res.json(result);
}
