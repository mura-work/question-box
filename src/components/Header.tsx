import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Spinner } from "@chakra-ui/react";

const HeaderComponent = styled.div`
  width: 100%;
  display: flex;
  margin: 8px;
  justify-content: space-between;
  padding-right: 12px;
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
  const isReady = router.isReady;
  const { data: session } = useSession();

  useEffect(() => {
    if (!isReady) {
      return;
    }
    if (!session) router.replace("/signin");
  }, []);

  return (
    <HeaderComponent>
      <Left>
        {session && (
          <div>
            <Link href="/questions">質問箱</Link>
            <Link href="/genres">質問のジャンル</Link>
          </div>
        )}
      </Left>
      <Right>
        {session ? (
          <div>
            <Button onClick={() => signOut()}>ログアウト</Button>
          </div>
        ) : (
          <div>
            <Button onClick={() => signIn()}>ログイン</Button>
          </div>
        )}
      </Right>
    </HeaderComponent>
  );
};

export default Header;
