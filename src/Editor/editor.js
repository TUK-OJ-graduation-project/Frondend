import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import './editor.css';
import axios from 'axios';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python'; // 자바스크립트에서 파이썬으로 바꿔줌..!
import 'ace-builds/src-noconflict/theme-monokai';
import { useParams } from 'react-router-dom';
// import { response } from 'express'; //express는 Node.js 위에 웹 애플리케이션 구축을 위한 프레임워크(백엔드!!)

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #ffffff;
    height: 100vh;
  }
`;

const Layout = styled.div`
  flex-direction: row;
  padding: 5px 1;
  color: #000000;
  font-size: 20px;
  font-family: sans-serif;
  flex: 1;
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
    {/* {problemData.map(problem => ( */}
    <div key={problemData.id}>
      <h5>
        Problem {problemData.id} - {problemData.title}
      </h5>
      <p>Level: {problemData.level}</p>
      <p>Type: {problemData.type}</p>
      <h5>Description</h5>
      <p>{problemData.description}</p>
      <h5>Input</h5>
      <p>{problemData.input_format}</p>
      <h5>Output</h5>
      <p>{problemData.output_format}</p>
      <h5>Hint</h5>
      <p>{problemData.hint}</p>
    </div>

  {/*) )} */}
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
      <h4>Source Code</h4>
      <AceEditor
        mode="python" // javascript에서 python으로 바꿈.
        theme="monokai"
        name="source-code-editor"
        value={sourceCode}
        onChange={handleSourceCodeChange}
        editorProps={{ $blockScrolling: true }}
        height="500px"
        width="100%"
        fontSize={13}
      />
      <button onClick={handleSourceCodeSubmit}>Submit</button>
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

  return (
    <div className="online-judge-layout">
      <Layout className="editor_container">
        {/* Remove Sidebar from here */}
        <div className="problem_info_container">
          <ProblemInfoComponent problemId={problemId} />
        </div>
        <SourceCodeContainer className="source-code-and-execution-result">
          <div className="source-code-container">
            <SourceCodeInputComponent problemId={problemId} executionResult={executionResult} setExecutionResult={setExecutionResult} />
          </div>
          <div className="execute-container">
            <ExecutionResultComponent problemId={problemId} executionResult={executionResult} setExecutionResult={setExecutionResult}/>
          </div>
        </SourceCodeContainer>
      </Layout>
    </div>
  );
}

export default Editor;