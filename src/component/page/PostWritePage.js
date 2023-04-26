import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 50px);
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

function PostWritePage(props){
    const navigate = useNavigate();

    // const [postTitle, setpostTitle] = useState({
    //     postTitle: ``,
    //     postContent: ``
    // });
    const [postContent, setpostContent] = useState({
        postTitle: ``,
        postContent: ``
    });

    // const [postTitle, postContent] = useState({
       
    // })
    //적힌 내용들 저장해주는 state
    const [viewContent, setViewContent] = useState([]);


    const getValue = e => {
        const {name, value} = e.target;
        // setpostContent({
        //     ...postContent,
        //     [name]: value
        // })
        console.log(name, value);
    }

    return(
            

        <Wrapper>
            <Container>
                <TextInput className="title-input"
                    height={50}
                    type='text'
                    placeholder='제목'
                    onChange={getValue}
                    name='postTitle'
                    /* // height={20}
                    // value={title}
                    // onChange={(event) => { */
                    /* //     setTitle(event.target.value);
                    // }} */
                />
                {/* <TextInput
                    height={480}
                    value={content}
                    onChange={(event) => {
                        setContent(event.target.value);
                    }}
                /> */}
                <Container>
                 <TextInput className="content-input"
                    type='content'
                    placeholder='내용'
                    onChange={getValue}
                    name='postContent'
                    /* // height={20}
                    // value={title}
                    // onChange={(event) => { */
                    /* //     setTitle(event.target.value);
                    // }} */
                />
                </Container>
                <Container>
                <Button
                    title="글 작성하기"
                    onClick={() =>{
                        // navigate("/");
                        setViewContent(viewContent.concat({...postContent}));
                    }}
                />
                </Container>
            </Container>
        </Wrapper>
    );
}

export default PostWritePage;
