import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import RequestMapper from "../../lib/RequestMapper";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Heading, Tag } from "@chakra-ui/react";
import { DeleteIcon, ChatIcon, EditIcon } from "@chakra-ui/icons";

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
  margin-right: auto;
  padding: 4px;
`;

const QuestionCardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const QuestionDetail = () => {
  const [question, setQuestion] = useState<Question>({
    id: -100,
    title: "",
    content: "",
    genres: [],
    comments: [],
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
        console.log(result);
      }
    };
    init();
  }, [router]);

  const deleteQuestion = async () => {
    if (!questionId) return;
    const result = await RequestMapper.delete("/questions", { id: questionId });
    if (result) {
      router.push("/questions");
    }
  };

  return (
    <Layout>
      <div className="question-detaill">
        <h1>詳細</h1>
        <QuestionCard key={question.id}>
          <Heading className="question-title" size="lg" p="1">
            {question.title}
          </Heading>
          <QuestionContent>{question.content}</QuestionContent>
          <QuestionCardFooter>
            <QuestionGenres>
              {question.genres.map((g) => (
                <Tag
                  key={g.id}
                  colorScheme={TAG_COLOR_CODE[g.id]} // TODO: タグ追加の作成 作成時に文字列の値を追加できるようにする
                  variant="solid"
                  mr="1"
                >
                  {g.name}
                </Tag>
              ))}
            </QuestionGenres>
            {/* <EditIcon
              boxSize={"1.5rem"}
              mr="0.5rem"
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                setDisplayCommentModal(true),
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
    </Layout>
  );
};

export default QuestionDetail;
