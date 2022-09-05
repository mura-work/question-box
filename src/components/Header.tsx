import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@chakra-ui/react";

const HeaderComponent = styled.div`
  width: 100%;
  display: flex;
  margin: 8px;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  a {
    margin-left: 8px;
    font-size: 20px;
  }
`;

const Right = styled.div`
  display: flex;
  a {
    padding-left: 8px;
    font-size: 20px;
  }
`;

const Header: React.FC = () => {
  const router = useRouter();

  const { data: session } = useSession();
  console.log(session);

  return (
    <HeaderComponent>
      <Left>
        <Link href="/questions">質問箱</Link>
        <Link href="/genres">質問のジャンル</Link>
      </Left>
      <div className="right">
        {session ? (
          <div>
            <Button onClick={() => signOut()}>ログアウト</Button>
          </div>
        ) : (
          <div>
            <Link href="/signin">ログイン</Link>
            <Link href="/signup">新規登録</Link>
          </div>
        )}
      </div>
    </HeaderComponent>
  );
};

export default Header;
