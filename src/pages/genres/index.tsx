import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import RequestMapper from "@/lib/RequestMapper";
import styled from "styled-components";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
	Tag,
} from "@chakra-ui/react";

type Genre = {
  id: number;
  name: string;
  color: string;
};

const GenresList = () => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const init = async () => {
      const result = await RequestMapper.get("/genres");
      result && setGenres(result);
    };
    init();
  }, []);

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
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default GenresList;
