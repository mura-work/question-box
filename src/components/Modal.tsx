import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@/hooks/useDisclosure";

type PropTypes = {
  confirm: () => void;
  cancel: () => void;
  children: React.ReactNode;
  disableConfirmButton: boolean;
  displayConfirmButton: boolean;
  displayModal: boolean;
};

export const ModalComponent = (props: PropTypes) => {
  const { close, open, isOpen } = useDisclosure();
  const {
    children,
    confirm,
    cancel,
    disableConfirmButton,
    displayConfirmButton,
    displayModal,
  } = props;

  useEffect(() => {
    displayModal ? open() : close();
  }, [displayModal, close]);

  const closeModal = () => {
    close();
    cancel();
  };

  return (
    <Modal isOpen={isOpen} onClose={close} autoFocus isCentered size="3xl">
      <ModalOverlay />
      <ModalContent height={"60%"}>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={confirm}
            isDisabled={disableConfirmButton}
            style={{ visibility: displayConfirmButton ? "visible" : "hidden" }}
          >
            投稿する
          </Button>
          <Button variant="ghost" onClick={closeModal}>
            キャンセル
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

ModalComponent.defaultProps = {
  displayConfirmButton: true,
  disableConfirmButton: false,
};
