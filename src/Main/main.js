import React from 'react'
import './main.css'

function Main(){
  // 공지사항 목록 창과 문제 목록 창을 겹치도록 설정합니다.
  React.useEffect(() => {
      const noticeContainer = document.querySelector('.notice-container');
      const problemContainer = document.querySelector('.problem-container');
      noticeContainer.style.zIndex = 2;
      problemContainer.style.zIndex = 1;
  }, []);

  return(
      <div>

          <div className='container'>
              <div className="notice-container">
                  <h2>공지사항</h2>
                  <ul>
                      <li><a href="#">공지사항 1</a></li>
                      <li><a href="#">공지사항 2</a></li>
                      <li><a href="#">공지사항 3</a></li>
                  </ul>
              </div>
              <div className="problem-container">
                  <h2>문제 목록</h2>
                  <ul>
                      <li><a href="#">문제 1</a></li>
                      <li><a href="#">문제 2</a></li>
                      <li><a href="#">문제 3</a></li>
                  </ul>
              </div>
          </div>

      </div>
  );
}


export default Main;
