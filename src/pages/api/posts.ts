import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

interface handerTypes {
  [key: string]: Function;
}

const methodHandler: handerTypes = {
  GET: findPosts,
  POST: createPost,
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

async function findPosts() {
  return await prisma.post.findMany();
}

async function createPost(req: NextApiRequest) {
	console.log(req.body)
  const { title, content, authorId } = req.body;
  return await prisma.post.create({
		data: {
			title,
			content,
			authorId: Number(authorId),
		}
	})
}
