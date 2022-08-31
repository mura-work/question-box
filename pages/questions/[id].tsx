import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import RequestMapper from "../../lib/RequestMapper";
import styled from "styled-components";
import { useRouter } from "next/router";

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
      }
    };
    init();
  }, [router]);

  return (
    <div className="question-detaill">
      <h1>詳細</h1>
    </div>
  );
};

export default QuestionDetail;
