import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Alert, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react";
import { useDisclosure } from "@/hooks/useDisclosure";

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
  displayAlert: boolean;
  children: string;
  onClose: () => void;
};

export const AlertComponent = (props: PropsType) => {
  const { status, width, children: message, displayAlert, onClose } = props;
  const { close, open, isOpen } = useDisclosure();

  const closeAlert = () => {
    onClose();
    close();
  };

  useEffect(() => {
    if (displayAlert) {
      open();
      setTimeout(() => closeAlert(), 5000);
    } else {
      close();
    }
  }, [displayAlert, close]);

  return (
    <AlertWrapper isOpen={isOpen}>
      <Alert w={width} status={status}>
        <AlertIcon />
        <AlertTitle>{message}</AlertTitle>
        <CloseButton onClick={closeAlert} ml="auto" />
      </Alert>
    </AlertWrapper>
  );
};
