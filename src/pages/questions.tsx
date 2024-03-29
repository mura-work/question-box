import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import RequestMapper from "@/lib/RequestMapper";
import styled from "styled-components";
import {
  Heading,
  Tag,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { DeleteIcon, ChatIcon, EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { AlertComponent } from "@/components/Alert";
import { AlertTypes } from "@/types/index";
import { ModalComponent } from "@/components/Modal";

type Genre = {
  id: number;
  name: string;
  color: string;
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
  margin-right: auto;
  padding: 4px;
`;

const QuestionCardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

type Inputs = {
  title: string;
  content: string;
  genres: Genre[];
};

const Questions = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [questionInput, setQuestionInput] = useState<Inputs>({
    title: "",
    content: "",
    genres: [],
  });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertTypes>({
    displayAlert: false,
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

  const displayModal = () => setOpenModal(true);

  const initalizeFormAlert = () => {
    setAlert({
      displayAlert: false,
      message: "",
      status: "success",
    });
  };

  const createQuestion = async () => {
    try {
      await RequestMapper.post("/questions", questionInput);
      const questionData = await RequestMapper.get("/questions");
      setQuestions(questionData);
      setOpenModal(false);
      setAlert({
        status: "success",
        displayAlert: true,
        message: "質問が作成されました！",
      });
      setQuestionInput({
        title: "",
        content: "",
        genres: [],
      });
    } catch (e) {
      setAlert({
        status: "error",
        displayAlert: true,
        message: "質問が作成できませんでした",
      });
    }
  };

  const changeInputGenre = (
    e: React.ChangeEvent<HTMLInputElement>,
    genreId: number
  ) => {
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

  const deleteQuestion = async (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    questionId: number
  ) => {
    if (!questionId) return;
    const result = await RequestMapper.delete("/questions", { id: questionId });
    if (result) {
      const newData = questions.filter((q) => q.id !== questionId);
      setQuestions(newData);
      setAlert({
        status: "info",
        displayAlert: true,
        message: "質問が削除されました。",
      });
    }
  };

  const openComments = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    questionId: Number
  ) => {
    e.preventDefault();
    router.push(`/questions/${questionId}`);
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
            <QuestionCardFooter>
              <QuestionGenres>
                {q.genres.map((g) => (
                  <Tag key={g.id} variant="solid" mr="1" bg={g.color}>
                    {g.name}
                  </Tag>
                ))}
              </QuestionGenres>
              {/* <EditIcon
                boxSize={"1.5rem"}
                mr="0.5rem"
                _hover={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  setDisplayCommentModal(true),
                    setCommentInput((prevValue) => ({
                      ...prevValue,
                      questionId: q.id,
                    }));
                }}
              /> */}
              <ChatIcon
                boxSize={"1.5rem"}
                mr="0.5rem"
                _hover={{ cursor: "pointer" }}
                onClick={(e) => openComments(e, q.id)}
              />
              <span>{q.comments.length}</span>
              <DeleteIcon
                boxSize={"1.5rem"}
                mr="0.5rem"
                _hover={{ cursor: "pointer" }}
                onClick={(e) => deleteQuestion(e, q.id)}
              />
            </QuestionCardFooter>
          </QuestionCard>
        ))}
      </QuestionPage>
      <ModalComponent
        cancel={() => setOpenModal(false)}
        confirm={createQuestion}
        displayModal={openModal}
      >
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

export default Questions;
