import axios from 'axios';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import styled from "styled-components";
import MainPage from './component/page/MainPage';
import PostWritePage from './component/page/PostWritePage';
import PostViewPage from './component/page/PostViewPage';
import Problemlist from './component/list/Problemlist';
import Community from './component/page/Community';
import Button from './component/ui/Button';
import Home from './component/page/Home';

const MainTitleText = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  margin-left: 360px;
  color: navy;
`;

// function App(props){
  class App extends React.Component{
    render(){
  return(
    
    // <BrowserRouter>
    //   <MainTitleText> COMMUNITY </MainTitleText>
      <Router>
        <Routes>
          {/* <h1> COMMUNITY </h1> */}
          <Route exact path="/" component={Home} />
          <Route path="/Problemlist" element={<Problemlist/>}/>
          {/* <Route path="/Community" element={<Community/>}/> */}
          <Route path="/MainPage" element={<MainPage/>}/>
          <Route index element={<MainPage />}/>
          <Route path="post-write" element={<PostWritePage />} />
          <Route path="post/:postId" element={<PostViewPage />} />
        </Routes>
      </Router>
        // </BrowserRouter>
    );
  }
}
export default App;