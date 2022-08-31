import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const methodHandler = {
  GET: findUser,
  PUT: updateUser,
  DELETE: deleteUser,
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

async function findUser(req: NextApiRequest) {
  const userId = req.query.id;
  return await prisma.user.findUnique({ where: { id: Number(userId) } });
}

async function updateUser(req: NextApiRequest) {
  const userId = req.query.id;
  const { name, email } = JSON.parse(req.body);
  return await prisma.user.update({
    where: { id: Number(userId) },
    data: {
      name,
      email,
    },
  });
}
async function deleteUser(req: NextApiRequest) {
  const userId = req.query.id;
  return await prisma.user.delete({
    where: { id: Number(userId) },
  });
}
