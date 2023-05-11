import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import Page from "./Page.css";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'html-react-parser';

// onChange={(event, editor)=>{
//     const data = editor.getData();
//     console.log({ event, editor, data});
//     setpostContent({
//         ..postContent,
//         content: data
//     })
//     console.log(postContent)
// }}

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
    margin-bottom: 30px;

    & > * {
        :not(:last-child){
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

function PostWritePage(props){

    const navigate = useNavigate();
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
          marginLeft: 10,
          display: "flex",
          flexDirections: "column",
          float: "right",
          marginRight: 14,
        },
        nameText: {
          color: "black",
          fontSize: 16,
          fontWeight: "bold"
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
    // const [postTitle, setpostTitle] = useState({
    //     postTitle: ``,
    //     postContent: ``
    // });
    const [postContent, setpostContent] = useState({
        Title: '',
        Content: ''
    });

    // const [postTitle, postContent] = useState({

    // })
    //적힌 내용들 저장해주는 state => 화면에 보여주려고!
    const [viewContent, setViewContent] = useState([]);


    const getValue = e => {
        const {name, value} = e.target;
        setpostContent({
            ...postContent,
            [name]: value
        })
        console.log(postContent);

    }

    return(
        <Wrapper>
            <Container>
              <Button
          title="뒤로 가기"
          onClick={() => {
            navigate("/qna");
          }}
        />
            </Container>
            <Container classname="post-view">
            <input style={{height: 50}}
                className="title-input"
                    type='text'
                placeholder='  제목'
                    onChange={getValue}
                name="title"
                />
            <CKEditor
                editor={ClassicEditor}
                // data="여기 입력해줘여"
                onReady={editor =>{
                        }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({event, editor, data});
                    setpostContent({
                        ...postContent,
                        content: data
                    })
                    console.log(postContent);
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
             <button
                className="submit-button"
                onClick={()=>{
                    setViewContent(viewContent.concat({...postContent}));
                }} >
                    <Button title="글 작성하기"/>
                </button>
                </Container>
            <div></div>
                <Container>

                </Container>
            <Container>
                <PostContainer className="post-container">
                <div>

                    {/* <img src="./public/profile.png" style={styles.image}></img> */}

                    {/* <TitleText>{state.title}</TitleText> */}
                    <TitleText>
                    {viewContent.map(element =>
                        <div>
                            {/* <div style={StyleSheet.imageContainer}> */}
                            {/* <img src={require("./tino.png")} style={styles.image} /> */}
                        {/* </div> */}
                            <h2>{element.title}</h2>
                            <div>
                                {/* {element.content} */}
                                {ReactHtmlParser(element.content)}
                            </div>
                        </div>
                    )}
                    </TitleText>
                </div>
                </PostContainer>
            </Container>
        </Wrapper>
    );
}

export default PostWritePage;
