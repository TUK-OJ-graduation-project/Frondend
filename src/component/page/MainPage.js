import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "../list/Postlist";
// import Community from "../page/Community";
import Problemlist from "../list/Problemlist";
import Button from "../ui/Button";
import data from "../../data.json";
import Pagination from "react-js-pagination";
import "./Paging.css";

const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  max-width: 720px;
  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

// const Paging = () => {
//     const [page, setPage] = useState(1);

//     const handlePageChange = (page) => {
//         setPage(page);
//     }
// }

function MainPage(props) {
  const {} = props;
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
      <h1 style={{ color: "grey",  marginTop: 30, marginBottom: 30, fontSize: 30, fontWeight: "bold" }}>
          QnA
      </h1>
      </Container>
      <Container>
        <Button
          title="글 작성하기"
          onClick={() => {
            navigate("/post-write");
          }}
        />
        <PostList
          posts={data}
          onClickItem={(item) => {
            
            navigate(`/post/${item.id}`);
          }}
        />
      </Container>
{/* 
      <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          {/* <option value="15">15</option>
                <option value="50">50</option>
                <option value="100">100</option> */}
        {/* </select> */}
      {/* </label> */}
    </Wrapper>
  );
}

export default MainPage;
