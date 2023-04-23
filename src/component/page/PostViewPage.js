import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import data from "../../data.json";

const Wrapper = styled.div`
  padding: 16px;
  width: clac(100% - 32px);
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

const PostContainer = styled.div`
  padding: 8px 16px;
  border: 1px solid grey;
  border-radius: 8px;
`;

const TitleText = styled.p`
  font-size: 28px;
  font-weight: 500;
`;

const ContentText = styled.p`
  font-size: 20px;
  line-height: 32px;
  white-space: pre-wrap;
`;

const CommentLabel = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

function PostViewPage(props) {
  const navigate = useNavigate();
  const { postId } = useParams();

  const post = data.find((item) => {
    return item.id == postId;
  });

  const [comment, setComment] = useState("");

  const styles = {
    wrapper: {
      margin: 8,
      padding: 8,
      display: "flex",
      flexDirection: "row",
      border: "1px solid grey",
      borderRadius: 16,
    },
    imageContainer: {},
    image: {
      width: 50,
      height: 48,
      borderRadius: 25,
      border: "1px solid grey",
      float: "right",
    },
    contentContainer: {
      marginLeft: 8,
      display: "flex",
      flexDirections: "column",
      float: "right",
      marginRight: 14,
    },
    nameText: {
      color: "black",
      fontSize: 16,
      fontWeight: "bold",
    },
    commentText: {
      color: "black",
      fontSize: 16,
    },
    Problem: {
      float: "left",
      fontSize: 16,
    },
  };
  return (
    <Wrapper>
      <Container>
        <div id="QnA" className="pagename">
          <h1 style={{ color: "grey", float: "left" }}>QnA</h1>
        </div>
      </Container>
      <Container>
        <Button
          title="뒤로 가기"
          onClick={() => {
            navigate("/");
          }}
        />
        <PostContainer>
          <div>
            <div style={StyleSheet.imageContainer}>
              <img src={require("./tino.png")} style={styles.image} />
              {/* <img src="./public/profile.png" style={styles.image}></img> */}
            </div>
            <TitleText>{post.title}</TitleText>
            <div style={styles.contentContainer}>
              <span style={styles.nameText}>이름</span>
            </div>
            <ContentText>{post.content}</ContentText>
          </div>
        </PostContainer>

        <CommentLabel>댓글</CommentLabel>
        <CommentList comments={post.comments} />

        <TextInput
          height={40}
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
        <Button
          title="댓글 작성하기"
          onClick={() => {
            navigate("/");
          }}
        />
      </Container>
    </Wrapper>
  );
}

export default PostViewPage;
