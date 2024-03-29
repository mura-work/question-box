import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import RequestMapper from "../../lib/RequestMapper";
import styled from "styled-components";
import { useRouter } from "next/router";
import {
  Heading,
  Tag,
  FormControl,
  FormErrorMessage,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon, ChatIcon, EditIcon } from "@chakra-ui/icons";
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

type commnetInputs = {
  content: string;
  questionId: number;
};

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

const QuestionComments = styled.div`
  margin-top: 40px;
  display: flex;
  flex-flow: column;
  align-items: end;
`;

const CommentCard = styled.div`
  min-height: 100px;
  border: 1px solid black;
  border-radius: 4%;
  margin: 20px 0;
  padding: 4px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  background-color: #caebf2;
  width: 80%;
`;

const CommentContent = styled.div`
  background-color: white;
  height: 100%;
  min-height: 48px;
  border-radius: 4%;
  margin: 8px 4px;
  font-family: Hannotate SC;
`;

const CommentCardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const CommentFormOpenButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NotExistComments = styled.div`
  width: 100%;
  font-size: 24px;
  text-align: center;
  font-family: Hiragino Sans;
  margin-top: 24px;
`;

const QuestionDetail = () => {
  const [question, setQuestion] = useState<Question>({
    id: -100,
    title: "",
    content: "",
    genres: [],
    comments: [],
  });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [commentInput, setCommentInput] = useState<commnetInputs>({
    content: "",
    questionId: -100,
  });
  const [alert, setAlert] = useState<AlertTypes>({
    displayAlert: false,
    message: "",
    status: "success",
  });

  const router = useRouter();
  const questionId: number | undefined = router?.query?.id
    ? Number(router.query.id)
    : undefined;

  useEffect(() => {
    const init = async () => {
      if (router.isReady && questionId) {
        const result = await RequestMapper.get(`/questions/${questionId}`);
        result && setQuestion(result);
      }
    };
    init();
  }, [router]);

  const postComment = async () => {
    if (!commentInput.content || !questionId) return;
    const param = {
      content: commentInput.content,
      questionId: questionId,
    };
    try {
      const result = await RequestMapper.post("/comments", param);
      if (result.status === 200) {
        setOpenModal(false);
        setCommentInput({ content: "", questionId: -100 });
        const newQuestion = await RequestMapper.get(`/questions/${questionId}`);
        newQuestion && setQuestion(newQuestion);
        setAlert({
          status: "success",
          displayAlert: true,
          message: "コメントが追加されました",
        });
      }
    } catch (e) {
      console.log(e);
      setAlert({
        status: "error",
        displayAlert: true,
        message: "コメントが作成できませんでした",
      });
    }
  };

  const deleteQuestion = async () => {
    if (!questionId) return;
    const result = await RequestMapper.delete("/questions", { id: questionId });
    if (result) {
      router.push("/questions");
    }
  };

  const deleteComment = async (id: number) => {
    if (!id) return;
    try {
      const result = await RequestMapper.delete("/comments", { id });
      if (result.status === 200) {
        const newQuestion = await RequestMapper.get(`/questions/${questionId}`);
        newQuestion && setQuestion(newQuestion);
        setAlert({
          status: "info",
          displayAlert: true,
          message: "コメントが削除されました",
        });
      }
    } catch (e) {
      console.log(e);
      setAlert({
        status: "error",
        displayAlert: true,
        message: "コメントが削除できませんでした",
      });
    }
  };

  const initalizeFormAlert = () => {
    setAlert({
      displayAlert: false,
      message: "",
      status: "success",
    });
  };

  return (
    <Layout>
      <div className="question-detaill">
        <QuestionCard key={question.id}>
          <Heading className="question-title" size="lg" p="1">
            {question.title}
          </Heading>
          <QuestionContent>{question.content}</QuestionContent>
          <QuestionCardFooter>
            <QuestionGenres>
              {question.genres.map((g) => (
                <Tag key={g.id} bg={g.color} variant="solid" mr="1">
                  {g.name}
                </Tag>
              ))}
            </QuestionGenres>
            {/* <EditIcon
              boxSize={"1.5rem"}
              mr="0.5rem"
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                setOpenModal(true),
                  setCommentInput((prevValue) => ({
                    ...prevValue,
                    questionId: question.id,
                  }));
              }}
            /> */}
            <DeleteIcon
              boxSize={"1.5rem"}
              mr="0.5rem"
              _hover={{ cursor: "pointer" }}
              onClick={deleteQuestion}
            />
          </QuestionCardFooter>
        </QuestionCard>
      </div>
      <CommentFormOpenButton>
        <Button colorScheme="twitter" onClick={() => setOpenModal(true)}>
          コメントを新しく追加する
        </Button>
      </CommentFormOpenButton>
      <QuestionComments>
        {question.comments.length === 0 ? (
          <NotExistComments>
            ---------------------------- コメントはまだありません
            ----------------------------
          </NotExistComments>
        ) : (
          question.comments.map((c) => (
            <CommentCard key={c.id}>
              <CommentContent>{c.content}</CommentContent>
              <CommentCardFooter>
                <DeleteIcon
                  boxSize={"1.5rem"}
                  mr="0.5rem"
                  _hover={{ cursor: "pointer" }}
                  onClick={() => deleteComment(c.id)}
                />
              </CommentCardFooter>
            </CommentCard>
          ))
        )}
      </QuestionComments>
      <ModalComponent
        confirm={postComment}
        cancel={() => {
          setOpenModal(false),
            setCommentInput({ content: "", questionId: -100 });
        }}
        displayModal={openModal}
      >
        <FormControl>
          <Textarea
            minHeight={"200px"}
            mb="4"
            placeholder="コメントを入力"
            isRequired
            size="lg"
            value={commentInput.content}
            onChange={(e) =>
              setCommentInput((prevValue) => ({
                ...prevValue,
                content: e.target.value,
              }))
            }
          />
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

export default QuestionDetail;
