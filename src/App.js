import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import MainPage from "./component/page/MainPage";
import PostWritePage from "./component/page/PostWritePage";
import PostViewPage from "./component/page/PostViewPage";
import Problemlist from "./component/list/Problemlist";
import Community from "./component/page/Community";
import Button from "./component/ui/Button";
import Home from "./component/page/Home";

import Editor from "./Editor/editor";
import QnA from "./QnA";
import Footer from "./footer/footer";
import Headerbar from "./header/Header";
import Main from "./Main/main";
import QuizPage from "./OX_quiz/QuizPage";
import ShortQuizPage from "./ShortQuiz/shortQuiz";

const MainTitleText = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  margin-left: 360px;
  color: navy;
`;

// function App(props){
class App extends React.Component {
  render() {
    return (
      // <BrowserRouter>
      //   <MainTitleText> COMMUNITY </MainTitleText>
      <Router>
        <Headerbar />
        <Routes>
          {/* <h1> COMMUNITY </h1> */}
          {/* <Route path="/home" component={Home} /> */}
          <Route path="/" element={<Main />} />
          <Route path="/problem/:id" element={<Editor />} />
          <Route path="/Problemlist" element={<Problemlist />} />
          <Route path="/oxquiz/:id" element={<QuizPage />} />
          <Route path="/shortquiz/:id" element={<ShortQuizPage />} />
          {/* <Route path="/Community" element={<Community/>}/> */}
          <Route path="/qna" element={<MainPage />} />
          <Route path="post-write" element={<PostWritePage />} />
          <Route path="post/:postId" element={<PostViewPage />} />
        </Routes>
        <Footer />
      </Router>
      // </BrowserRouter>
    );
  }
}
export default App;
