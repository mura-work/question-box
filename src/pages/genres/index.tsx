import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import RequestMapper from "@/lib/RequestMapper";
import styled from "styled-components";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Tag,
  Button,
  FormControl,
  Input,
  Text,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { ModalComponent } from "@/components/Modal";
import { AlertComponent } from "@/components/Alert";
import { AlertTypes } from "@/types/index";

type Genre = {
  id: number;
  name: string;
  color: string;
};

const GenresList = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [genreForm, setGenreForm] = useState<Genre>({
    id: -100,
    name: "",
    color: "",
  });
  const [alert, setAlert] = useState<AlertTypes>({
    displayAlert: false,
    message: "",
    status: "success",
  });

  useEffect(() => {
    const init = async () => {
      const result = await RequestMapper.get("/genres");
      result && setGenres(result);
    };
    init();
  }, []);

  const editGenre = (genre: Genre) => {};

  const initalizeFormAlert = () => {
    setAlert({
      displayAlert: false,
      message: "",
      status: "success",
    });
  };

  const initializeGenreForm = () => {
    setGenreForm({ id: -100, name: "", color: "" });
  };

  const updateGenre = () => {};

  return (
    <Layout>
      <div className="genres-list">
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>名称</Th>
              <Th>カラー</Th>
              <Th>表示例</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {genres.map((g) => (
              <Tr key={g.id}>
                <Th>{g.id}</Th>
                <Th>{g.name}</Th>
                <Th>{g.color}</Th>
                <Th>
                  <Tag key={g.id} variant="solid" mr="1" bg={g.color}>
                    {g.name}
                  </Tag>
                </Th>
                <Th>
                  <Button
                    size="xs"
                    colorScheme="twitter"
                    onClick={() => {
                      setGenreForm(g);
                      setOpenModal(true);
                    }}
                  >
                    変更
                  </Button>
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
      <ModalComponent
        confirm={updateGenre}
        cancel={() => {
          setOpenModal(false), initializeGenreForm;
        }}
        displayModal={openModal}
      >
        <FormControl>
          <Text mt="4" mb="2">
            ジャンル名
          </Text>
          <Input
            value={genreForm.name}
            type="text"
            placeholder="ジャンル名を入力"
            isRequired
            mb="4"
            onChange={(e) =>
              setGenreForm((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
          <Text mt="4" mb="2">
            カラー
          </Text>
          <input
            type="color"
            value={genreForm.color}
            onChange={(e) => {
              setGenreForm((prevState) => ({
                ...prevState,
                color: e.target.value,
              }));
            }}
          />
					<Text>{genreForm.color}</Text>
        </FormControl>
      </ModalComponent>
      <AlertComponent
        status={alert.status}
        width="90%"
        displayAlert={alert.displayAlert}
        onClose={initalizeFormAlert}
      >
        {alert.message}
      </AlertComponent>
    </Layout>
  );
};

export default GenresList;
