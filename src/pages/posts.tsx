import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import useSWR from "swr";
import RequestMapper from "../lib/RequestMapper";
import { useForm } from "react-hook-form";
// import { Select } from "@chakra-ui/react";
import styled from "styled-components";

type Post = {
  id: number;
  title: string;
  content?: string;
  published: boolean;
  viewCount: number;
  // author: User;
  authorId: number;
};

type Inputs = {
  title: string;
  content: string;
  authorId: number;
};

type User = {
  id: number;
  name: string;
};

const PostPage = styled.div`
  width: 100%;
  > div {
    margin: 16px 0;
  }
`;

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userList, setUserList] = useState<User[]>([]);
  const { register, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    const init = async () => {
      const data = await RequestMapper.get("/posts");
      setPosts(data);

      const users = await RequestMapper.get("/users");
      setUserList(users);
    };
    init();
  }, []);

  const onSubmit = async (data: Inputs) => {
		if (!data.title || !data.authorId) return

		const result = await RequestMapper.post("/posts", data)
		if (result.status === 200) {
			const data = await RequestMapper.get("/posts");
      setPosts(data);
		}
	};

  return (
    <Layout>
      <PostPage>
        <h1>投稿</h1>
        <div className="post-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>title：</label>
              <input defaultValue="" {...register("title")} />
            </div>
            <div>
              <label>content：</label>
              <input {...register("content")} />
            </div>
            <div>
              <label>authorId：</label>
              <select {...register("authorId")}>
                {userList.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">登録</button>
          </form>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>title</th>
              <th>content</th>
              <th>published</th>
              <th>viewCount</th>
              <th>authorId</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <th>{post.id}</th>
                <th>{post.title}</th>
                <th>{post.content}</th>
                <th>{post.published}</th>
                <th>{post.viewCount}</th>
                <th>{post.authorId}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </PostPage>
    </Layout>
  );
};

export default Posts;
