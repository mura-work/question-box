import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

type Genre = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  isActive: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result: Genre[] = await prisma.genre.findMany({
    where: { isActive: true },
  });
  res.json(result);
}
