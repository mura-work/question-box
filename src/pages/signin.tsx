import React, { useState } from "react";
import Router from "next/router";
import Layout from "../components/Layout";
import RequestMapper from "../lib/RequestMapper";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await RequestMapper.get(
        `/login?name=${name}&email=${email}`
      );
      console.log({ result });
      if (result) {
        console.log("セッションに値を入れる");
        localStorage.setItem("email", result.email);
        Router.push("/posts");
      } else {
        console.log("ログインできませんでした");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <div className="signin-page">
        <form onSubmit={submit}>
          <div>
            <label>NAME：</label>
            <input autoFocus onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>EMAIL：</label>
            <input onChange={(e) => setEmail(e.target.value)} />
          </div>
          <input type="submit" value="submit" disabled={!name || !email} />
        </form>
      </div>
    </Layout>
  );
};

export default SignIn;
