import Editor from './Editor/editor'
import QnA from './QnA';
import Footer from './footer/footer'
import Headerbar from './header/Header'
import Main from './Main/main'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';



function App() {

  return (
    <div>
      <div>
      <BrowserRouter>
        <div className="App">
          <Headerbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/problem" element={<Editor />} />
            <Route path="/qna" element={<QnA />} />
          </Routes>
          <Footer />
        </div>
  </BrowserRouter>
      </div>
    </div>

  );
}

export default App;