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
	Heading,
} from "@chakra-ui/react";
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
    color: "#f21c1c",
  });
  const [alert, setAlert] = useState<AlertTypes>({
    displayAlert: false,
    message: "",
    status: "success",
  });

  const init = async () => {
    const result = await RequestMapper.get("/genres");
    result && setGenres(result);
  };

  useEffect(() => {
    init();
  }, []);

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

  const createGenre = async () => {
    const param = { name: genreForm.name, color: genreForm.color };
    try {
      const result = await RequestMapper.post("/genres", param);
      if (result.status) {
        setAlert({
          displayAlert: true,
          message: "ジャンルが作成されました",
          status: "success",
        });
      }
      init();
    } catch (e) {
      console.log(e);
      setAlert({
        displayAlert: true,
        message: "ジャンルが作成できませんでした",
        status: "error",
      });
    }
  };

  const updateGenre = async () => {
    try {
      const result = await RequestMapper.update("/genres", genreForm);
      if (result.status) {
        setAlert({
          displayAlert: true,
          message: "ジャンルが更新されました",
          status: "success",
        });
      }
      init();
    } catch (e) {
      console.log(e);
      setAlert({
        displayAlert: true,
        message: "ジャンルが更新できませんでした",
        status: "error",
      });
    }
  };

  const confirmGenre = async () => {
    genreForm.id < 0 ? await createGenre() : await updateGenre();
    initializeGenreForm();
    setOpenModal(false);
  };

  const deleteGenre = async (id: number) => {
    if (!id) return;
    try {
      const result = await RequestMapper.delete("/genres", { id });
			if (result.status === 200) {
				setAlert({
          displayAlert: true,
          message: "ジャンルが削除されました",
          status: "success",
        });
				init()
			}
    } catch (e) {
      console.log(e);
			setAlert({
        displayAlert: true,
        message: "ジャンルが削除できませんでした",
        status: "error",
      });
    }
  };

  return (
    <Layout>
			<Heading textAlign="center" mb="10">
        ジャンル
      </Heading>
      <div className="genres-list">
        <Button
          colorScheme="cyan"
          mb="4"
          onClick={() => setOpenModal(true)}
        >
          新規追加
        </Button>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>名称</Th>
              <Th>カラー</Th>
              <Th>表示例</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {genres.map((g) => (
              <Tr key={g.id}>
                <Th>{g.id}</Th>
                <Th>
                  <Text textTransform="none">{g.name}</Text>
                </Th>
                <Th>{g.color}</Th>
                <Th>
                  <Tag key={g.id} variant="solid" mr="1" bg={g.color}>
                    <Text textTransform="none">{g.name}</Text>
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
                <Th>
                  <Button
                    size="xs"
                    colorScheme="red"
                    onClick={() => deleteGenre(g.id)}
                  >
                    削除
                  </Button>
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
      <ModalComponent
        confirm={confirmGenre}
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
          <Input
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
