import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const HeaderComponent = styled.div`
  width: 100%;
  display: flex;
  margin: 8px;
`

const Left = styled.div`
  display: flex;
  a {
    margin-left: 8px;
    font-size: 20px;
  }
`

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  return (
    <HeaderComponent>
      <Left>
        <Link href="/questions">質問箱</Link>
        <Link href="/genres">質問のジャンル</Link>
      </Left>
      <div className="right">
      </div>
    </HeaderComponent>
  );
};

export default Header;
