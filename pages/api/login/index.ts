import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

type emailType = string | string[] | undefined

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email: emailType = req.query.email;
  if (!email) return
  const result = await prisma.user.findUnique({
    where: {
      email: Array.isArray(email) ? email[0]: email,
    },
  });
  res.json(result);
}
