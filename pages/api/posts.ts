import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

const methodHandler = {
  GET: findPosts,
  POST: createPost,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await methodHandler[req.method](req);
  res.json(result);
}

async function findPosts() {
  return await prisma.post.findMany();
}

async function createPost(req) {
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
