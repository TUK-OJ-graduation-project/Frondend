import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "../list/PostList";
// import Community from "../page/Community";
import Problemlist from "../list/Problemlist";
import Button from "../ui/Button";
import data from '../../data.json';

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
        :not(:last-child){
            margin-bottom: 16px;
        }
    }
`;

function MainPage(props){
    const {} = props;

    const navigate = useNavigate();

    return (
        
        <Wrapper>
            <Container><div id="QnA" className="pagename"><h1 style={{ color: "grey", float: "left" }}>QnA</h1></div></Container>    
            <Container>
                <ol>
                    <li>
                    <a href="/MainPage">QnA</a>
                    </li>
                    {/* <li>
                    <a href="/Community">Community</a>
                    </li> */}
                    <li>
                    <a href="/Problemlist">Problem</a>
                    </li>
                    
                </ol>
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
        </Wrapper>
    );
}

export default MainPage;
