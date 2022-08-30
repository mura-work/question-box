import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

const methodHandler = {
  GET: findUsers,
  POST: createUser,
};

export default async function hander(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await methodHandler[req.method](req);
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

async function createUser(req) {
  const { name, email } = req.body;
  return await prisma.user.create({
    data: {
      name,
      email,
    },
  });
}
