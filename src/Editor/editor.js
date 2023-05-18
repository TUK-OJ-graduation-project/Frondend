import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import './editor.css';
import axios from 'axios';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import { Link } from "react-router-dom";
import { BrowserRouter as Router, useParams } from 'react-router-dom';

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

function ProblemInfoComponent(props) {
  const [problemData, setProblemData] = useState([]);
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

function SourceCodeInputComponent({ problemId }) {
  const [sourceCode, setSourceCode] = useState('');

  function handleSourceCodeChange(value) {
    setSourceCode(value);
  }
  function handleSourceCodeSubmit() {
    axios
      .post('http://127.0.0.1:8000/api/v1/solutions/submit/', {
        source_code: sourceCode,
        object_id: problemId,
        content_type: 8
      })
      .then(response => {
        console.log(response);
        alert('Source code submitted successfully!');
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while submitting the source code.');
      })
  }

  return (
    <div className="source-code-input">
      <h4>Source Code</h4>
      <AceEditor
        mode="javascript"
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

function ExecutionResultComponent({ problemId }) {
  const [executionResult, setExecutionResult] = useState(null);

  useEffect(() => {
    // 문제에 대한 최신 솔루션을 얻을 수 있는 엔드포인트가 있다고 가정. (아직 DRF에서 안정해줌..ㅠ)
    axios
      .get(`http://127.0.0.1:8000/api/v1/problems/${problemId}/latest_solution/`)
      .then(response => {
        setExecutionResult(response.data.execution_result);
      })
      .catch(error => {
        console.error(error);
      }), [problemId]

  return (
    <div className="execution-result">
      <h4>Execution Result</h4>
      <p>{executionResult}</p>
      <button>Execute</button>
    </div>
  );
}

function Editor() {
  //const [problemData] = useState(null);
  return (
    <div className="online-judge-layout">
      <Layout className="editor_container">
        {/* Remove Sidebar from here */}
        <div className="problem_info_container">
          <ProblemInfoComponent />
        </div>
        <SourceCodeContainer className="source-code-and-execution-result">
          <div className="source-code-container">
            <SourceCodeInputComponent />
          </div>
          <div className="execute-container">
            <ExecutionResultComponent />
          </div>
        </SourceCodeContainer>
      </Layout>
    </div>
  );
}

export default Editor;