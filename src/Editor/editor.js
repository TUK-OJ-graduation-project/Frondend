import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import './editor.css';
import axios from 'axios';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

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

  useEffect(() => {
    // GET 요청
    axios
      .get('http://127.0.0.1:8000/api/v1/problems/list/', { withCredentials: true })
      .then(function (response) {
        console.log(response);
        setProblemData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


    // POST 요청
    axios
      .post('http://127.0.0.1:8000/api/v1/problems/', { withCredentials: true })
      .then(function (response) {
        console.log(response);
        setProblemData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  return (
  <div>
  {problemData.map(problem => (
    <div key={problem.id}>
      <h4>
        Problem {problem.id} - {problem.title}
      </h4>
      <p>Level: {problem.level}</p>
      <p>Type: {problem.type}</p>
      <h3>Description</h3>
      <p>{problem.description}</p>
      <h4>Input</h4>
      <pre>{problem.input_format}</pre>
      <h4>Output</h4>
      <pre>{problem.output_format}</pre>
      <h4>Hint</h4>
      <p>{problem.hint}</p>
    </div>
  ))}
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