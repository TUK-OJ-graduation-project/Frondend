import './main.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function Main(props){
  // 공지사항 목록 창과 문제 목록 창을 겹치도록 설정합니다.
  React.useEffect(() => {
      const noticeContainer = document.querySelector('.notice-container');
      const problemContainer = document.querySelector('.problem-container');
      noticeContainer.style.zIndex = 2;
      problemContainer.style.zIndex = 1;
  }, []);


    const [dataList, setDataList] = useState([]);
    useEffect(() => {
        // setDataList(problemdata);
        axios
          .get("http://127.0.0.1:8000/api/v1/problems/list/")
          .then(function (response) {
           // console.log(response)
            setDataList(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
       // setDataList(problemdata);
        // .then((res) => res.json())
        // .then((data) => problemdata(data));
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
            {dataList.map(problem => (
              <li key={problem.id}><a href="#">{problem.title}</a></li>
            ))}
          </ul>
      </div>
    </div>
  </div>
);
}


export default Main;
