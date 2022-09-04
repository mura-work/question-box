import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import RequestMapper from "@/lib/RequestMapper";
import styled from "styled-components";

type Genre = {
  id: number;
  name: string;
  color: string;
};

const GenresDetail = () => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const init = async () => {
      const result = await RequestMapper.get("genres");
      result && setGenres(result);
    };
    init();
  }, []);

  return (
    <Layout>
      <div className="genres-list">
        {genres.map((g) => (
          <div>{g.id + g.name + g.color}</div>
        ))}
      </div>
    </Layout>
  );
};

export default GenresDetail;
