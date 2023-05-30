import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';

const BoardUpdate = () => {
    const navigate = useNavigate();
    const { postId } = useParams(); // /update/:postid와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
    const [post, setPost] = useState({
      postId: 0,
      title: '',
    //   createdBy: '',
      contents: '',
    });
    // const navigate = useNavigate();
    // const { postId } = useParams();
    // const [post, setPost] = useState(null);
    // const [comment, setComment] = useState("");
    // const { state } = useLocation();
  
    const { title, contents } = post; //비구조화 할당
  
    const onChange = (event) => {
      const { value, name } = event.target; //event.target에서 name과 value만 가져오기
      setPost({
        ...post,
        [name]: value,
      });
    };

    const [postContent, setpostContent] = useState({
        title: "",
        question: "",
      });
    // const getPost= async () => {
    //   const resp = await (await axios.get(`http://127.0.0.1:8000/api/v1/qna/questions/${postId}/`)).data;
    //   setPost(resp.data);
    // };
    const getPost= async () => {
        try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/qna/questions/${postId}/`);
        setPost(response.data);
        } catch (error){
            console.error(error);
        }
      };
  
    // const updateBoard = async () => {
    //   await axios.patch(`http://127.0.0.1:8000/api/v1/qna/questions/${postId}/`, post)
    //   .then((response) => {
    //     alert('수정되었습니다.');
    //     navigate('/qna/' + postId);
    //   });
    // };
    const updateBoard = async () => {
        try{
            await axios.patch(`http://127.0.0.1:8000/api/v1/qna/questions/${postId}/`, post)
            alert('수정되었습니다.');
            navigate('/qna/' + postId);
            } catch (error) {
                console.error(error);
            }
      };
  
    const backToDetail = () => {
      navigate('/qna/' + postId);
    };
  
    useEffect(() => {
      getPost();
    }, []);

    // const getValue = (e) => {
    //     const { name, value } = e.target;
    //     setpostContent({
    //       ...postContent,
    //       [name]: value,
    //     });
    //     console.log(postContent);
    //   };

    return (
      <div>
        <div>
          <span>제목</span>
          <input type="text" name="title" value={title} onChange={onChange} />
        </div>
        <br />
        {/* <div>
          <span>작성자</span>
          <input type="text" name="createdBy" value={createdBy} readOnly={true} />
        </div> */}
        <br />
        <div>
          <span>내용</span>
          <textarea
            name="contents"
            cols="30"
            rows="10"
            value={contents}
            onChange={onChange}
          ></textarea>
        </div>
        
        {/* <Wrapper> */}
      {/* <Container>
        <Button
          title="뒤로 가기"
          onClick={() => {
            navigate("/qna");
          }}
        />
      </Container>
      <Container classname="post-view">
        <input
          style={{ height: 50 }}
          className="title-input"
          type="text"
          placeholder="  제목"
          onChange={getValue}
          name="title"
        />
        <CKEditor
          editor={ClassicEditor}
          // data="여기 입력해줘여"
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setpostContent({
              ...postContent,
              question: data,
            });
            console.log(postContent);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        /> */}
        {/* <button className="submit-button" onClick={test}> 
          <Button title="글 작성하기" />
        </button> */}
      {/* </Container>
      <div></div>
      <Container></Container>
    </Wrapper> */}
        <br />
        <div>
          <button onClick={updateBoard}>수정</button>
          <button onClick={backToDetail}>취소</button>
        </div>
      </div>
    );
  };
  
  export default BoardUpdate;