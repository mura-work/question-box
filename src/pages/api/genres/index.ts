import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

type Genre = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  isActive: boolean;
};

async function createGenre(req: NextApiRequest) {
  const { name, color } = req.body;
  return await prisma.genre.create({
    data: {
      name,
      color,
    },
  });
}

async function findGenres(req: NextApiRequest) {
  return await prisma.genre.findMany({
    where: { isActive: true },
  });
}

async function updateGenre(req: NextApiRequest) {
  const { id, name, color } = req.body;
  return await prisma.genre.update({
    where: { id },
    data: {
      name,
      color,
    },
  });
}

async function deleteGenre(req: NextApiRequest) {
  const { id } = req.body;
  return await prisma.genre.delete({
    where: { id },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req || !req.method) return;
  let result = null;
  switch (req.method) {
    case "GET":
      result = await findGenres(req);
      break;
    case "POST":
      result = await createGenre(req);
      break;
    case "PUT":
      result = await updateGenre(req);
      break;
    case "DELETE":
      result = await deleteGenre(req);
      break;
  }
  res.json(result);
}
