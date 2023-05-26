import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import './editor.css';
import axios from 'axios';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python'; // 자바스크립트에서 파이썬으로 바꿔줌..!
import 'ace-builds/src-noconflict/theme-monokai';
import { Link } from "react-router-dom";
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import {FaRegLightbulb} from "react-icons/fa";
// export const GlobalStyle = createGlobalStyle`
//   body {
//     margin: 0;
//     background-color: #ffffff;
//     height: 100vh;
//   }
// `;

const Layout = styled.div`
  flex-direction: row;
  padding: 5px 1;
  color: #000000;
  font-size: 20px;
  font-family: sans-serif;
  flex: 1;
  background-color: #FFFFFF;
`;
const SourceCodeContainer = styled.div`
  flex: 3;
`;

function ProblemInfoComponent({problemId}) {
  const [problemData, setProblemData] = useState({});
  useEffect(() => {
    // GET 요청
    axios
      .get(`http://127.0.0.1:8000/api/v1/problems/code/${problemId}/`)
      .then(response => {
        setProblemData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [problemId]);
    // POST 요청
    // axios
    //   .post('http://127.0.0.1:8000/api/v1/problems/', { withCredentials: true })
    //   .then(function (response) {
    //     console.log(response);
    //     setProblemData(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

  return (
  <div>
    <div key={problemData.id}>
      <div className='description-container'>
        <p className='description-text'> {problemData.id}. {problemData.title} </p>
        <p className='description-text'> {problemData.description}</p>
      </div>
      <div className='io-container'>
        <div className='input-container'>
          Input<br /> {problemData.input_format}
        </div>
        <div className='output-container'>
          Output<br />  {problemData.output_format}
        </div>
      </div>
    </div>
</div>

  );
}

function SourceCodeInputComponent({ problemId, executionResult, setExecutionResult }) {
  const [sourceCode, setSourceCode] = useState('');

  function handleSourceCodeChange(value) {
    setSourceCode(value);
  }
  function handleSourceCodeSubmit() {
    axios
    .post('http://127.0.0.1:8000/api/v1/solutions/submit/', {
      source_code: sourceCode,
      problem: problemId, //CodingProblem id
    })
    .then(response => {
      console.log('Response:', response);
      console.log('Execution result:', response.data.execution_result);
      alert('Source code submitted successfully!');

      // 'long polling(롱 폴링)' 시작
      const solutionId = response.data.id;
      const intervalId = setInterval(() => {
        axios
        .get(`http://127.0.0.1:8000/api/v1/solutions/submit/${solutionId}/`)
        .then(response => {
          console.log('Polling response:', response);
          const executionResult = response.data.execution_result;
          if (executionResult) {
            setExecutionResult(executionResult);
            clearInterval(intervalId); // Stop polling
        }
      })
      .catch(error => {
        console.error('An error occurred during polling:', error);
        clearInterval(intervalId); // Stop polling
      });
    }, 2000); // Poll every 2 seconds (2초마다 폴링)
    })
    .catch(error => {
      console.error(error);
      alert('An error occurred while submitting the source code.');
    });
  }

  return (
    <div className="source-code-input">
      <AceEditor
        mode="python" // javascript에서 python으로 바꿈.
        theme="monokai"
        name="source-code-editor"
        value={sourceCode}
        onChange={handleSourceCodeChange}
        editorProps={{ $blockScrolling: true }}
        height="500px"
        width="100%"
        // style={{ borderRadius: '30px' }}
        fontSize={12}
      />
      {/* <button onClick={handleSourceCodeSubmit} className="submit-button">Submit</button> */}
    </div>
  );
}

function ExecutionResultComponent({ problemId, executionResult, setExecutionResult }) {

  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, [executionResult]);

  return (
    <div className="execution-result">
      <h4>Execution Result</h4>
      <p>{executionResult}</p>
    </div>
  );
}

function Editor() {
  const { id } = useParams(); // URL 파라미터로부터 id 가져오기
  const problemId = id; // problemId에 할당

  const [executionResult, setExecutionResult] = useState(null);
  function handleSourceCodeSubmit(code) {
    alert(code);
    // Perform submission logic here
  }
  const [problemData, setProblemData] = useState([]);
  const [showHint, setShowHint] = useState(false); // 상태 추가: 힌트 보기 여부
  const id = useParams().id;
  useEffect(() => {
    // GET 요청
    axios
      .get(`http://127.0.0.1:8000/api/v1/problems/code/${id}/`)
      .then(function (response) {
        console.log(response);
        setProblemData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  /*헤더 글씨 만큼 크기 자동 조절 기능*/

  // 힌트 보기 함수
  function showHintModal() {
    setShowHint(true);
  }
  // 힌트 모달 닫기 함수
  function closeHintModal() {
    setShowHint(false);
  }

  return (
    <div className="online-judge-layout">
      <div className='editor-header'>
        <div className='editor-header-wrapper'>
          <div className='editor-header-container1'>
            LV  {problemData.level} &nbsp;&nbsp;&gt;&nbsp;&nbsp; {problemData.id}. &nbsp;{problemData.title}
          </div>
          <button className="hint-button" onClick={showHintModal}>힌트</button>
        </div>
      </div>
      <Layout className="editor_container">
        {/* Remove Sidebar from here */}
        <div className="problem_info_container">
          <ProblemInfoComponent problemId={problemId} />
          <div className='problem_info_container2'>
          <ProblemInfoComponent />
          </div>
        </div>
        <SourceCodeContainer className="source-code-and-execution-result" >
          <div className="source-code-container">
            <SourceCodeInputComponent problemId={problemId} executionResult={executionResult} setExecutionResult={setExecutionResult} />
          </div>
          <div className="execute-container">
            <ExecutionResultComponent problemId={problemId} executionResult={executionResult} setExecutionResult={setExecutionResult}/>
            <SourceCodeInputComponent onSubmit={handleSourceCodeSubmit} />
          </div>
          <div className="execute-container">
            <ExecutionResultComponent className='execute-content'/>
          </div>
        </SourceCodeContainer>
        {/* 힌트 모달 */}
        {showHint && (
          <div className="hint-modal" style={{ zIndex: 1 }}>
            {/* 힌트 내용 */}
            <div className="hint-content">
              <div className="hint-title">
                <FaRegLightbulb className="hint-icon" />
                <span className="hint-text">힌트</span>
              </div>
              <div className='hint-content2'>
                <p className='hint-text2'>{problemData.hint}</p>
              </div>
            </div>
            {/* 닫기 버튼 */}
            <div className='hint-close-button-container'>
              <button className="hint-close-button" onClick={closeHintModal}>닫기</button>
            </div>
          </div>
        )}
      </Layout>
      <div className="editor-footer">
          <div className="button-container">
            <button onClick={handleSourceCodeSubmit} className="submit-button">제출</button>
            <button className="execute-button">실행</button>
          </div>
        </div>


    </div>
  );
}

export default Editor;
