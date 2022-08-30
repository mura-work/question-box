import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import useSWR from "swr";
import RequestMapper from "../lib/RequestMapper";
import styled from "styled-components";
import {
  Heading,
  Text,
  Tag,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  Stack,
  Checkbox,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { values } from "lodash";

type Genre = {
  id: number;
  name: string;
};

type Comment = {
  id: number;
  content: string;
};

type Question = {
  id: number;
  title: string;
  content: string;
  genres: Genre[];
  comments: Comment[];
};

const TAG_COLOR_CODE = {
  1: "twitter",
  2: "facebook",
  3: "telegram",
  4: "whatsapp",
  5: "messenger",
};

const QuestionPage = styled.div`
  width: 40%;
  margin: 0 auto;
`;

const QuestionCard = styled.div`
  height: 300px;
  border: 1px solid black;
  border-radius: 4%;
  margin: 20px 0;
  padding: 4px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  background-color: #7fffd4;
`;

const QuestionContent = styled.p`
  background-color: white;
  height: 100%;
  border-radius: 4%;
  margin: 8px 4px;
  font-family: Hannotate SC;
`;

const QuestionGenres = styled.div`
  margin-left: auto;
  padding: 4px;
`;

const AlertWrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 90%;
  min-width: 400px;
  margin-left: -2rem;
  display: flex;
  justify-content: center;
`;

type Inputs = {
  title: string;
  content: string;
  genres: Genre[];
};

type alertStatusTypes = "info" | "warning" | "success" | "error";

type alertTypes = {
  display: boolean;
  message: string;
  status: alertStatusTypes;
};

const Questions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [questionInput, setQuestionInput] = useState<Inputs>({
    title: "",
    content: "",
    genres: [],
  });
  const [displayQuestionModal, setDisplayQuestionModal] =
    useState<boolean>(false);
  const [questionAlert, setQuestionAlert] = useState<alertTypes>({
    display: false,
    message: "",
    status: "success",
  });

  useEffect(() => {
    const initData = async () => {
      const result = await RequestMapper.get("/questions");
      if (result) {
        setQuestions(result);
      } else {
        console.log("データが取得できませんでした。リロードしてください");
      }
      const genreData = await RequestMapper.get("/genres");
      genreData && setGenres(genreData);
    };
    initData();
  }, []);

  const displayModal = () => setDisplayQuestionModal(true);

  const createQuestion = async () => {
    try {
      const result = await RequestMapper.post("/questions", questionInput);
      const questionData = await RequestMapper.get("/questions");
      setQuestions(questionData);
      setDisplayQuestionModal(false);
      setQuestionAlert({
        status: "success",
        display: true,
        message: "質問が作成されました！",
      });
    } catch (e) {
      setQuestionAlert({
        status: "error",
        display: true,
        message: "質問が作成できませんでした",
      });
    } finally {
      const hideAlert = () => {
        setQuestionAlert((prevValue) => ({
          ...prevValue,
          display: false,
        }));
      };
      setTimeout(hideAlert, 5000);
    }
  };

  const changeInputGenre = (e, genreId: number) => {
    if (e.target.checked) {
      const targetGenre = genres.find((g) => g.id === genreId);
      if (!targetGenre) return;
      setQuestionInput((prevValue) => ({
        ...prevValue,
        genres: [...prevValue.genres, targetGenre],
      }));
    } else {
      setQuestionInput((prevValue) => ({
        ...prevValue,
        genres: prevValue.genres.filter((g) => g.id !== genreId),
      }));
    }
  };

  return (
    <Layout>
      <Heading textAlign="center" mb="10">
        質問箱
      </Heading>
      <Button colorScheme="cyan" onClick={displayModal}>
        投稿する
      </Button>
      <QuestionPage>
        {questions.map((q) => (
          <QuestionCard key={q.id}>
            <Heading className="question-title" size="lg" p="1">
              {q.title}
            </Heading>
            <QuestionContent>{q.content}</QuestionContent>
            <QuestionGenres>
              {q.genres.map((g) => (
                <Tag
                  key={g.id}
                  colorScheme={TAG_COLOR_CODE[g.id]}
                  variant="solid"
                  mr="1"
                >
                  {g.name}
                </Tag>
              ))}
            </QuestionGenres>
          </QuestionCard>
        ))}
      </QuestionPage>
      <Modal
        isOpen={displayQuestionModal}
        onClose={() => setDisplayQuestionModal(false)}
        autoFocus
        isCentered
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent height={"60%"}>
          <ModalBody>
            <FormControl>
              <Input
                value={questionInput.title}
                type="text"
                placeholder="題名を入力"
                isRequired
                my="4"
                onChange={(e) =>
                  setQuestionInput((prevState) => ({
                    ...prevState,
                    title: e.target.value,
                  }))
                }
              />
              <Textarea
                minHeight={"200px"}
                mb="4"
                placeholder="内容を入力"
                isRequired
                size="lg"
                value={questionInput.content}
                onChange={(e) =>
                  setQuestionInput((prevValue) => ({
                    ...prevValue,
                    content: e.target.value,
                  }))
                }
              />
              <Stack spacing={[1, 5]} direction={["column", "row"]}>
                {genres.map((g) => (
                  <Checkbox
                    value={g.id}
                    key={g.id}
                    onChange={(e) => changeInputGenre(e, g.id)}
                  >
                    {g.name}
                  </Checkbox>
                ))}
              </Stack>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={createQuestion}
              disabled={
                !questionInput.title ||
                !questionInput.content ||
                questionInput.genres.length === 0
              }
            >
              投稿する
            </Button>
            <Button
              variant="ghost"
              onClick={() => setDisplayQuestionModal(false)}
            >
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {questionAlert.display && (
        <AlertWrapper>
          <Alert w={"90%"} status={questionAlert.status}>
            <AlertIcon />
            <AlertTitle>{questionAlert.message}</AlertTitle>
          </Alert>
        </AlertWrapper>
      )}
    </Layout>
  );
};

export default Questions;
