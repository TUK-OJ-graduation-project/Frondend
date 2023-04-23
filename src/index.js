import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import axios from 'axios';
import './header/header.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
// const instance = axios.create({
//   baseURL: 'http://localhost:3000/Problem/', // 서버 주소
// });

// // 문제 정보 가져오기 API
// export const getProblem = (id) => {
//   return instance.get(`/problems/${id}`);
// };

// // 소스코드 실행하기 API
// export function executeCode(problemId, code) {
//   const data = {
//     problemId: problemId,
//     code: code
//   };

//   return instance.post(`/problems`, data);
// }

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
