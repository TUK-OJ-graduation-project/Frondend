import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import './editor.css';
import axios from 'axios';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import { useParams } from 'react-router';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #ffffff;
  }
`;
const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 1;
  color: #000000;
  font-size: 30px;
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
      .get(`http://127.0.0.1:8000/api/v1/problems/${id}/`)
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

function SourceCodeInputComponent() {
  const [sourceCode, setSourceCode] = useState('');

  function handleSourceCodeChange(value) {
    setSourceCode(value);
  }
  function handleSourceCodeSubmit() {
    alert(sourceCode);
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
        fontSize={16}
      />
      <button onClick={handleSourceCodeSubmit}>Submit</button>
    </div>
  );
}

function ExecutionResultComponent() {
  return (
    <div className="execution-result">
      <h4>Execution Result</h4>
      <button>Execute</button>
    </div>
  );
}

function Editor() {
  //const [problemData] = useState(null);
  return (
    <div className="online-judge-layout">
      <Layout>
        <GlobalStyle />
      </Layout>
      <Layout className="editor_container">
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