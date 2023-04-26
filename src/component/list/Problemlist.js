import React, { useState, useEffect, FaAngleDown } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CommonTable from "../table/CommonTable";
import CommonTableColumn from "../table/CommonTableColumn";
import CommonTableRow from "../table/CommonTableRow";
import ReactDOM from "react-dom";
import "./Post.css";
import problemdata from "../../problemdata";
import styled from "styled-components";
import Pagination from "../../Pagination";
import PostList from "./Postlist";
// import Pagination from 'react-js-pagination';

// const Container = styled.div`
//   width: 100%;
//   max-width: 720px;
//   align-content: center;
//   & > * {
//     :not(:last-child) {
//       margin-bottom: 16px;
//     }
//   }
// `;
// const Wrapper = styled.div`
//     width: calc(100% - 32px);
//     padding: 16px;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: center;
//     border: 1px solid grey;
//     border-radius: 8px;
//     background: lightgrey;
//     cursor: pointer;
//     :hover {
//         background: grey;
//     }
// `;

// const Wrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: center;

//     & > * {
//         :not(:last-child){
//             margin-bottom: 16px;
//         }
//     }
// `;

const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;
const ProblemList = (props) => {

  
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  const getProblem = () => {
   //navigate(`/problem/${index}`);
   console.log("test");
  }
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

  //newDropdown
  const [Problemlist, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  //dropdown
  const [view, setView] = useState(false);
  const [selected, setSelected] = useState("");
 // const navigate = useNavigate();
 
  return (
    <>
      <Wrapper>
      <Container>
      <div className="pagename">
        {/* <h1 style={{ color: "grey", marginLeft: 150, marginTop: 100 }}> */}
        <h1 style={{ color: "grey",  marginTop: 30, marginBottom: 30, fontSize: 30, fontWeight: "bold" }}>
          PROBLEM LIST
        </h1>
      </div>
      <select
        style={{
          width: 80,
          height: 30,
          float: "right",
          marginRight: 150,
          fontSize: 15,
        }}
        type="String"
        value={limit}
        onChange={({ target: { value } }) => setLimit(String(value))}
      >
        <option value="code">code</option>
        <option value="blank">blank</option>
        <option value="select">select</option>
      </select>
      {/* <View style={{flex: 1, float: "right"}}>
            <Dropdown2 selected={selected} setSelected={setSelected}/>
      </View> */}
      <div
        style={{
          background: "#000066",
          marginLeft: 150,
          marginRight: 150,
          marginTop: 100,
          borderRadius: 10,
        }}
      >
        <CommonTable
          headersName={[
            "ID",
            "문제명",
            <select
              style={{ textAlign: "center", fontSize: 15, height: 30, color: "black" }}
              type="String"
              value={limit}
              onChange={({ target: { value } }) => setLimit(String(value))}
            >
              <option value="lv 1">lv 1</option>
              <option value="lv 2">lv 2</option>
              <option value="lv 3">lv 3</option>
              <option value="lv 4">lv 4</option>
              <option value="lv 5">lv 5</option>
            </select>,
            <select
              style={{ textAlign: "center", fontSize: 15, height: 30, color: "black" }}
              type="String"
              value={limit}
              onChange={({ target: { value } }) => setLimit(String(value))}
            >
              <option value="c">c</option>
              <option value="c++">c++</option>
              <option value="python">python</option>
              <option value="java">java</option>
            </select>,

            // <Dropdown  selected={selected} setSelected={setSelected}/>,
            // <Dropdown1 selected={selected} setSelected={setSelected}/>
          ]}
        >
          {/* //여기서부터 되나 안되나 확인 */}

          
          {dataList &&
            dataList.map((item, index) => {
              return (
                <CommonTableRow key={item.id}>
                  <CommonTableColumn>{item.id}</CommonTableColumn>
                  <CommonTableColumn>{item.title}</CommonTableColumn>
                  <CommonTableColumn>{item.level}</CommonTableColumn>
                  <CommonTableColumn>{item.lan}</CommonTableColumn>
                </CommonTableRow>
              );
            })}

          {/* ------------------------- */}
          {/* <main>
        {problemdata.slice(offset, offset + limit).map(({ id, title, level }) => (
          <article key={id}>
            <CommonTableColumn>{id} </CommonTableColumn>
            <CommonTableColumn>{title} </CommonTableColumn>
            <CommonTableColumn>{level} </CommonTableColumn>
          </article>
            
        ))}
      </main> */}
        </CommonTable>
      </div>
      {/* <label>
          페이지 당 표시할 게시물 수:&nbsp;
          <select
            type="number"
            value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}
          >
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label> */}

      {/* ----------------------------- */}

      <footer>
        <Pagination
          total={problemdata.length}
          // total={setDataList}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
      </Container>
      </Wrapper>
    </>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

export default ProblemList;
