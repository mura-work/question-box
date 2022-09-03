import React, { useState } from "react";
import styled from "styled-components";
import { Alert, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react";

const AlertWrapper = styled.div<{ isOpen: boolean }>`
  width: 100%;
  position: fixed;
  top: 90%;
  min-width: 400px;
  margin-left: -2rem;
  display: flex;
  justify-content: center;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
`;

type PropsType = {
  status: "info" | "warning" | "success" | "error" | "loading";
  width?: string | number;
  isOpen: boolean;
  children: string;
  onClose: () => void;
};

const AlertModal = (props: PropsType) => {
  const { status, width, children: message, isOpen, onClose } = props;

  // アラートを5秒後に消すようにする
  return (
    <AlertWrapper isOpen={isOpen}>
      <Alert w={width} status={status}>
        <AlertIcon />
        <AlertTitle>{message}</AlertTitle>
				<CloseButton onClick={onClose} />
      </Alert>
    </AlertWrapper>
  );
};

export default AlertModal;
