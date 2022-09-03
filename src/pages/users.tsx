import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import useSWR from "swr";
import RequestMapper from "../lib/RequestMapper";

type Post = {
  id: number;
  title: string;
  // content?: string;
  // published: boolean;
  // viewCount: number;
  // author: User;
  // authorid: number;
};

type User = {
  id: number;
  email: string;
  name: string;
  posts: Post[];
};

type Props = {
  users: User[];
};

const Users = (props: Props) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await RequestMapper.get("/users");
      setUsers(data);
    };
    fetchData();
  }, []);

  const deleteUser = async (id: number) => {
    const result = await RequestMapper.delete("/users", { id });
    if (result.status === 200) {
      const newUsers = users.filter((user) => user.id !== id);
      setUsers(newUsers);
    }
  };

  return (
    <Layout>
      <div className="users-page">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>email</th>
              <th>posts</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th>{user.id}</th>
                <th>{user.name}</th>
                <th>{user.email}</th>
                <th>{user.posts.map((post) => post.title).join()}</th>
                <th>
                  <button onClick={() => deleteUser(user.id)}>削除</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Users;
