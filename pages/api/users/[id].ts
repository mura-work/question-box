import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import cloneDeep from "lodash/cloneDeep";

const methodHandler = {
  GET: findUser,
  PUT: updateUser,
  DELETE: deleteUser,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await methodHandler[req.method](req);
  res.json(result);
}

async function findUser(req) {
  const userId = req.query.id;
  return await prisma.user.findUnique({ where: { id: Number(userId) } });
}

async function updateUser(req) {
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
async function deleteUser(req) {
  const userId = req.query.id;
  return await prisma.user.delete({
    where: { id: Number(userId) },
  });
}
