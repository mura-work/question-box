import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

interface handerTypes {
  [key: string]: Function;
}

const methodHandler: handerTypes = {
  GET: findUsers,
  POST: createUser,
};

export default async function hander(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req || !req.method) return;
  const key: string = req.method;
  const result = await methodHandler[key](req);
  res.json(result);
}

async function findUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      posts: { select: { id: true, title: true } },
    },
  });
}

async function createUser(req: NextApiRequest) {
  const { name, email } = req.body;
  return await prisma.user.create({
    data: {
      name,
      email,
    },
  });
}
